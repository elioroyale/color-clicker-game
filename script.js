document.addEventListener("DOMContentLoaded", function () {
  let clickerCounter = 0;
  let autoClickerCount = 0; // Number of auto-clickers bought (including boosts)
  const autoClicker50PayValue = 50;
  const baseInterval = 1500;
  let autoClickerIntervalId = null;

  const colorClicker = document.getElementById("color-clicker");
  const bgButton = document.getElementById("colorButton");
  const autoClickButton50 = document.getElementById("auto-clicker-50");
  const boostButtonAutoClick = document.getElementById("boost-auto-clicker");
  const saveProgressBtn = document.getElementById("saveProgressBtn");

  // === Helper to calculate interval based on autoClickerCount ===
  function getAutoClickerInterval() {
    return Math.max(baseInterval / autoClickerCount, 300);
  }

  // === Load saved data ===
  let playerName = localStorage.getItem("playerName");
  let savedPoints = localStorage.getItem("clickerCounter");
  autoClickerCount = parseInt(localStorage.getItem("autoClickerCount")) || 0;
  let savedColor = localStorage.getItem("backgroundColor");

  if (playerName) {
    document.getElementById("welcomePlayer").textContent =
      `Welcome back, ${playerName}!`;
    document.getElementById("welcomePlayer").style.display = "block";
    document.getElementById("player-setup").style.display = "none";
  }

  if (savedPoints) {
    clickerCounter = parseInt(savedPoints);
  }

  if (savedColor) {
    document.body.style.backgroundColor = savedColor;
  }

  if (autoClickerCount > 0) {
    startAutoClicker(getAutoClickerInterval());
  }

  updateClickCounter();

  // === Save player name ===
  document.getElementById("savePlayerBtn").addEventListener("click", () => {
    const input = document.getElementById("playerNameInput");
    playerName = input.value.trim();
    if (playerName) {
      localStorage.setItem("playerName", playerName);
      document.getElementById("welcomePlayer").textContent =
        `Welcome, ${playerName}!`;
      document.getElementById("welcomePlayer").style.display = "block";
      document.getElementById("player-setup").style.display = "none";
    }
  });

  // === Manual save progress button ===
  saveProgressBtn.addEventListener("click", () => {
    saveProgress();
    alert("Progress saved!");
  });

  // === Manual click handler ===
  bgButton.addEventListener("click", function () {
    document.getElementById("h1-welcome").style.display = "none";

    clickerCounter++;
    updateClickCounter();
    changeBackgroundWithRandomColor();
  });

  // === Unlock auto-clicker ===
  autoClickButton50.addEventListener("click", function () {
    if (clickerCounter >= autoClicker50PayValue) {
      clickerCounter -= autoClicker50PayValue;
      autoClickerCount++;
      startAutoClicker(getAutoClickerInterval());
      updateClickCounter();

      // Auto-save progress on unlock
      saveProgress();
    }
  });

  // === Boost auto-clicker ===
  boostButtonAutoClick.addEventListener("click", function () {
    if (clickerCounter >= autoClicker50PayValue) {
      clickerCounter -= autoClicker50PayValue;
      autoClickerCount++;
      startAutoClicker(getAutoClickerInterval());
      updateClickCounter();

      // Auto-save progress on boost
      saveProgress();
    }
  });

  // === Start or restart auto-clicker interval ===
  function startAutoClicker(interval) {
    if (autoClickerIntervalId) clearInterval(autoClickerIntervalId);

    autoClickerIntervalId = setInterval(() => {
      clickerCounter++;
      changeBackgroundWithRandomColor();
      updateClickCounter();
      // No auto-save here, only on unlock/boost or manual save
    }, interval);

    updateAutoClickerButtons();
  }

  // === Update UI counts and button states ===
  function updateClickCounter() {
    colorClicker.textContent = `${clickerCounter} ${
      clickerCounter === 1 ? "Color" : "Colors"
    }`;
    updateAutoClickerButtons();
  }

  // === Enable/disable buttons based on state ===
  function updateAutoClickerButtons() {
    if (autoClickerCount === 0 && clickerCounter >= autoClicker50PayValue) {
      autoClickButton50.disabled = false;
      autoClickButton50.style.display = "inline";
      autoClickButton50.style.backgroundColor = "";
      autoClickButton50.style.color = "";
      autoClickButton50.style.cursor = "pointer";

      boostButtonAutoClick.disabled = true;
      boostButtonAutoClick.style.display = "none";
    } else if (autoClickerCount > 0) {
      autoClickButton50.disabled = true;
      autoClickButton50.style.display = "none";

      boostButtonAutoClick.disabled = clickerCounter < autoClicker50PayValue;
      boostButtonAutoClick.style.display = "inline";
    } else {
      autoClickButton50.disabled = true;
      autoClickButton50.style.display = "none";

      boostButtonAutoClick.disabled = true;
      boostButtonAutoClick.style.display = "none";
    }
  }

  // === Change background to random color and save it ===
  function changeBackgroundWithRandomColor() {
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
    document.body.style.backgroundColor = randomColor;

    // Save last color automatically
    localStorage.setItem("backgroundColor", randomColor);
  }

  // === Save progress to localStorage ===
  function saveProgress() {
    localStorage.setItem("clickerCounter", clickerCounter);
    localStorage.setItem("autoClickerCount", autoClickerCount);
  }
});
