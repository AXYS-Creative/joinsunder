const joinCarousel = document.querySelector(".join-carousel");
const joinCarouselImages = document.querySelectorAll(".join-carousel__img");

if (joinCarouselImages.length > 1) {
  let currentIndex = 0;
  let autoplayInterval =
    parseInt(joinCarousel.getAttribute("data-carousel-interval"), 10) || 5000;

  joinCarouselImages[currentIndex].classList.add("active");

  const updateSlides = () => {
    joinCarouselImages[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % joinCarouselImages.length;
    joinCarouselImages[currentIndex].classList.add("active");
  };

  setInterval(updateSlides, autoplayInterval);
} else if (joinCarouselImages.length === 1) {
  // Just show the single image
  joinCarouselImages[0].classList.add("active");
}
