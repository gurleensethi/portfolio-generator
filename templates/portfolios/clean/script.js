document.addEventListener("DOMContentLoaded", () => {
  const navigationToggle = document.getElementById("navigationToggle");
  const navigationMenu = document.getElementById("navigationMenu");
  navigationToggle.onclick = () => {
    navigationMenu.classList.toggle("navigation__menu--hidden");
  };
});
