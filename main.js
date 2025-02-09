console.log("main.js is loading");
import {
  startSorting,
  recordChoice,
  toggleTheme,
  downloadResults,
  saveProgress,
  loadProgress,
  clearProgress,
} from "./sorter.js";
import { allQueensWithData } from "./lists/allQueensWithData.js";

document.addEventListener("DOMContentLoaded", () => {
  // Make functions globally available
  window.startSorting = () => {
    const selectedValue =
      document.querySelector(".dropdown-button").dataset.value;
    startSorting(selectedValue);
  };
  window.recordChoice = recordChoice;
  window.toggleTheme = toggleTheme;
  window.downloadResults = downloadResults;
  window.saveProgress = saveProgress;
  window.loadProgress = loadProgress;
  window.clearProgress = clearProgress;

  // Check for saved progress and show/hide continue button
  const loadButton = document.getElementById("loadButton");
  const loadButtonContainer = loadButton.parentElement;
  if (localStorage.getItem("queenRankerProgress")) {
    loadButton.style.display = "block";
    loadButtonContainer.style.marginBottom = "50px";
  } else {
    loadButton.style.display = "none";
    loadButtonContainer.style.marginBottom = "0";
  }

  // Add this function to handle loading saved progress
  window.loadSavedProgress = () => {
    const hasProgress = loadProgress();
    if (hasProgress) {
      document.getElementById("splashScreen").style.display = "none";
      document.getElementById("mainContent").style.display = "block";
    } else {
      alert("No saved progress found!");
    }
  };

  // Initialize theme
  const savedTheme = localStorage.getItem("theme") || "dark";
  const root = document.documentElement;
  const themeButton = document.getElementById("themeToggle");

  if (savedTheme === "light") {
    root.setAttribute("data-theme", "light");
    themeButton.innerHTML = "☀️";
  }

  // Add this to your existing JavaScript
  document
    .querySelector(".dropdown-button")
    .addEventListener("click", function () {
      this.parentElement.classList.toggle("active");
    });

  document.querySelectorAll(".dropdown-option").forEach((option) => {
    option.addEventListener("click", function () {
      const value = this.dataset.value;
      const text = this.textContent;
      document.querySelector(".dropdown-button").textContent = text;
      this.parentElement.parentElement.classList.remove("active");
      // Update the value for use in startSorting
      document.querySelector(".dropdown-button").dataset.value = value;
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".custom-dropdown")) {
      document.querySelector(".custom-dropdown").classList.remove("active");
    }
  });
});
