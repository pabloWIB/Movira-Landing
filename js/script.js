// ===================================
// ANIMACIONES DE ENTRADA
// ===================================
function initializeAnimations() {
    // Configurar observer para animaciones en scroll
    const animationObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        },
        { threshold: 0.1 }
    );

    // Observar elementos con clase animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animationObserver.observe(el);
    });

    // Animación de loading de la página
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');

        // Stagger animation para elementos de navegación
        const navItems = document.querySelectorAll('.nav-link');
        navItems.forEach((item, index) => {
            item.style.animationDelay = `${0.1 + (index * 0.1)}s`;
        });

        // Inicializar animaciones del hero
        initializeHeroAnimations();
    });
}

// ===================================
// ANIMACIONES DEL HERO
// ===================================
function initializeHeroAnimations() {
    // Animación de contadores
    const counters = document.querySelectorAll('.metric-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Función de easing para una animación más suave
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(target * easeOutCubic);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(updateCounter);
    };

    // Observer para iniciar animación cuando el hero sea visible
    const heroObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach((counter, index) => {
                        setTimeout(() => {
                            animateCounter(counter);
                        }, index * 200); // Delay escalonado
                    });
                    heroObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // Scroll suave para el indicador
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('#servicios') || document.querySelector('section:nth-of-type(2)');
            if (nextSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = nextSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Efecto parallax sutil en las cards
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const cards = document.querySelectorAll('.floating-card');
        
        cards.forEach((card, index) => {
            const rate = scrolled * -0.1 * (index + 1);
            card.style.transform = `translateY(${rate}px)`;
        });
    }, 16));

    // Efecto de hover en las métricas
    const metricItems = document.querySelectorAll('.metric-item');
    metricItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efecto de pulso en los botones del hero
    const heroButtons = document.querySelectorAll('.hero-actions .btn-primary, .hero-actions .btn-secondary');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Crear efecto ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}// ===================================
// VARIABLES GLOBALES
// ===================================
let currentTheme = localStorage.getItem('theme') || 'light';

// Elementos DOM
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileClose = document.getElementById('mobileClose');

// Controles de tema
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const themeIcon = document.getElementById('themeIcon');
const mobileThemeIcon = document.getElementById('mobileThemeIcon');

// Links de navegación
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// ===================================
// INICIALIZACIÓN
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeScrollEffects();
    initializeMobileMenu();
    initializeAnimations();
});

// ===================================
// FUNCIONES DE TEMA
// ===================================
function initializeTheme() {
    // Aplicar tema guardado
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcons();
    
    // Event listeners para botones de tema
    themeToggle?.addEventListener('click', toggleTheme);
    mobileThemeToggle?.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Animación de transición suave
    document.documentElement.style.transition = 'all 0.3s ease';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Guardar preferencia
    localStorage.setItem('theme', currentTheme);
    
    // Actualizar iconos
    updateThemeIcons();
    
    // Remover transición después de completar
    setTimeout(() => {
        document.documentElement.style.transition = '';
    }, 300);
}

function updateThemeIcons() {
    const iconClass = currentTheme === 'light' ? 'fa-moon' : 'fa-sun';
    const altIconClass = currentTheme === 'light' ? 'fa-sun' : 'fa-moon';
    
    // Actualizar iconos con animación
    [themeIcon, mobileThemeIcon].forEach(icon => {
        if (icon) {
            icon.style.transform = 'rotate(180deg) scale(0)';
            setTimeout(() => {
                icon.className = `fas ${iconClass}`;
                icon.style.transform = 'rotate(0deg) scale(1)';
            }, 150);
        }
    });
}


// ===================================
// EFECTOS DE SCROLL
// ===================================
function initializeScrollEffects() {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        // Efecto de scroll en navbar
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Auto-hide navbar en scroll hacia abajo (móvil)
        if (window.innerWidth <= 768) {
            if (scrollY > lastScrollY && scrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
}

// ===================================
// NAVEGACIÓN Y LINKS ACTIVOS
// ===================================
function initializeNavigation() {
    // Manejar clicks en links de navegación
    [...navLinks, ...mobileNavLinks].forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Detectar sección activa en scroll
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(handleSectionObserver, {
        rootMargin: '-20% 0px -70% 0px'
    });
    
    sections.forEach(section => observer.observe(section));
}

function handleNavClick(event) {
    event.preventDefault();
    
    const targetId = event.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        // Cerrar menú móvil si está abierto
        closeMobileMenu();
        
        // Scroll suave a la sección
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Actualizar link activo
        updateActiveLink(targetId);
        
        // Efecto de pulso en el link clickeado
        event.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            event.target.style.transform = 'scale(1)';
        }, 100);
    }
}

function handleSectionObserver(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = '#' + entry.target.id;
            updateActiveLink(sectionId);
        }
    });
}

function updateActiveLink(activeId) {
    // Remover clase active de todos los links
    [...navLinks, ...mobileNavLinks].forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeId) {
            link.classList.add('active');
        }
    });
}

// ===================================
// MENÚ MÓVIL
// ===================================
function initializeMobileMenu() {
    // Event listeners para controles del menú móvil
    mobileMenuToggle?.addEventListener('click', toggleMobileMenu);
    mobileClose?.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay?.addEventListener('click', closeMobileMenu);
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Prevenir scroll del body cuando el menú está abierto
    const preventScroll = (e) => e.preventDefault();
    
    window.addEventListener('mobileMenuOpen', () => {
        document.body.style.overflow = 'hidden';
        document.addEventListener('touchmove', preventScroll, { passive: false });
    });
    
    window.addEventListener('mobileMenuClose', () => {
        document.body.style.overflow = '';
        document.removeEventListener('touchmove', preventScroll);
    });
}

function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('active');
    
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    // Animación de apertura
    mobileMenuToggle.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    mobileMenu.classList.add('active');
    
    // Disparar evento personalizado
    window.dispatchEvent(new CustomEvent('mobileMenuOpen'));
    
    // Animar elementos del menú
    const menuItems = mobileMenu.querySelectorAll('.mobile-nav-link');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 + (index * 50));
    });
}

function closeMobileMenu() {
    // Animación de cierre
    mobileMenuToggle.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    mobileMenu.classList.remove('active');
    
    // Disparar evento personalizado
    window.dispatchEvent(new CustomEvent('mobileMenuClose'));
    
    // Reset de animaciones
    const menuItems = mobileMenu.querySelectorAll('.mobile-nav-link');
    menuItems.forEach(item => {
        item.style.transition = '';
        item.style.opacity = '';
        item.style.transform = '';
    });
}

// ===================================
// ANIMACIONES DE ENTRADA
// ===================================
function initializeAnimations() {
    // Configurar observer para animaciones en scroll
    const animationObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        },
        { threshold: 0.1 }
    );
    
    // Observar elementos con clase animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animationObserver.observe(el);
    });
    
    // Animación de loading de la página
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Stagger animation para elementos de navegación
        const navItems = document.querySelectorAll('.nav-link');
        navItems.forEach((item, index) => {
            item.style.animationDelay = `${0.1 + (index * 0.1)}s`;
        });
    });
}

// ===================================
// UTILIDADES
// ===================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===================================
// MANEJO DE RESIZE
// ===================================
window.addEventListener('resize', debounce(() => {
    // Cerrar menú móvil en resize a desktop
    if (window.innerWidth > 768) {
        closeMobileMenu();
        navbar.style.transform = 'translateY(0)';
    }
}, 250));

// ===================================
// MANEJO DE ERRORES
// ===================================
window.addEventListener('error', (e) => {
    console.error('Error en navegación:', e.error);
});

// ===================================
// ACCESIBILIDAD
// ===================================
document.addEventListener('keydown', (e) => {
    // Navegación con teclado
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ===================================
// PERFORMANCE
// ===================================
// Usar requestIdleCallback si está disponible
const scheduleWork = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));

// Lazy load de funcionalidades no críticas
scheduleWork(() => {
    // Inicializar analytics, widgets, etc.
    console.log('🚀 EduTech Navigation System loaded successfully');
});