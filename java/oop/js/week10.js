document.addEventListener("DOMContentLoaded", function () {
  animatePageLoad();
  initializeCollections();
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

let arrayListData = [];
let linkedListData = [];
let hashSet = new Set();
let queueData = [];
let hashMap = new Map();
let utilityList = [5, 2, 8, 1, 9, 3];

function initializeCollections() {
  arrayListData = ["A", "B", "C"];
  linkedListData = ["A", "B", "C"];
  updateListDisplays();
}

function demonstrateGenerics(type) {
  const display = document.getElementById("genericsDemo");

  let content = "";

  switch (type) {
    case "withoutGenerics":
      content = `
                <h4 style="color: #E76E50; margin-bottom: 20px;">Tanpa Generics</h4>
                <div class="code-box" style="margin-bottom: 20px;">
                    <pre><code>ArrayList list = new ArrayList();
list.add("Hello");
list.add(123);
list.add(45.6);

String str = (String) list.get(1);
// ClassCastException at runtime!</code></pre>
                </div>
                <div style="padding: 20px; background: #F8D7DA; border-radius: 10px; border-left: 4px solid #DC3545;">
                    <strong style="color: #721C24;">Problem:</strong>
                    <ul style="margin-top: 10px; color: #721C24;">
                        <li>Tidak ada type checking</li>
                        <li>Perlu manual casting</li>
                        <li>Error terjadi saat runtime</li>
                        <li>Bug sulit ditemukan</li>
                    </ul>
                </div>
            `;
      break;

    case "withGenerics":
      content = `
                <h4 style="color: #2ECC71; margin-bottom: 20px;">Dengan Generics</h4>
                <div class="code-box" style="margin-bottom: 20px;">
                    <pre><code>ArrayList&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add("Hello");
list.add("World");
list.add(123);  // Compile error!

String str = list.get(0);  // No casting needed</code></pre>
                </div>
                <div style="padding: 20px; background: #D4EDDA; border-radius: 10px; border-left: 4px solid #28A745;">
                    <strong style="color: #155724;">Keuntungan:</strong>
                    <ul style="margin-top: 10px; color: #155724;">
                        <li>Type safety terjamin</li>
                        <li>Tidak perlu casting</li>
                        <li>Error terdeteksi saat kompilasi</li>
                        <li>Kode lebih aman dan maintainable</li>
                    </ul>
                </div>
            `;
      break;

    case "custom":
      content = `
                <h4 style="color: #5B8DBE; margin-bottom: 20px;">Custom Generic Class</h4>
                <div class="code-box" style="margin-bottom: 20px;">
                    <pre><code>class Box&lt;T&gt; {
    private T content;
    
    public void set(T content) {
        this.content = content;
    }
    
    public T get() {
        return content;
    }
}

// Penggunaan
Box&lt;String&gt; stringBox = new Box&lt;&gt;();
stringBox.set("Hello");
String value = stringBox.get();

Box&lt;Integer&gt; intBox = new Box&lt;&gt;();
intBox.set(123);
Integer num = intBox.get();</code></pre>
                </div>
                <div style="padding: 20px; background: #E3F2FD; border-radius: 10px; border-left: 4px solid #5B8DBE;">
                    <strong style="color: #1565C0;">Generic Type Parameter:</strong>
                    <ul style="margin-top: 10px; color: #1565C0;">
                        <li>T = Type (umum)</li>
                        <li>E = Element (collections)</li>
                        <li>K = Key (map)</li>
                        <li>V = Value (map)</li>
                    </ul>
                </div>
            `;
      break;
  }

  display.innerHTML = content;

  anime({
    targets: "#genericsDemo",
    scale: [0.95, 1],
    opacity: [0, 1],
    duration: 600,
    easing: "easeOutExpo",
  });
}

function listOperation(operation) {
  const resultDiv = document.getElementById("listOperationResult");
  let message = "";

  switch (operation) {
    case "add":
      const newElement = String.fromCharCode(65 + arrayListData.length);
      arrayListData.push(newElement);
      linkedListData.push(newElement);
      message = `Added element "${newElement}" to both lists`;
      break;

    case "addFirst":
      const firstElement = "X";
      arrayListData.unshift(firstElement);
      linkedListData.unshift(firstElement);
      message = `Added "${firstElement}" at the beginning (LinkedList is faster for this)`;
      break;

    case "remove":
      if (arrayListData.length > 0) {
        const removed = arrayListData.pop();
        linkedListData.pop();
        message = `Removed element "${removed}" from both lists`;
      } else {
        message = "Lists are empty!";
      }
      break;

    case "get":
      if (arrayListData.length > 0) {
        const index = Math.floor(arrayListData.length / 2);
        message = `Get element at index ${index}: "${arrayListData[index]}" (ArrayList is faster for random access)`;
      } else {
        message = "Lists are empty!";
      }
      break;

    case "clear":
      arrayListData = [];
      linkedListData = [];
      message = "All elements cleared";
      break;
  }

  updateListDisplays();
  resultDiv.innerHTML = `<strong style="color: #5B8DBE;">${message}</strong>`;

  anime({
    targets: "#listOperationResult",
    translateY: [-10, 0],
    opacity: [0, 1],
    duration: 500,
    easing: "easeOutExpo",
  });
}

function updateListDisplays() {
  const arrayDisplay = document.getElementById("arrayListDisplay");
  const linkedDisplay = document.getElementById("linkedListDisplay");

  const arrayContent =
    arrayListData.length > 0
      ? arrayListData
          .map(
            (item, index) => `
        <div style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 8px; margin-bottom: 8px;">
            <span style="opacity: 0.7;">Index ${index}:</span> <strong>${item}</strong>
        </div>
    `
          )
          .join("")
      : '<div style="text-align: center; opacity: 0.8;">ArrayList kosong</div>';

  const linkedContent =
    linkedListData.length > 0
      ? linkedListData
          .map(
            (item) => `
        <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 12px; border-radius: 8px; margin: 5px;">
            <strong>${item}</strong>
        </div>
        <div style="display: inline-block; margin: 0 5px;">→</div>
    `
          )
          .join("") +
        '<div style="display: inline-block; opacity: 0.5;">null</div>'
      : '<div style="text-align: center; opacity: 0.8;">LinkedList kosong</div>';

  arrayDisplay.innerHTML = arrayContent;
  linkedDisplay.innerHTML = linkedContent;

  anime({
    targets: "#arrayListDisplay > div, #linkedListDisplay > div",
    scale: [0.9, 1],
    opacity: [0, 1],
    duration: 400,
    delay: anime.stagger(50),
    easing: "easeOutExpo",
  });
}

function addToSet() {
  const input = document.getElementById("setInput");
  const value = input.value.trim();
  const messageDiv = document.getElementById("setMessage");

  if (!value) {
    messageDiv.innerHTML =
      '<div style="background: #F8D7DA; padding: 10px; border-radius: 5px; color: #721C24;">Please enter a value</div>';
    return;
  }

  const sizeBefore = hashSet.size;
  hashSet.add(value);
  const sizeAfter = hashSet.size;

  if (sizeBefore === sizeAfter) {
    messageDiv.innerHTML = `<div style="background: #FFF3CD; padding: 10px; border-radius: 5px; color: #856404;">Value "${value}" already exists! HashSet ensures uniqueness.</div>`;
  } else {
    messageDiv.innerHTML = `<div style="background: #D4EDDA; padding: 10px; border-radius: 5px; color: #155724;">Added "${value}" to HashSet</div>`;
  }

  updateSetDisplay();
  input.value = "";

  setTimeout(() => {
    messageDiv.innerHTML = "";
  }, 3000);
}

function updateSetDisplay() {
  const elementsDiv = document.getElementById("setElements");
  const sizeSpan = document.getElementById("setSize");

  if (hashSet.size === 0) {
    elementsDiv.innerHTML =
      '<div style="color: #6C757D; font-style: italic;">Set kosong</div>';
  } else {
    elementsDiv.innerHTML = Array.from(hashSet)
      .map(
        (item) => `
            <div style="background: linear-gradient(135deg, #5B8DBE, #4A7BA7); color: white; padding: 12px 20px; border-radius: 8px; font-weight: bold;">
                ${item}
            </div>
        `
      )
      .join("");
  }

  sizeSpan.textContent = hashSet.size;

  anime({
    targets: "#setElements > div",
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 400,
    delay: anime.stagger(50),
    easing: "easeOutExpo",
  });
}

let queueCounter = 1;

function queueOperation(operation) {
  const resultDiv = document.getElementById("queueResult");
  let message = "";

  switch (operation) {
    case "offer":
      queueData.push(`Item-${queueCounter++}`);
      message = `Offered ${queueData[queueData.length - 1]} to queue`;
      break;

    case "poll":
      if (queueData.length > 0) {
        const polled = queueData.shift();
        message = `Polled (removed) ${polled} from queue`;
      } else {
        message = "Queue is empty!";
      }
      break;

    case "peek":
      if (queueData.length > 0) {
        message = `Peeked (viewed): ${queueData[0]} (not removed)`;
      } else {
        message = "Queue is empty!";
      }
      break;

    case "clear":
      queueData = [];
      queueCounter = 1;
      message = "Queue cleared";
      break;
  }

  updateQueueDisplay();
  resultDiv.innerHTML = `<strong style="color: #5B8DBE;">${message}</strong>`;
}

function updateQueueDisplay() {
  const queueDiv = document.getElementById("queueElements");

  if (queueData.length === 0) {
    queueDiv.innerHTML = '<div style="opacity: 0.7;">Queue kosong</div>';
  } else {
    queueDiv.innerHTML = queueData
      .map(
        (item, index) => `
            <div style="background: white; color: #5B8DBE; padding: 15px 25px; border-radius: 10px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                ${item}
                ${
                  index === 0
                    ? '<div style="font-size: 10px; margin-top: 5px; opacity: 0.7;">← HEAD</div>'
                    : ""
                }
            </div>
        `
      )
      .join('<div style="margin: 0 10px; font-size: 24px;">→</div>');
  }

  anime({
    targets: "#queueElements > div",
    translateX: [-20, 0],
    opacity: [0, 1],
    duration: 400,
    delay: anime.stagger(50),
    easing: "easeOutExpo",
  });
}

function mapOperation(operation) {
  const keyInput = document.getElementById("mapKey");
  const valueInput = document.getElementById("mapValue");
  const resultDiv = document.getElementById("mapResult");
  let message = "";

  switch (operation) {
    case "put":
      const key = keyInput.value.trim();
      const value = valueInput.value.trim();

      if (!key || !value) {
        message =
          '<div style="background: #F8D7DA; padding: 10px; border-radius: 5px; color: #721C24;">Please enter both key and value</div>';
      } else {
        const existed = hashMap.has(key);
        hashMap.set(key, value);
        message = existed
          ? `<div style="background: #FFF3CD; padding: 10px; border-radius: 5px; color: #856404;">Updated: ${key} = ${value}</div>`
          : `<div style="background: #D4EDDA; padding: 10px; border-radius: 5px; color: #155724;">Added: ${key} = ${value}</div>`;
        keyInput.value = "";
        valueInput.value = "";
      }
      break;

    case "get":
      const getKey = keyInput.value.trim();
      if (!getKey) {
        message =
          '<div style="background: #F8D7DA; padding: 10px; border-radius: 5px; color: #721C24;">Please enter a key</div>';
      } else if (hashMap.has(getKey)) {
        message = `<div style="background: #D4EDDA; padding: 10px; border-radius: 5px; color: #155724;">Value for "${getKey}": ${hashMap.get(
          getKey
        )}</div>`;
      } else {
        message = `<div style="background: #FFF3CD; padding: 10px; border-radius: 5px; color: #856404;">Key "${getKey}" not found</div>`;
      }
      break;

    case "remove":
      const removeKey = keyInput.value.trim();
      if (!removeKey) {
        message =
          '<div style="background: #F8D7DA; padding: 10px; border-radius: 5px; color: #721C24;">Please enter a key to remove</div>';
      } else if (hashMap.has(removeKey)) {
        hashMap.delete(removeKey);
        message = `<div style="background: #D4EDDA; padding: 10px; border-radius: 5px; color: #155724;">Removed key: ${removeKey}</div>`;
        keyInput.value = "";
      } else {
        message = `<div style="background: #FFF3CD; padding: 10px; border-radius: 5px; color: #856404;">Key "${removeKey}" not found</div>`;
      }
      break;

    case "clear":
      hashMap.clear();
      message =
        '<div style="background: #D4EDDA; padding: 10px; border-radius: 5px; color: #155724;">Map cleared</div>';
      keyInput.value = "";
      valueInput.value = "";
      break;
  }

  updateMapDisplay();
  resultDiv.innerHTML = message;

  setTimeout(() => {
    resultDiv.innerHTML = "";
  }, 3000);
}

function updateMapDisplay() {
  const mapDiv = document.getElementById("mapEntries");

  if (hashMap.size === 0) {
    mapDiv.innerHTML =
      '<div style="color: #6C757D; font-style: italic;">Map kosong</div>';
  } else {
    mapDiv.innerHTML = Array.from(hashMap.entries())
      .map(
        ([key, value]) => `
            <div style="background: #F8F9FA; padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #5B8DBE;">
                <div style="display: grid; grid-template-columns: auto 1fr; gap: 15px; align-items: center;">
                    <div>
                        <div style="font-size: 12px; color: #6C757D; margin-bottom: 5px;">Key:</div>
                        <div style="font-weight: bold; color: #5B8DBE;">${key}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: #6C757D; margin-bottom: 5px;">Value:</div>
                        <div style="font-weight: bold; color: #2C3E50;">${value}</div>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }

  anime({
    targets: "#mapEntries > div",
    translateX: [-20, 0],
    opacity: [0, 1],
    duration: 400,
    delay: anime.stagger(50),
    easing: "easeOutExpo",
  });
}

function collectionsMethod(method) {
  const listDiv = document.getElementById("currentList");
  const resultDiv = document.getElementById("collectionsResult");
  let message = "";
  let resultValue = "";

  switch (method) {
    case "sort":
      utilityList.sort((a, b) => a - b);
      message = "Collections.sort() - Mengurutkan list secara ascending";
      break;

    case "reverse":
      utilityList.reverse();
      message = "Collections.reverse() - Membalik urutan list";
      break;

    case "shuffle":
      for (let i = utilityList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [utilityList[i], utilityList[j]] = [utilityList[j], utilityList[i]];
      }
      message = "Collections.shuffle() - Mengacak urutan elemen";
      break;

    case "max":
      resultValue = Math.max(...utilityList);
      message = `Collections.max() - Nilai maksimum: <strong style="color: #2ECC71; font-size: 24px;">${resultValue}</strong>`;
      break;

    case "min":
      resultValue = Math.min(...utilityList);
      message = `Collections.min() - Nilai minimum: <strong style="color: #E76E50; font-size: 24px;">${resultValue}</strong>`;
      break;

    case "reset":
      utilityList = [5, 2, 8, 1, 9, 3];
      message = "List direset ke nilai awal";
      break;
  }

  listDiv.textContent = "[" + utilityList.join(", ") + "]";
  resultDiv.innerHTML = `
        <div style="padding: 20px; background: linear-gradient(135deg, #E3F2FD, #BBDEFB); border-radius: 10px; border-left: 4px solid #5B8DBE;">
            <div style="color: #1565C0; font-size: 16px;">${message}</div>
        </div>
    `;

  anime({
    targets: "#currentList",
    scale: [1, 1.05, 1],
    duration: 500,
    easing: "easeInOutQuad",
  });

  anime({
    targets: "#collectionsResult",
    translateY: [-10, 0],
    opacity: [0, 1],
    duration: 500,
    easing: "easeOutExpo",
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
