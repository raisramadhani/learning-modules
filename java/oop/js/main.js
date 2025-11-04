// Main JavaScript for OOP Java Learning Website

document.addEventListener("DOMContentLoaded", function () {
  // Animate hero logo on homepage
  if (document.querySelector(".animated-java-logo")) {
    animateHeroLogo();
  }

  // Animate module cards on homepage
  if (document.querySelector(".modules-grid")) {
    animateModuleCards();
  }

  // Update progress
  updateProgress();
});

function animateHeroLogo() {
  const timeline = anime.timeline({
    easing: "easeOutExpo",
    duration: 1000,
  });

  timeline
    .add({
      targets: ".code-bracket.left",
      opacity: [0, 1],
      translateX: [-50, 0],
      rotate: [-45, 0],
    })
    .add(
      {
        targets: ".java-text",
        opacity: [0, 1],
        scale: [0.5, 1],
        rotate: [180, 0],
      },
      "-=500"
    )
    .add(
      {
        targets: ".code-bracket.right",
        opacity: [0, 1],
        translateX: [50, 0],
        rotate: [45, 0],
      },
      "-=700"
    );
}

function animateModuleCards() {
  const cards = document.querySelectorAll(".module-card");

  anime({
    targets: cards,
    opacity: [0, 1],
    translateY: [50, 0],
    delay: anime.stagger(100, { start: 300 }),
    easing: "easeOutCubic",
    duration: 800,
  });
}

function updateProgress() {
  const completed = getCompletedModules();
  const total = 6; // Total modules
  const percentage = (completed.length / total) * 100;

  if (document.getElementById("progressFill")) {
    setTimeout(() => {
      document.getElementById("progressFill").style.width = percentage + "%";
    }, 500);

    if (document.querySelector(".progress-text")) {
      document.querySelector(
        ".progress-text"
      ).textContent = `${completed.length} dari ${total} modul selesai`;
    }
  }
}

function getCompletedModules() {
  const completed = localStorage.getItem("completedModules");
  return completed ? JSON.parse(completed) : [];
}

function markModuleComplete(weekNumber) {
  let completed = getCompletedModules();
  if (!completed.includes(weekNumber)) {
    completed.push(weekNumber);
    localStorage.setItem("completedModules", JSON.stringify(completed));
  }
}

function isModuleComplete(weekNumber) {
  return getCompletedModules().includes(weekNumber);
}

// Smooth scroll for anchor links
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
