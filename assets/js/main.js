// ─── Nav: scroll-based solid background ───────────────────────
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// ─── Mobile menu toggle ────────────────────────────────────────
if (navToggle) {
    navToggle.addEventListener('click', function () {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
        });
    });
}

// ─── Image modal ───────────────────────────────────────────────
const imageModal  = document.getElementById('imageModal');
const modalImgEl  = document.getElementById('modalimg');

function modalimg(element) {
    const url = element.getAttribute('src');
    imageModal.classList.add('active');
    modalImgEl.setAttribute('src', url);
    document.body.style.overflow = 'hidden';
}

function closeimgmodal() {
    imageModal.classList.remove('active');
    modalImgEl.removeAttribute('src');
    document.body.style.overflow = '';
}

if (imageModal) {
    imageModal.addEventListener('click', function (e) {
        if (e.target === imageModal) closeimgmodal();
    });
}

// ─── Smooth scroll to section ─────────────────────────────────
function smoothScroll(name) {
    const el = document.querySelector('.' + name) || document.getElementById(name);
    if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 86;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}

// ─── Scroll reveal with staggered data-delay ──────────────────
function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || 0);
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initScrollReveal);
