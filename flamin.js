'use strict';

/**--------preloader--------------- */
// Select the preloader element using a data attribute
const preloader = document.querySelector("[data-preload]");

// Listen for the window 'load' event, which fires when the entire page (images, scripts, etc.) has fully loaded
window.addEventListener("load", function () {
  // If the preloader element exists
  if (preloader) {
    // Add the 'loaded' class to trigger hiding or animation of the preloader
    preloader.classList.add("loaded");
  }
  // Add 'loaded' class to the body, often used to enable page content or trigger animations
  document.body.classList.add("loaded");
});





/**--------add event listener on multiple elements--------------- */

// Adds an event listener to multiple elements at once
const addEventOnElements = (elements, eventType, callback) => {
  // Loop through each element in the NodeList or array
  elements.forEach(el => 
    // Attach the specified event listener and callback function to each element
    el.addEventListener(eventType, callback)
  );
}







 /*--------navbar close-btn icon and open-btn 3 lines-----------------*/
/*link navbar left with section */
document.querySelectorAll('.navbar-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.navbar').classList.remove('active');
    document.querySelector('.header').classList.remove('active');
  });
});


 
// Select the main navigation menu using the data attribute
const navbar = document.querySelector("[data-navbar]");

// Select all elements that should toggle the navbar (e.g., open & close buttons)
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

// Select the overlay element that covers the page when the menu is open
const overlay = document.querySelector("[data-overlay]");

// Function to toggle the 'active' state of navbar, overlay, and body
const toggleNavbar = function () {
  navbar.classList.toggle("active");        // Show/hide the navbar
  overlay.classList.toggle("active");       // Show/hide the dark background overlay
  document.body.classList.toggle("nav-active"); // Optional: prevent page scrolling
};

// Add the toggleNavbar function to all nav toggler buttons (open/close)
addEventOnElements(navTogglers, "click", toggleNavbar);






/*----------- Header-----------------------*/

// Select the header element using a data attribute
const header = document.querySelector("[data-header]");

// Track the previous scroll position to detect scroll direction
let lastScrollPos = 0;

// Function to show/hide header based on scroll direction
const hideHeader = function () {
  // Check if user is scrolling down
  const isScrollBottom = lastScrollPos < window.scrollY;

  if (isScrollBottom) {
    // Hide header when scrolling down
    header.classList.add("hide");
  } else {
    // Show header when scrolling up
    header.classList.remove("hide");
  }

  // Update the last scroll position
  lastScrollPos = window.scrollY;
};

// Listen for window scroll events
window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    // When scrolled more than 50px, make the header active (e.g., sticky or styled)
    header.classList.add("active");

    // Call function to hide/show header based on scroll direction
    hideHeader();
  } else {
    // Remove active styling when back at the top of the page
    header.classList.remove("active");
  }
});


/*----------- Hero-----------------------*/

const heroSlider = document.querySelector("[data-hero-slider]");

const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");

const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");

const heroSliderNextBtn = document.querySelector("[data-next-btn]");


let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function (){
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function (){
  if (currentSlidePos>= heroSliderItems.length -1){
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}




/**
 * auto slide bellow
 */

let autoSlideInterval;

const autoSlide = function (){
  autoSlideInterval = setInterval(function() {
    slideNext();
  }, 7000);
}


window.addEventListener("load", autoSlide);


/** Button go to top */
document.addEventListener('DOMContentLoaded', function () {
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});





window.addEventListener('load', () => {
  setTimeout(() => {
    const hero = document.getElementById("home");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    }
  }, 150);
});
