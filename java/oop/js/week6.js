// Week 6: Polymorphism - Interactive Demonstrations

let polymorphismShown = false;

// Animate page load
document.addEventListener("DOMContentLoaded", function () {
  // Style overload cards
  const cards = document.querySelectorAll(".overload-card");

  cards.forEach((card) => {
    card.style.cssText = `
            background: linear-gradient(135deg, #F8F9FA, #E9ECEF);
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            border: 2px solid #E9ECEF;
            cursor: pointer;
            transition: all 0.3s ease;
        `;

    const signature = card.querySelector(".method-signature");
    signature.style.cssText = `
            color: #5B8DBE;
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 10px;
            font-family: monospace;
        `;

    const params = card.querySelector(".method-params");
    params.style.cssText = `
            color: #6C757D;
            font-size: 13px;
            margin-bottom: 15px;
            font-family: monospace;
        `;

    const result = card.querySelector(".method-result");
    result.style.cssText = `
            background: white;
            color: #2ECC71;
            padding: 12px;
            border-radius: 8px;
            font-size: 20px;
            font-weight: bold;
            box-shadow: inset 0 2px 5px rgba(0,0,0,0.1);
        `;

    // Hover effect
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.borderColor = "#5B8DBE";
      this.style.boxShadow = "0 5px 15px rgba(91,141,190,0.3)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.borderColor = "#E9ECEF";
      this.style.boxShadow = "none";
    });
  });
});

// Draw Shape (Runtime Polymorphism)
function drawShape(shapeType) {
  if (!polymorphismShown) {
    // First time - show the polymorphism visualization
    showPolymorphismFlow(shapeType);
    polymorphismShown = true;
  } else {
    // Just update the shape
    updateShape(shapeType);
  }
}

function showPolymorphismFlow(shapeType) {
  // Animate reference type
  anime({
    targets: "#shapeRef",
    opacity: [0, 1],
    translateX: [-30, 0],
    duration: 600,
    easing: "easeOutExpo",
  });

  // Animate arrow
  setTimeout(() => {
    anime({
      targets: "#arrow",
      opacity: [0, 1],
      scale: [0.5, 1],
      duration: 500,
      easing: "easeOutElastic(1, .8)",
    });
  }, 400);

  // Animate actual object
  setTimeout(() => {
    const objectTypeEl = document.getElementById("objectType");
    objectTypeEl.textContent = capitalize(shapeType);

    anime({
      targets: "#actualObject",
      opacity: [0, 1],
      translateX: [30, 0],
      duration: 600,
      easing: "easeOutExpo",
    });
  }, 700);

  // Draw the shape
  setTimeout(() => {
    updateShape(shapeType);
  }, 1200);
}

function updateShape(shapeType) {
  const display = document.getElementById("shapeDisplay");
  const text = document.getElementById("shapeText");

  let emoji = "";
  let message = "";

  switch (shapeType) {
    case "circle":
      emoji = "⭕";
      message = "Drawing a circle";
      document.getElementById("objectType").textContent = "Circle";
      break;
    case "square":
      emoji = "⬛";
      message = "Drawing a square";
      document.getElementById("objectType").textContent = "Square";
      break;
    case "triangle":
      emoji = "🔺";
      message = "Drawing a triangle";
      document.getElementById("objectType").textContent = "Triangle";
      break;
  }

  // Animate shape appearance
  display.textContent = "";
  text.textContent = "";

  anime({
    targets: "#drawingArea",
    background: ["#FFFFFF", "#E3F2FD", "#FFFFFF"],
    duration: 500,
    easing: "easeInOutQuad",
    complete: function () {
      display.textContent = emoji;
      text.textContent = message;

      anime({
        targets: [display, text],
        opacity: [0, 1],
        scale: [0.5, 1],
        duration: 600,
        easing: "easeOutElastic(1, .8)",
      });
    },
  });

  markModuleComplete(6);
}

function clearCanvas() {
  const display = document.getElementById("shapeDisplay");
  const text = document.getElementById("shapeText");

  anime({
    targets: [display, text],
    opacity: [1, 0],
    scale: [1, 0.5],
    duration: 400,
    easing: "easeInExpo",
    complete: function () {
      display.textContent = "";
      text.textContent = "";
    },
  });

  if (polymorphismShown) {
    anime({
      targets: "#shapeRef, #arrow, #actualObject",
      opacity: [1, 0],
      duration: 400,
      easing: "easeInExpo",
      complete: function () {
        polymorphismShown = false;
      },
    });
  }
}

// Method Overloading Demo
function callAdd(type, ...args) {
  const resultEl = document.getElementById("result-" + type);
  let result;

  switch (type) {
    case "int2":
      result = args[0] + args[1];
      break;
    case "int3":
      result = args[0] + args[1] + args[2];
      break;
    case "double":
      result = (args[0] + args[1]).toFixed(1);
      break;
    case "string":
      result = args[0] + args[1];
      break;
  }

  // Animate result
  anime({
    targets: resultEl,
    scale: [1, 1.3, 1],
    duration: 500,
    easing: "easeInOutQuad",
    begin: function () {
      resultEl.textContent = result;
      resultEl.style.color = "#2ECC71";
    },
  });

  // Pulse the card
  const card = resultEl.closest(".overload-card");
  anime({
    targets: card,
    scale: [1, 1.05, 1],
    duration: 400,
    easing: "easeInOutQuad",
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
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
      '<div class="quiz-result correct">✅ Benar! Overloading: nama sama parameter beda (compile-time). Overriding: subclass mengubah method parent (runtime).</div>';

    anime({
      targets: element,
      scale: [1, 1.05, 1],
      duration: 500,
      easing: "easeInOutQuad",
    });
  } else {
    element.classList.add("incorrect");
    resultDiv.innerHTML =
      '<div class="quiz-result incorrect">❌ Kurang tepat. Pelajari kembali perbedaan overloading dan overriding!</div>';
  }

  anime({
    targets: resultDiv,
    opacity: [0, 1],
    translateY: [-10, 0],
    duration: 400,
    easing: "easeOutExpo",
  });
}
