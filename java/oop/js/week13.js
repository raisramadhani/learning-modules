let calcExpression = "";
let calcDisplay = "0";
let eventLogLines = ["> Event Log initialized..."];

function showComponent(type) {
  const demoDiv = document.getElementById("componentDemo");
  let content = "";

  switch (type) {
    case "jframe":
      content = `
                <div class="component-demo">
                    <h4 style="color: #5B8DBE; margin-bottom: 15px;">JFrame - Window Container</h4>
                    <div class="code-box" style="margin-bottom: 20px;">
                        <pre><code>JFrame frame = new JFrame("My Application");
frame.setSize(400, 300);
frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
frame.setVisible(true);</code></pre>
                    </div>
                    <div style="border: 3px solid #5B8DBE; border-radius: 10px; background: #F8F9FA;">
                        <div style="background: #5B8DBE; color: white; padding: 10px; border-radius: 7px 7px 0 0; display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-weight: bold;">My Application</span>
                            <div style="display: flex; gap: 8px;">
                                <div style="width: 12px; height: 12px; background: #FFD700; border-radius: 50%;"></div>
                                <div style="width: 12px; height: 12px; background: #2ECC71; border-radius: 50%;"></div>
                                <div style="width: 12px; height: 12px; background: #E76E50; border-radius: 50%;"></div>
                            </div>
                        </div>
                        <div style="padding: 40px; text-align: center; color: #6C757D;">
                            JFrame Content Area (400x300)
                        </div>
                    </div>
                </div>
            `;
      break;

    case "components":
      content = `
                <div class="component-demo">
                    <h4 style="color: #5B8DBE; margin-bottom: 15px;">Basic Swing Components</h4>
                    <div style="border: 3px solid #5B8DBE; border-radius: 10px; background: #F8F9FA;">
                        <div style="background: #5B8DBE; color: white; padding: 10px; border-radius: 7px 7px 0 0;">
                            <span style="font-weight: bold;">Component Demo</span>
                        </div>
                        <div style="padding: 30px;">
                            <div style="margin-bottom: 20px;">
                                <div style="background: #E3F2FD; padding: 10px; border-radius: 5px; display: inline-block; margin-bottom: 5px;">
                                    <strong>JLabel:</strong> Welcome to Java GUI
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 20px;">
                                <button style="background: #5B8DBE; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                                    JButton: Click Me
                                </button>
                            </div>
                            
                            <div style="margin-bottom: 20px;">
                                <input type="text" placeholder="JTextField: Enter text" 
                                    style="padding: 10px; border: 2px solid #CED4DA; border-radius: 5px; width: 250px;">
                            </div>
                            
                            <div>
                                <textarea placeholder="JTextArea: Multi-line text" rows="3"
                                    style="padding: 10px; border: 2px solid #CED4DA; border-radius: 5px; width: 250px;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            `;
      break;

    case "complete":
      content = `
                <div class="component-demo">
                    <h4 style="color: #2ECC71; margin-bottom: 15px;">Complete Application Example</h4>
                    <div class="code-box" style="margin-bottom: 20px; font-size: 12px;">
                        <pre><code>JFrame frame = new JFrame("User Registration");
JPanel panel = new JPanel();
panel.add(new JLabel("Name:"));
panel.add(new JTextField(15));
panel.add(new JButton("Submit"));
frame.add(panel);
frame.setVisible(true);</code></pre>
                    </div>
                    <div style="border: 3px solid #2ECC71; border-radius: 10px; background: #F8F9FA;">
                        <div style="background: #2ECC71; color: white; padding: 10px; border-radius: 7px 7px 0 0;">
                            <span style="font-weight: bold;">User Registration</span>
                        </div>
                        <div style="padding: 30px;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                                <label style="font-weight: bold;">Name:</label>
                                <input type="text" placeholder="Enter your name" 
                                    style="padding: 8px; border: 2px solid #CED4DA; border-radius: 5px; flex: 1;">
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                                <label style="font-weight: bold;">Email:</label>
                                <input type="email" placeholder="Enter your email" 
                                    style="padding: 8px; border: 2px solid #CED4DA; border-radius: 5px; flex: 1;">
                            </div>
                            <button style="background: #2ECC71; color: white; border: none; padding: 10px 30px; border-radius: 5px; cursor: pointer; width: 100%;">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            `;
      break;
  }

  demoDiv.innerHTML = content;

  anime({
    targets: ".component-demo",
    opacity: [0, 1],
    translateY: [20, 0],
    easing: "easeOutExpo",
    duration: 600,
  });
}

function showLayout(type) {
  const demoDiv = document.getElementById("layoutDemo");
  let content = "";

  switch (type) {
    case "flow":
      content = `
                <div class="layout-demo">
                    <h4 style="color: #5B8DBE; margin-bottom: 15px;">FlowLayout</h4>
                    <div class="code-box" style="margin-bottom: 20px;">
                        <pre><code>JPanel panel = new JPanel(new FlowLayout());
panel.add(new JButton("Button 1"));
panel.add(new JButton("Button 2"));
panel.add(new JButton("Button 3"));</code></pre>
                    </div>
                    <div style="background: #E3F2FD; padding: 20px; border-radius: 10px; border: 2px dashed #5B8DBE;">
                        <p style="margin-bottom: 15px; text-align: center; font-weight: bold;">Flow Layout Container</p>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
                            <div style="background: #5B8DBE; color: white; padding: 15px 30px; border-radius: 5px;">Button 1</div>
                            <div style="background: #5B8DBE; color: white; padding: 15px 30px; border-radius: 5px;">Button 2</div>
                            <div style="background: #5B8DBE; color: white; padding: 15px 30px; border-radius: 5px;">Button 3</div>
                            <div style="background: #5B8DBE; color: white; padding: 15px 30px; border-radius: 5px;">Button 4</div>
                        </div>
                    </div>
                    <div style="margin-top: 15px; padding: 15px; background: #FFF3CD; border-radius: 10px;">
                        <strong>Karakteristik:</strong> Komponen disusun dari kiri ke kanan, otomatis pindah baris jika tidak muat.
                    </div>
                </div>
            `;
      break;

    case "border":
      content = `
                <div class="layout-demo">
                    <h4 style="color: #2ECC71; margin-bottom: 15px;">BorderLayout</h4>
                    <div class="code-box" style="margin-bottom: 20px;">
                        <pre><code>JPanel panel = new JPanel(new BorderLayout());
panel.add(new JButton("North"), BorderLayout.NORTH);
panel.add(new JButton("Center"), BorderLayout.CENTER);</code></pre>
                    </div>
                    <div style="background: #E8F5E9; border-radius: 10px; border: 2px dashed #2ECC71; overflow: hidden;">
                        <div style="background: #2ECC71; color: white; padding: 15px; text-align: center; font-weight: bold;">
                            NORTH
                        </div>
                        <div style="display: grid; grid-template-columns: 100px 1fr 100px; height: 150px;">
                            <div style="background: #27AE60; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                                WEST
                            </div>
                            <div style="background: #52BE80; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                                CENTER
                            </div>
                            <div style="background: #27AE60; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                                EAST
                            </div>
                        </div>
                        <div style="background: #2ECC71; color: white; padding: 15px; text-align: center; font-weight: bold;">
                            SOUTH
                        </div>
                    </div>
                    <div style="margin-top: 15px; padding: 15px; background: #FFF3CD; border-radius: 10px;">
                        <strong>Karakteristik:</strong> Membagi area menjadi 5 region. Center mengambil sisa ruang yang ada.
                    </div>
                </div>
            `;
      break;

    case "grid":
      content = `
                <div class="layout-demo">
                    <h4 style="color: #F89820; margin-bottom: 15px;">GridLayout</h4>
                    <div class="code-box" style="margin-bottom: 20px;">
                        <pre><code>JPanel panel = new JPanel(new GridLayout(3, 3));
for (int i = 1; i <= 9; i++) {
    panel.add(new JButton("" + i));
}</code></pre>
                    </div>
                    <div style="background: #FFF3CD; padding: 20px; border-radius: 10px; border: 2px dashed #F89820;">
                        <p style="margin-bottom: 15px; text-align: center; font-weight: bold;">GridLayout (3x3)</p>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                            <div style="background: #F89820; color: white; padding: 30px; border-radius: 5px; text-align: center; font-weight: bold;">1</div>
                            <div style="background: #F89820; color: white; padding: 30px; border-radius: 5px; text-align: center; font-weight: bold;">2</div>
                            <div style="background: #F89820; color: white; padding: 30px; border-radius: 5px; text-align: center; font-weight: bold;">3</div>
                            <div style="background: #F89820; color: white; padding: 30px; border-radius: 5px; text-align: center; font-weight: bold;">4</div>
                            <div style="background: #F89820; color: white; padding: 30px; border-radius: 5px; text-align: center; font-weight: bold;">5</div>
                            <div style="background: #F89820; color: white; padding: 30px; border-radius: 5px; text-align: center; font-weight: bold;">6</div>
                            <div style="background: #F89820; color: white; padding: 30px; border-radius: 5px; text-align: center; font-weight: bold;">7</div>
                            <div style="background: #F89820; color: white; padding: 30px; border-radius: 5px; text-align: center; font-weight: bold;">8</div>
                            <div style="background: #F89820; color: white; padding: 30px; border-radius: 5px; text-align: center; font-weight: bold;">9</div>
                        </div>
                    </div>
                    <div style="margin-top: 15px; padding: 15px; background: #E3F2FD; border-radius: 10px;">
                        <strong>Karakteristik:</strong> Semua sel berukuran sama. Cocok untuk layout yang terstruktur seperti calculator.
                    </div>
                </div>
            `;
      break;
  }

  demoDiv.innerHTML = content;

  anime({
    targets: ".layout-demo",
    opacity: [0, 1],
    scale: [0.95, 1],
    easing: "easeOutExpo",
    duration: 600,
  });
}

function handleSubmit() {
  const name = document.getElementById("guiName").value;
  const message = document.getElementById("guiMessage").value;
  const outputDiv = document.getElementById("guiOutput");

  addEventLog("ActionListener triggered: Submit button clicked");

  if (!name || !message) {
    outputDiv.innerHTML = `
            <div style="background: #F8D7DA; padding: 15px; border-radius: 8px; border-left: 4px solid #DC3545;">
                <strong style="color: #721C24;">Error:</strong>
                <p style="margin-top: 8px; color: #721C24;">Please fill all fields!</p>
            </div>
        `;
    addEventLog("Validation failed: Empty fields detected");
    return;
  }

  outputDiv.innerHTML = `
        <div style="background: #D4EDDA; padding: 15px; border-radius: 8px; border-left: 4px solid #28A745;">
            <strong style="color: #155724;">Success!</strong>
            <p style="margin-top: 10px; color: #155724;"><strong>Name:</strong> ${name}</p>
            <p style="margin-top: 5px; color: #155724;"><strong>Message:</strong> ${message}</p>
        </div>
    `;

  addEventLog(
    `Data submitted - Name: ${name}, Message: ${message.substring(0, 20)}...`
  );

  anime({
    targets: "#guiOutput",
    scale: [0.9, 1],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 500,
  });
}

function handleClear() {
  document.getElementById("guiName").value = "";
  document.getElementById("guiMessage").value = "";
  document.getElementById("guiOutput").innerHTML =
    '<p style="color: #6C757D; text-align: center;">Output akan muncul di sini...</p>';

  addEventLog("ActionListener triggered: Clear button clicked");
  addEventLog("Form fields cleared");
}

function addEventLog(message) {
  const timestamp = new Date().toLocaleTimeString();
  eventLogLines.push(`[${timestamp}] ${message}`);

  if (eventLogLines.length > 10) {
    eventLogLines.shift();
  }

  const logDiv = document.getElementById("eventLog");
  logDiv.innerHTML = eventLogLines
    .map((line) => `<div style="margin-bottom: 5px;">> ${line}</div>`)
    .join("");
  logDiv.scrollTop = logDiv.scrollHeight;
}

function calcInput(value) {
  if (calcDisplay === "0" && value !== ".") {
    calcDisplay = value;
  } else {
    calcDisplay += value;
  }

  calcExpression += value;
  updateCalcDisplay();
  updateCalcCode(`button.addActionListener(e -> display.append("${value}"));`);
}

function calcClear() {
  calcDisplay = "0";
  calcExpression = "";
  updateCalcDisplay();
  updateCalcCode('clearButton.addActionListener(e -> display.setText("0"));');
}

function calcEqual() {
  try {
    const result = eval(calcExpression);
    calcDisplay = result.toString();
    calcExpression = result.toString();
    updateCalcDisplay();
    updateCalcCode(`equalButton.addActionListener(e -> calculate());`);
  } catch (error) {
    calcDisplay = "Error";
    calcExpression = "";
    updateCalcDisplay();
  }
}

function updateCalcDisplay() {
  document.getElementById("calcDisplay").textContent = calcDisplay;

  anime({
    targets: "#calcDisplay",
    scale: [1.1, 1],
    easing: "easeOutElastic(1, .6)",
    duration: 500,
  });
}

function updateCalcCode(code) {
  document.getElementById("calcCode").textContent = code;
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
