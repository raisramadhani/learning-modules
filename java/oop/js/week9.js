document.addEventListener("DOMContentLoaded", function () {
  animatePageLoad();
  compareStrings();
});

function animatePageLoad() {
  anime({
    targets: ".content-section",
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 1000,
    delay: anime.stagger(100),
    easing: "easeOutExpo",
  });

  anime({
    targets: ".visualization-box",
    scale: [0.95, 1],
    opacity: [0, 1],
    duration: 1000,
    delay: 200,
    easing: "easeOutExpo",
  });
}

function demonstrateImmutability(operation) {
  const display = document.getElementById("stringOperationDisplay");
  const memoryState = document.getElementById("memoryState");

  let originalString = "Hello";
  let resultString = "";
  let code = "";

  switch (operation) {
    case "concat":
      resultString = originalString + " World";
      code = 'String str = "Hello";\nstr = str + " World";';
      break;
    case "replace":
      resultString = originalString.replace("l", "L");
      code = 'String str = "Hello";\nstr = str.replace("l", "L");';
      break;
    case "uppercase":
      resultString = originalString.toUpperCase();
      code = 'String str = "Hello";\nstr = str.toUpperCase();';
      break;
  }

  display.innerHTML = `
        <div style="margin-bottom: 15px;">
            <strong style="color: #5B8DBE;">Kode:</strong>
            <pre style="background: #F8F9FA; padding: 10px; border-radius: 5px; margin-top: 5px; font-size: 13px;">${code}</pre>
        </div>
        <div>
            <strong style="color: #2C3E50;">Original String:</strong> 
            <span style="color: #E76E50; font-weight: bold;">"${originalString}"</span>
        </div>
        <div style="margin-top: 10px;">
            <strong style="color: #2C3E50;">Result String:</strong> 
            <span style="color: #2ECC71; font-weight: bold;">"${resultString}"</span>
        </div>
    `;

  memoryState.innerHTML = `
        <div style="padding: 15px; background: white; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <div style="color: #E76E50; font-weight: bold; margin-bottom: 5px;">Object 1 (Original):</div>
            <div style="font-family: monospace; color: #6C757D;">"${originalString}"</div>
            <div style="font-size: 12px; color: #6C757D; margin-top: 5px;">Memory: 0x1A2B</div>
        </div>
        <div style="padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <div style="color: #2ECC71; font-weight: bold; margin-bottom: 5px;">Object 2 (New):</div>
            <div style="font-family: monospace; color: #6C757D;">"${resultString}"</div>
            <div style="font-size: 12px; color: #6C757D; margin-top: 5px;">Memory: 0x3C4D</div>
        </div>
        <div style="margin-top: 15px; padding: 10px; background: #FFF3CD; border-radius: 5px; font-size: 13px; color: #856404;">
            Objek original tetap ada! Modifikasi membuat objek baru.
        </div>
    `;

  anime({
    targets: "#stringOperationDisplay, #memoryState",
    scale: [0.95, 1],
    opacity: [0, 1],
    duration: 600,
    easing: "easeOutExpo",
  });
}

let poolStrings = [];
let heapStrings = [];

function createStringDemo(type) {
  const poolDisplay = document.getElementById("stringPoolDisplay");
  const heapDisplay = document.getElementById("heapDisplay");
  const explanation = document.getElementById("poolExplanation");

  let message = "";

  switch (type) {
    case "literal":
      if (!poolStrings.includes("Hello")) {
        poolStrings.push("Hello");
      }
      message =
        'String str = "Hello"; - Disimpan di String Pool (atau reuse jika sudah ada)';
      break;

    case "new":
      heapStrings.push("Hello");
      message =
        'String str = new String("Hello"); - Membuat objek baru di Heap Memory';
      break;

    case "intern":
      if (!poolStrings.includes("Hello")) {
        poolStrings.push("Hello");
      }
      message =
        'String str = new String("Hello").intern(); - Dipindahkan ke String Pool';
      break;
  }

  poolDisplay.innerHTML = poolStrings
    .map(
      (str, index) => `
        <div style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 8px; margin-bottom: 10px; animation: fadeIn 0.5s;">
            <div style="font-family: monospace; font-size: 14px;">"${str}"</div>
            <div style="font-size: 11px; opacity: 0.8; margin-top: 5px;">Pool[${index}]</div>
        </div>
    `
    )
    .join("");

  heapDisplay.innerHTML = heapStrings
    .map(
      (str, index) => `
        <div style="background: white; padding: 12px; border-radius: 8px; margin-bottom: 10px; border: 2px solid #E9ECEF; animation: fadeIn 0.5s;">
            <div style="font-family: monospace; font-size: 14px; color: #2C3E50;">"${str}"</div>
            <div style="font-size: 11px; color: #6C757D; margin-top: 5px;">Heap[${index}] - 0x${(
        1000 + index
      )
        .toString(16)
        .toUpperCase()}</div>
        </div>
    `
    )
    .join("");

  if (poolStrings.length === 0) {
    poolDisplay.innerHTML =
      '<div style="text-align: center; opacity: 0.7; font-size: 14px;">String literal akan muncul di sini</div>';
  }

  if (heapStrings.length === 0) {
    heapDisplay.innerHTML =
      '<div style="text-align: center; opacity: 0.7; font-size: 14px; color: #6C757D;">String dengan new akan muncul di sini</div>';
  }

  explanation.innerHTML = `<strong style="color: #5B8DBE;">Penjelasan:</strong> ${message}`;

  anime({
    targets: "#poolExplanation",
    translateY: [-20, 0],
    opacity: [0, 1],
    duration: 600,
    easing: "easeOutExpo",
  });
}

function resetStringDemo() {
  poolStrings = [];
  heapStrings = [];
  createStringDemo("");
  document.getElementById("poolExplanation").innerHTML = "";
}

function compareStrings() {
  const str1 = document.getElementById("compareStr1").value;
  const str2 = document.getElementById("compareStr2").value;
  const resultDiv = document.getElementById("comparisonResult");

  const equalsResult = str1 === str2;
  const equalsIgnoreCaseResult = str1.toLowerCase() === str2.toLowerCase();

  resultDiv.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div style="text-align: center;">
                <div style="font-size: 14px; color: #6C757D; margin-bottom: 10px;">String 1</div>
                <div style="font-family: monospace; font-size: 18px; color: #5B8DBE; font-weight: bold;">"${str1}"</div>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 14px; color: #6C757D; margin-bottom: 10px;">String 2</div>
                <div style="font-family: monospace; font-size: 18px; color: #5B8DBE; font-weight: bold;">"${str2}"</div>
            </div>
        </div>
        
        <div style="border-top: 2px solid #E9ECEF; padding-top: 20px;">
            <div style="display: grid; gap: 15px;">
                <div style="padding: 15px; background: ${
                  equalsResult ? "#D4EDDA" : "#F8D7DA"
                }; border-radius: 8px; border-left: 4px solid ${
    equalsResult ? "#28A745" : "#DC3545"
  };">
                    <div style="font-weight: bold; margin-bottom: 5px; color: #2C3E50;">equals() Result:</div>
                    <div style="font-size: 24px; color: ${
                      equalsResult ? "#28A745" : "#DC3545"
                    }; font-weight: bold;">${equalsResult}</div>
                    <div style="font-size: 13px; color: #6C757D; margin-top: 5px;">Membandingkan isi/konten string</div>
                </div>
                
                <div style="padding: 15px; background: ${
                  equalsIgnoreCaseResult ? "#D4EDDA" : "#F8D7DA"
                }; border-radius: 8px; border-left: 4px solid ${
    equalsIgnoreCaseResult ? "#28A745" : "#DC3545"
  };">
                    <div style="font-weight: bold; margin-bottom: 5px; color: #2C3E50;">equalsIgnoreCase() Result:</div>
                    <div style="font-size: 24px; color: ${
                      equalsIgnoreCaseResult ? "#28A745" : "#DC3545"
                    }; font-weight: bold;">${equalsIgnoreCaseResult}</div>
                    <div style="font-size: 13px; color: #6C757D; margin-top: 5px;">Membandingkan isi tanpa memperhatikan huruf besar/kecil</div>
                </div>
            </div>
        </div>
    `;
}

function manipulateString(operation) {
  const input = document.getElementById("manipulateInput").value;
  const resultDiv = document.getElementById("manipulationResult");
  let result = "";
  let explanation = "";
  let code = "";

  switch (operation) {
    case "length":
      result = input.length;
      explanation = "Menghitung jumlah karakter dalam string";
      code = `text.length()`;
      break;
    case "upper":
      result = input.toUpperCase();
      explanation = "Mengubah semua karakter menjadi huruf besar";
      code = `text.toUpperCase()`;
      break;
    case "lower":
      result = input.toLowerCase();
      explanation = "Mengubah semua karakter menjadi huruf kecil";
      code = `text.toLowerCase()`;
      break;
    case "trim":
      result = input.trim();
      explanation = "Menghapus spasi di awal dan akhir string";
      code = `text.trim()`;
      break;
    case "replace":
      result = input.replace("World", "Java").replace("world", "Java");
      explanation = 'Mengganti kata "World" dengan "Java"';
      code = `text.replace("World", "Java")`;
      break;
    case "substring":
      result = input.substring(0, Math.min(10, input.length));
      explanation = "Mengambil 10 karakter pertama";
      code = `text.substring(0, 10)`;
      break;
  }

  resultDiv.innerHTML = `
        <div style="margin-bottom: 20px;">
            <div style="font-weight: bold; color: #5B8DBE; margin-bottom: 10px;">Method: ${code}</div>
            <div style="font-size: 14px; color: #6C757D; margin-bottom: 15px;">${explanation}</div>
        </div>
        
        <div style="background: #F8F9FA; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
            <div style="font-size: 13px; color: #6C757D; margin-bottom: 5px;">Input:</div>
            <div style="font-family: monospace; color: #2C3E50;">"${input}"</div>
        </div>
        
        <div style="background: #D4EDDA; padding: 15px; border-radius: 8px; border-left: 4px solid #28A745;">
            <div style="font-size: 13px; color: #155724; margin-bottom: 5px;">Result:</div>
            <div style="font-family: monospace; color: #155724; font-weight: bold; font-size: 16px;">${
              typeof result === "number" ? result : '"' + result + '"'
            }</div>
        </div>
    `;

  anime({
    targets: "#manipulationResult",
    scale: [0.98, 1],
    opacity: [0, 1],
    duration: 500,
    easing: "easeOutExpo",
  });
}

function testPerformance(type) {
  const iterations = parseInt(document.getElementById("iterationCount").value);
  const resultDiv = document.getElementById("performanceResult");

  resultDiv.innerHTML =
    '<div style="text-align: center; color: #6C757D;">Testing performance...</div>';

  setTimeout(() => {
    let stringTime = 0;
    let builderTime = 0;

    if (type === "string" || type === "both") {
      const start = performance.now();
      let str = "";
      for (let i = 0; i < iterations; i++) {
        str = str + i;
      }
      stringTime = performance.now() - start;
    }

    if (type === "stringbuilder" || type === "both") {
      const start = performance.now();
      let sb = "";
      for (let i = 0; i < iterations; i++) {
        sb += i;
      }
      builderTime = performance.now() - start;
    }

    let html = `<div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 18px; font-weight: bold; color: #5B8DBE;">Performance Test Results</div>
            <div style="font-size: 14px; color: #6C757D; margin-top: 5px;">${iterations} iterations</div>
        </div>`;

    if (type === "both") {
      const faster = stringTime < builderTime ? "String" : "StringBuilder";
      const percentage = Math.abs(
        ((stringTime - builderTime) / Math.max(stringTime, builderTime)) * 100
      ).toFixed(1);

      html += `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                <div style="padding: 20px; background: #FFF3CD; border-radius: 10px; border-left: 4px solid #F89820;">
                    <div style="font-weight: bold; margin-bottom: 10px; color: #856404;">String (Concatenation)</div>
                    <div style="font-size: 28px; font-weight: bold; color: #856404;">${stringTime.toFixed(
                      2
                    )}ms</div>
                </div>
                <div style="padding: 20px; background: #D4EDDA; border-radius: 10px; border-left: 4px solid #28A745;">
                    <div style="font-weight: bold; margin-bottom: 10px; color: #155724;">StringBuilder</div>
                    <div style="font-size: 28px; font-weight: bold; color: #155724;">${builderTime.toFixed(
                      2
                    )}ms</div>
                </div>
            </div>
            <div style="padding: 15px; background: #E3F2FD; border-radius: 8px; text-align: center;">
                <strong style="color: #5B8DBE;">StringBuilder lebih cepat ${percentage}%</strong>
            </div>
        `;
    } else if (type === "string") {
      html += `
            <div style="padding: 20px; background: #FFF3CD; border-radius: 10px; border-left: 4px solid #F89820; text-align: center;">
                <div style="font-weight: bold; margin-bottom: 10px; color: #856404;">String (Concatenation)</div>
                <div style="font-size: 32px; font-weight: bold; color: #856404;">${stringTime.toFixed(
                  2
                )}ms</div>
            </div>
        `;
    } else {
      html += `
            <div style="padding: 20px; background: #D4EDDA; border-radius: 10px; border-left: 4px solid #28A745; text-align: center;">
                <div style="font-weight: bold; margin-bottom: 10px; color: #155724;">StringBuilder</div>
                <div style="font-size: 32px; font-weight: bold; color: #155724;">${builderTime.toFixed(
                  2
                )}ms</div>
            </div>
        `;
    }

    resultDiv.innerHTML = html;

    anime({
      targets: "#performanceResult",
      scale: [0.95, 1],
      opacity: [0, 1],
      duration: 600,
      easing: "easeOutExpo",
    });
  }, 100);
}

function checkAnswer(element, isCorrect, quizId) {
  const options = document.querySelectorAll(`#${quizId} .quiz-option`);
  const resultDiv = document.getElementById(`${quizId}Result`);

  options.forEach((opt) => {
    opt.style.pointerEvents = "none";
    opt.style.opacity = "0.6";
  });

  if (isCorrect) {
    element.style.background = "#D4EDDA";
    element.style.borderColor = "#28A745";
    element.style.opacity = "1";
    resultDiv.innerHTML =
      '<div style="color: #28A745; font-weight: bold; margin-top: 10px;">Benar! Jawaban Anda tepat.</div>';

    anime({
      targets: element,
      scale: [1, 1.05, 1],
      duration: 500,
      easing: "easeInOutQuad",
    });
  } else {
    element.style.background = "#F8D7DA";
    element.style.borderColor = "#DC3545";
    element.style.opacity = "1";
    resultDiv.innerHTML =
      '<div style="color: #DC3545; font-weight: bold; margin-top: 10px;">Kurang tepat. Coba baca penjelasan di atas.</div>';
  }
}
