document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const tabLinks = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");
  const imageContainer = document.getElementById("image-container");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  tabLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all links and tab contents
      tabLinks.forEach((link) => link.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked link and corresponding tab content
      link.classList.add("active");
      const tabId = link.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");

      // Show or hide the image container based on the active tab
      if (tabId === "about") {
        imageContainer.style.display = "block";
      } else {
        imageContainer.style.display = "none";
      }
    });
  });

  // Initial check to hide the image container if not on the about tab
  if (
    !document.querySelector(".tab-link.active").getAttribute("data-tab") ===
    "about"
  ) {
    imageContainer.style.display = "none";
  }
});
