// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const mobileOverlay = document.getElementById('mobileOverlay');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  mobileOverlay.classList.toggle('active');
  document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
}

function closeMenu() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  mobileOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', toggleMenu);
mobileOverlay.addEventListener('click', closeMenu);

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    closeMenu();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// ===== ACTIVE NAV ON SCROLL =====
let lastScrollTop = 0;
const header = document.querySelector('header');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Active nav link
  let current = '';
  document.querySelectorAll('section[id]').forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  // Hide/Show navbar based on scroll direction
  if (scrollTop > scrollThreshold) {
    if (scrollTop > lastScrollTop) {
      // Scrolling down - hide navbar
      header.classList.add('nav-hidden');
      header.classList.remove('nav-visible');
    } else {
      // Scrolling up - show navbar
      header.classList.remove('nav-hidden');
      header.classList.add('nav-visible');
    }
  } else {
    // At top of page - always show
    header.classList.remove('nav-hidden');
    header.classList.remove('nav-visible');
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===== HERO PET CAROUSEL =====
let heroPetIndex = 0;
const heroPets = document.querySelectorAll('.hero-pet');

function showHeroPet(index) {
  heroPets.forEach(pet => pet.classList.remove('active'));
  heroPets[index].classList.add('active');
}

function nextHeroPet() {
  heroPetIndex = (heroPetIndex + 1) % heroPets.length;
  showHeroPet(heroPetIndex);
}

// Auto-advance every 5 seconds
setInterval(nextHeroPet, 5000);

// Hero Book Button
document.getElementById('heroBookBtn')?.addEventListener('click', () => {
  document.getElementById('modal').classList.add('active');
  document.body.style.overflow = 'hidden';
  resetModal();
});

// ===== ABOUT BACKGROUND SLIDESHOW =====
let bgIndex = 0;
const bgSlides = document.querySelectorAll('.bg-slide');

function nextBgSlide() {
  if (bgSlides.length === 0) return;
  bgSlides[bgIndex].classList.remove('active');
  bgIndex = (bgIndex + 1) % bgSlides.length;
  bgSlides[bgIndex].classList.add('active');
}

setInterval(nextBgSlide, 5000);

// ===== SCROLL BUTTONS =====
document.querySelectorAll('.scroll-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    const container = document.getElementById(`${target}-scroll`);
    const direction = btn.classList.contains('scroll-prev') ? -1 : 1;
    
    if (container) {
      container.scrollBy({
        left: direction * container.clientWidth * 0.8,
        behavior: 'smooth'
      });
    }
  });
});

// ===== TEAM CAROUSEL NAVIGATION =====
document.querySelectorAll('.carousel-nav').forEach(btn => {
  btn.addEventListener('click', () => {
    const carouselType = btn.getAttribute('data-carousel');
    const direction = btn.classList.contains('prev') ? -1 : 1;
    const container = document.getElementById(`${carouselType}-carousel`);
    
    if (container) {
      const cardWidth = container.querySelector('.team-card').offsetWidth;
      const gap = 24; // 1.5rem gap
      container.scrollBy({
        left: direction * (cardWidth + gap),
        behavior: 'smooth'
      });
    }
  });
});

// ===== MODAL =====
const modal = document.getElementById('modal');
const openBtns = [
  document.getElementById('openBookingModal'),
  document.getElementById('openBookingModalAlt')
];
const closeBtn = document.getElementById('closeModal');
const modalOptions = document.getElementById('modalOptions');
const forms = {
  guest: document.getElementById('guestForm'),
  register: document.getElementById('registerForm'),
  login: document.getElementById('loginForm')
};

function openModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  resetModal();
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function resetModal() {
  modalOptions.classList.remove('hidden');
  Object.values(forms).forEach(form => form.classList.add('hidden'));
}

openBtns.forEach(btn => {
  if (btn) btn.addEventListener('click', openModal);
});

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
});

// Show forms
document.getElementById('guestBtn').addEventListener('click', () => {
  modalOptions.classList.add('hidden');
  forms.guest.classList.remove('hidden');
});

document.getElementById('registerBtn').addEventListener('click', () => {
  modalOptions.classList.add('hidden');
  forms.register.classList.remove('hidden');
});

document.getElementById('loginBtn').addEventListener('click', () => {
  modalOptions.classList.add('hidden');
  forms.login.classList.remove('hidden');
});

// Back buttons
document.querySelectorAll('[data-back]').forEach(btn => {
  btn.addEventListener('click', resetModal);
});

// Form submissions
Object.values(forms).forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form submitted successfully!');
    closeModal();
    form.reset();
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.card').forEach(el => observer.observe(el));

console.log('🐾 VHS Animal Wellness Center - Ready!');
