// Dynamically determine Reel height.
const adjustImageReelHeight = () => {
  const imageReel = document.querySelector(".collage"),
    reelColumn2 = document.querySelector(".collage__column-2");

  if (imageReel && reelColumn2) {
    imageReel.style.height = window.getComputedStyle(reelColumn2).height;
  }
};

window.addEventListener("load", () => {
  adjustImageReelHeight();

  window.addEventListener("resize", adjustImageReelHeight);
});
