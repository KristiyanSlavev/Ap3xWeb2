/* ============================================
   APEX Strategy — Main Application JS
   GSAP Animations, Scroll Reveals, Nav, Counters
   ============================================ */

(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  /* ─────────────────────────────────────────────
     Navigation
     ───────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  // Sticky glass effect on scroll
  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Mobile menu toggle
  navToggle.addEventListener('click', function () {
    this.classList.toggle('is-open');
    navMobile.classList.toggle('is-open');
    document.body.style.overflow = navMobile.classList.contains('is-open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  navMobile.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('is-open');
      navMobile.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = nav.offsetHeight + 16;
        var y = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });


  /* ─────────────────────────────────────────────
     Hero Entrance Animation
     ───────────────────────────────────────────── */
  var heroTl = gsap.timeline({ delay: 0.2 });

  heroTl
    .to('.hero__badge', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out'
    })
    .to('.hero__title', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.45')
    .to('.hero__subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out'
    }, '-=0.4')
    .to('.hero__actions', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.35');


  /* ─────────────────────────────────────────────
     Hero Parallax (subtle)
     ───────────────────────────────────────────── */
  gsap.to('.hero__content', {
    y: 60,
    opacity: 0.3,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.to('.hero__grid', {
    y: 40,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });


  /* ─────────────────────────────────────────────
     Scroll Reveal Observer
     ───────────────────────────────────────────── */
  var revealElements = document.querySelectorAll('[data-reveal]');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ─────────────────────────────────────────────
     Approach Pillars — Stagger reveal
     ───────────────────────────────────────────── */
  gsap.utils.toArray('.approach__pillar').forEach(function (pillar, i) {
    gsap.from(pillar, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      delay: i * 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: pillar,
        start: 'top 85%',
        once: true
      }
    });
  });


  /* ─────────────────────────────────────────────
     Service Cards — Stagger via GSAP
     ───────────────────────────────────────────── */
  gsap.utils.toArray('.services__grid .card').forEach(function (card, i) {
    gsap.from(card, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        once: true
      }
    });
  });


  /* ─────────────────────────────────────────────
     Process Steps — Sequential reveal
     ───────────────────────────────────────────── */
  gsap.utils.toArray('.process__step').forEach(function (step, i) {
    gsap.from(step, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: step,
        start: 'top 85%',
        once: true
      }
    });
  });

})();
