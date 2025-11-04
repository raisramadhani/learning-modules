// Solution Page - Interactive Elements

document.addEventListener("DOMContentLoaded", function () {
  // Floating Navigation Toggle
  const toggleBtn = document.getElementById("toggleNav");
  const navContent = document.getElementById("navContent");

  toggleBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    navContent.classList.toggle("hidden");
    toggleBtn.classList.toggle("collapsed");
  });

  // Highlight active section in floating nav
  const navItems = document.querySelectorAll(".floating-nav .nav-item");
  const contentSections = document.querySelectorAll(".content-section");

  function updateActiveNav() {
    let current = "";
    contentSections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === "#" + current) {
        item.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav(); // Initial call

  // Smooth scroll for floating nav items
  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const offset = 80; // Navbar height
        const targetPosition = targetSection.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Animate sections on scroll
  const sections = document.querySelectorAll(".content-section");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateY(20px)";

        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800,
          easing: "easeOutExpo",
        });

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Animate answer boxes
  const answerBoxes = document.querySelectorAll(".answer-box");
  answerBoxes.forEach((box) => {
    box.style.opacity = "0";
    box.style.transform = "scale(0.95)";
  });

  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add copy button to code blocks
  const codeBlocks = document.querySelectorAll(".code-box");
  codeBlocks.forEach((block) => {
    const button = document.createElement("button");
    button.textContent = "Salin Kode";
    button.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

    block.style.position = "relative";
    block.appendChild(button);

    block.addEventListener("mouseenter", () => {
      button.style.opacity = "1";
    });

    block.addEventListener("mouseleave", () => {
      button.style.opacity = "0";
    });

    button.addEventListener("click", () => {
      const code = block.querySelector("code").textContent;
      navigator.clipboard.writeText(code).then(() => {
        button.textContent = "Tersalin!";
        setTimeout(() => {
          button.textContent = "Salin Kode";
        }, 2000);
      });
    });
  });

  // Highlight key concepts on hover
  const keyConcepts = document.querySelectorAll(".key-concept");
  keyConcepts.forEach((concept) => {
    concept.addEventListener("mouseenter", function () {
      anime({
        targets: this,
        scale: [1, 1.02],
        boxShadow: [
          "0 2px 10px rgba(0,0,0,0.1)",
          "0 5px 20px rgba(91,141,190,0.3)",
        ],
        duration: 300,
        easing: "easeOutQuad",
      });
    });

    concept.addEventListener("mouseleave", function () {
      anime({
        targets: this,
        scale: [1.02, 1],
        boxShadow: [
          "0 5px 20px rgba(91,141,190,0.3)",
          "0 2px 10px rgba(0,0,0,0.1)",
        ],
        duration: 300,
        easing: "easeOutQuad",
      });
    });
  });

  // Animate floating nav on load
  const floatingNav = document.getElementById("floatingNav");
  anime({
    targets: floatingNav,
    translateX: [100, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: "easeOutExpo",
    delay: 500,
  });

  // Pulse animation for floating nav items on hover
  navItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      anime({
        targets: this,
        scale: [1, 1.1],
        duration: 300,
        easing: "easeOutElastic(1, .5)",
      });
    });

    item.addEventListener("mouseleave", function () {
      anime({
        targets: this,
        scale: [1.1, 1],
        duration: 300,
        easing: "easeOutElastic(1, .5)",
      });
    });
  });

  // Progress indicator
  createProgressIndicator();
});

function createProgressIndicator() {
  const progressBar = document.createElement("div");
  progressBar.id = "readingProgress";
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.2s ease;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + "%";
  });
}

// Add intersection observer for answer boxes
const answerObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          opacity: [0, 1],
          scale: [0.95, 1],
          duration: 600,
          delay: 200,
          easing: "easeOutElastic(1, .8)",
        });
        answerObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".answer-box").forEach((box) => {
  answerObserver.observe(box);
});
