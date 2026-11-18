/* Machinus · small progressive enhancements. Every page works without this file. */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Remember the chosen language, so the English home does not send a Spanish browser back to /es/. */
  document.querySelectorAll("[data-lang]").forEach(function (a) {
    a.addEventListener("click", function () {
      try { localStorage.setItem("machinus-lang", a.getAttribute("data-lang")); } catch (e) { /* storage blocked */ }
    });
  });

  /* Reveal on scroll: elements already on screen are shown at once, so nothing blinks. */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (reveals.length && "IntersectionObserver" in window && !reduceMotion) {
    var vh = window.innerHeight || 800;
    reveals.forEach(function (el) {
      if (el.getBoundingClientRect().top < vh * 0.95) el.classList.add("is-in");
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { if (!el.classList.contains("is-in")) io.observe(el); });
    root.classList.add("reveal-ready");
  }

  /* Trailer: a big play button over the poster; native controls once it plays. */
  document.querySelectorAll(".video").forEach(function (box) {
    var video = box.querySelector("video");
    var button = box.querySelector(".video__play");
    if (!video || !button) return;
    box.classList.add("has-js");
    video.removeAttribute("controls");
    button.addEventListener("click", function () {
      box.classList.add("is-playing");
      video.setAttribute("controls", "");
      var p = video.play();
      if (p && p.catch) p.catch(function () { /* the user can press play in the native controls */ });
      video.focus();
    });
    video.addEventListener("play", function () { box.classList.add("is-playing"); video.setAttribute("controls", ""); });
  });

  /* Gallery lightbox with <dialog>. Without it, each link simply opens the full image. */
  var dialog = document.querySelector(".lightbox");
  var links = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
  if (dialog && typeof dialog.showModal === "function" && links.length) {
    var img = dialog.querySelector("img");
    var caption = dialog.querySelector("figcaption");
    var index = 0;
    var show = function (i) {
      index = (i + links.length) % links.length;
      var a = links[index];
      var thumb = a.querySelector("img");
      img.src = a.getAttribute("href");
      img.alt = thumb ? thumb.alt : "";
      caption.textContent = a.getAttribute("data-caption") || "";
    };
    links.forEach(function (a, i) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        show(i);
        dialog.showModal();
      });
    });
    dialog.querySelector("[data-prev]").addEventListener("click", function () { show(index - 1); });
    dialog.querySelector("[data-next]").addEventListener("click", function () { show(index + 1); });
    dialog.querySelector("[data-close]").addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1); }
    });
  }
})();
