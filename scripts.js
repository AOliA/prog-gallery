document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetTab = event.target.getAttribute('data-tab');

            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            tabLinks.forEach(link => {
                link.classList.remove('active');
            });

            document.getElementById(targetTab).classList.add('active');
            event.target.classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('show');
    });
});

