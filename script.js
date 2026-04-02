"use strict";

const state = {
  pages: ["Overview", "Analytics", "Reports"],
  currentIndex: 0,
  visited: new Set(["Overview"]),
  isLongPress: false,
  pressTimer: null,
};


const nameInput = document.getElementById("name-input");
const entryScreen = document.getElementById("entry-screen");
const appShell = document.getElementById("app-shell");
const statusText = document.getElementById("status-text");
const kettle = document.getElementById("kettle-trigger");
const steamBox = document.getElementById("steam-box");





let inactivityTimer = null;

nameInput.addEventListener("input", (e) => {
  const val = e.target.value.trim();
  const btn = document.getElementById("login-btn");
  const spill = document.getElementById("tea-spill");

  
  clearTimeout(inactivityTimer);

  
  spill.style.display = "none";

  
  if (val.length < 4) {
    btn.style.display = "none";
    return;
  }

  
  if (val.length === 4) {
    inactivityTimer = setTimeout(() => {
      btn.style.display = "none";
      triggerTeaOverflow();
      setTimeout(transitionToDashboard, 2000);
    }, 1500);
    return;
  }

  
  if (val.length > 4) {
    btn.style.display = "none";
    const char = val.slice(-1);
    createFallingChar(char);

    
    nameInput.value = val.slice(0, 4);

    inactivityTimer = setTimeout(() => {
      triggerTeaOverflow();
      setTimeout(transitionToDashboard, 3000);
    }, 1500);
  }

  
  if (val.length > 10) {
    clearTimeout(inactivityTimer);
    setTimeout(transitionToDashboard, 1000);
  }
});

function createFallingChar(char) {
  const span = document.createElement("span");
  span.className = "falling-char";
  span.innerText = char;
  
  span.style.left = 40 + Math.random() * 200 + "px";
  span.style.top = "60px";
  nameInput.parentElement.appendChild(span);
  setTimeout(() => span.remove(), 800);
}

function triggerTeaOverflow() {
  const spill = document.getElementById("tea-spill");
  spill.style.display = "block"; 
}

function transitionToDashboard() {
  entryScreen.style.opacity = "0";
  setTimeout(() => {
    entryScreen.style.display = "none";
    appShell.style.opacity = "1";

    
    const bootMessages = [
      "Initializing HTCPCP/1.0...",
      "BREW / HTCPCP/1.0 → 200 OK",
      "Kettle temperature: 100°C",
      "System Status: Boiling",
      "Ready.",
    ];
    let i = 0;
    const bootSeq = setInterval(() => {
      statusText.innerText = bootMessages[i];
      i++;
      if (i >= bootMessages.length) clearInterval(bootSeq);
    }, 600);
  }, 500);
}


function handleNav(route) {
  statusText.innerText = `GET /${route.toLowerCase()} → 418 I'm a teapot (RFC 2324)`;
}


kettle.addEventListener("mousedown", startPress);
kettle.addEventListener("mouseup", endPress);
kettle.addEventListener("mouseleave", endPress);

function startPress() {
  state.isLongPress = false;
  kettle.style.transform = "scale(0.95)";
  state.pressTimer = setTimeout(() => {
    state.isLongPress = true;
    cyclePage();
  }, 1000);
}

function endPress(e) {
  clearTimeout(state.pressTimer);
  kettle.style.transform = "scale(1)";
  if (!state.isLongPress && e.type === "mouseup") {
    triggerChaos();
  }
}


function triggerChaos() {
  statusText.innerText = "Kettle: Internal Pressure Rising...";
  for (let i = 0; i < 10; i++) {
    const shape = document.createElement("div");
    shape.className = "chaos-shape";
    const size = Math.random() * 50 + 10;
    shape.style.width = size + "px";
    shape.style.height = size + "px";
    shape.style.background = ["#d97706", "#2563eb", "#ef4444"][
      Math.floor(Math.random() * 3)
    ];
    shape.style.left = Math.random() * window.innerWidth + "px";
    shape.style.top = Math.random() * window.innerHeight + "px";
    shape.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    shape.innerText = Math.random() > 0.5 ? "SPILL" : "☕";
    document.body.appendChild(shape);
    setTimeout(() => shape.remove(), 1000);
  }
  createSteam();
}


function cyclePage() {
  state.currentIndex = (state.currentIndex + 1) % state.pages.length;
  const nextRoute = state.pages[state.currentIndex];

  
  document
    .querySelectorAll(".page-content")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById(`page-${nextRoute}`).classList.add("active");

  
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.textContent.trim() === nextRoute) {
      link.classList.add("active");
    }
  });

  state.visited.add(nextRoute);
  statusText.innerText = `Kettle Override: Loading ${nextRoute}...`;

  createSteam();

  if (state.visited.size === state.pages.length) {
    setTimeout(triggerEnd, 1500);
  }
}

function createSteam() {
  const steam = document.createElement("div");
  steam.className = "steam";
  steam.innerText = "♨";
  steam.style.left = "50%";
  steamBox.appendChild(steam);
  setTimeout(() => steam.remove(), 2000);
}


function triggerEnd() {
  appShell.style.opacity = "0.3";
  document.getElementById("final-modal").style.display = "flex";
}

function showHistoryModal() {
  document.getElementById("history-modal").style.display = "flex";
}

function closeHistoryModal() {
  document.getElementById("history-modal").style.display = "none";
}

