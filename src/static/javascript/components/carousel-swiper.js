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
  // Hook up to CMS
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
});

// Remove role attribute from video toggle elements (invalid HTML)
document
  .querySelectorAll(".video-toggle")
  .forEach((el) => el.removeAttribute("role"));
