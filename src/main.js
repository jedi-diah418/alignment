// Main page JavaScript for public landing page

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'white';
      navLinks.style.flexDirection = 'column';
      navLinks.style.padding = '1rem';
      navLinks.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    }
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      if (window.innerWidth < 768 && navLinks) {
        navLinks.style.display = 'none';
      }
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (window.innerWidth < 768 && navLinks && mobileMenuToggle) {
    if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      navLinks.style.display = 'none';
    }
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768 && navLinks) {
    navLinks.style.display = '';
    navLinks.style.position = '';
    navLinks.style.top = '';
    navLinks.style.left = '';
    navLinks.style.right = '';
    navLinks.style.background = '';
    navLinks.style.flexDirection = '';
    navLinks.style.padding = '';
    navLinks.style.boxShadow = '';
  }
});

console.log('Alignment Discipleship - Landing page loaded');
