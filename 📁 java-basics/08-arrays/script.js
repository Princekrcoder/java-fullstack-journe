// Particle Config
const CONFIG = {
  baseCount: 80,
  maxCount: 140,
  speed: 0.6,
  size: [1, 2.4],
  linkDist: 120,
  linkOpacity: 0.18,
  dotOpacity: 0.8,
  color: '255, 255, 255',
};

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
const DPR = Math.min(window.devicePixelRatio || 1, 2);

let particles = [];
let width = 0, height = 0;
let mouse = { x: null, y: null, active: false };

function rand(min, max) { return Math.random() * (max - min) + min; }

function resize() {
  const rect = canvas.parentElement.getBoundingClientRect();
  width = Math.floor(rect.width);
  height = Math.floor(rect.height);
  canvas.width = Math.floor(width * DPR);
  canvas.height = Math.floor(height * DPR);
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

  const area = width * height;
  const scale = area / (1366 * 768);
  const targetCount = Math.min(Math.round(CONFIG.baseCount * scale), CONFIG.maxCount);
  adjustParticleCount(targetCount);
}

function adjustParticleCount(target) {
  if (particles.length > target) {
    particles.length = target;
  } else {
    while (particles.length < target) {
      particles.push(makeParticle());
    }
  }
}

function makeParticle() {
  return {
    x: rand(0, width),
    y: rand(0, height),
    vx: rand(-CONFIG.speed, CONFIG.speed),
    vy: rand(-CONFIG.speed, CONFIG.speed),
    r: rand(CONFIG.size[0], CONFIG.size[1])
  };
}

function step() {
  ctx.clearRect(0, 0, width, height);

  for (let p of particles) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${CONFIG.color}, ${CONFIG.dotOpacity})`;
    ctx.fill();
  }

  for (let i = 0; i < particles.length; i++) {
    const p1 = particles[i];
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist2 = dx*dx + dy*dy;
      const maxD = CONFIG.linkDist;
      if (dist2 < maxD * maxD) {
        const alpha = CONFIG.linkOpacity * (1 - Math.sqrt(dist2) / maxD);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(${CONFIG.color}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(step);
}

// Cursor
const dotEl = document.querySelector('.cursor-dot');
const ringEl = document.querySelector('.cursor-ring');
let targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;
let ringX = targetX, ringY = targetY;

function animateCursor() {
  const lerp = 0.18;
  ringX += (targetX - ringX) * lerp;
  ringY += (targetY - ringY) * lerp;

  dotEl.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
  ringEl.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

  requestAnimationFrame(animateCursor);
}

window.addEventListener('mousemove', (e) => {
  targetX = e.clientX; targetY = e.clientY;
  mouse.x = targetX; mouse.y = targetY; mouse.active = true;
  document.body.classList.add('mouse-active');
});
window.addEventListener('mouseleave', () => {
  mouse.active = false;
  document.body.classList.remove('mouse-active');
});

function updateHoverState(el) {
  if (el && el.closest && el.closest('a, button, .btn')) {
    document.body.classList.add('is-hovering');
    ringEl.style.boxShadow = '0 0 24px 6px rgba(139,92,246,0.25)';
    ringEl.style.transform += ' scale(1.35)';
  } else {
    document.body.classList.remove('is-hovering');
    ringEl.style.boxShadow = '0 0 0 0 rgba(0,0,0,0)';
  }
}
document.addEventListener('mouseover', (e) => updateHoverState(e.target));
document.addEventListener('mouseout', (e) => updateHoverState(e.relatedTarget));

window.addEventListener('mousedown', (e) => {
  const r = document.createElement('div');
  r.className = 'click-ripple';
  r.style.left = e.clientX + 'px';
  r.style.top = e.clientY + 'px';
  document.body.appendChild(r);
  r.addEventListener('animationend', () => r.remove());
});

function spotlightToCursor() {
  if (mouse.active) {
    for (let p of particles) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist2 = dx*dx + dy*dy;
      const maxD = CONFIG.linkDist * 1.15;
      if (dist2 < maxD * maxD) {
        const alpha = CONFIG.linkOpacity * 1.2 * (1 - Math.sqrt(dist2) / maxD);
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(${CONFIG.color}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(spotlightToCursor);
}

// Init
resize();
particles.forEach(p => { 
  p.x = width * 0.25 + Math.random() * width * 0.5; 
  p.y = height * 0.25 + Math.random() * height * 0.5; 
});
requestAnimationFrame(step);
requestAnimationFrame(animateCursor);
requestAnimationFrame(spotlightToCursor);

window.addEventListener('resize', resize);
