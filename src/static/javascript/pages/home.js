import { mqMinMd } from "../util.js";

const externalPanel = document.querySelector(".sunder-external"),
  internalPanel = document.querySelector(".sunder-internal");

if (document.querySelector(".main-home") && mqMinMd) {
  const externalLink = externalPanel.querySelector(".cta-1");
  const externalUrl = externalLink.getAttribute("href");
  const externalUrlTarget = externalLink.getAttribute("target");

  const internalLink = internalPanel.querySelector(".cta-1");
  const internalUrl = internalLink.getAttribute("href");
  const internalUrlTarget = internalLink.getAttribute("target");

  externalPanel.addEventListener("click", (e) => {
    if (e.target.closest(".cta-1")) return; // prevent duplicate open if button is clicked directly

    if (externalUrlTarget === "_blank") {
      window.open(externalUrl, "_blank");
    } else {
      window.location.href = externalUrl;
    }
  });

  internalPanel.addEventListener("click", (e) => {
    if (e.target.closest(".cta-1")) return;

    if (internalUrlTarget === "_blank") {
      window.open(internalUrl, "_blank");
    } else {
      window.location.href = internalUrl;
    }
  });
}
