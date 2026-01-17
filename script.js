// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add shadow to navbar on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-card, .project-card, .contact-method').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Project Tag Filtering
let activeFilter = null;

function filterProjects(filterTag) {
    const projectCards = document.querySelectorAll('.project-card');
    const allTags = document.querySelectorAll('.tag');

    // If clicking the same tag, clear the filter
    if (activeFilter === filterTag) {
        activeFilter = null;
        projectCards.forEach(card => card.classList.remove('hidden'));
        allTags.forEach(tag => tag.classList.remove('active'));
        return;
    }

    // Set new active filter
    activeFilter = filterTag;

    // Update tag active states
    allTags.forEach(tag => {
        if (tag.textContent === filterTag) {
            tag.classList.add('active');
        } else {
            tag.classList.remove('active');
        }
    });

    // Filter project cards
    projectCards.forEach(card => {
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent);
        if (tags.includes(filterTag)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Add click event listeners to tags (exclude link tags)
document.querySelectorAll('.tag').forEach(tag => {
    // Skip tags that are links (have href attribute)
    if (tag.tagName === 'A' && tag.hasAttribute('href')) {
        return;
    }

    tag.addEventListener('click', function(e) {
        e.preventDefault();
        filterProjects(this.textContent);
    });
});
