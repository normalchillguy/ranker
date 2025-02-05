console.log('main.js is loading');
import { startSorting, recordChoice, toggleTheme, downloadResults, saveProgress, loadProgress, clearProgress } from './sorter.js';

document.addEventListener('DOMContentLoaded', () => {
  // Make functions globally available
  window.startSorting = startSorting;
  window.recordChoice = recordChoice;
  window.toggleTheme = toggleTheme;
  window.downloadResults = downloadResults;
  window.saveProgress = saveProgress;
  window.loadProgress = loadProgress;
  window.clearProgress = clearProgress;
  
  // Check for saved progress and show/hide continue button
  const loadButton = document.getElementById('loadButton');
  const loadButtonContainer = loadButton.parentElement;
  if (localStorage.getItem('queenRankerProgress')) {
    loadButton.style.display = 'block';
    loadButtonContainer.style.marginBottom = '50px';
  } else {
    loadButton.style.display = 'none';
    loadButtonContainer.style.marginBottom = '0';
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
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const root = document.documentElement;
  const themeButton = document.getElementById('themeToggle');
  
  if (savedTheme === 'light') {
    root.setAttribute('data-theme', 'light');
    themeButton.innerHTML = '☀️';
  }
}); 