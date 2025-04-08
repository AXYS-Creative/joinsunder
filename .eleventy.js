const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");
const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = async function (eleventyConfig) {
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

  // Dynamic image formatting to work with CMS (Doesn't work within partials )
  const imageShortcodeFn = async function (options = {}) {
    const {
      src,
      alt = "",
      className = "",
      optimize = true,
      loading = "lazy",
      sizes = "100vw", // Required to use loading="eager" and maintain transform
      widths = [320, 640, 1280, 1920],
      formats = ["avif", "webp", "jpeg"],
    } = options;

    const outputDir = "./src/static/images/";
    const urlPath = "/static/images/";
    const cacheDir = ".cache/eleventy-img";

    const fullSrcPath = path.join("src", src.replace(/^\//, ""));

    if (!optimize) {
      return `<img src="${src}" alt="${alt}" loading="${loading}" decoding="async"${
        className ? ` class="${className}"` : ""
      }>`;
    }

    try {
      const metadata = await Image(fullSrcPath, {
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
        loading,
        decoding: "async",
        sizes,
        class: className,
      });
    } catch (err) {
      console.warn(
        `⚠️ eleventy-img failed for ${src}, using raw <img>.`,
        err.message
      );
      return `<img src="${src}" alt="${alt}" loading="${loading}" decoding="async"${
        className ? ` class="${className}"` : ""
      }>`;
    }
  };

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcodeFn);

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
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
