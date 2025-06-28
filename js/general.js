// ===================================
// CORE GLOBAL FUNCTIONS - EDUTECH SOLUTIONS
// Para uso en todas las páginas del sitio
// ===================================

// ===================================
// VARIABLES GLOBALES
// ===================================
let currentTheme = localStorage.getItem('theme') || 'light';

// Elementos DOM globales
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

// ===================================
// INICIALIZACIÓN GLOBAL
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    initializeTheme();
    initializeMobileMenu();
    initializeFooter();
    initializeGlobalAnimations();
    setCurrentYear();
});

// ===================================
// FUNCIONES DE TEMA (DARK/LIGHT MODE)
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
    const isOpen = mobileMenu?.classList.contains('active');

    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    if (!mobileMenu) return;

    // Animación de apertura
    mobileMenuToggle?.classList.add('active');
    mobileMenuOverlay?.classList.add('active');
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
    if (!mobileMenu) return;

    // Animación de cierre
    mobileMenuToggle?.classList.remove('active');
    mobileMenuOverlay?.classList.remove('active');
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
                const navbarHeight = navbar?.offsetHeight || 80;
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
// ANIMACIONES GLOBALES
// ===================================
function initializeGlobalAnimations() {
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
// NAVEGACIÓN Y SCROLL SUAVE
// ===================================
function initializeSmoothScroll() {
    // Scroll suave para todos los enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navbarHeight = navbar?.offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Cerrar menú móvil si está abierto
                closeMobileMenu();
            }
        });
    });
}

// ===================================
// AÑO ACTUAL
// ===================================
function setCurrentYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// ===================================
// UTILIDADES GLOBALES
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

// Validador de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Agregar estilos inline básicos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Manejar cierre
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });

    // Auto-remove después de 5 segundos
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===================================
// MANEJO DE ERRORES GLOBALES
// ===================================
window.addEventListener('error', (e) => {
    console.error('Error global:', e.error);
});

// ===================================
// RESPONSIVE Y RESIZE
// ===================================
window.addEventListener('resize', debounce(() => {
    // Cerrar menú móvil en resize a desktop
    if (window.innerWidth > 768) {
        closeMobileMenu();
        if (navbar) {
            navbar.style.transform = 'translateY(0)';
        }
    }
}, 250));

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
// PERFORMANCE Y LOADING
// ===================================
// Usar requestIdleCallback si está disponible
const scheduleWork = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));

// Lazy load de funcionalidades no críticas
scheduleWork(() => {
    initializeSmoothScroll();
});

// ===================================
// EXPORT PARA MÓDULOS (SI SE USA)
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeTheme,
        toggleTheme,
        initializeMobileMenu,
        initializeFooter,
        showNotification,
        debounce,
        throttle,
        isValidEmail
    };
}