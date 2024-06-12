document.addEventListener('DOMContentLoaded', () => {
  // Clear cache and local storage
  if ('caches' in window) {
    caches.keys().then(names => {
      for (let name of names) {
        caches.delete(name);
      }
    });
  }
  localStorage.clear();
  sessionStorage.clear();

  const menuToggle = document.querySelector('.menu-toggle');
  const fullscreenMenu = document.querySelector('.fullscreen-menu');
  const menuClose = document.querySelector('.menu-close');
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');
  const imageContainer = document.getElementById('image-container');
  const mainNav = document.querySelector('nav .menu');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');

  // Toggle fullscreen menu for small screens
  menuToggle.addEventListener('click', () => {
    fullscreenMenu.classList.toggle('show');
  });

  // Close fullscreen menu
  menuClose.addEventListener('click', () => {
    fullscreenMenu.classList.remove('show');
  });

  const adjustTabContentHeight = () => {
    const headerHeight = header.offsetHeight;
    const footerHeight = footer.offsetHeight;
    const availableHeight = window.innerHeight - headerHeight - footerHeight;

    tabContents.forEach(tabContent => {
      const tabId = tabContent.getAttribute('id');
      if (tabContent.classList.contains('active') && (tabId === 'skills' || tabId === 'education')) {
        tabContent.style.minHeight = `${availableHeight}px`;
      } else {
        tabContent.style.minHeight = 'auto';
      }
    });
  };

  // Handle tab switching
  tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove active class from all links and tab contents
      tabLinks.forEach(link => link.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked link and corresponding tab content
      link.classList.add('active');
      const tabId = link.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');

      // Show or hide the image container based on the active tab
      if (tabId === 'about') {
        imageContainer.style.display = 'block';
      } else {
        imageContainer.style.display = 'none';
      }

      // Hide the fullscreen menu after selecting an option
      fullscreenMenu.classList.remove('show');

      // Adjust the tab content height
      adjustTabContentHeight();
    });
  });

  // Initial check to hide the image container if not on the about tab
  if (document.querySelector('.tab-link.active').getAttribute('data-tab') !== 'about') {
    imageContainer.style.display = 'none';
  }

  // Ensure normal width navbar items work
  mainNav.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-link')) {
      e.preventDefault();

      // Remove active class from all links and tab contents
      tabLinks.forEach(link => link.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked link and corresponding tab content
      e.target.classList.add('active');
      const tabId = e.target.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');

      // Show or hide the image container based on the active tab
      if (tabId === 'about') {
        imageContainer.style.display = 'block';
      } else {
        imageContainer.style.display = 'none';
      }

      // Adjust the tab content height
      adjustTabContentHeight();
    }
  });

  // Adjust the tab content height on window resize
  window.addEventListener('resize', adjustTabContentHeight);

  // Initial adjustment of the tab content height
  adjustTabContentHeight();
});
