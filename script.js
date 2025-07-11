document.addEventListener("DOMContentLoaded", function () {
  let clickerCounter = 0;
  let autoClickerCount = 0;
  const autoClicker50PayValue = 50;
  const baseInterval = 1500;
  let autoClickerIntervalId = null;

  // === Rebirth state ===
  let rebirthUnlocked = localStorage.getItem("rebirthUnlocked") === "true";
  let clickValue = rebirthUnlocked ? 10 : 1;
  const rebirthThreshold = 1000000;

  const colorClicker = document.getElementById("color-clicker");
  const bgButton = document.getElementById("colorButton");
  const autoClickButton50 = document.getElementById("auto-clicker-50");
  const boostButtonAutoClick = document.getElementById("boost-auto-clicker");
  const saveProgressBtn = document.getElementById("saveProgressBtn");
  const rebirthButton = document.getElementById("rebirth-button");

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
  checkRebirthUnlock();

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

    clickerCounter += clickValue;
    updateClickCounter();
    changeBackgroundWithRandomColor();
    checkRebirthUnlock();
  });

  // === Unlock auto-clicker ===
  autoClickButton50.addEventListener("click", function () {
    if (clickerCounter >= autoClicker50PayValue) {
      clickerCounter -= autoClicker50PayValue;
      autoClickerCount++;
      startAutoClicker(getAutoClickerInterval());
      updateClickCounter();
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
      saveProgress();
    }
  });

  // === Start or restart auto-clicker interval ===
  function startAutoClicker(interval) {
    if (autoClickerIntervalId) clearInterval(autoClickerIntervalId);

    autoClickerIntervalId = setInterval(() => {
      clickerCounter += clickValue;
      changeBackgroundWithRandomColor();
      updateClickCounter();
      checkRebirthUnlock();
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

  // === Rebirth functionality ===
  function checkRebirthUnlock() {
    if (!rebirthUnlocked && clickerCounter >= rebirthThreshold) {
      rebirthButton.style.display = "inline-block";
    }
  }

  rebirthButton.addEventListener("click", () => {
    if (clickerCounter >= rebirthThreshold && !rebirthUnlocked) {
      // Apply rebirth
      clickerCounter = 0;
      autoClickerCount = 0;
      rebirthUnlocked = true;
      clickValue = 2;

      if (autoClickerIntervalId) clearInterval(autoClickerIntervalId);
      autoClickerIntervalId = null;

      rebirthButton.style.display = "none";

      alert("Rebirth complete! You now earn 2 color points per click.");

      updateClickCounter();
      updateAutoClickerButtons();
      saveProgress();
      localStorage.setItem("rebirthUnlocked", "true");
    }
  });

  // === Change background to random color and save it ===
  function changeBackgroundWithRandomColor() {
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
    document.body.style.backgroundColor = randomColor;
    localStorage.setItem("backgroundColor", randomColor);
  }

  // === Save progress to localStorage ===
  function saveProgress() {
    localStorage.setItem("clickerCounter", clickerCounter);
    localStorage.setItem("autoClickerCount", autoClickerCount);
    localStorage.setItem("rebirthUnlocked", rebirthUnlocked);
  }

  // === Get interval based on number of auto clickers ===
  function getAutoClickerInterval() {
    return Math.max(baseInterval / autoClickerCount, 300);
  }
});
