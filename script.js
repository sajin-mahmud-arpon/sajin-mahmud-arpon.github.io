// ===== Intersection Observer =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.glass-card, .fade-in-up, .profile-image-container').forEach(el => {
  observer.observe(el);
});

// ===== Night Sky Canvas =====
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
let meteors = [];
let planets = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ===== Star Class =====
class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.5;
    this.alphaSpeed = Math.random() * 0.02 + 0.005;
  }
  update() {
    this.alpha += this.alphaSpeed;
    if (this.alpha > 1 || this.alpha < 0.3) this.alphaSpeed *= -1;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// ===== Meteor Class =====
class Meteor {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.length = Math.random() * 80 + 50;
    this.speed = Math.random() * 10 + 6;
    this.angle = Math.PI / 4;
    this.opacity = Math.random() * 0.5 + 0.5;
  }
  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    if (this.y > canvas.height || this.x > canvas.width) this.reset();
  }
  draw() {
    ctx.save();
    ctx.strokeStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.length * Math.cos(this.angle), this.y - this.length * Math.sin(this.angle));
    ctx.stroke();
    ctx.restore();
  }
}

// ===== Planet Class =====
class Planet {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 40 + 30;
    this.color = `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, 0.8)`;
    this.orbitSpeed = Math.random() * 0.01 + 0.001;
    this.angle = Math.random() * Math.PI * 2;
    this.orbitRadius = Math.random() * 100 + 50;
    this.centerX = this.x;
    this.centerY = this.y;
  }
  update() {
    this.angle += this.orbitSpeed;
    this.x = this.centerX + Math.cos(this.angle) * this.orbitRadius;
    this.y = this.centerY + Math.sin(this.angle) * this.orbitRadius;
  }
  draw() {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// ===== Initialize Elements =====
function initNightSky() {
  stars = [];
  meteors = [];
  planets = [];

  for (let i = 0; i < 150; i++) stars.push(new Star());
  for (let i = 0; i < 5; i++) meteors.push(new Meteor());
  for (let i = 0; i < 3; i++) planets.push(new Planet());
}
initNightSky();

// ===== Animate Night Sky =====
function animateNightSky() {
  ctx.fillStyle = '#011020';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(s => { s.update(); s.draw(); });
  meteors.forEach(m => { m.update(); m.draw(); });
  planets.forEach(p => { p.update(); p.draw(); });

  requestAnimationFrame(animateNightSky);
}

animateNightSky();
