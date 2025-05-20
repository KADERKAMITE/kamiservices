// Menu mobile
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const nav = document.getElementById('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Fermer le menu au clic sur un lien
document.querySelectorAll('#nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 100);
});

// Animation des services
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 500 + index * 100);
});

// Animation des partenaires
const partnerTrack = document.querySelector('.partner-track');

partnerTrack.addEventListener('mouseenter', () => {
    partnerTrack.style.animationPlayState = 'paused';
});

partnerTrack.addEventListener('mouseleave', () => {
    partnerTrack.style.animationPlayState = 'running';
});

// Duplication des logos pour un défilement infini
function duplicateLogos() {
    const logos = document.querySelectorAll('.partner-logo');
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        partnerTrack.appendChild(clone);
    });
}
duplicateLogos();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation générale au scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.destination-card, .team-member');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialisation des animations
document.querySelectorAll('.destination-card, .team-member').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);


// Formulaire de contact
// Initialisation EmailJS
emailjs.init("B4fGOWrgEK2SDYGSF").then(() => {
    console.log("EmailJS prêt");
}).catch(err => {
    console.error("Erreur init EmailJS:", err);
});

// Gestionnaire personnalisé
document.getElementById('custom-submit').addEventListener('click', async () => {
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('custom-submit');
    
    // Validation manuelle
    if (!form.from_name.value || !form.from_email.value || !form.message.value) {
        alert("Veuillez remplir les champs requis");
        return;
    }

    // UI Loading
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';

    try {
        // Envoi avec contrôle total
        const response = await emailjs.send(
            "service_t0s8pvs",
            "template_stswu7h",
            {
                from_name: form.from_name.value,
                from_email: form.from_email.value,
                from_tel: form.from_tel.value,
                message: form.message.value
            }
        );

        console.log("Réponse EmailJS:", response);
        alert("Message envoyé !");
        form.reset();
    } catch (error) {
        console.error("Erreur complète:", error);
        alert(`Échec d'envoi: ${error.text || "Erreur serveur"}`);
    } finally {
        btn.disabled = false;
        btn.innerHTML = 'Envoyer';
    }
});