const toggler = document.getElementById("menuToggler");
const navMenu = document.getElementById("navMenu");
toggler.addEventListener("click", () => {
  navMenu.classList.toggle("toggle");
  toggler.classList.toggle("rotate");
});


