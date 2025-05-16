let pageLoaded = false;
let timerDone = false;
const loadDuration = 0; // Optional min-duration
const siteLoader = document.querySelector(".site-loader");

if (siteLoader) {
  const attemptCompleteLoading = () => {
    if (pageLoaded && timerDone) {
      siteLoader?.classList.add("load-complete");
      siteLoader?.setAttribute("aria-hidden", "true");
    }
  };

  window.addEventListener("load", () => {
    pageLoaded = true;
    attemptCompleteLoading();
  });

  setTimeout(() => {
    timerDone = true;
    attemptCompleteLoading();
  }, loadDuration);
}

// Attempt to fix issue with content loading when visiting page e.g. video overlay shows briefly
if (document.querySelectorAll(".hide-load")) {
  setTimeout(() => {
    document.querySelectorAll(".hide-load").forEach((el) => {
      el.classList.remove("hide-load");
    });
  }, 500);
}
