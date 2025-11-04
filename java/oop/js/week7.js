// Week 7: Abstraction - Interactive Demonstrations

// Animate page load
document.addEventListener("DOMContentLoaded", function () {
  // Style interface badges
  const badges = document.querySelectorAll(".interface-badge");

  badges.forEach((badge, index) => {
    badge.style.cssText = `
            background: linear-gradient(135deg, #5B8DBE, #4A7BA7);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            font-weight: bold;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            opacity: 0;
        `;
  });

  // Animate badges
  anime({
    targets: ".interface-badge",
    opacity: [0, 1],
    translateY: [-20, 0],
    delay: anime.stagger(150),
    duration: 600,
    easing: "easeOutExpo",
  });

  // Style demo buttons
  const demoBtns = document.querySelectorAll(".demo-btn");
  demoBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      anime({
        targets: this,
        scale: 1.05,
        duration: 200,
        easing: "easeOutQuad",
      });
    });

    btn.addEventListener("mouseleave", function () {
      anime({
        targets: this,
        scale: 1,
        duration: 200,
        easing: "easeOutQuad",
      });
    });
  });
});

// Abstract Action Demo
function abstractAction(action) {
  const feedback = document.getElementById("actionFeedback");
  const details = document.getElementById("implementationDetails");

  let message = "";
  let detailsHTML = "";

  switch (action) {
    case "start":
      message = "✅ Engine Started!";
      detailsHTML = `
                <p><strong>🔧 Hidden Implementation:</strong></p>
                <p>• Check fuel level</p>
                <p>• Ignite spark plugs</p>
                <p>• Start fuel pump</p>
                <p>• Initialize ECU</p>
                <p>• Engage starter motor</p>
                <p style="margin-top: 10px; color: #2ECC71; font-weight: bold;">Complex process simplified to one button!</p>
            `;
      break;
    case "accelerate":
      message = "⚡ Accelerating!";
      detailsHTML = `
                <p><strong>🔧 Hidden Implementation:</strong></p>
                <p>• Inject more fuel</p>
                <p>• Adjust throttle valve</p>
                <p>• Increase RPM</p>
                <p>• Control transmission</p>
                <p>• Monitor engine temperature</p>
                <p style="margin-top: 10px; color: #2ECC71; font-weight: bold;">You just press the pedal!</p>
            `;
      break;
    case "brake":
      message = "🛑 Braking!";
      detailsHTML = `
                <p><strong>🔧 Hidden Implementation:</strong></p>
                <p>• Apply brake pads</p>
                <p>• Activate ABS system</p>
                <p>• Distribute brake force</p>
                <p>• Monitor wheel speed</p>
                <p>• Engage brake assist</p>
                <p style="margin-top: 10px; color: #2ECC71; font-weight: bold;">Simple brake pedal does all this!</p>
            `;
      break;
  }

  // Show feedback
  feedback.textContent = message;
  anime({
    targets: feedback,
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 400,
    easing: "easeOutElastic(1, .8)",
  });

  // Show hidden details
  details.innerHTML = detailsHTML;
  anime({
    targets: "#implementationDetails p",
    opacity: [0, 1],
    translateX: [-20, 0],
    delay: anime.stagger(100),
    duration: 400,
    easing: "easeOutExpo",
  });

  // Pulse effect on hidden view
  anime({
    targets: "#hiddenView",
    borderColor: ["#E9ECEF", "#F89820", "#E9ECEF"],
    duration: 1000,
    easing: "easeInOutQuad",
  });

  markModuleComplete(7);
}

// Show Animal (Multiple Inheritance Demo)
function showAnimal(animalType) {
  const icon = document.getElementById("animalIcon");
  const name = document.getElementById("animalName");
  const capabilities = document.getElementById("animalCapabilities");

  let animalData = {
    duck: {
      icon: "🦆",
      name: "Duck",
      capabilities: ["Flyable ✈️", "Swimmable 🏊", "Walkable 🚶"],
      interfaces: "implements Flyable, Swimmable, Walkable",
    },
    fish: {
      icon: "🐟",
      name: "Fish",
      capabilities: ["Swimmable 🏊"],
      interfaces: "implements Swimmable",
    },
    bird: {
      icon: "🐦",
      name: "Bird",
      capabilities: ["Flyable ✈️", "Walkable 🚶"],
      interfaces: "implements Flyable, Walkable",
    },
    human: {
      icon: "👤",
      name: "Human",
      capabilities: ["Swimmable 🏊", "Walkable 🚶"],
      interfaces: "implements Swimmable, Walkable",
    },
  };

  const animal = animalData[animalType];

  // Animate transition
  anime({
    targets: "#animalDisplay",
    scale: [1, 0.9, 1],
    duration: 500,
    easing: "easeInOutQuad",
    begin: function () {
      icon.textContent = animal.icon;
      name.textContent = animal.name;
      capabilities.innerHTML = `
                <div style="margin: 15px 0;">
                    <strong>Capabilities:</strong><br>
                    ${animal.capabilities.join(" • ")}
                </div>
                <div style="background: #E3F2FD; padding: 12px; border-radius: 8px; margin-top: 15px; font-family: monospace; color: #5B8DBE;">
                    class ${animal.name} ${animal.interfaces}
                </div>
            `;
    },
  });

  // Pulse icon
  anime({
    targets: "#animalIcon",
    scale: [1, 1.2, 1],
    rotate: [-10, 10, 0],
    duration: 600,
    easing: "easeInOutQuad",
  });

  // Highlight active interfaces
  highlightActiveInterfaces(animal.capabilities);
}

function highlightActiveInterfaces(capabilities) {
  const badges = document.querySelectorAll(".interface-badge");

  badges.forEach((badge) => {
    const text = badge.textContent;
    let isActive = false;

    if (
      text.includes("Flyable") &&
      capabilities.some((c) => c.includes("Flyable"))
    ) {
      isActive = true;
    } else if (
      text.includes("Swimmable") &&
      capabilities.some((c) => c.includes("Swimmable"))
    ) {
      isActive = true;
    } else if (
      text.includes("Walkable") &&
      capabilities.some((c) => c.includes("Walkable"))
    ) {
      isActive = true;
    }

    if (isActive) {
      anime({
        targets: badge,
        background: [
          "linear-gradient(135deg, #5B8DBE, #4A7BA7)",
          "linear-gradient(135deg, #2ECC71, #27AE60)",
        ],
        scale: [1, 1.1, 1],
        duration: 500,
        easing: "easeInOutQuad",
      });
    } else {
      anime({
        targets: badge,
        background: [
          "linear-gradient(135deg, #2ECC71, #27AE60)",
          "linear-gradient(135deg, #5B8DBE, #4A7BA7)",
        ],
        scale: [1.1, 1],
        duration: 500,
        easing: "easeInOutQuad",
      });
    }
  });
}

// Quiz functionality
function checkAnswer(element, isCorrect, quizId) {
  const options = document
    .getElementById(quizId)
    .querySelectorAll(".quiz-option");
  const resultDiv = document.getElementById(quizId + "Result");

  options.forEach((opt) => {
    opt.style.pointerEvents = "none";
  });

  if (isCorrect) {
    element.classList.add("correct");
    resultDiv.innerHTML =
      '<div class="quiz-result correct">✅ Benar! Abstract class bisa punya method konkret & constructor, sementara interface hanya kontrak dan support multiple inheritance.</div>';

    anime({
      targets: element,
      scale: [1, 1.05, 1],
      duration: 500,
      easing: "easeInOutQuad",
    });

    // Celebrate with confetti-like animation
    createCelebration();
  } else {
    element.classList.add("incorrect");
    resultDiv.innerHTML =
      '<div class="quiz-result incorrect">❌ Kurang tepat. Pelajari kembali perbedaan abstract class dan interface!</div>';
  }

  anime({
    targets: resultDiv,
    opacity: [0, 1],
    translateY: [-10, 0],
    duration: 400,
    easing: "easeOutExpo",
  });
}

function createCelebration() {
  // Create celebration effect
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.textContent = ["🎉", "✨", "⭐", "🌟"][
      Math.floor(Math.random() * 4)
    ];
    particle.style.cssText = `
            position: fixed;
            font-size: 30px;
            pointer-events: none;
            z-index: 9999;
            left: ${Math.random() * 100}vw;
            top: -50px;
        `;
    document.body.appendChild(particle);

    anime({
      targets: particle,
      translateY: "120vh",
      rotate: Math.random() * 720 - 360,
      opacity: [1, 0],
      duration: 2000 + Math.random() * 1000,
      easing: "easeInCubic",
      complete: function () {
        particle.remove();
      },
    });
  }
}
