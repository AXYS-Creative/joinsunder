import { mqMinMd } from "../util.js";

const externalPanel = document.querySelector(".sunder-external"),
  internalPanel = document.querySelector(".sunder-internal");

if (document.querySelector(".main-home") && mqMinMd) {
  console.log("mouse baby");

  const externalUrl = externalPanel
    .querySelector(".sunder-external .cta-1")
    .getAttribute("href");

  const internalUrl = internalPanel
    .querySelector(".sunder-internal .cta-1")
    .getAttribute("href");

  externalPanel.addEventListener("click", () => {
    window.location.href = externalUrl;
  });

  internalPanel.addEventListener("click", () => {
    window.location.href = internalUrl;
  });
}
