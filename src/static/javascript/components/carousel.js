document.querySelectorAll(".carousel").forEach((carousel) => {
  const track = carousel.querySelector(".carousel__track");
  const trackInner = carousel.querySelector(".carousel__track-inner");
  const prevBtn = carousel.querySelector(".carousel-btn-prev");
  const nextBtn = carousel.querySelector(".carousel-btn-next");
  const progressBar = carousel.querySelector(".carousel__progress-bar");
  const items = carousel.querySelectorAll(".carousel__track-item");

  if (!track || !items.length) return;

  let currentIndex = 0;
  const itemCount = items.length;
  let autoplayInterval = null;

  const isAutoplayEnabled = carousel.classList.contains("autoplay");
  const autoplayDelay = parseInt(carousel.dataset.autoplayInterval) || 3200;

  const getClosestIndex = () => {
    const scrollPosition = track.scrollLeft;
    let closestIndex = 0;
    let closestDistance = Infinity;

    items.forEach((item, index) => {
      const distance = Math.abs(item.offsetLeft - scrollPosition);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  };

  currentIndex = getClosestIndex();

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
    if (prevBtn) prevBtn.disabled = isAtStart();
    if (nextBtn) nextBtn.disabled = isAtEnd();
  };

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

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      scrollToItem(currentIndex - 1);
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      scrollToItem(currentIndex + 1);
      startAutoplay();
    });
  }

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
    currentIndex = getClosestIndex();
    updateButtonStates();
    updateProgressBar();
    startAutoplay();
  });

  // Initial state
  updateButtonStates();
  updateProgressBar();

  if (isAutoplayEnabled) {
    setTimeout(startAutoplay, 100);
  }
});
