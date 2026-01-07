// Contador de visitas con animación mejorada
function actualizarContador() {
    let visitas = localStorage.getItem('contadorVisitas');
    
    if (visitas === null) {
        visitas = 0;
    }
    
    visitas = parseInt(visitas) + 1;
    localStorage.setItem('contadorVisitas', visitas);
    
    console.log('Visitas totales:', visitas);
}

// Animación de aparición con Intersection Observer
function animarElementos() {
    const elementos = document.querySelectorAll('.materia-card, .about-content, .feature-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elementos.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(50px)';
        elemento.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(elemento);
    });
}

// Efecto de partículas mejorado
function crearParticulas() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'white';
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5;
        particle.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
        particlesContainer.appendChild(particle);
    }
}

// Animación de twinkle para partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.5); }
    }
`;
document.head.appendChild(style);

// Efecto 3D en tarjetas (tilt effect)
function cardTiltEffect() {
    const cards = document.querySelectorAll('.materia-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Cambiar colores de las tarjetas dinámicamente
function aplicarColoresDinamicos() {
    const cards = document.querySelectorAll('.materia-card');
    
    cards.forEach(card => {
        const color = card.getAttribute('data-color');
        if (color) {
            card.addEventListener('mouseenter', () => {
                card.style.borderColor = color;
                card.querySelector('.card-icon').style.background = color;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.borderColor = '';
                card.querySelector('.card-icon').style.background = '';
            });
        }
    });
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    actualizarContador();
    animarElementos();
    crearParticulas();
    cardTiltEffect();
    aplicarColoresDinamicos();
});

// Smooth scroll mejorado para toda la página
document.documentElement.style.scrollBehavior = 'smooth';
