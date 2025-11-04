// Week 1: Class & Object - Interactive Demonstrations

let carCount = 0;
const carColors = ["#E74C3C", "#3498DB", "#2ECC71", "#F39C12", "#9B59B6"];
const carBrands = ["Toyota", "Honda", "Suzuki", "Nissan", "Mazda"];

// Animate page load
document.addEventListener("DOMContentLoaded", function () {
  // Animate blueprint
  anime({
    targets: "#blueprint",
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 1000,
    easing: "easeOutElastic(1, .8)",
  });

  // Show arrow after blueprint
  setTimeout(() => {
    anime({
      targets: "#arrow",
      opacity: [0, 1],
      translateX: [-50, 0],
      duration: 800,
      easing: "easeOutExpo",
    });
  }, 500);
});

// Create Car Object Demo
function createCarObject() {
  if (carCount >= 3) {
    alert("Maksimal 3 objek mobil! Klik Reset untuk membuat lagi.");
    return;
  }

  const container = document.getElementById("objectsContainer");
  const color = carColors[carCount % carColors.length];
  const brand = carBrands[carCount % carBrands.length];
  carCount++;

  // Create object element
  const objectDiv = document.createElement("div");
  objectDiv.className = "car-object";
  objectDiv.style.cssText = `
        background: ${color};
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        min-width: 180px;
        text-align: center;
        opacity: 0;
        transform: scale(0.5);
    `;

  objectDiv.innerHTML = `
        <div style="font-size: 40px; margin-bottom: 10px;">🚗</div>
        <h4 style="margin-bottom: 10px;">Objek: mobil${carCount}</h4>
        <div style="font-size: 13px; text-align: left;">
            <p><strong>warna:</strong> ${color}</p>
            <p><strong>merk:</strong> ${brand}</p>
            <p><strong>kecepatan:</strong> 0</p>
        </div>
    `;

  container.appendChild(objectDiv);

  // Animate object creation
  anime({
    targets: objectDiv,
    opacity: [0, 1],
    scale: [0.5, 1],
    rotate: [180, 0],
    duration: 800,
    easing: "easeOutElastic(1, .8)",
  });

  // Mark module as complete after interaction
  if (carCount === 1) {
    markModuleComplete(1);
  }
}

function resetObjects() {
  const container = document.getElementById("objectsContainer");
  const objects = container.querySelectorAll(".car-object");

  anime({
    targets: objects,
    opacity: [1, 0],
    scale: [1, 0.5],
    rotate: [0, -180],
    duration: 500,
    easing: "easeInExpo",
    complete: function () {
      container.innerHTML = "";
      carCount = 0;
    },
  });
}

// Memory Demonstration
let memoryStep = 0;

function demonstrateMemory() {
  if (memoryStep > 0) {
    clearMemory();
    return;
  }

  memoryStep = 1;
  const stackContent = document.getElementById("stackContent");
  const heapContent = document.getElementById("heapContent");

  // Step 1: Show reference in Stack
  setTimeout(() => {
    const stackVar = document.createElement("div");
    stackVar.id = "stackVar";
    stackVar.style.cssText = `
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin-top: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            border-left: 4px solid #5B8DBE;
        `;
    stackVar.innerHTML = `
            <strong>mobil1</strong><br>
            <span style="color: #F89820;">→ 0x7A3F (referensi)</span>
        `;
    stackContent.appendChild(stackVar);

    anime({
      targets: stackVar,
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 600,
      easing: "easeOutExpo",
    });
  }, 300);

  // Step 2: Show object in Heap
  setTimeout(() => {
    const heapObj = document.createElement("div");
    heapObj.id = "heapObj";
    heapObj.style.cssText = `
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin-top: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            border-left: 4px solid #F89820;
        `;
    heapObj.innerHTML = `
            <strong style="color: #F89820;">Objek Mobil [0x7A3F]</strong><br>
            <div style="font-size: 13px; margin-top: 8px;">
                warna: "Merah"<br>
                merk: "Toyota"<br>
                kecepatan: 0
            </div>
        `;
    heapContent.appendChild(heapObj);

    anime({
      targets: heapObj,
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 600,
      easing: "easeOutExpo",
    });
  }, 900);

  // Step 3: Show connection animation
  setTimeout(() => {
    anime({
      targets: "#stackVar",
      backgroundColor: ["#FFFFFF", "#E3F2FD", "#FFFFFF"],
      duration: 1500,
      easing: "easeInOutQuad",
      loop: 3,
    });

    anime({
      targets: "#heapObj",
      backgroundColor: ["#FFFFFF", "#FFF3E0", "#FFFFFF"],
      duration: 1500,
      easing: "easeInOutQuad",
      loop: 3,
    });
  }, 1500);
}

function clearMemory() {
  const stackContent = document.getElementById("stackContent");
  const heapContent = document.getElementById("heapContent");

  anime({
    targets: "#stackVar, #heapObj",
    opacity: [1, 0],
    translateY: [0, 20],
    duration: 400,
    easing: "easeInExpo",
    complete: function () {
      stackContent.innerHTML = "";
      heapContent.innerHTML = "";
      memoryStep = 0;
    },
  });
}

// Quiz functionality
function checkAnswer(element, isCorrect, quizId) {
  const options = document
    .getElementById(quizId)
    .querySelectorAll(".quiz-option");
  const resultDiv = document.getElementById(quizId + "Result");

  // Disable all options
  options.forEach((opt) => {
    opt.style.pointerEvents = "none";
  });

  // Show result
  if (isCorrect) {
    element.classList.add("correct");
    resultDiv.innerHTML =
      '<div class="quiz-result correct">✅ Benar! Class adalah template, Object adalah instance dari class.</div>';

    // Celebrate animation
    anime({
      targets: element,
      scale: [1, 1.05, 1],
      duration: 500,
      easing: "easeInOutQuad",
    });
  } else {
    element.classList.add("incorrect");
    resultDiv.innerHTML =
      '<div class="quiz-result incorrect">❌ Kurang tepat. Coba baca kembali materi tentang Class dan Object!</div>';
  }

  // Animate result
  anime({
    targets: resultDiv,
    opacity: [0, 1],
    translateY: [-10, 0],
    duration: 400,
    easing: "easeOutExpo",
  });
}
