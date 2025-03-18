import { root, mqMouse } from "../util.js";

const carousel = document.querySelector(".carousel"),
  track = document.querySelector(".carousel__track"),
  trackInner = document.querySelector(".carousel__track-inner"),
  prevBtn = document.querySelector(".carousel-btn-prev"),
  nextBtn = document.querySelector(".carousel-btn-next"),
  progressBar = document.querySelector(".carousel__progress-bar");

const items = document.querySelectorAll(".carousel__track-item");

if (carousel) {
  const trackGap =
    parseFloat(getComputedStyle(root).getPropertyValue("--carousel-gap")) || 0;

  let currentIndex = 0;
  const itemCount = items.length;
  let autoplayInterval = null;

  // Get autoplay settings from data attributes
  const isAutoplayEnabled = carousel.classList.contains("autoplay");
  const autoplayDelay = parseInt(carousel.dataset.autoplayInterval) || 3200;

  // Check if we're at the end of scrollable content
  const isAtEnd = () => {
    const scrollWidth = track.scrollWidth;
    const clientWidth = track.clientWidth;
    const scrollLeft = track.scrollLeft;
    return Math.abs(scrollWidth - clientWidth - scrollLeft) <= 1;
  };

  // Check if we're at the beginning of scrollable content
  const isAtStart = () => {
    return track.scrollLeft <= 1;
  };

  // Update progress bar based on current position
  const updateProgressBar = () => {
    if (!progressBar) return;

    // Calculate progress percentage based on current index
    // If we have 5 items (0-4), then item 0 = 0%, item 4 = 100%
    const progress =
      itemCount <= 1 ? 100 : (currentIndex / (itemCount - 1)) * 100;

    // Update progress bar width
    progressBar.style.width = `${progress}%`;
  };

  // Update button states based on scroll position
  const updateButtonStates = () => {
    prevBtn.disabled = isAtStart();
    nextBtn.disabled = isAtEnd();
  };

  // Initialize button states and progress bar
  updateButtonStates();
  updateProgressBar();

  // Function to scroll to a specific item
  const scrollToItem = (index) => {
    if (index < 0) {
      index = 0;
    } else if (index >= itemCount) {
      index = itemCount - 1;
    }

    currentIndex = index;

    // Get the target item
    const targetItem = items[index];

    // Calculate the scroll position
    track.scrollTo({
      left: targetItem.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });

    // Update button states and progress bar after scrolling
    setTimeout(() => {
      updateButtonStates();
      updateProgressBar();
    }, 500);
  };

  // Function to advance to the next slide (for autoplay)
  const advanceToNextSlide = () => {
    if (isAtEnd()) {
      // If at the end, go back to the first slide
      currentIndex = 0;
      track.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      // Otherwise go to next slide
      scrollToItem(currentIndex + 1);
    }

    // Update progress bar
    updateProgressBar();
  };

  // Start autoplay
  const startAutoplay = () => {
    if (!isAutoplayEnabled) return;

    // Clear any existing interval first
    stopAutoplay();

    // Set new interval
    autoplayInterval = setInterval(advanceToNextSlide, autoplayDelay);
  };

  // Stop autoplay
  const stopAutoplay = () => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  };

  // Previous button click handler
  prevBtn.addEventListener("click", () => {
    scrollToItem(currentIndex - 1);
    // Restart autoplay after user interaction
    startAutoplay();
  });

  // Next button click handler
  nextBtn.addEventListener("click", () => {
    scrollToItem(currentIndex + 1);
    // Restart autoplay after user interaction
    startAutoplay();
  });

  // Scroll event handler with debounce
  let scrollTimeout;
  track.addEventListener("scroll", () => {
    // Clear the timeout on each scroll event
    clearTimeout(scrollTimeout);

    // Temporarily pause autoplay during manual scrolling
    stopAutoplay();

    scrollTimeout = setTimeout(() => {
      // Find which item is most visible
      const scrollPosition = track.scrollLeft;
      updateButtonStates();

      // Find the closest item
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
        // Update progress bar when the current index changes
        updateProgressBar();
      }

      // Restart autoplay after scrolling stops
      startAutoplay();
    }, 150);
  });

  // Also update progress during scroll for a more dynamic feel
  track.addEventListener(
    "scroll",
    () => {
      if (!progressBar) return;

      // Calculate progress based on scroll position
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) {
        progressBar.style.width = "100%";
        return;
      }

      const scrollPercentage = (track.scrollLeft / maxScroll) * 100;
      progressBar.style.width = `${scrollPercentage}%`;
    },
    { passive: true }
  );

  // Pause autoplay when user interacts with the carousel
  track.addEventListener("mouseenter", stopAutoplay);
  track.addEventListener("touchstart", stopAutoplay, { passive: true });

  // Resume autoplay when user stops interacting
  track.addEventListener("mouseleave", startAutoplay);
  track.addEventListener("touchend", startAutoplay);

  // Also listen for the scrollend event if available
  if ("onscrollend" in window) {
    track.addEventListener("scrollend", () => {
      updateButtonStates();
      updateProgressBar();
      startAutoplay();
    });
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    updateButtonStates();
    updateProgressBar();
    startAutoplay();
  });

  // Initialize autoplay if enabled
  if (isAutoplayEnabled) {
    // Start autoplay after a short delay to ensure everything is loaded
    setTimeout(startAutoplay, 100);
  }
}
