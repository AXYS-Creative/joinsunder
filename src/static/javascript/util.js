export const mqMouse = window.matchMedia("(hover: hover) and (pointer: fine)");
export const mqMotionAllow = window.matchMedia(
  "(prefers-reduced-motion: no-preference)"
);
export const mqMaxLg = window.matchMedia("(max-width: 1024px)").matches;
export const mqMinLg = window.matchMedia("(min-width: 1025px)").matches;
export const mqMinMd = window.matchMedia("(min-width: 769px)").matches;

export const lenis = new Lenis({
  autoRaf: true,
});

// Detect Safari Browser
export const isSafari = () => {
  let ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("safari") !== -1 && ua.indexOf("chrome") === -1;
};
