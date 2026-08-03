/* ═══════════════════════════════════════════
   ACTION SCHOOL — MAIN SCRIPT
   Features: Nav scroll, mobile menu,
             scroll reveal animations,
             hero video + sound toggle,
             form submission
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── State ──────────────────────────── */
  let videoMuted  = true;

  /* ─── DOM Refs ────────────────────────── */
  const header         = document.getElementById('site-header');
  const menuToggle     = document.getElementById('menu-toggle');
  const mainNav        = document.getElementById('main-nav');
  const form           = document.getElementById('enquiry-form');
  const heroVideo      = document.getElementById('hero-video');
  const soundBtn       = document.getElementById('video-sound-btn');
  const soundOffIcon   = document.getElementById('sound-off-icon');
  const soundOnIcon    = document.getElementById('sound-on-icon');
  const formSuccess    = document.getElementById('form-success');


  /* ═══════════════════════════════════════
     HEADER — scroll class
  ═══════════════════════════════════════ */
  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ═══════════════════════════════════════
     HERO VIDEO — load handling
  ═══════════════════════════════════════ */
  if (heroVideo) {
    // Mark video as loaded when it starts playing
    heroVideo.addEventListener('canplay', () => {
      heroVideo.classList.add('loaded');
    });

    // Ensure autoplay (some browsers need a user gesture — we start muted)
    heroVideo.muted = true;
    heroVideo.play().catch(() => {
      // Autoplay blocked — video stays hidden, fallback image shows
    });

    // Sound toggle button
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        videoMuted = !videoMuted;
        heroVideo.muted = videoMuted;

        soundOffIcon.classList.toggle('is-hidden', !videoMuted);
        soundOnIcon.classList.toggle('is-hidden', videoMuted);
        // Resume play if paused
        if (!videoMuted) heroVideo.play().catch(() => {});
      });
    }

    // Subtle parallax on the video wrap
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroVideo.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    }, { passive: true });
  }


  /* ═══════════════════════════════════════
     MOBILE NAV
  ═══════════════════════════════════════ */
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


  /* ═══════════════════════════════════════
     SCROLL REVEAL ANIMATION
  ═══════════════════════════════════════ */
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


  /* ═══════════════════════════════════════
     SMOOTH SCROLL for nav links
  ═══════════════════════════════════════ */
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


  /* ═══════════════════════════════════════
     ACTIVE NAV LINK on scroll
  ═══════════════════════════════════════ */
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


  /* ═══════════════════════════════════════
     GALLERY VIDEO — lazy load
  ═══════════════════════════════════════ */
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


  /* ═══════════════════════════════════════
     ENQUIRY FORM
  ═══════════════════════════════════════ */
  // Submissions are delivered to info@actionschool.in via FormSubmit.co (AJAX endpoint).
  // NOTE: the very first submission triggers a one-time activation email to
  // info@actionschool.in — click the link in it to start receiving enquiries.
  const FORM_ENDPOINT = 'https://formsubmit.co/ajax/info@actionschool.in';

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      const data = new FormData(form);

      // Basic validation (form has novalidate)
      if (!String(data.get('name') || '').trim() || !String(data.get('contact') || '').trim()) {
        if (formSuccess) {
          formSuccess.classList.remove('is-hidden');
          formSuccess.textContent = '⚠️ Please fill in your name and email/phone.';
        }
        return;
      }

      // Honeypot filled → silently drop (bot)
      if (String(data.get('_honey') || '').trim()) return;

      data.append('_subject', 'New enquiry from actionschool.in');
      data.append('_template', 'table');

      btn.textContent = 'Sending…';
      btn.disabled = true;

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' },
      })
        .then(res => {
          if (!res.ok) throw new Error('Request failed: ' + res.status);
          return res.json();
        })
        .then(() => {
          btn.textContent = '✓ Sent! We\'ll be in touch.';
          btn.style.background = '#16a34a';
          if (formSuccess) {
            formSuccess.classList.remove('is-hidden');
            formSuccess.textContent = '✅ Thank you! We\'ll be in touch soon.';
          }
          form.reset();
        })
        .catch(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          if (formSuccess) {
            formSuccess.classList.remove('is-hidden');
            formSuccess.textContent = '⚠️ Could not send right now. Please email info@actionschool.in or use WhatsApp.';
          }
        })
        .finally(() => {
          setTimeout(() => {
            btn.textContent      = originalText;
            btn.style.background = '';
            btn.disabled         = false;
            if (formSuccess) formSuccess.classList.add('is-hidden');
          }, 6000);
        });
    });
  }


  /* ═══════════════════════════════════════
     IMAGE ERROR HANDLING
     Gracefully hide broken images
  ═══════════════════════════════════════ */
  // (v1.3.1) Removed selectors for elements deleted in earlier releases
  // (#hero-fallback-img, .strip-img/.hero-image-strip, .gallery-img/.gallery-photo)
  // — resolves the UAT "selector mismatch in gallery" finding.
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
      this.style.display = 'none';
    });
  });


  /* ═══════════════════════════════════════
     ORBIT ANIMATION PAUSE on hover
  ═══════════════════════════════════════ */
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
    // Order: [front, middle, back] — card-3 starts on top
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
