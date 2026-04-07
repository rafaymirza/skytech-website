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


//email sent function//

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const company = document.getElementById('company');
  const phone = document.getElementById('phone');
  const message = document.getElementById('message');

  let isValid = true;

  function validateField(field) {
    if (field.value.trim() === "") {
      field.classList.add('invalid');
      field.nextElementSibling.style.display = "block";
      isValid = false;
    } else {
      field.classList.remove('invalid');
      field.nextElementSibling.style.display = "none";
    }
  }

  validateField(fullName);
  validateField(company);
  validateField(message);

  // Email validation
  const emailPattern = /\S+@\S+\.\S+/;
  if (email.value.trim() === "" || !emailPattern.test(email.value)) {
    email.classList.add('invalid');
    email.nextElementSibling.style.display = "block";
    isValid = false;
  } else {
    email.classList.remove('invalid');
    email.nextElementSibling.style.display = "none";
  }

  // Phone validation (10–15 digits)
  const phonePattern = /^[0-9]{10,15}$/;
  if (phone.value.trim() === "" || !phonePattern.test(phone.value)) {
    phone.classList.add('invalid');
    phone.nextElementSibling.style.display = "block";
    isValid = false;
  } else {
    phone.classList.remove('invalid');
    phone.nextElementSibling.style.display = "none";
  }

  if (!isValid) return;

  const templateParams = {
    full_name: fullName.value,
    email: email.value,
    company: company.value,
    phone: phone.value,
    message: message.value
  };

  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
    .then(() => {
      alert('Message sent successfully!');
      contactForm.reset();
    })
    .catch(error => {
      alert('Failed to send message. Please try again later.');
      console.error(error);
    });
});


//  end end end end the email function

document.addEventListener('DOMContentLoaded', () => {

  const sections = document.querySelectorAll('.app-section');

  function showSections(page) {
    sections.forEach(section => {
      const pages = section.dataset.page.split(' ');
      section.style.display = pages.includes(page) ? 'block' : 'none';
    });
  }

  function scrollToService(id) {
    if (!id) return;
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  }

  // Default view
  showSections('home');

  // 🔥 ONE CLICK HANDLER FOR EVERYTHING
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-nav]');
    if (!trigger) return;

    e.preventDefault();

    const page = trigger.dataset.nav;
    const target = trigger.dataset.target;

    // Update navbar active state
    document.querySelectorAll('.navbar-menu a')
      .forEach(a => a.classList.remove('active'));

    const activeNav = document.querySelector(
      `.navbar-menu a[data-nav="${page}"]`
    );
    if (activeNav) activeNav.classList.add('active');

    showSections(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    scrollToService(target);
  });

});

///////////////////////services///////////////////
const cards = document.querySelectorAll('.service-card');

const scrollAnimateCards = () => {
  const viewport = window.innerHeight;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();

    const start = viewport;
    const end = viewport * 0.6;

    if (rect.top <= start && rect.top >= end) {
      const progress = (rect.top - end) / (start - end);

      const translateY = progress * 220;
      const rotateX = progress * 8;
      const scale = 0.96 + (1 - progress) * 0.04;

      card.style.opacity = 1;
      card.style.transform = `
        translateY(${translateY}px)
        rotateX(${rotateX}deg)
        scale(${scale})
      `;
    }

    // Lock position
    if (rect.top < end) {
      card.classList.add('active');
    }
  });
};

window.addEventListener('scroll', scrollAnimateCards);
scrollAnimateCards();
