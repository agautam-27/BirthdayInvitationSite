// Simple tap/click to open and close birthday card with smooth animations

const book = document.getElementById('card');
const cover = document.getElementById('cover');
const leftPage = document.getElementById('leftPage');
const rightPage = document.getElementById('rightPage');

// Track animation state
let isAnimating = false;

/* ---------- Balloons (gold + pearl bunches) ---------- */
(function makeBalloonSky(){
  const sky = document.getElementById('balloon-sky');
  const bunchCount = 12;

  const mk = (tag, cls) => { 
    const el = document.createElement(tag); 
    if (cls) el.className = cls; 
    return el; 
  };

  for (let i = 0; i < bunchCount; i++) {
    const bunch = mk('div','bunch');
    bunch.style.left = (6 + Math.random()*88) + 'vw';
    bunch.style.setProperty('--dx', ((Math.random()<0.5?-1:1) * (3 + Math.random()*6)) + 'vw');
    bunch.style.setProperty('--dur', (22 + Math.random()*26) + 's');
    bunch.style.animationDelay = (-Math.random()*24) + 's';

    const colors = ['gold','pearl','gold'];
    const pos = ['b1','b2','b3'];
    for (let j = 0; j < 3; j++) {
      const b = mk('div', `balloon ${colors[(i+j)%colors.length]} ${pos[j]}`);
      bunch.appendChild(b);
    }
    sky.appendChild(bunch);
  }
})();

/* ---------- Toggle card open/close ---------- */
function toggleCard() {
  // Prevent interaction during animation
  if (isAnimating) return;
  
  isAnimating = true;
  
  if (book.classList.contains('closed')) {
    // Open the card
    book.classList.remove('closed');
    book.classList.add('open');
    
    // Reset animation flag after animation completes
    setTimeout(() => {
      isAnimating = false;
    }, 2000); // Match the CSS transition duration
    
  } else {
    // Close the card
    book.classList.remove('open');
    book.classList.add('closed');
    
    // Reset animation flag after animation completes
    setTimeout(() => {
      isAnimating = false;
    }, 2000); // Match the CSS transition duration
  }
}

/* ---------- Event Listeners ---------- */
// Click to toggle
book.addEventListener('click', (e) => {
  e.preventDefault();
  toggleCard();
});

// Touch to toggle (for mobile)
book.addEventListener('touchend', (e) => {
  e.preventDefault();
  toggleCard();
});

// Prevent accidental text selection
document.addEventListener('selectstart', e => {
  if (e.target.closest('.book')) {
    e.preventDefault();
  }
});

// Add visual feedback on hover/touch
book.addEventListener('mouseenter', () => {
  if (!isAnimating && book.classList.contains('closed')) {
    book.style.transform = 'scale(1.02)';
  }
});

book.addEventListener('mouseleave', () => {
  book.style.transform = 'scale(1)';
});

// Touch feedback for mobile
let touchTimeout;
book.addEventListener('touchstart', (e) => {
  e.preventDefault();
  if (!isAnimating) {
    book.style.transform = 'scale(0.98)';
    touchTimeout = setTimeout(() => {
      book.style.transform = 'scale(1)';
    }, 100);
  }
});

book.addEventListener('touchcancel', () => {
  clearTimeout(touchTimeout);
  book.style.transform = 'scale(1)';
});