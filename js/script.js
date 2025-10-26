let hero_swiper;
let feat_swiper;

function initSwipers() {
  if (hero_swiper) hero_swiper.destroy(true, true);
  if (feat_swiper) feat_swiper.destroy(true, true);

  const isRTL = document.body.getAttribute("dir") === "rtl";
  const direction = isRTL ? "rtl" : "ltr";

  hero_swiper = new Swiper(".hero-swiper", {
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    rtl: isRTL,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  feat_swiper = new Swiper(".feat-swiper", {
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    rtl: isRTL,
  });

  document
    .getElementById("nav-left")
    ?.addEventListener("click", () => feat_swiper.slidePrev());
  document
    .getElementById("nav-right")
    ?.addEventListener("click", () => feat_swiper.slideNext());
}

// language translation
const langButtons = document.querySelectorAll(".lang-option");
const langDropdown = document.getElementById("languageDropdown");
const htmlEl = document.documentElement;

let currentLang = localStorage.getItem("lang") || "en";
loadLanguage(currentLang);

langButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedLang = btn.dataset.lang;
    localStorage.setItem("lang", selectedLang);
    loadLanguage(selectedLang);
  });
});

async function loadLanguage(lang) {
  try {
    const res = await fetch("./js/lang.json");
    const translations = await res.json();
    applyTranslations(translations[lang]);
    langDropdown.textContent = lang.toUpperCase();

    const isRTL = lang === "ar";
    document.body.setAttribute("dir", isRTL ? "rtl" : "ltr");
    htmlEl.setAttribute("lang", lang);

    initSwipers();
  } catch (err) {
    console.error("Error loading translations:", err);
  }
}

function applyTranslations(langData) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const text = getNestedValue(langData, key);
    if (text) el.textContent = text;
  });
}

function getNestedValue(obj, key) {
  return key.split(".").reduce((o, i) => (o ? o[i] : undefined), obj);
}

window.addEventListener("load", () => initSwipers());
