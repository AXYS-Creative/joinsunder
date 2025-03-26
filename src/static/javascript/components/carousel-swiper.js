let page;

if (document.querySelector(".main-operation-sunder-serves")) {
  page = "pageOss";
}

if (document.querySelector(".main-sunder-way")) {
  page = "pageSunderWay";
}

let swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  spaceBetween: 16,
  loop: false,
  cssMode: true,
  breakpoints: {
    1024: {
      slidesPerView: page === "pageSunderWay" ? 3 : 4,
    },
  },
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: true,
  // },
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // on: {
  //   slideChangeTransitionStart: function () {
  //     if (swiper.autoplay.running) {
  //       swiper.autoplay.stop();
  //       swiper.autoplay.start();
  //     }
  //   },
  // },
  // on: {
  //   init: function () {
  //     const progressbar = document.querySelector(
  //       ".swiper-pagination-progressbar-fill"
  //     );
  //     if (progressbar) {
  //       progressbar.style.transform = "scaleX(0)";
  //       progressbar.style.transformOrigin = "left";
  //     }
  //   },
  // },
});
