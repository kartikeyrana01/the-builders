// Add abstract ambient background
const bgContainer = document.getElementById('bg-animation');
if(bgContainer) {
  bgContainer.innerHTML = `
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
  `;
}

// Infinite Carousel Setup
const workGrid = document.getElementById('work-grid');
if (workGrid) {
  // Clone all cards and append them to create a seamless infinite scroll loop
  const cards = Array.from(workGrid.children);
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    workGrid.appendChild(clone);
  });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
              behavior: 'smooth'
          });
        }
    });
});

// Form submission interaction
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const originalText = btn.innerText;

  const name = e.target.querySelector('#name').value.trim();
  const email = e.target.querySelector('#email').value.trim();
  const message = e.target.querySelector('#message').value.trim();

  // Store message in localStorage
  const existing = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  existing.push({ name, email, message, time: new Date().toISOString() });
  localStorage.setItem('contactMessages', JSON.stringify(existing));

  btn.innerText = 'Sending...';
  btn.style.opacity = '0.8';
  btn.style.pointerEvents = 'none';

  // Simulate network request
  setTimeout(() => {
    btn.innerText = 'Message Sent Successfully! ✓';
    btn.style.background = 'var(--accent-green)';
    btn.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';

    e.target.reset();

    // Reset button state
    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.background = '';
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'all';
      btn.style.boxShadow = '';
    }, 4000);
  }, 1200);
});
