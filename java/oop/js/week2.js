// Week 2: Variables & Data Types - Interactive Demonstrations

// Animate data type cards on load
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".data-type-card");

  // Style cards
  cards.forEach((card, index) => {
    card.style.cssText = `
            background: white;
            padding: 25px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            border: 2px solid #E9ECEF;
            transition: all 0.3s ease;
            cursor: pointer;
            opacity: 0;
            transform: translateY(20px);
        `;

    card.querySelector(".type-icon").style.fontSize = "36px";
    card.querySelector("h4").style.cssText =
      "color: #5B8DBE; margin: 10px 0; font-size: 20px;";
    card.querySelector(".range").style.cssText =
      "color: #6C757D; font-size: 13px; margin-top: 5px;";

    // Hover effect
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.borderColor = "#5B8DBE";
      this.style.boxShadow = "0 5px 20px rgba(91,141,190,0.3)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.borderColor = "#E9ECEF";
      this.style.boxShadow = "0 3px 10px rgba(0,0,0,0.1)";
    });
  });

  // Animate cards
  anime({
    targets: cards,
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(100),
    duration: 600,
    easing: "easeOutExpo",
  });
});

// Variable Demo
function changeVariable(name, type, value) {
  const varName = document.getElementById("varName");
  const varType = document.getElementById("varType");
  const varValue = document.getElementById("varValue");
  const varBox = document.getElementById("variableBox");

  // Animate out
  anime({
    targets: varBox,
    scale: [1, 0.8],
    opacity: [1, 0.5],
    duration: 300,
    easing: "easeInQuad",
    complete: function () {
      // Change values
      varName.textContent = name;
      varType.textContent = type;
      varValue.textContent = value;

      // Change color based on type
      let color;
      switch (type) {
        case "int":
        case "byte":
        case "short":
        case "long":
          color = "linear-gradient(135deg, #5B8DBE, #4A7BA7)";
          break;
        case "float":
        case "double":
          color = "linear-gradient(135deg, #2ECC71, #27AE60)";
          break;
        case "String":
          color = "linear-gradient(135deg, #E74C3C, #C0392B)";
          break;
        case "boolean":
          color = "linear-gradient(135deg, #9B59B6, #8E44AD)";
          break;
        case "char":
          color = "linear-gradient(135deg, #F39C12, #E67E22)";
          break;
      }

      varBox.querySelector("div").style.background = color;

      // Animate in
      anime({
        targets: varBox,
        scale: [0.8, 1],
        opacity: [0.5, 1],
        duration: 500,
        easing: "easeOutElastic(1, .8)",
      });
    },
  });

  // Mark module complete
  markModuleComplete(2);
}

// Autoboxing & Unboxing Demo
let boxingState = "idle";

function demonstrateAutoboxing() {
  if (boxingState !== "idle") {
    resetBoxing();
    setTimeout(demonstrateAutoboxing, 300);
    return;
  }

  boxingState = "autoboxing";
  const container = document.getElementById("boxingDemo");
  container.innerHTML = "";

  // Create primitive box
  const primitiveBox = document.createElement("div");
  primitiveBox.id = "primitiveBox";
  primitiveBox.style.cssText = `
        background: #5B8DBE;
        color: white;
        padding: 30px 40px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
  primitiveBox.innerHTML = `
        <div style="font-size: 14px; opacity: 0.8;">Primitif</div>
        <div style="font-size: 32px; font-weight: bold; margin: 10px 0;">100</div>
        <div style="font-size: 16px; font-weight: bold;">int</div>
    `;

  container.appendChild(primitiveBox);

  // Animate primitive
  anime({
    targets: primitiveBox,
    opacity: [0, 1],
    scale: [0.5, 1],
    duration: 600,
    easing: "easeOutExpo",
  });

  // Create arrow
  setTimeout(() => {
    const arrow = document.createElement("div");
    arrow.id = "convertArrow";
    arrow.style.cssText = `
            font-size: 48px;
            color: #F89820;
            align-self: center;
        `;
    arrow.textContent = "→";
    container.appendChild(arrow);

    anime({
      targets: arrow,
      opacity: [0, 1],
      translateX: [-30, 0],
      duration: 500,
    });
  }, 700);

  // Create wrapper box
  setTimeout(() => {
    const wrapperBox = document.createElement("div");
    wrapperBox.id = "wrapperBox";
    wrapperBox.style.cssText = `
            background: linear-gradient(135deg, #F39C12, #E67E22);
            color: white;
            padding: 30px 40px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            border: 3px dashed white;
        `;
    wrapperBox.innerHTML = `
            <div style="font-size: 14px; opacity: 0.8;">Wrapper Class</div>
            <div style="font-size: 32px; font-weight: bold; margin: 10px 0;">100</div>
            <div style="font-size: 16px; font-weight: bold;">Integer</div>
        `;

    container.appendChild(wrapperBox);

    anime({
      targets: wrapperBox,
      opacity: [0, 1],
      scale: [0.5, 1],
      rotate: [180, 0],
      duration: 800,
      easing: "easeOutElastic(1, .8)",
    });
  }, 1200);
}

function demonstrateUnboxing() {
  if (boxingState !== "idle") {
    resetBoxing();
    setTimeout(demonstrateUnboxing, 300);
    return;
  }

  boxingState = "unboxing";
  const container = document.getElementById("boxingDemo");
  container.innerHTML = "";

  // Create wrapper box
  const wrapperBox = document.createElement("div");
  wrapperBox.id = "wrapperBox";
  wrapperBox.style.cssText = `
        background: linear-gradient(135deg, #F39C12, #E67E22);
        color: white;
        padding: 30px 40px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        border: 3px dashed white;
    `;
  wrapperBox.innerHTML = `
        <div style="font-size: 14px; opacity: 0.8;">Wrapper Class</div>
        <div style="font-size: 32px; font-weight: bold; margin: 10px 0;">200</div>
        <div style="font-size: 16px; font-weight: bold;">Integer</div>
    `;

  container.appendChild(wrapperBox);

  anime({
    targets: wrapperBox,
    opacity: [0, 1],
    scale: [0.5, 1],
    duration: 600,
    easing: "easeOutExpo",
  });

  // Create arrow
  setTimeout(() => {
    const arrow = document.createElement("div");
    arrow.id = "convertArrow";
    arrow.style.cssText = `
            font-size: 48px;
            color: #F89820;
            align-self: center;
        `;
    arrow.textContent = "→";
    container.appendChild(arrow);

    anime({
      targets: arrow,
      opacity: [0, 1],
      translateX: [-30, 0],
      duration: 500,
    });
  }, 700);

  // Create primitive box
  setTimeout(() => {
    const primitiveBox = document.createElement("div");
    primitiveBox.id = "primitiveBox";
    primitiveBox.style.cssText = `
            background: #5B8DBE;
            color: white;
            padding: 30px 40px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
    primitiveBox.innerHTML = `
            <div style="font-size: 14px; opacity: 0.8;">Primitif</div>
            <div style="font-size: 32px; font-weight: bold; margin: 10px 0;">200</div>
            <div style="font-size: 16px; font-weight: bold;">int</div>
        `;

    container.appendChild(primitiveBox);

    anime({
      targets: primitiveBox,
      opacity: [0, 1],
      scale: [0.5, 1],
      rotate: [-180, 0],
      duration: 800,
      easing: "easeOutElastic(1, .8)",
    });
  }, 1200);
}

function resetBoxing() {
  const container = document.getElementById("boxingDemo");
  const elements = container.children;

  anime({
    targets: elements,
    opacity: [1, 0],
    scale: [1, 0.5],
    duration: 300,
    easing: "easeInExpo",
    complete: function () {
      container.innerHTML = "";
      boxingState = "idle";
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
      '<div class="quiz-result correct">✅ Benar! Primitif menyimpan nilai langsung di memori, sedangkan non-primitif menyimpan referensi ke objek.</div>';

    anime({
      targets: element,
      scale: [1, 1.05, 1],
      duration: 500,
      easing: "easeInOutQuad",
    });
  } else {
    element.classList.add("incorrect");
    resultDiv.innerHTML =
      '<div class="quiz-result incorrect">❌ Kurang tepat. Pelajari kembali perbedaan tipe primitif dan non-primitif!</div>';
  }

  anime({
    targets: resultDiv,
    opacity: [0, 1],
    translateY: [-10, 0],
    duration: 400,
    easing: "easeOutExpo",
  });
}
