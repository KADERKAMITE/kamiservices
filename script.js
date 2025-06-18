document.addEventListener('DOMContentLoaded', function() {
    // 1. Sélection des éléments
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    // 2. Gestion du clic sur le bouton
    menuToggle.addEventListener('click', function() {
        toggleMenu();
    });
    
    // 3. Gestion du clic sur les liens
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Fonction pour basculer le menu
    function toggleMenu() {
        mainNav.classList.toggle('active');
        
        // Changement d'icône
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }
});
