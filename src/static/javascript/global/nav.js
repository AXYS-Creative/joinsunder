import { mqMouse, mqMaxXxl, mqMaxMd } from "../utility.js";
import {
  isVideoPlayerOpen,
  closeVideoPlayer,
} from "../components/video-player.js";

export const siteNav = document.querySelector(".site-nav"),
  navBtn = document.querySelector(".nav-btn"),
  mainContent = document.querySelector(".main-content"),
  siteHeader = document.querySelector(".site-header");

const tabElementsPage = document.querySelectorAll(".tab-element-page"),
  tabElementsNav = document.querySelectorAll(".tab-element-nav");

tabElementsNav.forEach((elem) => elem.setAttribute("tabIndex", "-1"));

let isNavOpen = false;

// Update tabindex dynamically based on navigation state
const updateTabIndex = () => {
  const pageTabIndex = isNavOpen ? "-1" : "0";
  const navTabIndex = isNavOpen ? "0" : "-1";

  tabElementsPage.forEach((el) => el.setAttribute("tabindex", pageTabIndex));
  tabElementsNav.forEach((el) => el.setAttribute("tabindex", navTabIndex));
};

// Update aria-expanded and aria-label dynamically
const updateAriaExpanded = () => {
  if (isVideoPlayerOpen) {
    navBtn.setAttribute("aria-expanded", true);
    navBtn.setAttribute("aria-label", "Close video player");
  } else if (isNavOpen) {
    navBtn.setAttribute("aria-expanded", true);
    navBtn.setAttribute("aria-label", "Close navigation menu");
  } else {
    navBtn.setAttribute("aria-expanded", false);
    navBtn.setAttribute("aria-label", "Open navigation menu");
  }
};

// Handle nav button clicks
const handleNavBtnClick = () => {
  if (isVideoPlayerOpen) {
    // Close video player
    closeVideoPlayer();
    updateAriaExpanded();
    return;
  }

  // Toggle navigation state
  isNavOpen = !isNavOpen;

  siteNav.classList.toggle("site-nav--active", isNavOpen);
  siteHeader.classList.toggle("site-header--nav-active", isNavOpen);
  mainContent.classList.toggle("main-content--nav-active", isNavOpen);

  siteNav.setAttribute("aria-hidden", !isNavOpen);

  updateTabIndex();
  updateAriaExpanded();

  if (isNavOpen) {
    mainContent.addEventListener("click", closeNav);
  } else {
    mainContent.removeEventListener("click", closeNav);
  }
};

// Close navigation
const closeNav = () => {
  isNavOpen = false;

  siteNav.setAttribute("aria-hidden", "true");
  siteNav.classList.remove("site-nav--active");
  siteHeader.classList.remove("site-header--nav-active");
  mainContent.classList.remove("main-content--nav-active");

  updateTabIndex();
  updateAriaExpanded();

  mainContent.removeEventListener("click", closeNav);
};

// Attach event listeners
navBtn.addEventListener("click", handleNavBtnClick);

document.addEventListener("videoPlayerStateChange", updateAriaExpanded);

if (mqMouse && window.innerWidth < 2712) {
  const navSlider = document.querySelector(".nav-slider");
  let viewportWidth = window.innerWidth;
  let sliderWidth = navSlider.offsetWidth;

  const updateTranslateX = (mouseX) => {
    const viewportCenter = viewportWidth / 2;
    const mouseOffsetFromCenter = mouseX - viewportCenter;

    const translateX = -(
      (mouseOffsetFromCenter / viewportWidth) *
      (sliderWidth - viewportWidth)
    );

    navSlider.style.translate = `${translateX}px 0`;
  };

  navSlider.addEventListener("mousemove", (e) => {
    updateTranslateX(e.pageX);
  });

  window.addEventListener("resize", () => {
    viewportWidth = window.innerWidth;
    sliderWidth = navSlider.offsetWidth;
  });

  // Keyboard focus
  const navLinks = document.querySelectorAll(".nav-link");

  let currentTranslateX = 0;
  let offsetTweak = mqMaxMd ? "60vw" : mqMaxXxl ? "25vw" : "20vw"; // for six links

  navLinks.forEach((link) => {
    link.addEventListener("focus", () => {
      const linkRect = link.getBoundingClientRect();
      const sliderRect = navSlider.getBoundingClientRect();

      const linkOffsetInSlider = linkRect.left - sliderRect.left;

      const centerOffset = viewportWidth / 2 - link.offsetWidth / 2;
      const newTranslateX = -linkOffsetInSlider + centerOffset;

      const maxTranslateX = 0;
      const minTranslateX = -(sliderWidth - viewportWidth);
      const clampedTranslateX = Math.max(
        minTranslateX,
        Math.min(maxTranslateX, newTranslateX)
      );

      currentTranslateX = clampedTranslateX;
      navSlider.style.translate = `calc(${clampedTranslateX}px + ${offsetTweak}) 0`;
    });
  });
}
