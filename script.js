// Scroll effect for navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
const form = document.getElementById('contato-form');
if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validação básica
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        if (!nome || !email || !mensagem) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido');
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        try {
            // Enviar dados para o PHP
            const response = await fetch('process_form.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    mensagem: mensagem
                })
            });

            const data = await response.json();

            if (data.success) {
                alert(data.message);
                form.reset();
            } else {
                throw new Error(data.message || 'Erro ao enviar mensagem');
            }
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            alert(error.message || 'Erro ao enviar mensagem. Por favor, tente novamente.');
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-fade-up, .animate-fade-left, .animate-fade-right, .animate-fade-scale').forEach(element => {
    observer.observe(element);
});

// Scroll animations for Sobre section
const sobreSection = document.querySelector('#sobre');
const sobreText = document.querySelector('.sobre-text');
const experiencia = document.querySelector('.experiencia');

const sobreObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add delay between animations
            setTimeout(() => {
                sobreText.classList.add('active');
            }, 200);
            
            setTimeout(() => {
                experiencia.classList.add('active');
            }, 400);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px'
});

if (sobreSection) {
    sobreObserver.observe(sobreSection);
}

// Scroll animations for Habilidades section
const habilidadesSection = document.querySelector('#habilidades');
const habilidadesTitle = document.querySelector('#habilidades .section-title');
const habilidadeCards = document.querySelectorAll('.habilidade-card');

const habilidadesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animar o título
            setTimeout(() => {
                habilidadesTitle.classList.add('active');
            }, 200);

            // Animar os cards sequencialmente
            habilidadeCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('active');
                }, 400 + (index * 100)); // 100ms de delay entre cada card
            });
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px'
});

if (habilidadesSection) {
    habilidadesObserver.observe(habilidadesSection);
}

// Mobile menu toggle
const hamburger = document.createElement('button');
hamburger.className = 'hamburger';
hamburger.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.navbar').appendChild(hamburger);

const navLinks = document.querySelector('.nav-links');
const menuOverlay = document.createElement('div');
menuOverlay.className = 'menu-overlay';
document.body.appendChild(menuOverlay);

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

menuOverlay.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Close menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .hamburger {
            display: block;
            background: none;
            border: none;
            color: var(--text-color);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }
        
        .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: var(--bg-color);
            padding: 1rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        .nav-links.active {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .nav-links li {
            text-align: center;
        }
    }
`;
document.head.appendChild(style); 