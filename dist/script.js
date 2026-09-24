(() => {
  "use strict";

  const noButton = document.querySelector("#no-button");
  const yesButton = document.querySelector("#yes-button");
  const question = document.querySelector(".question");
  const celebration = document.querySelector("#celebration");
  const tease = document.querySelector("#tease");
  const messages = [
    "Opa, esse botão é meio tímido...",
    "Acho que ele não concorda com você. 👀",
    "Ele fugiu de novo. Que coincidência!",
    "O ‘Sim’ continua ali, bem bonitinho. ♥",
    "Tá bom, eu admito: torço pelo sim.",
  ];
  let attempts = 0;
  let lastEscape = -Infinity;

  function overlaps(a, b, margin = 0) {
    return a.x < b.right + margin && a.right > b.left - margin &&
      a.y < b.bottom + margin && a.bottom > b.top - margin;
  }

  function escape(event) {
    if (event?.cancelable) event.preventDefault();
    if (question.hidden) return;
    const now = performance.now();
    if (now - lastEscape < 90) return;
    lastEscape = now;

    const rect = noButton.getBoundingClientRect();
    const safe = yesButton.getBoundingClientRect();
    const viewport = window.visualViewport;
    const left = (viewport?.offsetLeft || 0) + 14;
    const top = (viewport?.offsetTop || 0) + 14;
    const maxX = Math.max(left, left + (viewport?.width || innerWidth) - rect.width - 28);
    const maxY = Math.max(top, top + (viewport?.height || innerHeight) - rect.height - 28);
    const pointerX = Number.isFinite(event?.clientX) ? event.clientX : rect.x + rect.width / 2;
    const pointerY = Number.isFinite(event?.clientY) ? event.clientY : rect.y + rect.height / 2;
    const candidates = [];

    for (let i = 0; i < 36; i++) {
      const x = left + Math.random() * (maxX - left);
      const y = top + Math.random() * (maxY - top);
      candidates.push({ x, y });
    }
    // The corners guarantee alternatives even when random points are close.
    candidates.push({ x: left, y: top }, { x: maxX, y: top }, { x: left, y: maxY }, { x: maxX, y: maxY });

    const ranked = candidates.map(({ x, y }) => {
      const candidate = { x, y, right: x + rect.width, bottom: y + rect.height };
      const distance = Math.hypot(x + rect.width / 2 - pointerX, y + rect.height / 2 - pointerY);
      const moved = Math.hypot(x - rect.x, y - rect.y);
      return { x, y, score: distance + moved * .3 - (overlaps(candidate, safe, 20) ? 100000 : 0) };
    }).sort((a, b) => b.score - a.score);

    // Choose from the best locations so the escape stays unpredictable.
    const options = ranked.filter(point => point.score >= ranked[0].score * .8);
    const destination = options[Math.floor(Math.random() * options.length)] || ranked[0];
    noButton.classList.add("is-running");
    noButton.style.left = `${destination.x}px`;
    noButton.style.top = `${destination.y}px`;
    tease.textContent = messages[Math.min(attempts++, messages.length - 1)];
  }

  noButton.addEventListener("pointerenter", event => {
    if (event.pointerType !== "touch") escape(event);
  });
  noButton.addEventListener("pointerdown", escape);
  noButton.addEventListener("click", escape);
  noButton.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") escape(event);
  });
  noButton.addEventListener("dragstart", event => event.preventDefault());

  function resetPosition() {
    noButton.classList.remove("is-running");
    noButton.style.removeProperty("left");
    noButton.style.removeProperty("top");
  }
  window.addEventListener("resize", resetPosition);
  window.visualViewport?.addEventListener("resize", resetPosition);
  window.visualViewport?.addEventListener("scroll", resetPosition);

  function youtubeDestination(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value.trim());
      const allowedHosts = ["youtube.com", "www.youtube.com", "m.youtube.com", "music.youtube.com", "youtu.be"];
      return url.protocol === "https:" && allowedHosts.includes(url.hostname) && !url.username && !url.password ? url.href : null;
    } catch {
      return null;
    }
  }

  yesButton.addEventListener("click", () => {
    const destination = youtubeDestination(window.ISABELA_CONFIG?.youtubeUrl);
    if (destination) {
      window.location.assign(destination);
      return;
    }
    question.hidden = true;
    celebration.hidden = false;
    document.querySelector("#celebration-title").focus({ preventScroll: true });
  });
})();
