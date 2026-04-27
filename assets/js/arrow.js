document.addEventListener("DOMContentLoaded", () => {
    const arrow = document.getElementById("arrowhead-down");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        arrow.classList.add("hidden");
      } else {
        arrow.classList.remove("hidden");
      }
    });
  });