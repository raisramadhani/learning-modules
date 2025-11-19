let assertionsEnabled = false;
let balance = 1000;

function simulateException(type) {
  const demoDiv = document.getElementById("exceptionDemo");
  let content = "";

  switch (type) {
    case "arithmetic":
      content = `
                <div class="exception-demo">
                    <h4 style="color: #E76E50; margin-bottom: 15px;">ArithmeticException</h4>
                    <div class="code-box" style="margin-bottom: 20px;">
                        <pre><code>try {
    int result = 10 / 0;
    System.out.println("Result: " + result);
} catch (ArithmeticException e) {
    System.out.println("Error: Tidak bisa bagi dengan nol!");
    System.out.println("Exception: " + e.getMessage());
}</code></pre>
                    </div>
                    <div class="execution-steps" style="margin-top: 20px;">
                        <div class="exec-step" style="background: #E3F2FD; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong style="color: #5B8DBE;">Step 1:</strong> Mencoba eksekusi: <code>int result = 10 / 0;</code>
                        </div>
                        <div class="exec-step" style="background: #FFF3CD; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong style="color: #856404;">Step 2:</strong> ArithmeticException terjadi!
                        </div>
                        <div class="exec-step" style="background: #F8D7DA; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong style="color: #721C24;">Step 3:</strong> Pindah ke catch block
                        </div>
                        <div class="exec-step" style="background: #D4EDDA; padding: 15px; border-radius: 8px;">
                            <strong style="color: #155724;">Output:</strong><br>
                            <code>Error: Tidak bisa bagi dengan nol!<br>Exception: / by zero</code>
                        </div>
                    </div>
                </div>
            `;
      break;

    case "nullpointer":
      content = `
                <div class="exception-demo">
                    <h4 style="color: #E76E50; margin-bottom: 15px;">NullPointerException</h4>
                    <div class="code-box" style="margin-bottom: 20px;">
                        <pre><code>try {
    String text = null;
    int length = text.length();
} catch (NullPointerException e) {
    System.out.println("Error: Objek adalah null!");
    System.out.println("Exception: " + e.getMessage());
}</code></pre>
                    </div>
                    <div class="execution-steps" style="margin-top: 20px;">
                        <div class="exec-step" style="background: #E3F2FD; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong style="color: #5B8DBE;">Step 1:</strong> Variable text = null
                        </div>
                        <div class="exec-step" style="background: #FFF3CD; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong style="color: #856404;">Step 2:</strong> Mencoba akses <code>text.length()</code>
                        </div>
                        <div class="exec-step" style="background: #F8D7DA; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong style="color: #721C24;">Step 3:</strong> NullPointerException terjadi!
                        </div>
                        <div class="exec-step" style="background: #D4EDDA; padding: 15px; border-radius: 8px;">
                            <strong style="color: #155724;">Output:</strong><br>
                            <code>Error: Objek adalah null!<br>Exception: Cannot invoke "String.length()" because "text" is null</code>
                        </div>
                    </div>
                </div>
            `;
      break;

    case "arrayindex":
      content = `
                <div class="exception-demo">
                    <h4 style="color: #E76E50; margin-bottom: 15px;">ArrayIndexOutOfBoundsException</h4>
                    <div class="code-box" style="margin-bottom: 20px;">
                        <pre><code>try {
    int[] numbers = {1, 2, 3};
    int value = numbers[5];
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Error: Index melebihi batas array!");
    System.out.println("Exception: " + e.getMessage());
}</code></pre>
                    </div>
                    <div class="execution-steps" style="margin-top: 20px;">
                        <div class="exec-step" style="background: #E3F2FD; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong style="color: #5B8DBE;">Step 1:</strong> Array numbers = [1, 2, 3] (size: 3)
                        </div>
                        <div class="exec-step" style="background: #FFF3CD; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong style="color: #856404;">Step 2:</strong> Mencoba akses index 5
                        </div>
                        <div class="exec-step" style="background: #F8D7DA; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong style="color: #721C24;">Step 3:</strong> Index 5 tidak ada! (max index: 2)
                        </div>
                        <div class="exec-step" style="background: #D4EDDA; padding: 15px; border-radius: 8px;">
                            <strong style="color: #155724;">Output:</strong><br>
                            <code>Error: Index melebihi batas array!<br>Exception: Index 5 out of bounds for length 3</code>
                        </div>
                    </div>
                </div>
            `;
      break;

    case "numberformat":
      content = `
                <div class="exception-demo">
                    <h4 style="color: #E76E50; margin-bottom: 15px;">NumberFormatException</h4>
                    <div class="code-box" style="margin-bottom: 20px;">
                        <pre><code>try {
    String text = "abc123";
    int number = Integer.parseInt(text);
} catch (NumberFormatException e) {
    System.out.println("Error: Format angka tidak valid!");
    System.out.println("Exception: " + e.getMessage());
}</code></pre>
                    </div>
                    <div class="execution-steps" style="margin-top: 20px;">
                        <div class="exec-step" style="background: #E3F2FD; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong style="color: #5B8DBE;">Step 1:</strong> String text = "abc123"
                        </div>
                        <div class="exec-step" style="background: #FFF3CD; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong style="color: #856404;">Step 2:</strong> Mencoba konversi ke integer
                        </div>
                        <div class="exec-step" style="background: #F8D7DA; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong style="color: #721C24;">Step 3:</strong> "abc123" bukan angka yang valid!
                        </div>
                        <div class="exec-step" style="background: #D4EDDA; padding: 15px; border-radius: 8px;">
                            <strong style="color: #155724;">Output:</strong><br>
                            <code>Error: Format angka tidak valid!<br>Exception: For input string: "abc123"</code>
                        </div>
                    </div>
                </div>
            `;
      break;
  }

  demoDiv.innerHTML = content;

  anime({
    targets: ".exec-step",
    translateX: [-50, 0],
    opacity: [0, 1],
    delay: anime.stagger(200),
    easing: "easeOutExpo",
    duration: 800,
  });
}

function tryCatchFlow(flowType) {
  const flowDiv = document.getElementById("flowVisualization");
  let steps = [];

  switch (flowType) {
    case "success":
      steps = [
        {
          label: "Try Block",
          desc: "int result = 10 / 2;",
          status: "success",
          color: "#E3F2FD",
        },
        {
          label: "Calculation",
          desc: "result = 5",
          status: "success",
          color: "#E3F2FD",
        },
        {
          label: "Catch Block",
          desc: "SKIPPED (no exception)",
          status: "skipped",
          color: "#F5F5F5",
        },
        {
          label: "Finally Block",
          desc: "Always executed",
          status: "success",
          color: "#E8F5E9",
        },
        {
          label: "Continue Program",
          desc: "Program continues normally",
          status: "success",
          color: "#D4EDDA",
        },
      ];
      break;

    case "exception":
      steps = [
        {
          label: "Try Block",
          desc: "int result = 10 / 0;",
          status: "execute",
          color: "#E3F2FD",
        },
        {
          label: "Exception Thrown",
          desc: "ArithmeticException!",
          status: "error",
          color: "#F8D7DA",
        },
        {
          label: "Catch Block",
          desc: "Handle exception",
          status: "handle",
          color: "#FFF3CD",
        },
        {
          label: "Finally Block",
          desc: "Always executed",
          status: "success",
          color: "#E8F5E9",
        },
        {
          label: "Continue Program",
          desc: "Program continues after handling",
          status: "success",
          color: "#D4EDDA",
        },
      ];
      break;

    case "return":
      steps = [
        {
          label: "Try Block",
          desc: 'return "from try";',
          status: "execute",
          color: "#E3F2FD",
        },
        {
          label: "Return Statement",
          desc: "Trying to return...",
          status: "waiting",
          color: "#FFF3CD",
        },
        {
          label: "Finally Block",
          desc: "Executed BEFORE return!",
          status: "important",
          color: "#FFE5CC",
        },
        {
          label: "Actual Return",
          desc: "Now returning value",
          status: "success",
          color: "#D4EDDA",
        },
      ];
      break;
  }

  let content = `<h4 style="text-align: center; color: #5B8DBE; margin-bottom: 25px;">Flow: ${flowType.toUpperCase()}</h4>`;

  steps.forEach((step, index) => {
    content += `
            <div class="flow-step" style="background: ${
              step.color
            }; padding: 20px; border-radius: 10px; margin-bottom: 15px; border-left: 4px solid #5B8DBE; opacity: 0; transform: translateY(20px);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="font-size: 16px;">${index + 1}. ${
      step.label
    }</strong>
                        <p style="margin-top: 8px; color: #495057;">${
                          step.desc
                        }</p>
                    </div>
                    <div style="width: 50px; height: 50px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        ${index + 1}
                    </div>
                </div>
            </div>
        `;
  });

  flowDiv.innerHTML = content;

  anime({
    targets: ".flow-step",
    translateY: [20, 0],
    opacity: [0, 1],
    delay: anime.stagger(300),
    easing: "easeOutExpo",
    duration: 700,
  });
}

function testWithdraw() {
  const amount = parseFloat(document.getElementById("withdrawAmount").value);
  const resultDiv = document.getElementById("withdrawResult");

  if (isNaN(amount)) {
    resultDiv.innerHTML = `
            <div style="background: #F8D7DA; padding: 20px; border-radius: 10px; border-left: 4px solid #DC3545;">
                <strong style="color: #721C24;">Invalid Input!</strong>
                <p style="margin-top: 10px; color: #721C24;">Masukkan angka yang valid</p>
            </div>
        `;
    return;
  }

  let content = "";

  if (amount < 0) {
    content = `
            <div class="withdraw-demo">
                <h4 style="color: #E76E50; margin-bottom: 15px;">IllegalArgumentException</h4>
                <div class="code-box" style="margin-bottom: 15px;">
                    <pre><code>if (amount < 0) {
    throw new IllegalArgumentException("Jumlah tidak boleh negatif");
}</code></pre>
                </div>
                <div style="background: #F8D7DA; padding: 20px; border-radius: 10px; border-left: 4px solid #DC3545;">
                    <strong style="color: #721C24;">Exception Thrown!</strong>
                    <p style="margin-top: 10px; color: #721C24;">IllegalArgumentException: Jumlah tidak boleh negatif (${amount})</p>
                </div>
            </div>
        `;
  } else if (amount > balance) {
    const shortage = amount - balance;
    content = `
            <div class="withdraw-demo">
                <h4 style="color: #E76E50; margin-bottom: 15px;">InsufficientFundsException (Custom)</h4>
                <div class="code-box" style="margin-bottom: 15px;">
                    <pre><code>if (amount > balance) {
    throw new InsufficientFundsException(amount - balance);
}</code></pre>
                </div>
                <div style="background: #FFF3CD; padding: 20px; border-radius: 10px; border-left: 4px solid #F89820;">
                    <strong style="color: #856404;">Custom Exception Thrown!</strong>
                    <p style="margin-top: 10px; color: #856404;">InsufficientFundsException: Saldo tidak cukup</p>
                    <p style="margin-top: 8px; color: #856404;">Saldo saat ini: ${balance}</p>
                    <p style="color: #856404;">Jumlah penarikan: ${amount}</p>
                    <p style="color: #856404; font-weight: bold;">Kekurangan: ${shortage.toFixed(
                      2
                    )}</p>
                </div>
            </div>
        `;
  } else {
    balance -= amount;
    document.getElementById("currentBalance").textContent = balance.toFixed(2);
    content = `
            <div class="withdraw-demo">
                <h4 style="color: #2ECC71; margin-bottom: 15px;">Transaksi Berhasil!</h4>
                <div style="background: #D4EDDA; padding: 20px; border-radius: 10px; border-left: 4px solid #28A745;">
                    <strong style="color: #155724;">Penarikan Sukses</strong>
                    <p style="margin-top: 10px; color: #155724;">Jumlah penarikan: ${amount.toFixed(
                      2
                    )}</p>
                    <p style="margin-top: 8px; color: #155724;">Saldo baru: ${balance.toFixed(
                      2
                    )}</p>
                </div>
                <div class="code-box" style="margin-top: 15px;">
                    <pre><code>try {
    balance -= amount;
    System.out.println("Penarikan berhasil");
} catch (InsufficientFundsException e) {
    // Not executed
}</code></pre>
                </div>
            </div>
        `;
  }

  resultDiv.innerHTML = content;

  anime({
    targets: ".withdraw-demo",
    scale: [0.95, 1],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 600,
  });
}

function resetBalance() {
  balance = 1000;
  document.getElementById("currentBalance").textContent = balance;
  document.getElementById("withdrawAmount").value = "500";
  document.getElementById("withdrawResult").innerHTML = `
        <div style="text-align: center; color: #6C757D;">Balance direset ke 1000. Masukkan jumlah penarikan...</div>
    `;

  anime({
    targets: "#currentBalance",
    scale: [1.5, 1],
    color: ["#E76E50", "#2ECC71"],
    easing: "easeOutElastic(1, .6)",
    duration: 1000,
  });
}

function toggleAssertions(enable) {
  assertionsEnabled = enable;
  const statusSpan = document.getElementById("assertionStatus");

  if (enable) {
    statusSpan.textContent = "Enabled (-ea)";
    statusSpan.style.color = "#2ECC71";
  } else {
    statusSpan.textContent = "Disabled";
    statusSpan.style.color = "#E76E50";
  }

  anime({
    targets: "#assertionStatus",
    scale: [1.3, 1],
    easing: "easeOutElastic(1, .6)",
    duration: 800,
  });
}

function testAssertion() {
  const value = parseInt(document.getElementById("assertValue").value);
  const resultDiv = document.getElementById("assertionResult");

  if (isNaN(value)) {
    resultDiv.innerHTML = `
            <div style="background: #F8D7DA; padding: 20px; border-radius: 10px; border-left: 4px solid #DC3545;">
                <strong style="color: #721C24;">Invalid Input!</strong>
                <p style="margin-top: 10px; color: #721C24;">Masukkan angka yang valid</p>
            </div>
        `;
    return;
  }

  let content = "";

  if (!assertionsEnabled) {
    content = `
            <div class="assertion-demo">
                <h4 style="color: #6C757D; margin-bottom: 15px;">Assertions Disabled</h4>
                <div class="code-box" style="margin-bottom: 15px;">
                    <pre><code>public void setValue(int value) {
    assert value >= 0 : "Value must be non-negative: " + value;
    this.value = value;
}</code></pre>
                </div>
                <div style="background: #E9ECEF; padding: 20px; border-radius: 10px; border-left: 4px solid #6C757D;">
                    <strong style="color: #495057;">Assertion IGNORED</strong>
                    <p style="margin-top: 10px; color: #495057;">Input value: ${value}</p>
                    <p style="margin-top: 8px; color: #495057;">Assertions dinonaktifkan (default behavior)</p>
                    <p style="margin-top: 8px; color: #495057; font-style: italic;">Assertion tidak diperiksa, nilai diterima meskipun ${
                      value < 0 ? "negatif" : "valid"
                    }</p>
                </div>
            </div>
        `;
  } else {
    if (value < 0) {
      content = `
                <div class="assertion-demo">
                    <h4 style="color: #E76E50; margin-bottom: 15px;">AssertionError!</h4>
                    <div class="code-box" style="margin-bottom: 15px;">
                        <pre><code>assert value >= 0 : "Value must be non-negative: " + value;</code></pre>
                    </div>
                    <div style="background: #F8D7DA; padding: 20px; border-radius: 10px; border-left: 4px solid #DC3545; margin-bottom: 15px;">
                        <strong style="color: #721C24;">AssertionError Thrown!</strong>
                        <p style="margin-top: 10px; color: #721C24;">Input value: ${value}</p>
                        <p style="margin-top: 8px; color: #721C24; font-weight: bold;">Exception: java.lang.AssertionError: Value must be non-negative: ${value}</p>
                    </div>
                    <div style="background: #FFF3CD; padding: 15px; border-radius: 10px;">
                        <strong style="color: #856404;">Program Terminated</strong>
                        <p style="margin-top: 8px; color: #856404; font-size: 14px;">Assertion error tidak ditangani, program berhenti</p>
                    </div>
                </div>
            `;
    } else {
      content = `
                <div class="assertion-demo">
                    <h4 style="color: #2ECC71; margin-bottom: 15px;">Assertion Passed!</h4>
                    <div class="code-box" style="margin-bottom: 15px;">
                        <pre><code>assert value >= 0 : "Value must be non-negative: " + value;
this.value = value; // Executed</code></pre>
                    </div>
                    <div style="background: #D4EDDA; padding: 20px; border-radius: 10px; border-left: 4px solid #28A745;">
                        <strong style="color: #155724;">Assertion Success</strong>
                        <p style="margin-top: 10px; color: #155724;">Input value: ${value}</p>
                        <p style="margin-top: 8px; color: #155724;">Kondisi assertion terpenuhi (value >= 0)</p>
                        <p style="margin-top: 8px; color: #155724; font-style: italic;">Program continues normally</p>
                    </div>
                </div>
            `;
    }
  }

  resultDiv.innerHTML = content;

  anime({
    targets: ".assertion-demo",
    scale: [0.95, 1],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 600,
  });
}

function checkAnswer(element, isCorrect, quizId) {
  const options = document.querySelectorAll(`#${quizId} .quiz-option`);
  const resultDiv = document.getElementById(`${quizId}Result`);

  options.forEach((opt) => {
    opt.style.pointerEvents = "none";
    opt.style.opacity = "0.6";
  });

  if (isCorrect) {
    element.style.background =
      "linear-gradient(135deg, #D4EDDA 0%, #C3E6CB 100%)";
    element.style.borderLeft = "5px solid #28A745";
    element.style.opacity = "1";
    resultDiv.innerHTML =
      '<p style="color: #28A745; font-weight: bold; margin-top: 10px;">Benar! Jawaban Anda tepat.</p>';
  } else {
    element.style.background =
      "linear-gradient(135deg, #F8D7DA 0%, #F5C6CB 100%)";
    element.style.borderLeft = "5px solid #DC3545";
    element.style.opacity = "1";
    resultDiv.innerHTML =
      '<p style="color: #DC3545; font-weight: bold; margin-top: 10px;">Salah. Coba baca materi lagi.</p>';
  }

  anime({
    targets: element,
    scale: [1, 1.05, 1],
    easing: "easeInOutQuad",
    duration: 500,
  });
}
