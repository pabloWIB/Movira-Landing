let year = document.getElementById('year');
let currentYear = new Date().getFullYear();

year.textContent = currentYear;

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

        // Inicializar animaciones del about
        initializeAboutAnimations();

        // Inicializar footer
        initializeFooter();
    });
}

// ===================================
// FUNCIONALIDAD DEL FOOTER
// ===================================
function initializeFooter() {
    // Manejo del formulario de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('.newsletter-input');
            const submitButton = this.querySelector('.newsletter-button');
            const email = emailInput.value.trim();

            if (email && isValidEmail(email)) {
                // Simular envío exitoso
                const originalText = submitButton.textContent;
                submitButton.textContent = '¡Suscrito!';
                submitButton.style.background = '#10b981';
                emailInput.value = '';

                // Mostrar notificación temporal
                showNotification('¡Gracias por suscribirte! Te mantendremos al día.', 'success');

                // Restaurar estado original después de 3 segundos
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                }, 3000);
            } else {
                showNotification('Por favor, ingresa un email válido.', 'error');
            }
        });
    }

    // Efectos de hover en redes sociales
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Scroll suave para enlaces del footer
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animación de aparición del footer
    const footerObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const footerSections = entry.target.querySelectorAll('.footer-brand, .footer-section, .footer-contact');
                    footerSections.forEach((section, index) => {
                        setTimeout(() => {
                            section.style.opacity = '1';
                            section.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        },
        { threshold: 0.1 }
    );

    const footer = document.querySelector('.footer');
    if (footer) {
        // Preparar elementos para animación
        const animatedElements = footer.querySelectorAll('.footer-brand, .footer-section, .footer-contact');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        footerObserver.observe(footer);
    }
}


// ===================================
// ANIMACIONES PARA SECCIÓN ABOUT
// ===================================
function initializeAboutAnimations() {
    // Observer para animaciones de entrada
    const aboutObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animar cards de historia
                    const storyCards = entry.target.querySelectorAll('.story-card');
                    storyCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });

                    // Animar valores
                    const valueItems = entry.target.querySelectorAll('.value-item');
                    valueItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 300 + (index * 150));
                    });
                }
            });
        },
        { threshold: 0.2 }
    );

    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        // Preparar elementos para animación
        const storyCards = aboutSection.querySelectorAll('.story-card');
        const valueItems = aboutSection.querySelectorAll('.value-item');

        [...storyCards, ...valueItems].forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        aboutObserver.observe(aboutSection);
    }

    // Efecto de parallax sutil en los iconos
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const aboutSection = document.querySelector('.about');

        if (aboutSection) {
            const icons = aboutSection.querySelectorAll('.story-icon, .value-icon');
            icons.forEach((icon, index) => {
                const rate = scrolled * -0.05 * (index % 2 === 0 ? 1 : -1);
                icon.style.transform = `translateY(${rate}px) scale(1)`;
            });
        }
    }, 16));

    // Efecto de contador en hover para los valores
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.value-icon');
            if (icon) {
                // Agregar un pequeño efecto de "energía"
                icon.style.boxShadow = `0 0 20px rgba(30, 64, 175, 0.6)`;
            }
        });

        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.value-icon');
            if (icon) {
                icon.style.boxShadow = '';
            }
        });
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
        button.addEventListener('click', function (e) {
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
}

// ===================================
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
document.addEventListener('DOMContentLoaded', function () {
    initializeTheme();
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
    document.documentElement.style.transition = 'all 0.1s ease';
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Guardar preferencia
    localStorage.setItem('theme', currentTheme);

    // Actualizar iconos
    updateThemeIcons();

    // Remover transición después de completar
    setTimeout(() => {
        document.documentElement.style.transition = '';
    }, 100);
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
    return function () {
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