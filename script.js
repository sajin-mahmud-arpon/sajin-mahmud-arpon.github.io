// ==========================
// Intersection Observer for fade-in animations
// ==========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.glass-card, .fade-in-up').forEach(el => {
  observer.observe(el);
});

// ==========================
// Staggered animation for cards
// ==========================
const cards = document.querySelectorAll('.glass-card');
cards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.12}s`;
});

// ==========================
// Smooth scrolling for anchor links
// ==========================
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

// ==========================
// Parallax background effect
// ==========================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.bg-animation');
  const speed = scrolled * 0.35;
  parallax.style.transform = `translateY(${speed}px)`;
});

// ==========================
// 3D hover tilt effect for image and cards
// ==========================
const tiltElements = document.querySelectorAll('.glass-card, .profile-image img');

tiltElements.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * -8;
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
  });
});
