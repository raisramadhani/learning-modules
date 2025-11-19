let fileSystem = {};
let serializedData = null;
let fileBuffer = [];

function demonstrateStream(type) {
  const demoDiv = document.getElementById("streamDemo");
  let content = "";

  switch (type) {
    case "byte":
      content = `
                <div class="stream-demo">
                    <h4 style="color: #5B8DBE; margin-bottom: 15px;">Byte Stream</h4>
                    <div class="code-box" style="margin-bottom: 15px;">
                        <pre><code>FileInputStream fis = new FileInputStream("image.jpg");
FileOutputStream fos = new FileOutputStream("copy.jpg");

int byteData;
while ((byteData = fis.read()) != -1) {
    fos.write(byteData);
}

fis.close();
fos.close();</code></pre>
                    </div>
                    <div style="background: #E8F5E9; padding: 20px; border-radius: 10px;">
                        <strong style="color: #2ECC71;">Karakteristik:</strong>
                        <ul style="margin-top: 10px;">
                            <li>Membaca data byte per byte (8-bit)</li>
                            <li>Cocok untuk file biner: gambar, audio, video</li>
                            <li>Tidak ada konversi karakter</li>
                            <li>Kelas: InputStream, OutputStream</li>
                        </ul>
                    </div>
                    <div style="margin-top: 15px; padding: 15px; background: #E3F2FD; border-radius: 8px;">
                        <strong>Contoh Data:</strong>
                        <div style="margin-top: 10px; font-family: monospace; font-size: 14px;">
                            [89] [50] [4E] [47] [0D] [0A] [1A] [0A] ...
                        </div>
                    </div>
                </div>
            `;
      break;

    case "character":
      content = `
                <div class="stream-demo">
                    <h4 style="color: #5B8DBE; margin-bottom: 15px;">Character Stream</h4>
                    <div class="code-box" style="margin-bottom: 15px;">
                        <pre><code>FileReader fr = new FileReader("data.txt");
FileWriter fw = new FileWriter("output.txt");

int charData;
while ((charData = fr.read()) != -1) {
    fw.write(charData);
}

fr.close();
fw.close();</code></pre>
                    </div>
                    <div style="background: #E3F2FD; padding: 20px; border-radius: 10px;">
                        <strong style="color: #5B8DBE;">Karakteristik:</strong>
                        <ul style="margin-top: 10px;">
                            <li>Membaca data karakter per karakter (16-bit Unicode)</li>
                            <li>Cocok untuk file teks</li>
                            <li>Otomatis handle encoding (UTF-8, UTF-16, dll)</li>
                            <li>Kelas: Reader, Writer</li>
                        </ul>
                    </div>
                    <div style="margin-top: 15px; padding: 15px; background: #E8F5E9; border-radius: 8px;">
                        <strong>Contoh Data:</strong>
                        <div style="margin-top: 10px; font-family: monospace; font-size: 14px;">
                            'H' 'e' 'l' 'l' 'o' ' ' 'W' 'o' 'r' 'l' 'd'
                        </div>
                    </div>
                </div>
            `;
      break;

    case "buffered":
      content = `
                <div class="stream-demo">
                    <h4 style="color: #2ECC71; margin-bottom: 15px;">Buffered Stream (Recommended)</h4>
                    <div class="code-box" style="margin-bottom: 15px;">
                        <pre><code>BufferedReader br = new BufferedReader(
    new FileReader("input.txt")
);
BufferedWriter bw = new BufferedWriter(
    new FileWriter("output.txt")
);

String line;
while ((line = br.readLine()) != null) {
    bw.write(line);
    bw.newLine();
}

br.close();
bw.close();</code></pre>
                    </div>
                    <div style="background: #D4EDDA; padding: 20px; border-radius: 10px;">
                        <strong style="color: #155724;">Keuntungan Buffered Stream:</strong>
                        <ul style="margin-top: 10px;">
                            <li>Performa lebih cepat (mengurangi akses disk)</li>
                            <li>Membaca/menulis dalam chunk (buffer)</li>
                            <li>Method tambahan: readLine(), newLine()</li>
                            <li>Best practice untuk file I/O</li>
                        </ul>
                    </div>
                    <div style="margin-top: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div style="padding: 15px; background: #F8D7DA; border-radius: 8px;">
                            <strong style="color: #721C24;">Tanpa Buffer:</strong>
                            <p style="margin-top: 10px; font-size: 13px;">1000 akses disk = lambat</p>
                        </div>
                        <div style="padding: 15px; background: #D4EDDA; border-radius: 8px;">
                            <strong style="color: #155724;">Dengan Buffer:</strong>
                            <p style="margin-top: 10px; font-size: 13px;">10 akses disk = cepat</p>
                        </div>
                    </div>
                </div>
            `;
      break;
  }

  demoDiv.innerHTML = content;

  anime({
    targets: ".stream-demo",
    opacity: [0, 1],
    translateY: [20, 0],
    easing: "easeOutExpo",
    duration: 600,
  });
}

function checkFile() {
  const fileName = document.getElementById("fileName").value;
  const resultDiv = document.getElementById("fileOperationResult");

  if (!fileName) {
    resultDiv.innerHTML = `
            <div style="background: #F8D7DA; padding: 20px; border-radius: 10px;">
                <strong style="color: #721C24;">Error:</strong> Masukkan nama file!
            </div>
        `;
    return;
  }

  const exists = fileSystem[fileName] !== undefined;

  let content = `
        <div class="file-demo">
            <h4 style="color: #5B8DBE; margin-bottom: 15px;">Check File: ${fileName}</h4>
            <div class="code-box" style="margin-bottom: 15px;">
                <pre><code>File file = new File("${fileName}");
boolean exists = file.exists();
System.out.println(exists);</code></pre>
            </div>
            <div style="background: ${
              exists ? "#D4EDDA" : "#FFF3CD"
            }; padding: 20px; border-radius: 10px; border-left: 4px solid ${
    exists ? "#28A745" : "#F89820"
  };">
                <strong style="color: ${
                  exists ? "#155724" : "#856404"
                };">Result:</strong>
                <p style="margin-top: 10px; color: ${
                  exists ? "#155724" : "#856404"
                };">
                    File ${exists ? "EXISTS" : "NOT FOUND"}<br>
                    file.exists() = ${exists}
                </p>
            </div>
        </div>
    `;

  resultDiv.innerHTML = content;
  animateResult();
}

function createFile() {
  const fileName = document.getElementById("fileName").value;
  const resultDiv = document.getElementById("fileOperationResult");

  if (!fileName) {
    resultDiv.innerHTML = `
            <div style="background: #F8D7DA; padding: 20px; border-radius: 10px;">
                <strong style="color: #721C24;">Error:</strong> Masukkan nama file!
            </div>
        `;
    return;
  }

  const exists = fileSystem[fileName] !== undefined;

  if (exists) {
    resultDiv.innerHTML = `
            <div class="file-demo">
                <h4 style="color: #F89820; margin-bottom: 15px;">Create File: ${fileName}</h4>
                <div style="background: #FFF3CD; padding: 20px; border-radius: 10px;">
                    <strong style="color: #856404;">Warning:</strong>
                    <p style="margin-top: 10px; color: #856404;">File sudah ada! file.createNewFile() = false</p>
                </div>
            </div>
        `;
  } else {
    fileSystem[fileName] = {
      name: fileName,
      size: 0,
      created: new Date().toLocaleString(),
      canRead: true,
      canWrite: true,
    };

    resultDiv.innerHTML = `
            <div class="file-demo">
                <h4 style="color: #2ECC71; margin-bottom: 15px;">Create File: ${fileName}</h4>
                <div class="code-box" style="margin-bottom: 15px;">
                    <pre><code>File file = new File("${fileName}");
boolean created = file.createNewFile();
System.out.println("Created: " + created);</code></pre>
                </div>
                <div style="background: #D4EDDA; padding: 20px; border-radius: 10px;">
                    <strong style="color: #155724;">Success:</strong>
                    <p style="margin-top: 10px; color: #155724;">File berhasil dibuat!<br>file.createNewFile() = true</p>
                </div>
            </div>
        `;
  }

  animateResult();
}

function getFileInfo() {
  const fileName = document.getElementById("fileName").value;
  const resultDiv = document.getElementById("fileOperationResult");

  if (!fileName) {
    resultDiv.innerHTML = `
            <div style="background: #F8D7DA; padding: 20px; border-radius: 10px;">
                <strong style="color: #721C24;">Error:</strong> Masukkan nama file!
            </div>
        `;
    return;
  }

  const file = fileSystem[fileName];

  if (!file) {
    resultDiv.innerHTML = `
            <div class="file-demo">
                <h4 style="color: #E76E50; margin-bottom: 15px;">Get Info: ${fileName}</h4>
                <div style="background: #F8D7DA; padding: 20px; border-radius: 10px;">
                    <strong style="color: #721C24;">Error:</strong>
                    <p style="margin-top: 10px; color: #721C24;">File tidak ditemukan! Buat file terlebih dahulu.</p>
                </div>
            </div>
        `;
  } else {
    resultDiv.innerHTML = `
            <div class="file-demo">
                <h4 style="color: #5B8DBE; margin-bottom: 15px;">File Info: ${fileName}</h4>
                <div class="code-box" style="margin-bottom: 15px;">
                    <pre><code>File file = new File("${fileName}");
System.out.println("Name: " + file.getName());
System.out.println("Size: " + file.length());
System.out.println("Can Read: " + file.canRead());
System.out.println("Can Write: " + file.canWrite());</code></pre>
                </div>
                <div style="background: #E3F2FD; padding: 20px; border-radius: 10px;">
                    <strong style="color: #5B8DBE;">File Properties:</strong>
                    <table style="width: 100%; margin-top: 15px; font-size: 14px;">
                        <tr><td style="padding: 8px; border-bottom: 1px solid #CED4DA;"><strong>getName():</strong></td><td style="padding: 8px; border-bottom: 1px solid #CED4DA;">${file.name}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #CED4DA;"><strong>length():</strong></td><td style="padding: 8px; border-bottom: 1px solid #CED4DA;">${file.size} bytes</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #CED4DA;"><strong>canRead():</strong></td><td style="padding: 8px; border-bottom: 1px solid #CED4DA;">${file.canRead}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #CED4DA;"><strong>canWrite():</strong></td><td style="padding: 8px; border-bottom: 1px solid #CED4DA;">${file.canWrite}</td></tr>
                        <tr><td style="padding: 8px;"><strong>Created:</strong></td><td style="padding: 8px;">${file.created}</td></tr>
                    </table>
                </div>
            </div>
        `;
  }

  animateResult();
}

function deleteFile() {
  const fileName = document.getElementById("fileName").value;
  const resultDiv = document.getElementById("fileOperationResult");

  if (!fileName) {
    resultDiv.innerHTML = `
            <div style="background: #F8D7DA; padding: 20px; border-radius: 10px;">
                <strong style="color: #721C24;">Error:</strong> Masukkan nama file!
            </div>
        `;
    return;
  }

  const exists = fileSystem[fileName] !== undefined;

  if (exists) {
    delete fileSystem[fileName];
    resultDiv.innerHTML = `
            <div class="file-demo">
                <h4 style="color: #E76E50; margin-bottom: 15px;">Delete File: ${fileName}</h4>
                <div class="code-box" style="margin-bottom: 15px;">
                    <pre><code>File file = new File("${fileName}");
boolean deleted = file.delete();
System.out.println("Deleted: " + deleted);</code></pre>
                </div>
                <div style="background: #D4EDDA; padding: 20px; border-radius: 10px;">
                    <strong style="color: #155724;">Success:</strong>
                    <p style="margin-top: 10px; color: #155724;">File berhasil dihapus!<br>file.delete() = true</p>
                </div>
            </div>
        `;
  } else {
    resultDiv.innerHTML = `
            <div class="file-demo">
                <h4 style="color: #E76E50; margin-bottom: 15px;">Delete File: ${fileName}</h4>
                <div style="background: #FFF3CD; padding: 20px; border-radius: 10px;">
                    <strong style="color: #856404;">Warning:</strong>
                    <p style="margin-top: 10px; color: #856404;">File tidak ditemukan!<br>file.delete() = false</p>
                </div>
            </div>
        `;
  }

  animateResult();
}

function serializeObject() {
  const name = document.getElementById("studentName").value;
  const age = parseInt(document.getElementById("studentAge").value);
  const resultDiv = document.getElementById("serializationResult");

  if (!name || isNaN(age)) {
    resultDiv.innerHTML = `
            <div style="background: #F8D7DA; padding: 20px; border-radius: 10px;">
                <strong style="color: #721C24;">Error:</strong> Lengkapi data mahasiswa!
            </div>
        `;
    return;
  }

  serializedData = { name, age, timestamp: new Date().toLocaleString() };

  const byteRepresentation = JSON.stringify(serializedData)
    .split("")
    .map((c) => c.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0"))
    .join(" ");

  resultDiv.innerHTML = `
        <div class="serialization-demo">
            <h4 style="color: #2ECC71; margin-bottom: 15px;">Serialisasi Berhasil</h4>
            <div class="code-box" style="margin-bottom: 15px;">
                <pre><code>Student student = new Student("${name}", ${age});
ObjectOutputStream oos = new ObjectOutputStream(
    new FileOutputStream("student.ser")
);
oos.writeObject(student);
oos.close();</code></pre>
            </div>
            <div style="background: #E8F5E9; padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                <strong style="color: #155724;">Objek:</strong>
                <pre style="margin-top: 10px;">Student {
    name: "${name}",
    age: ${age}
}</pre>
            </div>
            <div style="background: #E3F2FD; padding: 20px; border-radius: 10px;">
                <strong style="color: #5B8DBE;">Byte Stream (Hex):</strong>
                <div style="margin-top: 10px; font-family: monospace; font-size: 12px; word-break: break-all; background: white; padding: 15px; border-radius: 5px;">
                    ${byteRepresentation}
                </div>
            </div>
        </div>
    `;

  animateResult();
}

function deserializeObject() {
  const resultDiv = document.getElementById("serializationResult");

  if (!serializedData) {
    resultDiv.innerHTML = `
            <div style="background: #FFF3CD; padding: 20px; border-radius: 10px;">
                <strong style="color: #856404;">Warning:</strong>
                <p style="margin-top: 10px; color: #856404;">Tidak ada data yang diserialisasi! Serialize terlebih dahulu.</p>
            </div>
        `;
    return;
  }

  resultDiv.innerHTML = `
        <div class="serialization-demo">
            <h4 style="color: #5B8DBE; margin-bottom: 15px;">Deserialisasi Berhasil</h4>
            <div class="code-box" style="margin-bottom: 15px;">
                <pre><code>ObjectInputStream ois = new ObjectInputStream(
    new FileInputStream("student.ser")
);
Student loadedStudent = (Student) ois.readObject();
ois.close();

System.out.println(loadedStudent.getName());
System.out.println(loadedStudent.getAge());</code></pre>
            </div>
            <div style="background: #D4EDDA; padding: 20px; border-radius: 10px;">
                <strong style="color: #155724;">Objek Dipulihkan:</strong>
                <pre style="margin-top: 10px;">Student {
    name: "${serializedData.name}",
    age: ${serializedData.age}
}</pre>
                <p style="margin-top: 15px; color: #155724; font-size: 14px;">Diserialisasi pada: ${serializedData.timestamp}</p>
            </div>
        </div>
    `;

  animateResult();
}

function clearSerialized() {
  serializedData = null;
  document.getElementById("studentName").value = "Budi";
  document.getElementById("studentAge").value = "20";
  document.getElementById("serializationResult").innerHTML = `
        <div style="text-align: center; color: #6C757D;">Data dihapus. Masukkan data mahasiswa dan klik Serialize...</div>
    `;
}

function writeAtPosition() {
  const position = parseInt(document.getElementById("seekPosition").value);
  const data = document.getElementById("writeData").value;
  const resultDiv = document.getElementById("randomAccessResult");

  if (isNaN(position) || position < 0) {
    resultDiv.innerHTML = `
            <div style="background: #F8D7DA; padding: 20px; border-radius: 10px;">
                <strong style="color: #721C24;">Error:</strong> Position harus angka non-negatif!
            </div>
        `;
    return;
  }

  if (!data) {
    resultDiv.innerHTML = `
            <div style="background: #F8D7DA; padding: 20px; border-radius: 10px;">
                <strong style="color: #721C24;">Error:</strong> Masukkan data untuk ditulis!
            </div>
        `;
    return;
  }

  while (fileBuffer.length < position) {
    fileBuffer.push("_");
  }

  for (let i = 0; i < data.length; i++) {
    fileBuffer[position + i] = data[i];
  }

  updateFileBuffer();

  resultDiv.innerHTML = `
        <div class="raf-demo">
            <h4 style="color: #2ECC71; margin-bottom: 15px;">Write at Position ${position}</h4>
            <div class="code-box" style="margin-bottom: 15px;">
                <pre><code>RandomAccessFile raf = new RandomAccessFile("data.dat", "rw");
raf.seek(${position});
raf.writeUTF("${data}");
raf.close();</code></pre>
            </div>
            <div style="background: #D4EDDA; padding: 20px; border-radius: 10px;">
                <strong style="color: #155724;">Success:</strong>
                <p style="margin-top: 10px; color: #155724;">Data "${data}" ditulis pada posisi ${position}</p>
            </div>
        </div>
    `;

  animateResult();
}

function readAtPosition() {
  const position = parseInt(document.getElementById("seekPosition").value);
  const resultDiv = document.getElementById("randomAccessResult");

  if (isNaN(position) || position < 0) {
    resultDiv.innerHTML = `
            <div style="background: #F8D7DA; padding: 20px; border-radius: 10px;">
                <strong style="color: #721C24;">Error:</strong> Position harus angka non-negatif!
            </div>
        `;
    return;
  }

  if (position >= fileBuffer.length) {
    resultDiv.innerHTML = `
            <div style="background: #FFF3CD; padding: 20px; border-radius: 10px;">
                <strong style="color: #856404;">Warning:</strong>
                <p style="margin-top: 10px; color: #856404;">Position ${position} di luar buffer. Tulis data terlebih dahulu.</p>
            </div>
        `;
    return;
  }

  const readData = fileBuffer[position];

  resultDiv.innerHTML = `
        <div class="raf-demo">
            <h4 style="color: #5B8DBE; margin-bottom: 15px;">Read from Position ${position}</h4>
            <div class="code-box" style="margin-bottom: 15px;">
                <pre><code>RandomAccessFile raf = new RandomAccessFile("data.dat", "r");
raf.seek(${position});
char data = raf.readChar();
raf.close();</code></pre>
            </div>
            <div style="background: #E3F2FD; padding: 20px; border-radius: 10px;">
                <strong style="color: #5B8DBE;">Data Read:</strong>
                <p style="margin-top: 10px; font-size: 24px; font-weight: bold; color: #5B8DBE;">'${readData}'</p>
                <p style="margin-top: 10px; font-size: 14px; color: #495057;">ASCII: ${readData.charCodeAt(
                  0
                )}</p>
            </div>
        </div>
    `;

  animateResult();
}

function clearBuffer() {
  fileBuffer = [];
  updateFileBuffer();
  document.getElementById("randomAccessResult").innerHTML = `
        <div style="text-align: center; color: #6C757D;">Buffer dikosongkan. Gunakan seek position dan write/read data...</div>
    `;
}

function updateFileBuffer() {
  const bufferDiv = document.getElementById("fileBuffer");

  if (fileBuffer.length === 0) {
    bufferDiv.innerHTML = "[Empty Buffer]";
  } else {
    let html = '<div style="display: flex; flex-wrap: wrap; gap: 5px;">';
    fileBuffer.forEach((char, index) => {
      html += `<div style="background: ${
        char === "_" ? "#E9ECEF" : "#E3F2FD"
      }; padding: 8px 12px; border-radius: 5px; font-family: monospace; border: 1px solid #CED4DA;">
                <div style="font-size: 10px; color: #6C757D;">${index}</div>
                <div style="font-size: 14px; font-weight: bold;">${char}</div>
            </div>`;
    });
    html += "</div>";
    bufferDiv.innerHTML = html;
  }
}

function animateResult() {
  anime({
    targets: ".file-demo, .serialization-demo, .raf-demo",
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
