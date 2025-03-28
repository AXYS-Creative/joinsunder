import { lenis } from "../util.js";

const siteHeader = document.querySelector(".site-header"),
  siteNav = document.querySelector(".site-nav"),
  siteNavBtn = document.querySelector(".site-nav-btn");

export const navLinks = document.querySelectorAll(".nav-link"),
  navFooterLinks = document.querySelectorAll(".nav-footer-link"),
  tabElementsPage = document.querySelectorAll(".tab-element-page"),
  tabElementsNav = document.querySelectorAll(".tab-element-nav"),
  activeNavLink = document.querySelector(".nav-link--active-page");

tabElementsNav.forEach((elem) => elem.setAttribute("tabIndex", "-1"));

const toggleNav = () => {
  const isNavOpen = siteNav.getAttribute("aria-hidden") === "true";

  siteHeader.classList.toggle("nav-active");

  siteNav.setAttribute("aria-hidden", !isNavOpen);
  siteNavBtn.setAttribute("aria-expanded", isNavOpen);
  siteNavBtn.setAttribute(
    "aria-label",
    isNavOpen ? "Close navigation menu" : "Open navigation menu"
  );

  // Update tabindex for tabElementsPage and tabElementsNav
  tabElementsPage.forEach((el) =>
    el.setAttribute("tabindex", isNavOpen ? "-1" : "0")
  );
  tabElementsNav.forEach((el) =>
    el.setAttribute("tabindex", isNavOpen ? "0" : "-1")
  );

  if (isNavOpen) {
    lenis.stop();
  } else {
    lenis.start();
  }
};

const closeNav = () => {
  siteNav.setAttribute("aria-hidden", "true");
  siteNavBtn.setAttribute("aria-expanded", "false");

  siteHeader.classList.remove("nav-active");

  // Reset tabindex for tabElementsPage and tabElementsNav
  tabElementsPage.forEach((el) => el.setAttribute("tabindex", "0"));
  tabElementsNav.forEach((el) => el.setAttribute("tabindex", "-1"));

  lenis.start();
};

// Close nav vs refresh for active page
activeNavLink?.addEventListener("click", (event) => {
  event.preventDefault();
  closeNav();
});

// // Close nav when clicking on any nav link (except those with prevent-nav-close class)
// [...navLinks, ...navFooterLinks].forEach((link) => {
//   if (!link.classList.contains("prevent-nav-close")) {
//     link.addEventListener("click", closeNav);
//   }
// });

siteNavBtn?.addEventListener("click", toggleNav);
