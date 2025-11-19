let threadCounter = 0;
let lifecycleInterval = null;
let syncCounter = 0;

function demonstrateThreadExtends() {
  const demo = document.getElementById("threadDemo");
  demo.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h4 style="color: #2ECC71; margin-bottom: 15px;">Extends Thread Class</h4>
            <div style="background: #F8F9FA; padding: 15px; border-radius: 8px; border-left: 4px solid #2ECC71;">
                <pre style="margin: 0; white-space: pre-wrap;">class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread running: " + getName());
    }
}

MyThread t1 = new MyThread();
t1.start();</pre>
            </div>
        </div>
        <div style="background: #E8F5E9; padding: 20px; border-radius: 10px;">
            <h5 style="margin-top: 0; color: #2ECC71;">Simulasi Output:</h5>
            <div id="threadOutput" style="font-family: monospace; color: #495057;"></div>
        </div>
    `;

  const output = document.getElementById("threadOutput");
  let count = 0;
  const interval = setInterval(() => {
    if (count < 3) {
      output.innerHTML += `Thread-${count}: executing task ${count + 1}<br>`;
      count++;
    } else {
      clearInterval(interval);
      output.innerHTML +=
        '<br><span style="color: #2ECC71; font-weight: bold;">All threads completed</span>';
    }
  }, 800);
}

function demonstrateRunnable() {
  const demo = document.getElementById("threadDemo");
  demo.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h4 style="color: #5B8DBE; margin-bottom: 15px;">Implements Runnable Interface</h4>
            <div style="background: #F8F9FA; padding: 15px; border-radius: 8px; border-left: 4px solid #5B8DBE;">
                <pre style="margin: 0; white-space: pre-wrap;">class MyTask implements Runnable {
    @Override
    public void run() {
        System.out.println("Task running");
    }
}

Thread t1 = new Thread(new MyTask());
t1.start();</pre>
            </div>
        </div>
        <div style="background: #E3F2FD; padding: 20px; border-radius: 10px;">
            <h5 style="margin-top: 0; color: #5B8DBE;">Simulasi Output:</h5>
            <div id="runnableOutput" style="font-family: monospace; color: #495057;"></div>
        </div>
    `;

  const output = document.getElementById("runnableOutput");
  let count = 0;
  const interval = setInterval(() => {
    if (count < 3) {
      output.innerHTML += `Task-${count}: processing data ${count + 1}<br>`;
      count++;
    } else {
      clearInterval(interval);
      output.innerHTML +=
        '<br><span style="color: #5B8DBE; font-weight: bold;">All tasks completed</span>';
    }
  }, 800);
}

function clearThreadDemo() {
  document.getElementById("threadDemo").innerHTML =
    '<div style="text-align: center; color: #6C757D;">Klik tombol untuk melihat demonstrasi pembuatan thread...</div>';
}

function simulateThreadLifecycle() {
  const demo = document.getElementById("lifecycleDemo");
  const states = [
    { name: "NEW", color: "#5B8DBE", description: "Thread object created" },
    {
      name: "RUNNABLE",
      color: "#2ECC71",
      description: "Thread.start() called, ready to run",
    },
    { name: "RUNNING", color: "#F89820", description: "Thread is executing" },
    {
      name: "BLOCKED",
      color: "#DC3545",
      description: "Thread.sleep(1000) called",
    },
    { name: "RUNNABLE", color: "#2ECC71", description: "Wake up, ready again" },
    { name: "RUNNING", color: "#F89820", description: "Resume execution" },
    {
      name: "TERMINATED",
      color: "#17A2B8",
      description: "run() method completed",
    },
  ];

  let currentState = 0;

  demo.innerHTML = `
        <div style="text-align: center;">
            <div id="currentState" style="margin-bottom: 20px;">
                <div style="display: inline-block; padding: 20px 40px; background: ${states[0].color}; color: white; border-radius: 10px; font-size: 24px; font-weight: bold;">
                    ${states[0].name}
                </div>
                <p style="margin-top: 15px; color: #495057;">${states[0].description}</p>
            </div>
            <div id="stateHistory" style="text-align: left; margin-top: 30px; padding: 20px; background: #F8F9FA; border-radius: 10px; max-height: 200px; overflow-y: auto;">
                <div style="font-family: monospace; color: #495057;">
                    <strong>State History:</strong><br>
                    → ${states[0].name}: ${states[0].description}
                </div>
            </div>
        </div>
    `;

  if (lifecycleInterval) clearInterval(lifecycleInterval);

  lifecycleInterval = setInterval(() => {
    currentState++;
    if (currentState < states.length) {
      const state = states[currentState];
      document.getElementById("currentState").innerHTML = `
                <div style="display: inline-block; padding: 20px 40px; background: ${state.color}; color: white; border-radius: 10px; font-size: 24px; font-weight: bold;">
                    ${state.name}
                </div>
                <p style="margin-top: 15px; color: #495057;">${state.description}</p>
            `;

      const history = document
        .getElementById("stateHistory")
        .querySelector("div");
      history.innerHTML += `<br>→ ${state.name}: ${state.description}`;
    } else {
      clearInterval(lifecycleInterval);
    }
  }, 1500);
}

function resetLifecycle() {
  if (lifecycleInterval) clearInterval(lifecycleInterval);
  document.getElementById("lifecycleDemo").innerHTML =
    '<div style="text-align: center; color: #6C757D;">Klik Simulate Lifecycle untuk melihat perubahan status thread...</div>';
}

function demonstrateSleep() {
  const duration = document.getElementById("sleepDuration").value || 1000;
  const demo = document.getElementById("methodDemo");

  demo.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h4 style="color: #5B8DBE; margin-bottom: 15px;">Thread.sleep(${duration}) Demo</h4>
        </div>
        <div id="sleepOutput" style="background: #F8F9FA; padding: 20px; border-radius: 10px; font-family: monospace; color: #495057;"></div>
    `;

  const output = document.getElementById("sleepOutput");
  output.innerHTML = "Thread started...<br>";

  setTimeout(() => {
    output.innerHTML += `Sleeping for ${duration}ms...<br>`;
  }, 500);

  setTimeout(() => {
    output.innerHTML += "Thread woke up!<br>";
    output.innerHTML +=
      '<span style="color: #2ECC71; font-weight: bold;">Execution completed</span>';
  }, 500 + parseInt(duration));
}

function demonstrateJoin() {
  const demo = document.getElementById("methodDemo");

  demo.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h4 style="color: #2ECC71; margin-bottom: 15px;">Thread.join() Demo</h4>
        </div>
        <div id="joinOutput" style="background: #F8F9FA; padding: 20px; border-radius: 10px; font-family: monospace; color: #495057;"></div>
    `;

  const output = document.getElementById("joinOutput");
  output.innerHTML = "Main thread: Starting thread1...<br>";

  setTimeout(() => {
    output.innerHTML += "Thread1: Working...<br>";
  }, 500);

  setTimeout(() => {
    output.innerHTML += "Thread1: Still working...<br>";
  }, 1000);

  setTimeout(() => {
    output.innerHTML += "Thread1: Done!<br>";
  }, 1500);

  setTimeout(() => {
    output.innerHTML += "<br>Main thread: thread1.join() - waiting...<br>";
  }, 1800);

  setTimeout(() => {
    output.innerHTML +=
      '<span style="color: #2ECC71; font-weight: bold;">Main thread: thread1 finished, continuing execution</span>';
  }, 2300);
}

function clearMethodDemo() {
  document.getElementById("methodDemo").innerHTML =
    '<div style="text-align: center; color: #6C757D;">Pilih demo untuk melihat penggunaan method thread...</div>';
}

function demonstrateWithoutSync() {
  const demo = document.getElementById("syncDemo");
  syncCounter = 0;

  demo.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h4 style="color: #DC3545; margin-bottom: 15px;">Without Synchronization</h4>
            <p style="color: #721C24; background: #F8D7DA; padding: 10px; border-radius: 5px;">
                Warning: Race condition dapat terjadi!
            </p>
        </div>
        <div id="syncOutput" style="background: #F8F9FA; padding: 20px; border-radius: 10px; font-family: monospace; color: #495057;">
            Counter: <span id="counterValue" style="font-weight: bold; color: #DC3545;">0</span><br><br>
        </div>
    `;

  const output = document.getElementById("syncOutput");

  const simulateThread = (threadName) => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const oldValue = syncCounter;
        syncCounter++;
        const newValue = syncCounter;

        output.innerHTML += `${threadName}: read=${oldValue}, write=${newValue}<br>`;
        document.getElementById("counterValue").textContent = syncCounter;
      }, Math.random() * 2000);
    }
  };

  simulateThread("Thread-1");
  simulateThread("Thread-2");

  setTimeout(() => {
    output.innerHTML += `<br><span style="color: #DC3545; font-weight: bold;">Final Counter: ${syncCounter}</span><br>`;
    output.innerHTML +=
      '<span style="color: #856404;">Result may be incorrect due to race condition!</span>';
  }, 2500);
}

function demonstrateWithSync() {
  const demo = document.getElementById("syncDemo");
  syncCounter = 0;
  let locked = false;
  const queue = [];

  demo.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h4 style="color: #2ECC71; margin-bottom: 15px;">With Synchronization</h4>
            <p style="color: #155724; background: #D4EDDA; padding: 10px; border-radius: 5px;">
                Synchronized block ensures thread safety
            </p>
        </div>
        <div id="syncOutput" style="background: #F8F9FA; padding: 20px; border-radius: 10px; font-family: monospace; color: #495057;">
            Counter: <span id="counterValue" style="font-weight: bold; color: #2ECC71;">0</span><br><br>
        </div>
    `;

  const output = document.getElementById("syncOutput");

  const executeOperation = (threadName) => {
    locked = true;
    output.innerHTML += `<span style="color: #F89820;">${threadName}: acquired lock</span><br>`;

    setTimeout(() => {
      const oldValue = syncCounter;
      syncCounter++;
      const newValue = syncCounter;

      output.innerHTML += `${threadName}: read=${oldValue}, write=${newValue}<br>`;
      document.getElementById("counterValue").textContent = syncCounter;
      output.innerHTML += `<span style="color: #F89820;">${threadName}: released lock</span><br><br>`;

      locked = false;
      if (queue.length > 0) {
        const next = queue.shift();
        executeOperation(next);
      }
    }, 300);
  };

  const simulateThread = (threadName) => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        if (!locked) {
          executeOperation(threadName);
        } else {
          queue.push(threadName);
          output.innerHTML += `<span style="color: #6C757D;">${threadName}: waiting for lock...</span><br>`;
        }
      }, i * 400);
    }
  };

  simulateThread("Thread-1");
  setTimeout(() => simulateThread("Thread-2"), 100);

  setTimeout(() => {
    output.innerHTML += `<br><span style="color: #2ECC71; font-weight: bold;">Final Counter: ${syncCounter}</span><br>`;
    output.innerHTML +=
      '<span style="color: #2ECC71;">Result is correct - no race condition!</span>';
  }, 5000);
}

function clearSyncDemo() {
  document.getElementById("syncDemo").innerHTML =
    '<div style="text-align: center; color: #6C757D;">Klik tombol untuk melihat perbedaan dengan dan tanpa synchronization...</div>';
  syncCounter = 0;
}

document.addEventListener("DOMContentLoaded", function () {
  anime({
    targets: ".content-section",
    translateY: [-20, 0],
    opacity: [0, 1],
    delay: anime.stagger(100),
    duration: 800,
    easing: "easeOutExpo",
  });

  anime({
    targets: ".visualization-box",
    scale: [0.95, 1],
    opacity: [0, 1],
    delay: anime.stagger(150, { start: 300 }),
    duration: 600,
    easing: "easeOutExpo",
  });
});
