//
// Growth Keyboard Tabbing
//

const growthLinks = document.querySelectorAll(".growth-link");
const growthMarkers = document.querySelectorAll(".growth-pin-step");

growthLinks.forEach((link, index) => {
  link.addEventListener("focus", () => {
    growthMarkers[index].scrollIntoView();
  });

  link.addEventListener("click", (event) => {
    event.preventDefault();
    growthMarkers[index].scrollIntoView();
  });
});
