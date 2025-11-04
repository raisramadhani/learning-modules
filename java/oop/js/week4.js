// Week 4: Inheritance - Interactive Demonstrations

let treeShown = false;

// Animate animal cards on load
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".animal-card");

  cards.forEach((card, index) => {
    card.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            border: 3px solid #E9ECEF;
            cursor: pointer;
            transition: all 0.3s ease;
            min-width: 180px;
        `;

    card.querySelector(".animal-icon").style.fontSize = "60px";
    card.querySelector("h4").style.cssText =
      "color: #5B8DBE; margin: 15px 0 10px 0;";
    card.querySelector("p").style.cssText =
      "color: #6C757D; font-size: 14px; margin-bottom: 10px;";

    const soundOutput = card.querySelector(".sound-output");
    soundOutput.style.cssText = `
            margin-top: 15px;
            padding: 10px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: bold;
            min-height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

    // Hover effect
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.borderColor = "#5B8DBE";
      this.style.boxShadow = "0 8px 20px rgba(91,141,190,0.3)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.borderColor = "#E9ECEF";
      this.style.boxShadow = "0 3px 10px rgba(0,0,0,0.1)";
    });
  });
});

// Play Sound (Method Overriding Demo)
function playSound(animal) {
  const soundEl = document.getElementById("sound-" + animal);
  let message = "";
  let bgColor = "";

  switch (animal) {
    case "animal":
      message = "🔊 Animal makes a sound";
      bgColor = "#E9ECEF";
      break;
    case "dog":
      message = "🔊 Woof! Woof!";
      bgColor = "#D4EDDA";
      break;
    case "cat":
      message = "🔊 Meow! Meow!";
      bgColor = "#D4EDDA";
      break;
  }

  soundEl.textContent = message;
  soundEl.style.background = bgColor;
  soundEl.style.color = "#2C3E50";

  // Animate sound
  anime({
    targets: soundEl,
    scale: [0, 1],
    opacity: [0, 1],
    duration: 400,
    easing: "easeOutElastic(1, .8)",
  });

  // Pulse animation for icon
  const card = document.querySelector(`[data-animal="${animal}"]`);
  const icon = card.querySelector(".animal-icon");

  anime({
    targets: icon,
    scale: [1, 1.3, 1],
    rotate: [-10, 10, 0],
    duration: 600,
    easing: "easeInOutQuad",
  });

  markModuleComplete(4);
}

// Inheritance Tree Visualization
function showInheritanceTree() {
  if (treeShown) {
    resetTree();
    setTimeout(showInheritanceTree, 400);
    return;
  }

  treeShown = true;
  const svg = document.getElementById("treeSVG");
  const width = svg.clientWidth;
  const height = 400;

  // Clear previous content
  svg.innerHTML = "";

  // Define nodes
  const nodes = [
    { id: "animal", x: width / 2, y: 50, label: "Animal", color: "#5B8DBE" },
    { id: "dog", x: width / 2 - 150, y: 200, label: "Dog", color: "#2ECC71" },
    { id: "cat", x: width / 2 + 150, y: 200, label: "Cat", color: "#F39C12" },
  ];

  // Draw connections (lines)
  const lines = [
    { from: "animal", to: "dog" },
    { from: "animal", to: "cat" },
  ];

  lines.forEach((line) => {
    const fromNode = nodes.find((n) => n.id === line.from);
    const toNode = nodes.find((n) => n.id === line.to);

    const lineEl = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    lineEl.setAttribute("x1", fromNode.x);
    lineEl.setAttribute("y1", fromNode.y + 40);
    lineEl.setAttribute("x2", toNode.x);
    lineEl.setAttribute("y2", toNode.y - 40);
    lineEl.setAttribute("stroke", "#6C757D");
    lineEl.setAttribute("stroke-width", "3");
    lineEl.setAttribute("stroke-dasharray", "1000");
    lineEl.setAttribute("stroke-dashoffset", "1000");
    lineEl.classList.add("tree-line");

    svg.appendChild(lineEl);
  });

  // Animate lines
  anime({
    targets: ".tree-line",
    strokeDashoffset: [1000, 0],
    duration: 1000,
    easing: "easeInOutQuad",
    delay: 300,
  });

  // Draw nodes
  nodes.forEach((node, index) => {
    // Create group
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.classList.add("tree-node");
    group.style.opacity = "0";

    // Circle
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", node.x);
    circle.setAttribute("cy", node.y);
    circle.setAttribute("r", "40");
    circle.setAttribute("fill", node.color);
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "4");

    // Text
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", node.x);
    text.setAttribute("y", node.y + 5);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "white");
    text.setAttribute("font-size", "16");
    text.setAttribute("font-weight", "bold");
    text.textContent = node.label;

    // Inheritance label
    if (node.id !== "animal") {
      const inheritText = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      inheritText.setAttribute("x", node.x);
      inheritText.setAttribute("y", node.y + 65);
      inheritText.setAttribute("text-anchor", "middle");
      inheritText.setAttribute("fill", "#6C757D");
      inheritText.setAttribute("font-size", "12");
      inheritText.setAttribute("font-style", "italic");
      inheritText.textContent = "extends Animal";
      group.appendChild(inheritText);
    }

    group.appendChild(circle);
    group.appendChild(text);
    svg.appendChild(group);
  });

  // Animate nodes
  anime({
    targets: ".tree-node",
    opacity: [0, 1],
    scale: [0, 1],
    duration: 600,
    delay: anime.stagger(200, { start: 500 }),
    easing: "easeOutElastic(1, .8)",
  });
}

function resetTree() {
  const svg = document.getElementById("treeSVG");

  anime({
    targets: ".tree-node, .tree-line",
    opacity: [1, 0],
    scale: [1, 0],
    duration: 400,
    easing: "easeInExpo",
    complete: function () {
      svg.innerHTML = "";
      treeShown = false;
    },
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
      '<div class="quiz-result correct">✅ Benar! Keyword super digunakan untuk mengakses method atau constructor dari superclass.</div>';

    anime({
      targets: element,
      scale: [1, 1.05, 1],
      duration: 500,
      easing: "easeInOutQuad",
    });
  } else {
    element.classList.add("incorrect");
    resultDiv.innerHTML =
      '<div class="quiz-result incorrect">❌ Kurang tepat. Pelajari kembali tentang penggunaan keyword super!</div>';
  }

  anime({
    targets: resultDiv,
    opacity: [0, 1],
    translateY: [-10, 0],
    duration: 400,
    easing: "easeOutExpo",
  });
}
