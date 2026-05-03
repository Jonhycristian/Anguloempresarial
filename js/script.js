document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const overlay = document.getElementById('overlay');
    
    function toggleMenu() {
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            mobileMenuBtn.setAttribute('aria-label', 'Fechar menu');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-label', 'Abrir menu');
            document.body.style.overflow = '';
        }
    }
    
    mobileMenuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    document.querySelectorAll('#navMenu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate');
        const screenPosition = window.innerHeight / 1.3;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            if (elementPosition < screenPosition) {
                element.style.animationPlayState = 'running';
            }
        });
    };

    document.querySelectorAll('.animate').forEach(el => {
        el.style.animationPlayState = 'paused';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Dispara logo no carregamento inicial
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            const whatsappMessage = `Olá, Ângulo Consultoria! Me chamo ${name}.\n\nE-mail: ${email}\nTelefone: ${phone}\n\nMensagem:\n${message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/553198537266?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
            contactForm.reset();
        });
    }

    const whatsappBtn = document.querySelector('.whatsapp-btn');
    setInterval(() => {
        whatsappBtn.classList.remove('pulse');
        void whatsappBtn.offsetWidth; // Trigger reflow para reiniciar a animação
        whatsappBtn.classList.add('pulse');
    }, 4000);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});