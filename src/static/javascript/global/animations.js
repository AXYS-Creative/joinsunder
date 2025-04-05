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
  console.log("ScrollTrigger initialized at", performance.now());

  gsap.registerPlugin(ScrollTrigger);

  let responsiveGsap = gsap.matchMedia();

  responsiveGsap.add(
    {
      maxSm: "(max-width: 480px)",
      maxMd: "(max-width: 768px)",
      maxLg: "(max-width: 1024px)",
      maxXxl: "(max-width: 1512px)",
      maxXl: "(max-width: 1200px)",
      minMd: "(min-width: 769px)",
      minLg: "(min-width: 1025px)",
      noMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      let { maxSm, maxMd, maxLg, maxXl, maxXxl, minMd, minLg, noMotion } =
        context.conditions;

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

      let bodyPaddingSm = 12;
      let bodyPadding = 24;
      let bodyPaddingDouble = bodyPadding * 2;

      // Page - Sunder Way
      {
        // Ethos Section (Desktop)
        if (document.querySelector(".section-ethos") && minLg) {
          const pinDuration = "+=160%";
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

          // Ethos Bottom slide in
          let ethosBottom = document.querySelector(".ethos-bottom");
          gsap.to(ethosBottom, {
            scrollTrigger: {
              trigger: ethosBottom,
              start: "bottom bottom",
              onEnter: () => ethosBottom.classList.add("active"),
              onLeaveBack: () => ethosBottom.classList.remove("active"),
            },
          });
        }

        // Competitions Section (YOG)
        if (document.querySelector(".section-competitions")) {
          // Fade YOG logo
          gsap.to(".yog-logo", {
            opacity: 0,
            scrollTrigger: {
              trigger: ".yog",
              start: "85% 90%",
              end: "85% 40%",
              scrub: 0,
            },
          });
        }

        // Experience Section (Collage)
        if (document.querySelector(".collage")) {
          const yVal = maxMd ? "-16.15%" : maxXxl ? "-16.225%" : "-16.2%";
          const yValMobile = "-24%";

          const collageSlide = (el, distance) => {
            const element = document.querySelector(el);
            if (element) {
              gsap.to(el, {
                y: distance,
                ease: "none",
                scrollTrigger: {
                  trigger: ".collage",
                  start: maxSm ? "-48px 10%" : "top top",
                  end: "98% bottom",
                  scrub: 1,
                  // markers: true,
                },
              });
            }
          };

          collageSlide(".collage__column-1", yVal);
          collageSlide(".collage__column-3", yVal);
          collageSlide(".collage__column-mobile-1", yValMobile);
        }
      }

      // Page - About
      {
        // Values Section (Hero)
        if (document.querySelector(".section-values")) {
          // LG and above
          if (minLg) {
            const pinDuration = "+=120%"; // Request down from 200%
            let bodyPadding = maxXl ? 64 : 96;

            // Pinning Values Section
            gsap.to(".values-pin", {
              scrollTrigger: {
                trigger: ".values-pin",
                start: `top ${bodyPadding}px`,
                end: pinDuration,
                pin: true,
              },
            });

            // Values step three (shifting content while showing text)
            {
              let shiftOffset = 20;

              // Fading in values text (step 3)
              gsap.fromTo(
                ".section-values__text",
                {
                  x: `-${shiftOffset}vw`,
                  opacity: 0,
                },
                {
                  x: 0,
                  opacity: 1,
                  scrollTrigger: {
                    trigger: ".values-pin-step-9", // Change the step to alter sequence
                    start: `top ${bodyPadding}px`,
                    end: `bottom ${bodyPadding}px`,
                    scrub: 0.5,
                  },
                }
              );

              // Pushing SVG aside (step 3)
              gsap.fromTo(
                ".section-values__figure",
                {
                  marginLeft: 0, // don't use x value, struggles with css translate
                },
                {
                  marginLeft: `${shiftOffset}vw`,
                  scrollTrigger: {
                    trigger: ".values-pin-step-9", // Change the step to alter sequence
                    start: `top ${bodyPadding}px`,
                    end: `bottom ${bodyPadding}px`,
                    scrub: 1,
                  },
                }
              );
            }
          }

          // Mobile
          if (maxLg) {
            let mobileSpacer = document.querySelector(".mobile-spacer");
            let smDuration = mobileSpacer.offsetHeight; // Duration controled by html element's height, search 'valuePinSm'

            // Mobile — Pin for values svg
            gsap.to(".section-values__figure", {
              scrollTrigger: {
                trigger: ".section-values__figure",
                start: `center center`,
                end: `+=${smDuration}`,
                pin: true,
              },
            });
          }

          // All viewports — Values step two (fading each word and frame)
          {
            let scrubValue = 0.5;

            // Fading in each word (step 2)
            for (let i = 1; i <= 6; i++) {
              gsap.fromTo(
                `.word-${i}`,
                { opacity: 0 },
                {
                  opacity: 1,
                  scrollTrigger: {
                    trigger: `.values-pin-step-${i}`,
                    start: "top top",
                    end: "250% 10%",
                    scrub: scrubValue,
                  },
                }
              );
            }

            // Fading in SVG frame (step 2)
            gsap.fromTo(
              ".values-svg__frame",
              {
                opacity: 0,
              },
              {
                opacity: 1,
                scrollTrigger: {
                  trigger: ".values-pin-step-8",
                  start: `-75% ${bodyPadding}px`,
                  end: "600% 25%",
                  scrub: scrubValue,
                },
              }
            );
          }
        }

        // Mission Section
        if (document.querySelector(".section-mission")) {
          const pinDuration = "+=120%"; // Request down from 250%

          // Pinning Mission Section
          gsap.to(".mission-pin", {
            scrollTrigger: {
              trigger: ".mission-pin",
              start: `top ${bodyPaddingSm}px`,
              end: pinDuration,
              pin: true,
            },
          });

          // Text/Line Animations
          {
            const missionLines = document.querySelectorAll(
              ".mission-title__line"
            );
            missionLines.forEach((line, index) => {
              gsap.fromTo(
                line,
                { y: 64, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  scrollTrigger: {
                    trigger: `.mission-pin-step-${index + 1}`,
                    start: `top ${bodyPaddingSm}px`,
                    end: `bottom ${bodyPaddingSm}px`,
                    scrub: 0.25,
                  },
                }
              );
            });
          }

          // Ripple Animations
          {
            const ripples = document.querySelectorAll(".mission-ripple");

            ripples.forEach((ripple, index) => {
              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: `.mission-pin-step-${(index + 1) * 2 - 1}`, // Adjust trigger dynamically
                    start: `top ${bodyPaddingSm}px`,
                    end: "+=80%", // Overlap ripples here. Adjusted from 120%
                    // end: `bottom ${bodyPaddingSm}px`,
                    scrub: 0.25,
                  },
                })
                .fromTo(
                  ripple,
                  { scale: 1, opacity: 0 },
                  { scale: 2, opacity: 1, ease: "none" }
                )
                .to(ripple, { scale: 2.5, opacity: 0, ease: "none" });
            });
          }
        }

        // Growth History (USA map)
        if (document.querySelector(".section-growth")) {
          const pinDuration = "+=320%"; // Request down from 400%
          const pinDurationExtended = "+=480%"; // Request down from 480%
          const growthPinSteps = document.querySelectorAll(".growth-pin-step");
          const startPoint = `${bodyPaddingDouble / 4} top`;
          const endPoint = `bottom top`;

          // Pinning the Growth Section
          {
            gsap.to(".growth-pin", {
              scrollTrigger: {
                trigger: ".growth-pin",
                start: "top top",
                end: pinDuration,
                pin: true,
              },
            });
          }

          // // Fading in USA Map
          // {
          //   gsap.fromTo(
          //     ".growth-map__map",
          //     {
          //       opacity: 0,
          //       y: "-50%",
          //     },
          //     {
          //       opacity: 1,
          //       y: "0%",
          //       scrollTrigger: {
          //         trigger: ".growth-pin",
          //         start: "-70% top",
          //         end: "top top",
          //         scrub: 0,
          //       },
          //     }
          //   );
          // }

          // Display Growth Elements
          {
            const fadeElements = [
              ".growth-title",
              ".growth-links",
              ".growth-counter",
              ".growth-key",
            ];

            fadeElements.forEach((selector) => {
              const element = document.querySelector(selector);

              ScrollTrigger.create({
                trigger: ".growth-pin",
                start: "top top",
                end: pinDurationExtended,
                toggleClass: { targets: element, className: "show-item" },
              });
            });
          }

          // Growth Link Highlight
          {
            const growthLinks = document.querySelectorAll(".growth-link");

            growthPinSteps.forEach((marker, index) => {
              const link = growthLinks[index];

              ScrollTrigger.create({
                trigger: marker,
                start: startPoint,
                end: endPoint,
                onEnter: () => link.classList.add("active"),
                onEnterBack: () => link.classList.add("active"),
                onLeave: () => link.classList.remove("active"),
                onLeaveBack: () => link.classList.remove("active"),
                // markers: whiteMarkers,
              });
            });
          }

          // Number Ticker Animation
          {
            const numberCounter = document.querySelector(".number-counter");

            growthPinSteps.forEach((marker, index) => {
              const targetValue = marker.getAttribute("data-counter-value");

              const isFirstMarker = index === 0;

              ScrollTrigger.create({
                trigger: marker,
                start: startPoint,
                end: endPoint,
                scrub: true,
                onEnter: () => updateCounter(numberCounter, targetValue),
                onEnterBack: () => updateCounter(numberCounter, targetValue),
                onLeaveBack: () => {
                  if (isFirstMarker) updateCounter(numberCounter, "00");
                },
              });
            });

            const updateCounter = (counter, value) => {
              const digits = [...value.padStart(2, "0")].map(Number); // Ensure "07" is always [0, 7]
              const digitElements = counter.querySelectorAll(".digit");

              digits.forEach((digitValue, index) => {
                const sequence =
                  digitElements[index]?.querySelector(".sequence");

                gsap.to(sequence, {
                  y: `-${digitValue * 10}%`,
                  duration: noMotion ? 0 : 0.5,
                  ease: "ease",
                });
              });
            };
          }

          // State highlight
          {
            const highlightGroups = [
              {
                elements: document.querySelectorAll(".state-2019"),
                trigger: ".growth-pin-step-1",
                start: startPoint,
                end: pinDurationExtended,
                toggleClass: "active",
                // markers: true,
              },
              {
                elements: document.querySelectorAll(".pending-2019"),
                trigger: ".growth-pin-step-1",
                start: startPoint,
                end: endPoint,
                toggleClass: "active-pending",
                // markers: redMarkers,
              },
              {
                elements: document.querySelectorAll(".pending-2019"),
                trigger: ".growth-pin-step-2",
                start: startPoint,
                end: pinDurationExtended,
                toggleClass: "active",
                // markers: navyMarkers,
              },
              {
                elements: document.querySelectorAll(".pending-2020"),
                trigger: ".growth-pin-step-2",
                start: startPoint,
                end: endPoint,
                toggleClass: "active-pending",
                markers: false,
              },
              {
                elements: document.querySelectorAll(".pending-2020"),
                trigger: ".growth-pin-step-3",
                start: startPoint,
                end: pinDurationExtended,
                toggleClass: "active",
                markers: false,
              },
              {
                elements: document.querySelectorAll(".pending-2021"),
                trigger: ".growth-pin-step-3",
                start: startPoint,
                end: endPoint,
                toggleClass: "active-pending",
                markers: false,
              },
              {
                elements: document.querySelectorAll(".pending-2021"),
                trigger: ".growth-pin-step-4",
                start: startPoint,
                end: pinDurationExtended,
                toggleClass: "active",
                markers: false,
              },
              {
                elements: document.querySelectorAll(".pending-2022"),
                trigger: ".growth-pin-step-4",
                start: startPoint,
                end: endPoint,
                toggleClass: "active-pending",
                markers: false,
              },
              {
                elements: document.querySelectorAll(".pending-2022"),
                trigger: ".growth-pin-step-5",
                start: startPoint,
                end: pinDurationExtended,
                toggleClass: "active",
                markers: false,
              },
              {
                elements: document.querySelectorAll(".pending-2023"),
                trigger: ".growth-pin-step-5",
                start: startPoint,
                end: endPoint,
                toggleClass: "active-pending",
                markers: false,
              },
              {
                elements: document.querySelectorAll(".pending-2023"),
                trigger: ".growth-pin-step-6",
                start: startPoint,
                end: pinDurationExtended,
                toggleClass: "active",
                markers: false,
              },
            ];

            highlightGroups.forEach(
              ({ elements, trigger, start, end, toggleClass, markers }) => {
                elements.forEach((element) => {
                  ScrollTrigger.create({
                    trigger,
                    start,
                    end,
                    toggleClass: { targets: element, className: toggleClass },
                    markers: markers,
                  });
                });
              }
            );
          }
        }

        // Timeline Section
        if (document.querySelector(".section-timeline") && minLg) {
          const pinDuration = "+=250%";

          // For line and event fade
          let startValue = "top center";
          let endValue = "10% center";

          // Pinning Mission Section
          gsap.to(".timeline-pin", {
            scrollTrigger: {
              trigger: ".timeline-pin",
              start: `center center`,
              end: pinDuration,
              pin: true,
              ease: "none",
              // markers: navyMarkers,
            },
          });

          // Showing line (issue starts at 97%... end value below)
          gsap.fromTo(
            ".timeline__bar",
            {
              opacity: 0,
            },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: ".timeline-pin-step-2",
                start: startValue,
              },
            }
          );

          // Drawing line
          {
            const timelineSteps = [
              { step: 2, from: "0%", to: "2.5%" },
              { step: 3, from: "2.5%", to: "21.5%" },
              { step: 4, from: "21.5%", to: "40.5%" },
              { step: 5, from: "40.5%", to: "59%" },
              { step: 6, from: "59%", to: "78%" },
              { step: 7, from: "78%", to: "97%" },
              { step: 8, from: "97%", to: "100%" },
            ];

            gsap.set(".timeline__bar", { width: "0%" });

            timelineSteps.forEach(({ step, from, to }, index) => {
              gsap.fromTo(
                ".timeline__bar",
                { width: from },
                {
                  width: to,
                  ease: "none",
                  scrollTrigger: {
                    trigger: `.timeline-pin-step-${step}`,
                    start: startValue, // Individual selection e.g. index === 0 ? "center center" : "50% center"
                    end: endValue,
                    scrub: 0.75,
                    snap: 0.5,
                    // markers: true, // First couple of steps e.g. step <= 4,
                  },
                }
              );
            });
          }

          // Showing years
          {
            const timelineEvents = [
              { trigger: ".timeline-pin-step-2", target: ".timeline__event-1" },
              { trigger: ".timeline-pin-step-3", target: ".timeline__event-2" },
              { trigger: ".timeline-pin-step-4", target: ".timeline__event-3" },
              { trigger: ".timeline-pin-step-5", target: ".timeline__event-4" },
              { trigger: ".timeline-pin-step-6", target: ".timeline__event-5" },
              { trigger: ".timeline-pin-step-7", target: ".timeline__event-6" },
            ];

            timelineEvents.forEach(({ trigger, target }) => {
              gsap.fromTo(
                target,
                { opacity: 0 },
                {
                  opacity: 1,
                  scrollTrigger: {
                    trigger: trigger,
                    start: startValue,
                    end: endValue,
                    scrub: 0.75,
                    // markers: navyMarkers,
                  },
                }
              );
            });
          }
        }
      }

      // GLOBAL (place under other tweens i.e. pinned sections) - Animate any element with the class 'gsap-animate' using the 'animate' companion class
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
              // markers: navyMarkers,
            },
          });
        });
      }

      // // Library - Lift any desired code blocks out, then delete from production
      // {
      //   // Parallax
      //   {
      //     const parallaxConfigs = [
      //       { selector: ".parallax", y: "15%", scrub: 1 },
      //       { selector: ".parallax--strong", y: "25%", scrub: 1 },
      //       { selector: ".parallax--reverse", y: "-25%", scrub: 0.25 },
      //     ];

      //     parallaxConfigs.forEach(({ selector, y, scrub }) => {
      //       document.querySelectorAll(selector).forEach((el) => {
      //         gsap.to(el, {
      //           y,
      //           ease: "none",
      //           scrollTrigger: {
      //             trigger: el,
      //             start: "top bottom",
      //             end: "bottom top",
      //             scrub,
      //           },
      //         });
      //       });
      //     });
      //   }

      //   // Fill Text - Scrub only
      //   {
      //     // Use 'fill-text' for default, then 'quick-fill' or 'slow-fill' to modify animation end
      //     const fillText = document.querySelectorAll(".fill-text");

      //     if (fillText) {
      //       fillText.forEach((el) => {
      //         let end = "bottom 60%";

      //         // Modifier classes –— Higher percentage ends the animation faster
      //         if (el.classList.contains("quick-fill")) {
      //           end = "bottom 80%";
      //         } else if (el.classList.contains("slow-fill")) {
      //           end = "bottom 40%";
      //         }

      //         gsap.fromTo(
      //           el,
      //           {
      //             backgroundSize: "0%",
      //           },
      //           {
      //             backgroundSize: "100%",
      //             scrollTrigger: {
      //               trigger: el,
      //               start: "top 90%",
      //               end: end,
      //               scrub: 1,
      //             },
      //           }
      //         );
      //       });
      //     }
      //   }

      //   // Horizontal Scroll (pinned section)
      //   {
      //     const horizontalScroll =
      //       document.querySelectorAll(".horizontal-scroll");

      //     horizontalScroll.forEach((el) => {
      //       let container = el.querySelector(".container");
      //       let slider = el.querySelector(".slider");
      //       const sliderWidth = slider.scrollWidth;
      //       const containerWidth = container.offsetWidth;
      //       const distanceToTranslate = sliderWidth - containerWidth;

      //       let duration = maxSm ? "+=150%" : "+=200%";

      //       // Actual Pinning
      //       gsap.to(el, {
      //         scrollTrigger: {
      //           trigger: el,
      //           start: "top top",
      //           end: duration,
      //           pin: true,
      //         },
      //       });

      //       // Slider Along X-Axis
      //       gsap.fromTo(
      //         slider,
      //         { x: 0 },
      //         {
      //           x: () => -distanceToTranslate,
      //           ease: "none",
      //           scrollTrigger: {
      //             trigger: el,
      //             start: "top top",
      //             end: duration,
      //             scrub: maxSm ? 1 : 0.5,
      //           },
      //         }
      //       );
      //     });
      //   }

      //   // Marquee Animations
      //   {
      //     let marqueeSpeed = maxSm ? 20 : maxMd ? 24 : 28;

      //     // Standard Marquee
      //     {
      //       const autoMarquees = gsap.utils.toArray(".marquee-inner");
      //       let marqueeTweens = [];

      //       const createMarqueeTweens = () => {
      //         marqueeTweens.forEach((tween) => tween.kill()); // Kill previous tweens to prevent stacking memory
      //         marqueeTweens = [];

      //         autoMarquees.forEach((elem) => {
      //           const tween = gsap
      //             .to(elem, {
      //               xPercent: -50,
      //               repeat: -1,
      //               duration: marqueeSpeed,
      //               ease: "linear",
      //             })
      //             .totalProgress(0.5);

      //           marqueeTweens.push(tween);
      //         });
      //       };

      //       createMarqueeTweens();

      //       let currentScroll = window.scrollY;

      //       const adjustTimeScale = () => {
      //         const isScrollingDown = window.scrollY > currentScroll;

      //         marqueeTweens.forEach((tween, index) =>
      //           gsap.to(tween, {
      //             timeScale: (index % 2 === 0) === isScrollingDown ? 1 : -1,
      //             duration: 0.3,
      //             ease: "power2.out",
      //           })
      //         );

      //         currentScroll = window.scrollY;
      //       };

      //       window.addEventListener("scroll", adjustTimeScale, {
      //         passive: true,
      //       });
      //     }

      //     // Scrub Effect for Specific Marquees
      //     {
      //       const scrubMarquees = gsap.utils.toArray(".marquee--scrub");
      //       const sensitivity = 5;
      //       let scrubTriggers = [];

      //       const createScrubMarquees = () => {
      //         scrubTriggers.forEach((trigger) => trigger.kill());
      //         scrubTriggers = [];

      //         scrubMarquees.forEach((scrubElem) => {
      //           const marqueeInners =
      //             scrubElem.querySelectorAll(".marquee-inner");

      //           marqueeInners.forEach((inner, index) => {
      //             const scrubTween = gsap.fromTo(
      //               inner,
      //               { x: index % 2 === 0 ? "0%" : `-${sensitivity}%` },
      //               {
      //                 x: index % 2 === 0 ? `-${sensitivity}%` : "0%",
      //                 scrollTrigger: {
      //                   trigger: scrubElem,
      //                   start: "top bottom",
      //                   end: "bottom top",
      //                   scrub: 1,
      //                   invalidateOnRefresh: true,
      //                 },
      //               }
      //             );

      //             scrubTriggers.push(scrubTween.scrollTrigger);
      //           });
      //         });
      //       };

      //       createScrubMarquees();
      //     }
      //   }
      // }
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
