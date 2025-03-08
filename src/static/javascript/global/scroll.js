// Global - Animate when scrolling away from the top of the page (also restore when scrolling up)
let siteHeader = document.querySelector(".site-header");
let lastScrollY = 0;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  let awayFromTop = currentScrollY > 24;
  let nearBottom = currentScrollY + windowHeight >= documentHeight - 128; // Adjust threshold as needed
  let scrollingDown = currentScrollY > lastScrollY;

  // if (awayFromTop) {
  //   siteHeader.classList.add("away-from-top");
  // } else {
  //   siteHeader.classList.remove("away-from-top");
  // }

  if (awayFromTop && scrollingDown) {
    siteHeader.classList.add("scrolling-down");
  } else {
    siteHeader.classList.remove("scrolling-down");
  }

  if (nearBottom) {
    siteHeader.classList.add("near-bottom");
  } else {
    siteHeader.classList.remove("near-bottom");
  }

  lastScrollY = currentScrollY;
});
