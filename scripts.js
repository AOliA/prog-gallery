document.addEventListener("DOMContentLoaded", () => {
  // Clear cache and local storage
  if ("caches" in window) {
    caches.keys().then((names) => {
      for (let name of names) {
        caches.delete(name);
      }
    });
  }
  localStorage.clear();
  sessionStorage.clear();

  const menuToggle = document.querySelector(".menu-toggle");
  const fullscreenMenu = document.querySelector(".fullscreen-menu");
  const menuClose = document.querySelector(".menu-close");
  const tabLinks = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");
  const imageContainer = document.getElementById("image-container");
  const mainNav = document.querySelector("nav .menu");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  const adjustTabContentHeight = () => {
    const headerHeight = header?.offsetHeight || 0;
    const footerHeight = footer?.offsetHeight || 0;
    const availableHeight = window.innerHeight - headerHeight - footerHeight;

    tabContents.forEach((tabContent) => {
      const tabId = tabContent.getAttribute("id");
      if (
        tabContent.classList.contains("active") &&
        (tabId === "skills"/* || tabId === "education"*/)
      ) {
        tabContent.style.minHeight = "auto";
      } else {
        tabContent.style.minHeight = "auto";
      }
    });
  };

  const switchTab = (tabId) => {
    tabId = tabId == "logo" ? "about" : tabId;
    // Remove active class from all links and tab contents
    tabLinks.forEach((link) => link.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to the clicked link and corresponding tab content
    document
      .querySelector(`.tab-link[data-tab="${tabId}"]`)
      ?.classList.add("active");
    document.getElementById(tabId)?.classList.add("active");

    // Show or hide the image container based on the active tab
    if (tabId === "about") {
      imageContainer.style.display = "block";
    } else {
      imageContainer.style.display = "none";
    }

    // Adjust the tab content height
    adjustTabContentHeight();
  };

  // Toggle fullscreen menu for small screens
  menuToggle?.addEventListener("click", () => {
    fullscreenMenu?.classList.toggle("show");
  });

  // Close fullscreen menu
  menuClose?.addEventListener("click", () => {
    fullscreenMenu?.classList.remove("show");
  });

  // Handle tab switching
  tabLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const tabId = link.getAttribute("data-tab");
      switchTab(tabId);
      fullscreenMenu?.classList.remove("show"); // Hide the fullscreen menu after selection
    });
  });

  // Ensure normal-width navbar items work
  mainNav?.addEventListener("click", (e) => {
    if (e.target.classList.contains("tab-link")) {
      e.preventDefault();
      const tabId = e.target.getAttribute("data-tab");
      switchTab(tabId);
    }
  });

  // Adjust the tab content height on window resize
  window.addEventListener("resize", adjustTabContentHeight);

  // Initial setup
  const activeTabId = document
    .querySelector(".tab-link.active")
    ?.getAttribute("data-tab");
  if (activeTabId !== "about") {
    imageContainer.style.display = "none";
  }
  adjustTabContentHeight();

  function showDetails() {
    alert("Click to see more details about this project.");
  }
});
