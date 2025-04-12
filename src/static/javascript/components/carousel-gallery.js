document.querySelectorAll(".carousel-gallery").forEach((carousel) => {
  const images = carousel.querySelectorAll(".carousel-gallery__img");

  if (images.length > 1) {
    let currentIndex = 0;
    const interval =
      parseInt(carousel.getAttribute("data-carousel-interval"), 10) || 5000;

    images[currentIndex].classList.add("active");

    const updateSlides = () => {
      images[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add("active");
    };

    setInterval(updateSlides, interval);
  } else if (images.length === 1) {
    images[0].classList.add("active");
  }
});
