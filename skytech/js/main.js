document.addEventListener('DOMContentLoaded', () => {
  // Navbar toggle
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  const menuLinks = document.querySelectorAll('.navbar-menu a');

  navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      navbarToggle.classList.remove('active');
      navbarMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  // Scroll-triggered text animation
  const elements = document.querySelectorAll(".animate-text");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    elements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = -50;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);
});



//tag line
const tagline = document.querySelector('.tagline-text');

window.addEventListener('scroll', () => {
  const trigger = tagline.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if(trigger < screenHeight - 100){
    tagline.classList.add('active');
  }
});

//tag line
//paging
let currentPage = 0;
const pages = document.querySelectorAll('.services-page');
const dots = document.querySelectorAll('.dot');

function showPage(index) {
  pages.forEach((page, i) => {
    page.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentPage = i;
    showPage(currentPage);
  });
});

// Auto play every 10 seconds
setInterval(() => {
  currentPage = (currentPage + 1) % pages.length;
  showPage(currentPage);
}, 5000);
//paging





//landing page
// =========================
// Shield Slider - Full JS
// =========================

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('shieldSlider');
  const slides = Array.from(document.querySelectorAll('.shield-slide'));
  const tabs   = Array.from(document.querySelectorAll('#shieldTabs .tab-item'));

  let index = 0;
  const DELAY = 2000;
  let autoPlay = null;

  // =========================
  // Show Slide
  // =========================
  function showSlide(i) {
    index = (i + slides.length) % slides.length;

    // Update slides
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });

    // Update tabs
    tabs.forEach((tab, idx) => {
      tab.classList.toggle('active', idx === index);
    });

    // Force underline animation restart
    tabs.forEach(tab => tab.style.setProperty('--animate', Math.random()));
  }

  // =========================
  // Go next slide
  // =========================
  function nextSlide() {
    showSlide(index + 1);
  }

  // =========================
  // Autoplay Control
  // =========================
  function startAuto() {
    stopAuto();
    autoPlay = setInterval(nextSlide, DELAY);
  }

  function stopAuto() {
    clearInterval(autoPlay);
  }

  // Start slider
  showSlide(0);
  startAuto();

  // =========================
  // Tab Click Events
  // =========================
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      showSlide(i);
      startAuto(); // restart autoplay after click
    });
  });

  // =========================
  // Hover Pause
  // =========================
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  // =========================
  // Mobile Swipe Detection
  // =========================
  let startX = 0;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    stopAuto();
  });

  slider.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;

    // Swipe Left → Next slide
    if (startX - endX > 50) {
      nextSlide();
    }

    // Swipe Right → Previous slide
    if (endX - startX > 50) {
      showSlide(index - 1);
    }

    startAuto();
  });
});



