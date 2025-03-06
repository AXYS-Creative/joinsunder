const joinCarousel = document.querySelector(".join-carousel");
const joinCarouselImages = document.querySelectorAll(".join-carousel__img");
let currentIndex = 1;

if (joinCarousel) {
  let autoplayInterval = parseInt(
    joinCarousel.getAttribute("data-carousel-interval"),
    10
  );

  if (joinCarouselImages.length > 0) {
    joinCarouselImages[0].classList.add("active");
  }

  const updateSlides = () => {
    joinCarouselImages.forEach((slide) => slide.classList.remove("active"));

    joinCarouselImages[currentIndex].classList.add("active");

    currentIndex = (currentIndex + 1) % joinCarouselImages.length;
  };

  setInterval(updateSlides, autoplayInterval);
}
