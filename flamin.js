/**
 * @file This script provides interactivity for the Flamin'Pizza Co website.
 * @summary It handles the preloader, navigation menu, header behavior, hero slider, and other UI enhancements.
 * @author [Your Name/Company]
 * @version 1.0.0
 */

'use strict';

(function () {
  /**
   * ---------------------------------------------------------------------
   * HELPER FUNCTION: Add event listener on multiple elements
   * ---------------------------------------------------------------------
   * A utility function to attach an event listener to an array or NodeList of elements.
   * @param {NodeList|Array} elements - The elements to attach the event to.
   * @param {string} eventType - The type of event (e.g., 'click').
   * @param {function} callback - The function to execute when the event fires.
   */
  const addEventOnElements = (elements, eventType, callback) => {
    elements.forEach(el => el.addEventListener(eventType, callback));
  };

  /**
   * Execute scripts after the DOM has fully loaded to ensure all elements are available.
   */
  document.addEventListener('DOMContentLoaded', function () {
    /**
     * ---------------------------------------------------------------------
     * PRELOADER
     * ---------------------------------------------------------------------
     * Hides the preloader animation once the page content has fully loaded.
     */
    const preloader = document.querySelector('[data-preload]');

    window.addEventListener('load', function () {
      if (preloader) {
        preloader.classList.add('loaded');
      }
      document.body.classList.add('loaded');
    });

    /**
     * ---------------------------------------------------------------------
     * HEADER & MOBILE NAVIGATION
     * ---------------------------------------------------------------------
     * Handles the mobile navigation toggle and the header's sticky/hide behavior on scroll.
     */
    const navbar = document.querySelector('[data-navbar]');
    const navTogglers = document.querySelectorAll('[data-nav-toggler]');
    const overlay = document.querySelector('[data-overlay]');
    const navLinks = document.querySelectorAll('.navbar-link');

    // Function to toggle the mobile navigation menu
    const toggleNavbar = function () {
      navbar.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.classList.toggle('nav-active');
    };

    addEventOnElements(navTogglers, 'click', toggleNavbar);

    // Close the mobile menu when a navigation link is clicked
    addEventOnElements(navLinks, 'click', function () {
      if (navbar.classList.contains('active')) {
        toggleNavbar();
      }
    });

    // Header scroll behavior
    const header = document.querySelector('[data-header]');
    let lastScrollPos = 0;

    const handleHeaderScroll = function () {
      const isScrollBottom = lastScrollPos < window.scrollY;

      if (isScrollBottom) {
        header.classList.add('hide'); // Hide on scroll down
      } else {
        header.classList.remove('hide'); // Show on scroll up
      }

      lastScrollPos = window.scrollY;
    };

    window.addEventListener('scroll', function () {
      if (window.scrollY >= 50) {
        header.classList.add('active'); // Add sticky/styled class
        handleHeaderScroll();
      } else {
        header.classList.remove('active'); // Remove sticky class
      }
    });

    /**
     * ---------------------------------------------------------------------
     * HERO SLIDER
     * ---------------------------------------------------------------------
     * Manages the functionality of the main hero image slider, including auto-sliding.
     */
    const heroSliderItems = document.querySelectorAll('[data-hero-slider-item]');

    if (heroSliderItems.length > 0) {
      let currentSlidePos = 0;
      let lastActiveSliderItem = heroSliderItems[0];
      let autoSlideInterval;

      // Function to update the active slide
      const updateSliderPos = function () {
        if (lastActiveSliderItem) {
          lastActiveSliderItem.classList.remove('active');
        }
        heroSliderItems[currentSlidePos].classList.add('active');
        lastActiveSliderItem = heroSliderItems[currentSlidePos];
      };

      // Function to move to the next slide
      const slideNext = function () {
        currentSlidePos = (currentSlidePos >= heroSliderItems.length - 1) ? 0 : currentSlidePos + 1;
        updateSliderPos();
      };

      // Function to start the auto-sliding mechanism
      const startAutoSlide = function () {
        autoSlideInterval = setInterval(slideNext, 7000); // 7 seconds per slide
      };

      // Stop auto-sliding (useful if adding manual controls later)
      const stopAutoSlide = function () {
        clearInterval(autoSlideInterval);
      };
      
      // Initialize the slider on window load
      window.addEventListener('load', startAutoSlide);
    }
    
    /**
     * ---------------------------------------------------------------------
     * MISCELLANEOUS UI ENHANCEMENTS
     * ---------------------------------------------------------------------
     */

    // Smooth scroll to the hero section on page load for a nice entry effect
    window.addEventListener('load', () => {
      setTimeout(() => {
        const hero = document.getElementById('home');
        if (hero) {
          hero.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    });

    // Note: The 'Back to Top' button functionality from the original script
    // was commented out in the provided HTML. If you add it back,
    // the following code will make it work.
    /*
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      // Optional: Show/hide button based on scroll position
      window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      });
    }
    */
  });
})();