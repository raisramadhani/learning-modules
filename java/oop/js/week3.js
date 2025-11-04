// Week 3: Penguatan & Encapsulation - Interactive Demonstrations

let currentBalance = 1000000;
let scopeAnimated = false;

// Animate page load
document.addEventListener("DOMContentLoaded", function () {
  // Animate access modifier cards
  const cards = document.querySelectorAll(".access-modifier-card");

  cards.forEach((card) => {
    card.style.cssText = `
            background: white;
            padding: 25px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            border: 2px solid #E9ECEF;
            transition: all 0.3s ease;
        `;

    // Style access levels
    const levels = card.querySelectorAll(".level");
    levels.forEach((level) => {
      level.style.cssText = `
                background: #F8F9FA;
                padding: 5px 10px;
                margin: 3px;
                border-radius: 5px;
                font-size: 12px;
                color: #6C757D;
            `;
    });

    const activeLevels = card.querySelectorAll(".level.active");
    activeLevels.forEach((level) => {
      level.style.cssText = `
                background: #2ECC71;
                padding: 5px 10px;
                margin: 3px;
                border-radius: 5px;
                font-size: 12px;
                color: white;
                font-weight: bold;
            `;
    });

    card.querySelector(".access-level").style.cssText = `
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 15px;
        `;
  });

  // Animate cards
  anime({
    targets: ".access-modifier-card",
    opacity: [0, 1],
    translateY: [30, 0],
    delay: anime.stagger(150),
    duration: 600,
    easing: "easeOutExpo",
  });
});

// Scope Animation
function animateScope() {
  if (scopeAnimated) {
    resetScope();
    setTimeout(animateScope, 400);
    return;
  }

  scopeAnimated = true;

  // Animate static variable
  anime({
    targets: "#staticVar",
    opacity: [0, 1],
    translateX: [-30, 0],
    duration: 600,
    easing: "easeOutExpo",
  });

  // Animate instance variables
  setTimeout(() => {
    anime({
      targets: "#instanceVars",
      opacity: [0, 1],
      translateX: [-30, 0],
      duration: 600,
      easing: "easeOutExpo",
    });
  }, 400);

  // Animate local variable
  setTimeout(() => {
    anime({
      targets: "#localVar",
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 600,
      easing: "easeOutElastic(1, .8)",
    });
  }, 800);

  markModuleComplete(3);
}

function resetScope() {
  anime({
    targets: "#staticVar, #instanceVars, #localVar",
    opacity: [1, 0],
    duration: 300,
    easing: "easeInExpo",
    complete: function () {
      scopeAnimated = false;
    },
  });
}

// Bank Account Demo
function formatRupiah(amount) {
  return "Rp " + amount.toLocaleString("id-ID");
}

function depositMoney() {
  const input = document.getElementById("amountInput");
  const amount = parseInt(input.value);
  const message = document.getElementById("transactionMessage");

  if (isNaN(amount) || amount <= 0) {
    showMessage("❌ Jumlah harus positif!", "error");
    return;
  }

  // Animate balance change
  const balanceEl = document.getElementById("accountBalance");

  anime({
    targets: balanceEl,
    scale: [1, 1.2, 1],
    duration: 500,
    easing: "easeInOutQuad",
    begin: function () {
      currentBalance += amount;
    },
    complete: function () {
      balanceEl.textContent = formatRupiah(currentBalance);
    },
  });

  showMessage("✅ Deposit berhasil! +" + formatRupiah(amount), "success");
  input.value = "";
}

function withdrawMoney() {
  const input = document.getElementById("amountInput");
  const amount = parseInt(input.value);
  const message = document.getElementById("transactionMessage");

  if (isNaN(amount) || amount <= 0) {
    showMessage("❌ Jumlah harus positif!", "error");
    return;
  }

  if (amount > currentBalance) {
    showMessage("❌ Saldo tidak cukup!", "error");

    // Shake animation
    anime({
      targets: "#accountBalance",
      translateX: [
        { value: -10, duration: 100 },
        { value: 10, duration: 100 },
        { value: -10, duration: 100 },
        { value: 10, duration: 100 },
        { value: 0, duration: 100 },
      ],
      easing: "easeInOutQuad",
    });

    return;
  }

  // Animate balance change
  const balanceEl = document.getElementById("accountBalance");

  anime({
    targets: balanceEl,
    scale: [1, 0.9, 1],
    duration: 500,
    easing: "easeInOutQuad",
    begin: function () {
      currentBalance -= amount;
    },
    complete: function () {
      balanceEl.textContent = formatRupiah(currentBalance);
    },
  });

  showMessage("✅ Penarikan berhasil! -" + formatRupiah(amount), "success");
  input.value = "";
}

function showMessage(text, type) {
  const message = document.getElementById("transactionMessage");
  message.textContent = text;
  message.style.display = "block";

  if (type === "success") {
    message.style.background = "#D4EDDA";
    message.style.color = "#28A745";
  } else {
    message.style.background = "#F8D7DA";
    message.style.color = "#E76E50";
  }

  // Animate message
  anime({
    targets: message,
    opacity: [0, 1],
    translateY: [-10, 0],
    duration: 400,
    easing: "easeOutExpo",
  });

  // Hide after 3 seconds
  setTimeout(() => {
    anime({
      targets: message,
      opacity: [1, 0],
      duration: 400,
      easing: "easeInExpo",
      complete: function () {
        message.style.display = "none";
      },
    });
  }, 3000);
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
      '<div class="quiz-result correct">✅ Benar! Enkapsulasi melindungi data dan memberikan kontrol akses melalui getter/setter.</div>';

    anime({
      targets: element,
      scale: [1, 1.05, 1],
      duration: 500,
      easing: "easeInOutQuad",
    });
  } else {
    element.classList.add("incorrect");
    resultDiv.innerHTML =
      '<div class="quiz-result incorrect">❌ Kurang tepat. Pelajari kembali tentang tujuan enkapsulasi!</div>';
  }

  anime({
    targets: resultDiv,
    opacity: [0, 1],
    translateY: [-10, 0],
    duration: 400,
    easing: "easeOutExpo",
  });
}
