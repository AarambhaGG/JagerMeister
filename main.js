// ============================================
// JÄGERMEISTER - MESMERIZING SCROLL ANIMATIONS
// ============================================

// Initialize all website functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();        // Custom mouse cursor effects
    initScrollProgress();      // Top progress bar
    initScrollAnimations();    // Fade-in animations on scroll
    initSectionReveal();       // Section appearance animations
    initSmoothSectionScroll(); // Wheel and keyboard navigation
    initParallaxVideos();      // Subtle video parallax effects
    initNavigation();          // Smooth anchor link scrolling
    initVideoControl();        // Auto-play/pause videos on scroll
});

// ============================================
// CUSTOM CURSOR - Smooth following cursor effect
// ============================================

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        followerX += (mouseX - followerX) * 0.08;
        followerY += (mouseY - followerY) * 0.08;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    const hoverElements = document.querySelectorAll('a, button, .split-image, .social-link, .dropdown-item');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('hover');
            cursor.style.transform = 'scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('hover');
            cursor.style.transform = 'scale(1)';
        });
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });
}

// ============================================
// SCROLL PROGRESS BAR - Visual progress indicator at top
// ============================================

function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = (scrollTop / docHeight) * 100;
                progressBar.style.width = progress + '%';
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ============================================
// ELEMENT SCROLL ANIMATIONS - Unified fade-in system for all sections
// ============================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// SECTION REVEAL ANIMATION
// ============================================

function initSectionReveal() {
    const sections = document.querySelectorAll('.product-section-video, .product-section-split');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Delay the reveal for dramatic effect
                setTimeout(() => {
                    entry.target.classList.add('section-visible');
                }, 200);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px 0px 0px'
    });
    
    sections.forEach(section => sectionObserver.observe(section));
}

// ============================================
// SMOOTH SECTION-BY-SECTION SCROLLING - Wheel and keyboard navigation
// ============================================

function initSmoothSectionScroll() {
    const sections = document.querySelectorAll('.hero, .product-section-video, .product-section-split, .footer');
    let currentSection = 0;
    let isScrolling = false;
    let scrollTimeout;
    
    // Track which section is currently most visible
    const updateCurrentSection = () => {
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= -100 && rect.top <= window.innerHeight / 2) {
                currentSection = index;
            }
        });
    };
    
    // Smooth scroll to section with easing
    const scrollToSection = (index) => {
        if (index < 0 || index >= sections.length) return;
        
        isScrolling = true;
        const target = sections[index];
    
        // Animate content out before transition
        const currentContent = sections[currentSection];
        if (currentContent) {
            const elements = currentContent.querySelectorAll('[data-animate]');
            elements.forEach(el => {
                el.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                el.style.opacity = '0.4';
            });
        }

        // Scroll to target
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Animate content in after transition
        setTimeout(() => {
            const newElements = target.querySelectorAll('[data-animate]');
            newElements.forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'all 0.64s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    el.style.opacity = '1';
                }, i * 100);
            });

            currentSection = index;
            isScrolling = false;
        }, 600);
    };
    
    // Wheel event for controlled scrolling
    let wheelAccumulator = 0;
    const wheelThreshold = 50;
    
    window.addEventListener('wheel', (e) => {
        // Update current section
        updateCurrentSection();
        
        // Accumulate wheel delta
        wheelAccumulator += e.deltaY;
        
        // Clear accumulator after pause
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            wheelAccumulator = 0;
        }, 150);
        
        // Only trigger section change when threshold is met
        if (!isScrolling && Math.abs(wheelAccumulator) > wheelThreshold) {
            if (wheelAccumulator > 0 && currentSection < sections.length - 1) {
                scrollToSection(currentSection + 1);
                wheelAccumulator = 0;
            } else if (wheelAccumulator < 0 && currentSection > 0) {
                scrollToSection(currentSection - 1);
                wheelAccumulator = 0;
            }
        }
    }, { passive: true });
        
    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
        updateCurrentSection();
        
        if (!isScrolling) {
            if ((e.key === 'ArrowDown' || e.key === 'PageDown') && currentSection < sections.length - 1) {
                e.preventDefault();
                scrollToSection(currentSection + 1);
            } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && currentSection > 0) {
                e.preventDefault();
                scrollToSection(currentSection - 1);
        }
        }
    });
    
    // Touch support for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    window.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        updateCurrentSection();
        
        if (!isScrolling && Math.abs(diff) > 80) {
            if (diff > 0 && currentSection < sections.length - 1) {
                scrollToSection(currentSection + 1);
            } else if (diff < 0 && currentSection > 0) {
                scrollToSection(currentSection - 1);
            }
        }
    }, { passive: true });
    
    // Section indicator dots
    createSectionIndicator(sections);
}

// ============================================
// SECTION INDICATOR DOTS
// ============================================

function createSectionIndicator(sections) {
    const indicator = document.createElement('div');
    indicator.className = 'section-indicator';
    indicator.innerHTML = sections.map((_, i) => 
        `<div class="indicator-dot ${i === 0 ? 'active' : ''}" data-section="${i}"></div>`
    ).join('');
    document.body.appendChild(indicator);
    
    // Style the indicator
    const style = document.createElement('style');
    style.textContent = `
        .section-indicator {
            position: fixed;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 999;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .indicator-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid rgba(61, 158, 92, 0.5);
            background: transparent;
            cursor: pointer;
            transition: all 0.4s ease;
        }
        
        .indicator-dot:hover {
            border-color: var(--jager-green-glow);
            transform: scale(1.2);
        }
        
        .indicator-dot.active {
            background: var(--jager-green-glow);
            border-color: var(--jager-green-glow);
            box-shadow: 0 0 15px rgba(61, 158, 92, 0.6);
        }
        
        @media (max-width: 768px) {
            .section-indicator {
                right: 15px;
                gap: 10px;
    }
    
            .indicator-dot {
                width: 10px;
                height: 10px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Click to navigate
    document.querySelectorAll('.indicator-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.section);
            sections[index].scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Update active dot on scroll
    const updateIndicator = () => {
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= -100 && rect.top <= window.innerHeight / 2) {
                document.querySelectorAll('.indicator-dot').forEach((d, i) => {
                    d.classList.toggle('active', i === index);
                });
            }
        });
    };
    
    window.addEventListener('scroll', updateIndicator, { passive: true });
}

// ============================================
// ============================================
// PARALLAX VIDEO EFFECTS - Subtle depth movement on scroll
// ============================================

function initParallaxVideos() {
    // Optimized parallax only on videos, not images
    const videoSections = document.querySelectorAll('.product-section-split, .product-section-video');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                videoSections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

                    if (scrollPercent > 0 && scrollPercent < 1) {
                        const video = section.querySelector('video');
                        if (video) {
                            const parallaxOffset = (scrollPercent - 0.5) * 25;
                            video.style.transform = `scale(1.05) translateY(${parallaxOffset}px) translateZ(0)`;
                        }
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ============================================
// NAVIGATION - Smooth anchor link scrolling
// ============================================

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        logo.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 18, 13, 0.98)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'linear-gradient(180deg, rgba(10, 18, 13, 0.98) 0%, transparent 100%)';
            nav.style.backdropFilter = 'none';
        }
    });
}


// ============================================
// MOBILE MENU
// ============================================

// ============================================
// VIDEO CONTROL - Auto-play/pause videos based on visibility
// ============================================

function initVideoControl() {
    const videos = document.querySelectorAll('video');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(() => {
                    video.muted = true;
                    video.play().catch(() => {});
                });
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.3
    });
    
    videos.forEach(video => {
        video.muted = true;
        videoObserver.observe(video);
    });
}

// ============================================
// HERO PARALLAX - Optimized
// ============================================

const hero = document.querySelector('.hero-content');
const scrollIndicator = document.querySelector('.scroll-indicator');
let parallaxTicking = false;

window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;

            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.4}px) translateZ(0)`;
                hero.style.opacity = 1 - (scrolled / (window.innerHeight * 0.7));
            }

            if (scrollIndicator && scrolled < window.innerHeight) {
                scrollIndicator.style.opacity = 1 - (scrolled / 250);
            }

            parallaxTicking = false;
        });
        parallaxTicking = true;
    }
}, { passive: true });

// ============================================
// MAGNETIC BUTTON EFFECT - Optimized
// ============================================

document.querySelectorAll('.hero-btn, .product-btn').forEach(btn => {
    let mouseTicking = false;

    btn.addEventListener('mousemove', (e) => {
        if (!mouseTicking) {
            requestAnimationFrame(() => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateZ(0)`;
                mouseTicking = false;
            });
            mouseTicking = true;
        }
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0) translateZ(0)';
        });
    });

// ============================================
// SMOOTH SECTION TRANSITIONS
// ============================================

// Removed problematic scale transforms
