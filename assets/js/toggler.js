const navbarToggler = document.getElementById('navbar-toggler');
const navbarCollapse = document.getElementById('navbar-collapse');

navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('active');
});