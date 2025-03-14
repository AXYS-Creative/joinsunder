// Cubic Bézier easing function (for cross-browser compatible animations)
export const cubicBezier = (p1x, p1y, p2x, p2y) => {
  // Example: const ease = cubicBezier(0.09, 0.9, 0.5, 1);
  return function (t) {
    t = Math.max(0, Math.min(1, t));

    const t2 = t * t;
    const t3 = t2 * t;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;

    const x = 3 * mt2 * t * p1x + 3 * mt * t2 * p2x + t3;
    const y = 3 * mt2 * t * p1y + 3 * mt * t2 * p2y + t3;

    return y;
  };
};

// GSAP
{
  gsap.registerPlugin(ScrollTrigger);

  let responsiveGsap = gsap.matchMedia();

  responsiveGsap.add(
    {
      maxSm: "(max-width: 480px)",
      maxMd: "(max-width: 768px)",
      maxLg: "(max-width: 1024px)",
      maxXl: "(max-width: 1200px)",
      minMd: "(min-width: 769px)",
      minLg: "(min-width: 1025px)",
    },
    (context) => {
      let { maxSm, maxMd, maxLg, maxXl, minMd, minLg } = context.conditions;

      let navyMarkers = {
        startColor: "navy",
        endColor: "navy",
        indent: 128,
      };
      let redMarkers = {
        startColor: "crimson",
        endColor: "crimson",
        indent: 256,
      };

      // // TEMPLATE TWEEN - SCRUB
      // gsap.fromTo(
      //   ".slider__inner",
      //   { x: "-2%" },
      //   {
      //     x: maxSm ? "-32%" : maxLg ? "-32%" : "-32%",
      //     scrollTrigger: {
      //       trigger: ".slider",
      //       start: "top bottom",
      //       end: maxSm ? "bottom 75%" : "bottom top",
      //       scrub: 0.8,
      //       // markers: true,
      //     },
      //   }
      // );

      // GLOBAL - Animate any element with the class 'gsap-animate' using the 'animate' companion class
      {
        const targetElements = document.querySelectorAll(".gsap-animate");

        targetElements.forEach((targetElem) => {
          gsap.to(targetElem, {
            scrollTrigger: {
              trigger: targetElem,
              start: "top 98%",
              end: "bottom top",
              onEnter: () => targetElem.classList.add("animate"),
              onLeave: () => targetElem.classList.remove("animate"),
              onEnterBack: () => targetElem.classList.add("animate"),
              onLeaveBack: () => targetElem.classList.remove("animate"),
            },
          });
        });
      }

      // Page - Sunder Way
      {
        // Ethos Section
        if (document.querySelector(".section-ethos") && minLg) {
          const pinDuration = "+=200%";
          let bodyPadding = maxXl ? 64 : 96;

          // Pinning Ethos Section
          gsap.to(".ethos-pin", {
            scrollTrigger: {
              trigger: ".ethos-pin",
              start: `top ${bodyPadding}px`,
              end: pinDuration,
              pin: true,
              // markers: true,
            },
          });

          // Step animation (Image cycle and panel reveal)
          {
            const steps = document.querySelectorAll(
              ".ethos-pin-step-1, .ethos-pin-step-2, .ethos-pin-step-3"
            );
            const panels = document.querySelectorAll(
              ".value-panel-1, .value-panel-2, .value-panel-3"
            );
            const images = document.querySelectorAll(
              ".ethos-img-2, .ethos-img-3, .ethos-img-4"
            );

            steps.forEach((step, index) => {
              const panel = panels[index];
              const image = images[index];

              gsap.to(panel, {
                scrollTrigger: {
                  trigger: step,
                  start: `top ${bodyPadding}px`,
                  end: `bottom top`,
                  onEnter: () => panel.classList.add("active"),
                  onLeaveBack: () => panel.classList.remove("active"),
                },
              });

              gsap.to(image, {
                scrollTrigger: {
                  trigger: step,
                  start: `top ${bodyPadding}px`,
                  end: `bottom top`,
                  onEnter: () => image.classList.add("active"),
                  onLeaveBack: () => image.classList.remove("active"),
                },
              });
            });
          }
        }
      }

      // Library - Lift any desired code blocks out, then delete from production
      {
        // Parallax
        {
          const parallaxConfigs = [
            { selector: ".parallax", y: "15%", scrub: 1 },
            { selector: ".parallax--strong", y: "25%", scrub: 1 },
            { selector: ".parallax--reverse", y: "-25%", scrub: 0.25 },
          ];

          parallaxConfigs.forEach(({ selector, y, scrub }) => {
            document.querySelectorAll(selector).forEach((el) => {
              gsap.to(el, {
                y,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub,
                },
              });
            });
          });
        }

        // Fill Text - Scrub only
        {
          // Use 'fill-text' for default, then 'quick-fill' or 'slow-fill' to modify animation end
          const fillText = document.querySelectorAll(".fill-text");

          if (fillText) {
            fillText.forEach((el) => {
              let end = "bottom 60%";

              // Modifier classes –— Higher percentage ends the animation faster
              if (el.classList.contains("quick-fill")) {
                end = "bottom 80%";
              } else if (el.classList.contains("slow-fill")) {
                end = "bottom 40%";
              }

              gsap.fromTo(
                el,
                {
                  backgroundSize: "0%",
                },
                {
                  backgroundSize: "100%",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    end: end,
                    scrub: 1,
                  },
                }
              );
            });
          }
        }

        // Horizontal Scroll (pinned section)
        {
          const horizontalScroll =
            document.querySelectorAll(".horizontal-scroll");

          horizontalScroll.forEach((el) => {
            let container = el.querySelector(".container");
            let slider = el.querySelector(".slider");
            const sliderWidth = slider.scrollWidth;
            const containerWidth = container.offsetWidth;
            const distanceToTranslate = sliderWidth - containerWidth;

            let duration = maxSm ? "+=150%" : "+=200%";

            // Actual Pinning
            gsap.to(el, {
              scrollTrigger: {
                trigger: el,
                start: "top top",
                end: duration,
                pin: true,
              },
            });

            // Slider Along X-Axis
            gsap.fromTo(
              slider,
              { x: 0 },
              {
                x: () => -distanceToTranslate,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top top",
                  end: duration,
                  scrub: maxSm ? 1 : 0.5,
                },
              }
            );
          });
        }

        // Marquee Animations
        {
          let marqueeSpeed = maxSm ? 20 : maxMd ? 24 : 28;

          // Standard Marquee
          {
            const autoMarquees = gsap.utils.toArray(".marquee-inner");
            let marqueeTweens = [];

            const createMarqueeTweens = () => {
              marqueeTweens.forEach((tween) => tween.kill()); // Kill previous tweens to prevent stacking memory
              marqueeTweens = [];

              autoMarquees.forEach((elem) => {
                const tween = gsap
                  .to(elem, {
                    xPercent: -50,
                    repeat: -1,
                    duration: marqueeSpeed,
                    ease: "linear",
                  })
                  .totalProgress(0.5);

                marqueeTweens.push(tween);
              });
            };

            createMarqueeTweens();

            let currentScroll = window.scrollY;

            const adjustTimeScale = () => {
              const isScrollingDown = window.scrollY > currentScroll;

              marqueeTweens.forEach((tween, index) =>
                gsap.to(tween, {
                  timeScale: (index % 2 === 0) === isScrollingDown ? 1 : -1,
                  duration: 0.3,
                  ease: "power2.out",
                })
              );

              currentScroll = window.scrollY;
            };

            window.addEventListener("scroll", adjustTimeScale, {
              passive: true,
            });
          }

          // Scrub Effect for Specific Marquees
          {
            const scrubMarquees = gsap.utils.toArray(".marquee--scrub");
            const sensitivity = 5;
            let scrubTriggers = [];

            const createScrubMarquees = () => {
              scrubTriggers.forEach((trigger) => trigger.kill());
              scrubTriggers = [];

              scrubMarquees.forEach((scrubElem) => {
                const marqueeInners =
                  scrubElem.querySelectorAll(".marquee-inner");

                marqueeInners.forEach((inner, index) => {
                  const scrubTween = gsap.fromTo(
                    inner,
                    { x: index % 2 === 0 ? "0%" : `-${sensitivity}%` },
                    {
                      x: index % 2 === 0 ? `-${sensitivity}%` : "0%",
                      scrollTrigger: {
                        trigger: scrubElem,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                        invalidateOnRefresh: true,
                      },
                    }
                  );

                  scrubTriggers.push(scrubTween.scrollTrigger);
                });
              });
            };

            createScrubMarquees();
          }
        }
      }
    }
  );

  // Refresh ScrollTrigger instances on page load and resize
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });

  // Greater than 520 so it doesn't refresh on  mobile(dvh)
  if (window.innerWidth > 520) {
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });
  }
}
