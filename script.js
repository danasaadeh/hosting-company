const hero_swiper = new Swiper(".hero-swiper", {
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  spaceBetween: 20,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const feat_swiper = new Swiper(".feat-swiper", {
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  spaceBetween: 20,
});

document
  .getElementById("nav-left")
  .addEventListener("click", () => feat_swiper.slidePrev());
document
  .getElementById("nav-right")
  .addEventListener("click", () => feat_swiper.slideNext());
