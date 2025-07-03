// DOM Elements
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
const heroButtons = document.querySelectorAll("[data-section]");

// Active section tracking
let activeSection = "home";

// Smooth scrolling function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    updateActiveSection(sectionId);
  }
}

// Update active navigation link
function updateActiveSection(sectionId) {
  activeSection = sectionId;

  // Update nav links
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.dataset.section === sectionId) {
      link.classList.add("active");
    }
  });
}

// Scroll spy functionality
function handleScroll() {
  const sectionIds = ["home", "about", "projects", "skills", "contacts"];
  let currentSection = "home";

  sectionIds.forEach((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      // Check if section is in viewport (with some offset for navbar)
      if (rect.top <= 100 && rect.bottom > 100) {
        currentSection = sectionId;
      }
    }
  });

  if (currentSection !== activeSection) {
    updateActiveSection(currentSection);
  }
}

// Intersection Observer for better performance (alternative to scroll event)
function setupIntersectionObserver() {
  const options = {
    root: null,
    rootMargin: "-50px 0px -50px 0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        if (sectionId && sectionId !== activeSection) {
          updateActiveSection(sectionId);
        }
      }
    });
  }, options);

  // Observe all sections
  sections.forEach((section) => {
    if (section.id) {
      observer.observe(section);
    }
  });
}

// Add hover effects to project cards
function setupProjectCardHovers() {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });
}

// Add hover effects to contact cards
function setupContactCardHovers() {
  const contactCards = document.querySelectorAll(".contact-card");

  contactCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "none";
    });
  });
}

// Add particle animation movement
function animateParticles() {
  const particles = document.querySelectorAll(".particle");

  particles.forEach((particle, index) => {
    // Random movement animation
    setInterval(
      () => {
        const randomX = Math.random() * 20 - 10; // -10 to 10
        const randomY = Math.random() * 20 - 10; // -10 to 10

        particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
      },
      2000 + index * 500,
    ); // Stagger the animations
  });
}

// Add typing effect to hero title (optional enhancement)
function addTypingEffect() {
  const heroTitle = document.querySelector(".hero-title");
  if (!heroTitle) return;

  const text = heroTitle.textContent;
  heroTitle.textContent = "";
  heroTitle.style.borderRight = "2px solid #6366f1";

  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 150);
    } else {
      // Remove cursor after typing is complete
      setTimeout(() => {
        heroTitle.style.borderRight = "none";
      }, 1000);
    }
  }

  // Start typing after a short delay
  setTimeout(typeWriter, 500);
}

// Add fade-in animation for sections
function setupFadeInAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Add initial styles and observe elements
  const fadeElements = document.querySelectorAll(
    ".project-card, .skill-card, .contact-card, .about-card",
  );

  fadeElements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    fadeObserver.observe(element);
  });
}

// Handle button clicks with animation
function setupButtonAnimations() {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255, 255, 255, 0.3)";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple 0.6s linear";
      ripple.style.pointerEvents = "none";

      button.style.position = "relative";
      button.style.overflow = "hidden";
      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize all functionality
function init() {
  // Set up navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const sectionId = link.dataset.section;
      scrollToSection(sectionId);
    });
  });

  // Set up hero buttons
  heroButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sectionId = button.dataset.section;
      scrollToSection(sectionId);
    });
  });

  // Set up scroll spy with Intersection Observer
  setupIntersectionObserver();

  // Fallback to scroll event for older browsers
  window.addEventListener("scroll", handleScroll);

  // Set up hover effects
  setupProjectCardHovers();
  setupContactCardHovers();

  // Set up animations
  animateParticles();
  setupFadeInAnimations();
  setupButtonAnimations();

  // Optional: Add typing effect to hero title
  // addTypingEffect();

  // Set initial active section
  updateActiveSection("home");

  console.log("🚀 Portfolio initialized successfully!");
}

// Initialize when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Add smooth scroll polyfill for older browsers
if (!CSS.supports("scroll-behavior", "smooth")) {
  // Polyfill for smooth scrolling
  function smoothScrollPolyfill(target, duration = 800) {
    const targetElement = document.getElementById(target);
    if (!targetElement) return;

    const start = window.pageYOffset;
    const targetTop = targetElement.offsetTop - 80; // Account for navbar
    const distance = targetTop - start;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, start, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  // Override the scrollToSection function for older browsers
  const originalScrollToSection = window.scrollToSection;
  window.scrollToSection = function (sectionId) {
    smoothScrollPolyfill(sectionId);
    updateActiveSection(sectionId);
  };
}

// Handle resize events
window.addEventListener("resize", () => {
  // Re-calculate scroll positions if needed
  handleScroll();
});

// Add keyboard navigation
document.addEventListener("keydown", (e) => {
  const sectionIds = ["home", "about", "projects", "skills", "contacts"];
  const currentIndex = sectionIds.indexOf(activeSection);

  if (e.key === "ArrowDown" || e.key === "PageDown") {
    e.preventDefault();
    const nextIndex = Math.min(currentIndex + 1, sectionIds.length - 1);
    scrollToSection(sectionIds[nextIndex]);
  } else if (e.key === "ArrowUp" || e.key === "PageUp") {
    e.preventDefault();
    const prevIndex = Math.max(currentIndex - 1, 0);
    scrollToSection(sectionIds[prevIndex]);
  } else if (e.key === "Home") {
    e.preventDefault();
    scrollToSection("home");
  } else if (e.key === "End") {
    e.preventDefault();
    scrollToSection("contacts");
  }
});
