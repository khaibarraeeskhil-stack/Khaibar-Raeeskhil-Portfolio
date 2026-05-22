/**
 * ============================================
 * MAIN JAVASCRIPT - Portfolio Website
 * ============================================
 * Handles: Navbar, Mobile Menu, Dark Mode,
 * Typing Effect, Scroll Reveal, Counters,
 * Smooth Scroll, Back to Top, Loading Screen
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {

  'use strict';

  // ==========================================
  // LOADING SCREEN
  // ==========================================
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }, 800);
    });
  }

  // ==========================================
  // NAVBAR - Scroll Effect
  // ==========================================
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // ==========================================
  // NAVBAR - Active Link Highlighting
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavLink() {
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink);

  // ==========================================
  // MOBILE MENU
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  let isMenuOpen = false;

  function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('show');
    const icon = mobileMenuBtn.querySelector('i');
    if (isMenuOpen) {
      icon.className = 'fas fa-times';
    } else {
      icon.className = 'fas fa-bars';
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile menu on link click
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (isMenuOpen) {
        toggleMobileMenu();
      }
    });
  });

  // Close mobile menu on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && isMenuOpen) {
      toggleMobileMenu();
    }
  });

  // ==========================================
  // TYPING EFFECT
  // ==========================================
  const typingText = document.getElementById('typing-text');
  const words = ['Full Stack Software Engineer', 'ASP.NET Core Developer', 'Laravel Developer', 'React Developer'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function typeEffect() {
    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (isPaused) {
      setTimeout(typeEffect, 2000);
      isPaused = false;
      return;
    }

    if (isDeleting) {
      // Deleting
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
        return;
      }

      setTimeout(typeEffect, 50);
    } else {
      // Typing
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        isPaused = true;
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }

      setTimeout(typeEffect, 100);
    }
  }

  // Start typing effect after a delay
  setTimeout(typeEffect, 1500);

  // ==========================================
  // SCROLL REVEAL ANIMATIONS (Intersection Observer)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Also trigger progress bar animation for visible skills
          const progressFills = entry.target.querySelectorAll('.progress-fill');
          progressFills.forEach((bar) => {
            const width = bar.getAttribute('data-width');
            if (width) {
              bar.style.width = width + '%';
            }
          });
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ==========================================
  // ANIMATED COUNTERS (Statistics Section)
  // ==========================================
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // ms
      const step = Math.max(1, Math.floor(target / 60));
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          return;
        }
        counter.textContent = current;
        requestAnimationFrame(updateCounter);
      };

      updateCounter();
    });
  }

  // Observe stats section for counter animation
  const statsSection = document.querySelector('.counter')?.closest('section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statsObserver.observe(statsSection);
  }

  // ==========================================
  // SMOOTH SCROLLING (Nav links)
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // ==========================================
  // BACK TO TOP BUTTON
  // ==========================================
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // ==========================================
  // FOOTER - Current Year
  // ==========================================
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ==========================================
  // PROGRESS BARS for initially visible sections
  // ==========================================
  // Check if skills section is already visible on load
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillsRect = skillsSection.getBoundingClientRect();
    if (skillsRect.top < window.innerHeight) {
      const progressFills = skillsSection.querySelectorAll('.progress-fill');
      progressFills.forEach((bar) => {
        const width = bar.getAttribute('data-width');
        if (width) {
          setTimeout(() => {
            bar.style.width = width + '%';
          }, 500);
        }
      });
    }
  }

}); // End DOMContentLoaded
