const carousel = document.querySelector(".carousel"),
  track = document.querySelector(".carousel__track"),
  trackInner = document.querySelector(".carousel__track-inner"),
  prevBtn = document.querySelector(".carousel-btn-prev"),
  nextBtn = document.querySelector(".carousel-btn-next"),
  progressBar = document.querySelector(".carousel__progress-bar");

const items = document.querySelectorAll(".carousel__track-item");

if (carousel) {
  let currentIndex = 0;
  const itemCount = items.length;
  let autoplayInterval = null;

  const isAutoplayEnabled = carousel.classList.contains("autoplay");
  const autoplayDelay = parseInt(carousel.dataset.autoplayInterval) || 3200;

  const isAtEnd = () => {
    const scrollWidth = track.scrollWidth;
    const clientWidth = track.clientWidth;
    const scrollLeft = track.scrollLeft;
    return Math.abs(scrollWidth - clientWidth - scrollLeft) <= 1;
  };

  const isAtStart = () => {
    return track.scrollLeft <= 1;
  };

  const updateProgressBar = () => {
    if (!progressBar) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) {
      progressBar.style.width = "100%";
      return;
    }

    const scrollPercentage = (track.scrollLeft / maxScroll) * 100;
    progressBar.style.width = `${scrollPercentage}%`;
  };

  const updateButtonStates = () => {
    prevBtn.disabled = isAtStart();
    nextBtn.disabled = isAtEnd();
  };

  updateButtonStates();
  updateProgressBar();

  const scrollToItem = (index) => {
    if (index < 0) {
      index = 0;
    } else if (index >= itemCount) {
      index = itemCount - 1;
    }

    currentIndex = index;

    const targetItem = items[index];

    track.scrollTo({
      left: targetItem.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });

    setTimeout(() => {
      updateButtonStates();
      updateProgressBar();
    }, 500);
  };

  const advanceToNextSlide = () => {
    if (isAtEnd()) {
      currentIndex = 0;
      track.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      scrollToItem(currentIndex + 1);
    }

    updateProgressBar();
  };

  const startAutoplay = () => {
    if (!isAutoplayEnabled) return;

    stopAutoplay();

    autoplayInterval = setInterval(advanceToNextSlide, autoplayDelay);
  };

  const stopAutoplay = () => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  };

  prevBtn.addEventListener("click", () => {
    scrollToItem(currentIndex - 1);

    startAutoplay();
  });

  nextBtn.addEventListener("click", () => {
    scrollToItem(currentIndex + 1);

    startAutoplay();
  });

  let scrollTimeout;
  track.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);

    stopAutoplay();

    scrollTimeout = setTimeout(() => {
      const scrollPosition = track.scrollLeft;
      updateButtonStates();

      let closestIndex = 0;
      let closestDistance = Infinity;

      items.forEach((item, index) => {
        const distance = Math.abs(
          item.offsetLeft - track.offsetLeft - scrollPosition
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (currentIndex !== closestIndex) {
        currentIndex = closestIndex;

        updateProgressBar();
      }

      startAutoplay();
    }, 150);
  });

  track.addEventListener("mouseenter", stopAutoplay);
  track.addEventListener("touchstart", stopAutoplay, { passive: true });

  track.addEventListener("mouseleave", startAutoplay);
  track.addEventListener("touchend", startAutoplay);

  if ("onscrollend" in window) {
    track.addEventListener("scrollend", () => {
      updateButtonStates();
      updateProgressBar();
      startAutoplay();
    });
  }

  window.addEventListener("resize", () => {
    updateButtonStates();
    updateProgressBar();
    startAutoplay();
  });

  if (isAutoplayEnabled) {
    setTimeout(startAutoplay, 100);
  }
}
