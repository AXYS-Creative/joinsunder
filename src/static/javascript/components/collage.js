// Dynamically determine Reel height based on screen size
const adjustImageReelHeight = () => {
  const imageReel = document.querySelector(".collage");
  const isMobile = window.matchMedia("(max-width: 1024px)").matches;
  const targetColumn = document.querySelector(
    isMobile ? ".collage__column-mobile-2" : ".collage__column-2"
  );

  if (imageReel && targetColumn) {
    imageReel.style.height = window.getComputedStyle(targetColumn).height;
  }
};

// Set up media query listener
const mq = window.matchMedia("(max-width: 1024px)");

const handleBreakpointChange = () => {
  adjustImageReelHeight();
};

mq.addEventListener("change", handleBreakpointChange);

// Initial load and resize listener
window.addEventListener("load", () => {
  adjustImageReelHeight();
  window.addEventListener("resize", adjustImageReelHeight);
});
