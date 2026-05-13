// Custom cursor
(() => {
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursor-dot');
  if (!cursor || !dot) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  const animate = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursor.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  };
  animate();

  document.querySelectorAll('a, button, .project').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
  });
})();

// Project thumb tint colors from data attribute
(() => {
  document.querySelectorAll('.project-thumb').forEach((thumb) => {
    const c = thumb.getAttribute('data-color');
    if (c) thumb.style.setProperty('--c', c);
  });
})();

// Reveal on scroll
(() => {
  const targets = document.querySelectorAll('.section-head, .about-text, .about-list, .project, .contact-title, .contact-mail, .socials');
  targets.forEach((el) => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  targets.forEach((el) => io.observe(el));
})();

// Hero line stagger on load
(() => {
  const lines = document.querySelectorAll('.hero-title .line');
  lines.forEach((line, i) => {
    const inner = document.createElement('span');
    inner.style.display = 'inline-block';
    inner.style.transform = 'translateY(110%)';
    inner.style.transition = `transform 1.1s cubic-bezier(.2,.8,.2,1) ${0.1 + i * 0.12}s`;
    while (line.firstChild) inner.appendChild(line.firstChild);
    line.appendChild(inner);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { inner.style.transform = 'translateY(0)'; });
    });
  });
})();

// Subtle parallax on project thumbs
(() => {
  const thumbs = document.querySelectorAll('.project-thumb');
  thumbs.forEach((thumb) => {
    thumb.addEventListener('mousemove', (e) => {
      const r = thumb.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      thumb.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    thumb.addEventListener('mouseleave', () => {
      thumb.style.transform = '';
    });
  });
})();
