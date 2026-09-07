(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};

  /* Barcha CTA tugmalari -> Telegram */
  document.querySelectorAll("[data-tg]").forEach(function (a) {
    a.href = CFG.TELEGRAM_URL || "#";
    if (CFG.TELEGRAM_URL) { a.target = "_blank"; a.rel = "noopener"; }
  });

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* Akkordeon */
  document.querySelectorAll(".acc__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement;
      var open = item.classList.contains("is-open");
      document.querySelectorAll(".acc__item").forEach(function (i) { i.classList.remove("is-open"); });
      if (!open) item.classList.add("is-open");
    });
  });

  /* Scroll animatsiya */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll("[data-r]").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll("[data-r]").forEach(function (el) { el.classList.add("in"); });
  }
})();
