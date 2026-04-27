document.addEventListener("DOMContentLoaded", function () {
    let navLinks = document.querySelectorAll(".nav-link, .btn-primary");
    let sections = document.querySelectorAll("section");
    let navbar = document.querySelector(".navbar");

    if (!navbar || navLinks.length === 0 || sections.length === 0) return;

    function updateActiveLink() {
        let scrollPosition = window.scrollY + navbar.offsetHeight;

        // Si l'utilisateur est tout en haut, activer "ACCUEIL" et cacher la navbar
        if (window.scrollY === 0) {
            navLinks.forEach(nav => nav.classList.remove("nav-link-active"));
            let accueilLink = document.querySelector(`.nav-link[href="#accueil"], .btn[href="#accueil"]`);
            if (accueilLink) accueilLink.classList.add("nav-link-active");

            // Cacher la navbar quand on est dans la section "ACCUEIL"
            navbar.classList.add('hidden-navbar');
            return;
        } else {
            // Réafficher la navbar dès que l'on n'est plus sur la section "ACCUEIL"
            navbar.classList.remove('hidden-navbar');
        }

        sections.forEach(section => {
            let sectionTop = section.offsetTop;
            let sectionHeight = section.offsetHeight;
            let sectionBottom = sectionTop + sectionHeight;

            if (scrollPosition >= sectionTop - 10 && scrollPosition < sectionBottom - 10) {
                let id = section.getAttribute("id");
                let activeLink = document.querySelector(`.nav-link[href="#${id}"], .btn[href="#${id}"]`);
                
                navLinks.forEach(nav => nav.classList.remove("nav-link-active"));
                
                if (activeLink) {
                    activeLink.classList.add("nav-link-active");
                }
            }
        });

        // Activer la dernière section quand on atteint le bas de la page
        let lastSection = sections[sections.length - 1];
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
            navLinks.forEach(nav => nav.classList.remove("nav-link-active"));
            let lastLink = document.querySelector(`.nav-link[href="#${lastSection.id}"]`);
            if (lastLink) lastLink.classList.add("nav-link-active");
        }
    }

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            let targetId = this.getAttribute("href");
            if (targetId.startsWith("#")) {
                event.preventDefault();
                let targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Ajuster le défilement pour ne pas cacher la section sous la navbar
                    let headerHeight = navbar.offsetHeight;
                    let targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - (headerHeight / 2);
                    
                    // Appel à la fonction de défilement fluide
                    smoothScrollTo(targetPosition);
                }
            }
        });
    });

    // Fonction de défilement fluide
    function smoothScrollTo(to) {
        const startPosition = window.scrollY;
        const distance = to - startPosition;
        const duration = 500; // Durée du défilement en ms
        const startTime = performance.now();

        function scroll() {
            const elapsedTime = performance.now() - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeInOut = progress < 0.5
                ? 4 * progress * progress * progress
                : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;

            window.scrollTo(0, startPosition + distance * easeInOut);

            if (elapsedTime < duration) {
                requestAnimationFrame(scroll);
            }
        }

        requestAnimationFrame(scroll);
    }
});
