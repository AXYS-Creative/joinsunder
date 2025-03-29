const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");
const fs = require("fs");
const path = require("path");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // 11ty-img optimizing (pre formatting before getting to Netlify)
  eleventyConfig.addNunjucksAsyncShortcode(
    "image",
    async function (
      src,
      alt,
      widths = [320, 640, 1280, 1920],
      formats = ["avif", "webp", "jpeg"]
    ) {
      const outputDir = "./src/static/images/";
      const urlPath = "/static/images/";
      const cacheDir = ".cache/eleventy-img";

      const fileName = path.basename(src);
      const baseName = fileName.replace(path.extname(fileName), "");
      const optimizedPath = path.join(outputDir, `${baseName}-320.jpeg`);

      // If optimized image exists, return <picture> markup
      if (fs.existsSync(optimizedPath)) {
        let metadata = await Image(src, {
          widths,
          formats,
          outputDir,
          urlPath,
          cacheOptions: {
            duration: "30d",
            directory: cacheDir,
          },
        });

        return Image.generateHTML(metadata, {
          alt,
          loading: "lazy",
          decoding: "async",
        });
      }

      // Otherwise, fallback to raw image
      const publicPath = src.replace(/^src\//, "/");
      return `<img src="${publicPath}" alt="${alt}" loading="lazy" decoding="async">`;
    }
  );

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Copy Static Files over to _site directory
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./node_modules/alpinejs/dist/cdn.min.js": "./static/js/alpine.js",
  });
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/static");

  //
  // Custom Functions
  //

  // Fetch data from collection for .md files (blog, podcasts, etc.)
  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByGlob("./src/posts/**/*.md")
  );

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  // Custom function to remove tokens from content (aria-labels, etc.) // Example: aria-label="{{ page_home.heading | removeTokens }}"
  eleventyConfig.addFilter("removeTokens", function (value) {
    if (typeof value !== "string") return value;
    return value.replace(/\[%.*?%\]/g, "");
  });

  // Token Replacement at build time vs client (prevent tokens from showing up briefly)
  eleventyConfig.addTransform("tokenReplace", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      // Replace [%br%] and [%span%] tokens at build time
      return content
        .replace(/\[%br(\.[^\]]+)?%\]/g, (match, className) => {
          // Handle [%br%] or [%br.class-name%] tokens
          if (className) {
            const cleanClass = className.substring(1); // Remove the leading '.'
            return `<br class="${cleanClass}" aria-hidden="true">`;
          }
          return `<br aria-hidden="true">`;
        })
        .replace(
          /\[%span(\.[^\]]+)?%\](.*?)\[%span%\]/g,
          (match, className, innerContent) => {
            // Handle [%span%] or [%span.class-name%] tokens
            if (className) {
              const cleanClass = className.substring(1); // Remove the leading '.'
              return `<span class="${cleanClass}">${innerContent}</span>`;
            }
            return `<span>${innerContent}</span>`;
          }
        );
    }
    return content;
  });

  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};
