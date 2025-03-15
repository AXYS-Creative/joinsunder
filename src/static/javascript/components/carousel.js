import { root } from "../util.js";

const carousel = document.querySelector(".carousel"),
  trackInner = document.querySelector(".carousel__track-inner"),
  prevBtn = document.querySelector(".carousel-btn-prev"),
  nextBtn = document.querySelector(".carousel-btn-next");

const items = document.querySelectorAll(".carousel__track-item");

let currentIndex = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;
let translateX = 0;

if (carousel) {
  const autoplayClass = "autoplay";
  const autoplayEnabledByAdmin = carousel.classList.contains(autoplayClass);
  const autoplayIntervalTime =
    parseInt(carousel.dataset.autoplayInterval, 10) || 5000;
  let autoplayEnabled = autoplayEnabledByAdmin;
  let autoplayInterval;

  const updateCarousel = () => {
    const trackGap =
      parseFloat(getComputedStyle(root).getPropertyValue("--carousel-gap")) ||
      0;
    const itemWidth = items[0].offsetWidth + trackGap;
    const containerWidth =
      trackInner.parentElement.offsetWidth + trackGap * 1.5;
    const trackWidth = items.length * itemWidth;

    const maxTranslateX = Math.min(0, containerWidth - trackWidth);

    translateX = Math.max(-(currentIndex * itemWidth), maxTranslateX);
    trackInner.style.transition = "transform 0.3s ease-in-out";
    trackInner.style.transform = `translateX(${translateX}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = translateX === maxTranslateX;
  };

  nextBtn.addEventListener("click", () => {
    if (currentIndex < items.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
    resetAutoplay();
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = items.length - 1;
    }
    updateCarousel();
    resetAutoplay();
  });

  const startDrag = (event) => {
    isDragging = true;
    trackInner.style.transition = "none";
    startX = event.touches ? event.touches[0].clientX : event.clientX;
    stopAutoplay();
  };

  const onDrag = (event) => {
    if (!isDragging) return;
    currentX = event.touches ? event.touches[0].clientX : event.clientX;
    let movement = currentX - startX;
    trackInner.style.transform = `translateX(${translateX + movement}px)`;
  };

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;

    let movement = currentX - startX;
    const threshold = items[0].offsetWidth * 0.3;

    if (movement > threshold && currentIndex > 0) {
      currentIndex--;
    } else if (movement < -threshold && currentIndex < items.length - 1) {
      currentIndex++;
    }

    updateCarousel();
    resetAutoplay();
  };

  trackInner.addEventListener("mousedown", startDrag);
  trackInner.addEventListener("mousemove", onDrag);
  trackInner.addEventListener("mouseup", endDrag);
  trackInner.addEventListener("mouseleave", endDrag);

  trackInner.addEventListener("touchstart", startDrag);
  trackInner.addEventListener("touchmove", onDrag);
  trackInner.addEventListener("touchend", endDrag);

  // Autoplay Logic
  const startAutoplay = () => {
    if (!autoplayEnabled) return;
    stopAutoplay();
    autoplayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
    }, autoplayIntervalTime);
  };

  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
  };

  const resetAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  // Accessible Toggle Button Logic
  // This logic could be thrown in a buttons.js file? Reuse across different button--toggle components
  const autoplayToggle = document.querySelector(".carousel-autoplay-toggle"),
    autoplayToggleLabel = document.querySelector(
      ".carousel-autoplay-toggle__label"
    ).innerHTML,
    autoplayToggleLabelTrue = document
      .querySelector(".carousel-autoplay-toggle__switch")
      .getAttribute("data-label-true"),
    autoplayToggleLabelFalse = document
      .querySelector(".carousel-autoplay-toggle__switch")
      .getAttribute("data-label-false");

  // This logic could be thrown in a buttons.js file? Reuse across different button--toggle components
  if (autoplayToggle) {
    autoplayToggle.setAttribute("aria-pressed", autoplayEnabled.toString());

    autoplayToggle.addEventListener("click", () => {
      autoplayEnabled = !autoplayEnabled;
      autoplayToggle.setAttribute("aria-pressed", autoplayEnabled.toString());
      autoplayToggle.setAttribute(
        "aria-label",
        `${autoplayToggleLabel}${
          autoplayEnabled ? autoplayToggleLabelTrue : autoplayToggleLabelFalse
        }`
      );
      resetAutoplay();
    });
  }

  updateCarousel();
  startAutoplay();
}
