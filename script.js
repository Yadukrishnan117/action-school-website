/* âââââââââââââââââââââââââââââââââââââââââââ
   ACTION SCHOOL â MAIN SCRIPT
   Features: Nav scroll, mobile menu,
             language toggle (EN/ML),
             scroll reveal animations,
             hero video + sound toggle,
             form submission
   âââââââââââââââââââââââââââââââââââââââââââ */

(function () {
  'use strict';

  /* âââ State ââââââââââââââââââââââââââââ */
  let currentLang = 'en';
  let videoMuted  = true;

  /* âââ DOM Refs ââââââââââââââââââââââââââ */
  const header         = document.getElementById('site-header');
  const menuToggle     = document.getElementById('menu-toggle');
  const mainNav        = document.getElementById('main-nav');
  const langToggle     = document.getElementById('lang-toggle');
  const langLabel      = document.getElementById('lang-label');
  const form           = document.getElementById('enquiry-form');
  const heroVideo      = document.getElementById('hero-video');
  const soundBtn       = document.getElementById('video-sound-btn');
  const soundOffIcon   = document.getElementById('sound-off-icon');
  const soundOnIcon    = document.getElementById('sound-on-icon');
  const formSuccess    = document.getElementById('form-success');


  /* âââââââââââââââââââââââââââââââââââââââ
     HEADER â scroll class
  âââââââââââââââââââââââââââââââââââââââ */
  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* âââââââââââââââââââââââââââââââââââââââ
     HERO VIDEO â load handling
  âââââââââââââââââââââââââââââââââââââââ */
  if (heroVideo) {
    // Mark video as loaded when it starts playing
    heroVideo.addEventListener('canplay', () => {
      heroVideo.classList.add('loaded');
    });

    // Ensure autoplay (some browsers need a user gesture â we start muted)
    heroVideo.muted = true;
    heroVideo.play().catch(() => {
      // Autoplay blocked â video stays hidden, fallback image shows
    });

    // Sound toggle button
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        videoMuted = !videoMuted;
        heroVideo.muted = videoMuted;

        if (videoMuted) {
          soundOffIcon.style.display = '';
          soundOnIcon.style.display  = 'none';
        } else {
          soundOffIcon.style.display = 'none';
          soundOnIcon.style.display  = '';
          // Resume play if paused
          heroVideo.play().catch(() => {});
        }
      });
    }

    // Subtle parallax on the video wrap
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroVideo.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    }, { passive: true });
  }


  /* âââââââââââââââââââââââââââââââââââââââ
     MOBILE NAV
  âââââââââââââââââââââââââââââââââââââââ */
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (
      mainNav.classList.contains('open') &&
      !mainNav.contains(e.target) &&
      e.target !== menuToggle &&
      !menuToggle.contains(e.target)
    ) {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('open');
      document.body.style.overflow = '';
    }
  });


  /* âââââââââââââââââââââââââââââââââââââââ
     LANGUAGE TOGGLE (EN â ML)
  âââââââââââââââââââââââââââââââââââââââ */
  function applyLanguage(lang) {
    const attr = `data-${lang}`;
    document.querySelectorAll(`[${attr}]`).forEach(el => {
      const value = el.getAttribute(attr);
      if (!value) return;

      // Use innerHTML for elements that can contain markup
      if (
        el.tagName === 'H1' ||
        el.tagName === 'H2' ||
        el.tagName === 'P'  ||
        el.classList.contains('hero-badge') ||
        el.classList.contains('hero-sub')
      ) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    document.documentElement.lang = lang === 'ml' ? 'ml' : 'en';
    langLabel.textContent = lang === 'en' ? 'à´®à´²à´¯à´¾à´³à´' : 'English';
    currentLang = lang;
  }

  langToggle.addEventListener('click', () => {
    applyLanguage(currentLang === 'en' ? 'ml' : 'en');
  });

  // Run English on load
  applyLanguage('en');


  /* âââââââââââââââââââââââââââââââââââââââ
     SCROLL REVEAL ANIMATION
  âââââââââââââââââââââââââââââââââââââââ */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger siblings in the same parent
          const siblings = entry.target.parentElement
            ? Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'))
            : [];
          const delay = siblings.indexOf(entry.target) * 110;

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Math.max(0, delay));

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.10, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });


  /* âââââââââââââââââââââââââââââââââââââââ
     SMOOTH SCROLL for nav links
  âââââââââââââââââââââââââââââââââââââââ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* âââââââââââââââââââââââââââââââââââââââ
     ACTIVE NAV LINK on scroll
  âââââââââââââââââââââââââââââââââââââââ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#main-nav a[href^="#"]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - header.offsetHeight - 80;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.style.color      = '';
      link.style.background = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color      = 'white';
        link.style.background = 'rgba(255,255,255,0.15)';
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });


  /* âââââââââââââââââââââââââââââââââââââââ
     GALLERY VIDEO â lazy load
  âââââââââââââââââââââââââââââââââââââââ */
  const galleryVideos = document.querySelectorAll('.gallery-video');
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          // Preload when in view
          video.preload = 'auto';
          videoObserver.unobserve(video);
        }
      });
    },
    { threshold: 0.1 }
  );
  galleryVideos.forEach(v => videoObserver.observe(v));


  /* âââââââââââââââââââââââââââââââââââââââ
     ENQUIRY FORM
  âââââââââââââââââââââââââââââââââââââââ */
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent  = currentLang === 'en' ? 'â Sent! We\'ll be in touch.' : 'â à´à´¯à´àµà´àµ! à´à´àµà´àµ¾ à´¬à´¨àµà´§à´ªàµà´ªàµà´àµà´.';
      btn.style.background = '#16a34a';
      btn.disabled = true;

      // Show success message
      if (formSuccess) {
        formSuccess.style.display = 'block';
        formSuccess.textContent = currentLang === 'en'
          ? 'â Thank you! We\'ll be in touch soon.'
          : 'â à´¨à´¨àµà´¦à´¿! à´à´àµà´àµ¾ à´à´àµ» à´¬à´¨àµà´§à´ªàµà´ªàµà´àµà´.';
      }

      setTimeout(() => {
        btn.textContent       = originalText;
        btn.style.background  = '';
        btn.disabled          = false;
        if (formSuccess) formSuccess.style.display = 'none';
        form.reset();
      }, 5000);
    });
  }


  /* âââââââââââââââââââââââââââââââââââââââ
     IMAGE ERROR HANDLING
     Gracefully hide broken images
  âââââââââââââââââââââââââââââââââââââââ */
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
      this.style.display = 'none';
      // If this is the hero fallback, make the hero-video-wrap show a gradient fallback
      if (this.id === 'hero-fallback-img') {
        const wrap = document.querySelector('.hero-video-wrap');
        if (wrap) wrap.style.background = 'linear-gradient(160deg, #0a1628 0%, #103265 60%, #1e6fc0 100%)';
      }
      // If strip image fails, hide the whole strip
      if (this.classList.contains('strip-img')) {
        const strip = document.querySelector('.hero-image-strip');
        if (strip) strip.style.display = 'none';
      }
      // If gallery photo fails, hide that card
      if (this.classList.contains('gallery-img')) {
        const card = this.closest('.gallery-photo');
        if (card) card.style.display = 'none';
      }
    });
  });


  /* âââââââââââââââââââââââââââââââââââââââ
     ORBIT ANIMATION PAUSE on hover
  âââââââââââââââââââââââââââââââââââââââ */
  document.querySelectorAll('.orbit').forEach(orbit => {
    orbit.addEventListener('mouseenter', () => {
      orbit.style.animationPlayState = 'paused';
    });
    orbit.addEventListener('mouseleave', () => {
      orbit.style.animationPlayState = 'running';
    });
  });



  /* ═══════════════════════════════════════
     CARD SHUFFLE ANIMATION
  ═══════════════════════════════════════ */
  (function () {
    const stack = document.querySelector('.about-card-stack');
    if (!stack) return;
    const cards = [
      stack.querySelector('.card-1'),
      stack.querySelector('.card-2'),
      stack.querySelector('.card-3'),
    ];
    let order = [2, 0, 1];

    function shuffle() {
      const [front, mid, back] = order;
      cards[front].classList.add('card-shuffle-out');
      setTimeout(() => {
        cards.forEach(c =>
          c.classList.remove('card-shuffle-out', 'card-shuffle-in', 'card-shuffle-back')
        );
        order = [mid, back, front];
        applyLayout();
      }, 1100);
    }

    function applyLayout() {
      const [front, mid] = order;
      cards.forEach(c => { c.style.zIndex = ''; });
      cards[front].classList.add('card-shuffle-in');
      cards[mid].classList.add('card-shuffle-back');
    }

    // Continuous loop — never stops
    setInterval(shuffle, 4000);
  })();

})();
