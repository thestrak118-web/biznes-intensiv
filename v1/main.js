/* ==========================================================================
   BIZNES INTENSIV — front-end logikasi
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};

  /* ---------- Telegram havolalari ---------- */
  document.querySelectorAll("[data-tg]").forEach(function (a) {
    a.href = CFG.TELEGRAM_URL || "#";
    if (CFG.TELEGRAM_URL) { a.target = "_blank"; a.rel = "noopener"; }
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Header fon ---------- */
  var header = document.getElementById("header");
  var onScroll = function () { header.classList.toggle("is-stuck", window.scrollY > 24); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Reveal ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll("[data-reveal]").forEach(function (el, i) {
    el.style.transitionDelay = (i % 4) * 60 + "ms";
    io.observe(el);
  });

  /* ---------- FAQ akkordeon ---------- */
  document.querySelectorAll(".faq__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement;
      var open = item.classList.contains("is-open");
      document.querySelectorAll(".faq__item").forEach(function (i) { i.classList.remove("is-open"); });
      if (!open) item.classList.add("is-open");
    });
  });

  /* ---------- Telefon maskasi (+998 XX XXX XX XX) ---------- */
  var phone = document.getElementById("phone");

  function formatPhone(value) {
    var d = value.replace(/\D/g, "");
    if (d.indexOf("998") === 0) d = d.slice(3);
    if (d.length && d[0] === "8" && value.trim()[0] !== "+") d = d.slice(1);
    d = d.slice(0, 9);
    var out = "+998";
    if (d.length) out += " " + d.slice(0, 2);
    if (d.length > 2) out += " " + d.slice(2, 5);
    if (d.length > 5) out += " " + d.slice(5, 7);
    if (d.length > 7) out += " " + d.slice(7, 9);
    return out;
  }

  phone.addEventListener("focus", function () { if (!phone.value) phone.value = "+998 "; });
  phone.addEventListener("input", function () { phone.value = formatPhone(phone.value); });
  phone.addEventListener("blur", function () { if (phone.value.replace(/\D/g, "").length <= 3) phone.value = ""; });

  /* ---------- Validatsiya ---------- */
  function setError(fieldId, on) {
    var f = document.getElementById(fieldId);
    f.classList.toggle("has-error", on);
    var input = f.querySelector(".input");
    if (input) input.classList.toggle("is-error", on);
  }

  function validate(data) {
    var ok = true;
    var badName = data.name.trim().length < 2;
    var badPhone = data.phone.replace(/\D/g, "").length !== 12;
    setError("f-name", badName);
    setError("f-phone", badPhone);
    setError("f-status", !data.status);
    setError("f-invest", !data.invest);
    if (badName || badPhone || !data.status || !data.invest) ok = false;
    if (!ok) {
      var first = document.querySelector(".field.has-error");
      if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return ok;
  }

  /* ---------- Yuborish: Google Sheets -> Telegram ekrani ---------- */
  var form = document.getElementById("reg-form");
  var btn = document.getElementById("submit-btn");
  var note = document.getElementById("form-note");
  var noteDefault = note.textContent;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var checked = function (n) {
      var el = form.querySelector('input[name="' + n + '"]:checked');
      return el ? el.value : "";
    };

    var data = {
      name: form.name.value,
      phone: phone.value,
      status: checked("status"),
      invest: checked("invest"),
      page: location.href,
      ref: document.referrer || "",
      ts: new Date().toISOString()
    };

    if (!validate(data)) return;

    btn.disabled = true;
    btn.textContent = "Yuborilmoqda…";
    note.textContent = noteDefault;
    note.style.color = "";

    send(data)
      .then(function () { showSuccess(); })
      .catch(function () {
        btn.disabled = false;
        btn.innerHTML = 'Intensivga ro\'yxatdan o\'tish <span class="btn__arrow">→</span>';
        note.textContent = "Yuborishda xatolik bo'ldi. Iltimos, qaytadan urinib ko'ring.";
        note.style.color = "#dc5a50";
      });
  });

  function send(data) {
    if (!CFG.SHEET_URL) {
      // Sheets hali ulanmagan — arizani yo'qotmaslik uchun brauzerda saqlaymiz
      try {
        var q = JSON.parse(localStorage.getItem("pending_leads") || "[]");
        q.push(data);
        localStorage.setItem("pending_leads", JSON.stringify(q));
      } catch (err) {}
      console.warn("SHEET_URL config.js da to'ldirilmagan — ariza faqat localStorage ga saqlandi.");
      return Promise.resolve();
    }

    // Apps Script CORS preflight ni yoqtirmaydi: text/plain bilan oddiy so'rov yuboramiz
    return fetch(CFG.SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    });
  }

  function showSuccess() {
    document.getElementById("form-view").style.display = "none";
    var s = document.getElementById("success-view");
    s.classList.add("is-visible");
    s.scrollIntoView({ behavior: "smooth", block: "start" });
    try { localStorage.setItem("registered", "1"); } catch (err) {}
  }
})();
