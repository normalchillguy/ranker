console.log("sorter.js is loading");
import { getRandomQueens } from "./lists/testQueens.js";
import { allWinners } from "./lists/allWinners.js";
import { allQueensWithData } from "./lists/allQueensWithData.js";

let activeQueens = [];

let lstMember = new Array();
let parent = new Array();
let equal = new Array();
let rec = new Array();

let cmp1, cmp2;
let head1, head2;
let nrec;

let numQuestion;
let totalSize;
let finishSize;
let finishFlag;

// Add at the top with other variables
let winCounts = {}; // Track how many times each queen has won
let tieCount = 0;
const TIE_WARNING_THRESHOLD = 5;

// Add this Fisher-Yates shuffle function
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//The initialization of the variable+++++++++++++++++++++++++++++++++++++++++++++
export function initList() {
  let n = 0;
  let mid;
  let i;

  //The sequence that you should sort
  lstMember[n] = new Array();
  for (i = 0; i < activeQueens.length; i++) {
    lstMember[n][i] = i;
  }
  parent[n] = -1;
  totalSize = 0;
  n++;

  for (i = 0; i < lstMember.length; i++) {
    //And element divides it in two/more than two
    if (lstMember[i].length >= 2) {
      mid = Math.ceil(lstMember[i].length / 2);
      lstMember[n] = new Array();
      lstMember[n] = lstMember[i].slice(0, mid);
      totalSize += lstMember[n].length;
      parent[n] = i;
      n++;
      lstMember[n] = new Array();
      lstMember[n] = lstMember[i].slice(mid, lstMember[i].length);
      totalSize += lstMember[n].length;
      parent[n] = i;
      n++;
    }
  }

  //Preserve this sequence
  for (i = 0; i < activeQueens.length; i++) {
    rec[i] = 0;
  }
  nrec = 0;

  //List that keeps your results
  for (i = 0; i <= activeQueens.length; i++) {
    equal[i] = -1;
  }

  cmp1 = lstMember.length - 2;
  cmp2 = lstMember.length - 1;
  head1 = 0;
  head2 = 0;
  numQuestion = 1;
  finishSize = 0;
  finishFlag = 0;
}

//The sorting+++++++++++++++++++++++++++++++++++++++++++
export function sortList(flag) {
  var i;
  var str;

  // When processing a tie
  if (flag === 0) {
    // Break tie based on which queen has won more previous battles
    const queen1 = lstMember[cmp1][head1];
    const queen2 = lstMember[cmp2][head2];
    winCounts[queen1] = winCounts[queen1] || 0;
    winCounts[queen2] = winCounts[queen2] || 0;

    if (winCounts[queen1] > winCounts[queen2]) {
      flag = -1;
    } else if (winCounts[queen2] > winCounts[queen1]) {
      flag = 1;
    }
  }

  // Update win counts when a queen wins
  if (flag < 0) {
    const winner = lstMember[cmp1][head1];
    winCounts[winner] = (winCounts[winner] || 0) + 1;
  } else if (flag > 0) {
    const winner = lstMember[cmp2][head2];
    winCounts[winner] = (winCounts[winner] || 0) + 1;
  }

  //rec preservation
  if (flag < 0) {
    rec[nrec] = lstMember[cmp1][head1];
    head1++;
    nrec++;
    finishSize++;
    while (equal[rec[nrec - 1]] != -1) {
      rec[nrec] = lstMember[cmp1][head1];
      head1++;
      nrec++;
      finishSize++;
    }
  } else if (flag > 0) {
    rec[nrec] = lstMember[cmp2][head2];
    head2++;
    nrec++;
    finishSize++;
    while (equal[rec[nrec - 1]] != -1) {
      rec[nrec] = lstMember[cmp2][head2];
      head2++;
      nrec++;
      finishSize++;
    }
  } else {
    rec[nrec] = lstMember[cmp1][head1];
    head1++;
    nrec++;
    finishSize++;
    while (equal[rec[nrec - 1]] != -1) {
      rec[nrec] = lstMember[cmp1][head1];
      head1++;
      nrec++;
      finishSize++;
    }
    equal[rec[nrec - 1]] = lstMember[cmp2][head2];
    rec[nrec] = lstMember[cmp2][head2];
    head2++;
    nrec++;
    finishSize++;
    while (equal[rec[nrec - 1]] != -1) {
      rec[nrec] = lstMember[cmp2][head2];
      head2++;
      nrec++;
      finishSize++;
    }
  }

  //Processing after finishing with one list
  if (head1 < lstMember[cmp1].length && head2 == lstMember[cmp2].length) {
    while (head1 < lstMember[cmp1].length) {
      rec[nrec] = lstMember[cmp1][head1];
      head1++;
      nrec++;
      finishSize++;
    }
  } else if (
    head1 == lstMember[cmp1].length &&
    head2 < lstMember[cmp2].length
  ) {
    while (head2 < lstMember[cmp2].length) {
      rec[nrec] = lstMember[cmp2][head2];
      head2++;
      nrec++;
      finishSize++;
    }
  }

  //When it arrives at the end of both lists
  //Update a pro list
  if (head1 == lstMember[cmp1].length && head2 == lstMember[cmp2].length) {
    for (i = 0; i < lstMember[cmp1].length + lstMember[cmp2].length; i++) {
      lstMember[parent[cmp1]][i] = rec[i];
    }
    lstMember.pop();
    lstMember.pop();
    cmp1 = cmp1 - 2;
    cmp2 = cmp2 - 2;
    head1 = 0;
    head2 = 0;

    //Initialize the rec before performing the new comparison
    if (head1 == 0 && head2 == 0) {
      for (i = 0; i < activeQueens.length; i++) {
        rec[i] = 0;
      }
      nrec = 0;
    }
  }

  if (cmp1 < 0) {
    str =
      "choice #" +
      (numQuestion - 1) +
      "<br>" +
      Math.floor((finishSize * 100) / totalSize) +
      "% ranked";
    document.getElementById("battleNumber").innerHTML = str;
    showResult();
    finishFlag = 1;
  } else {
    showImage();
  }
}

//The results+++++++++++++++++++++++++++++++++++++++++++++++
export function showResult() {
  // Before showing results, resolve any remaining ties
  let tiedGroups = findTiedQueens();
  if (tiedGroups.length > 0) {
    runTiebreakerRound(tiedGroups);
    return;
  }

  // Hide the battle interface first
  const battleContainer = document.querySelector(".battle-container");
  const skipButtons = document.querySelector(".skip-buttons");
  const battleNumber = document.getElementById("battleNumber");

  if (battleContainer) battleContainer.style.display = "none";
  if (skipButtons) skipButtons.style.display = "none";
  if (battleNumber) battleNumber.style.display = "none";

  // Clear saved progress since ranking is complete
  localStorage.removeItem("queenRankerProgress");

  let ranking = 1;
  let sameRank = 1;
  let str = `
    <div id="resultsContainer" style="
      background: linear-gradient(135deg, 
        ${
          document.documentElement.getAttribute("data-theme") === "light"
            ? "rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.8) 100%"
            : "rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%"
        });
      backdrop-filter: blur(10px);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      padding: 20px;
      margin: 20px auto;
      max-width: 500px;
      box-shadow: ${
        document.documentElement.getAttribute("data-theme") === "light"
          ? "0 8px 32px rgba(255, 71, 226, 0.15), inset 0 0 50px rgba(255, 71, 226, 0.1)"
          : "0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 0 50px rgba(255, 255, 255, 0.1)"
      };
    ">
      <h2 style="text-align: center; color: var(--primary-color); margin-bottom: 20px;">Your Rankings</h2>
      <table style="
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 8px;
        margin: 0 auto;
        font-size: 1.1em;
      ">
        <tr>
          <th style="
            color: var(--primary-color);
            padding: 10px;
            text-align: center;
            font-size: 1.2em;
            width: 80px;
          ">Rank</th>
          <th style="
            color: var(--primary-color);
            padding: 10px;
            text-align: center;
            font-size: 1.2em;
          ">Queen</th>
        </tr>`;

  for (let i = 0; i < activeQueens.length; i++) {
    str += `
      <tr style="
        background: linear-gradient(135deg,
          ${
            document.documentElement.getAttribute("data-theme") === "light"
              ? "rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%"
              : "rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%"
          });
        border-radius: 10px;
        transition: transform 0.2s ease;
        box-shadow: ${
          document.documentElement.getAttribute("data-theme") === "light"
            ? "0 2px 8px rgba(255, 71, 226, 0.1)"
            : "none"
        };
        &:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg,
            ${
              document.documentElement.getAttribute("data-theme") === "light"
                ? "rgba(255, 71, 226, 0.1) 0%, rgba(255, 71, 226, 0.05) 100%"
                : "rgba(255, 71, 226, 0.3) 0%, rgba(255, 71, 226, 0.1) 100%"
            });
        }
      ">
        <td style="
          padding: 12px;
          text-align: center;
          border-radius: 10px 0 0 10px;
          font-weight: bold;
          color: var(--primary-color);
        ">${ranking}</td>
        <td style="
          padding: 12px;
          border-radius: 0 10px 10px 0;
          text-align: center;
        ">${
          typeof activeQueens[lstMember[0][i]] === "object"
            ? activeQueens[lstMember[0][i]].name
            : activeQueens[lstMember[0][i]]
        }</td>
      </tr>`;

    if (i < activeQueens.length - 1) {
      if (equal[lstMember[0][i]] == lstMember[0][i + 1]) {
        sameRank++;
      } else {
        ranking += sameRank;
        sameRank = 1;
      }
    }
  }
  str += `
      </table>
    </div>
    <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
      <button onclick='location.reload()'>Start Over</button>
      <button id="downloadButton" onclick='downloadResults()'>Download</button>
    </div>`;

  document.getElementById("resultField").innerHTML = str;
}

export function findTiedQueens() {
  let tiedGroups = [];
  let currentGroup = [];

  for (let i = 0; i < activeQueens.length - 1; i++) {
    if (equal[lstMember[0][i]] == lstMember[0][i + 1]) {
      if (currentGroup.length === 0) {
        currentGroup.push(lstMember[0][i]);
      }
      currentGroup.push(lstMember[0][i + 1]);
    } else if (currentGroup.length > 0) {
      tiedGroups.push(currentGroup);
      currentGroup = [];
    }
  }
  return tiedGroups;
}

// Add this new function
export function downloadResults() {
  const resultsContainer = document.getElementById("resultsContainer");

  html2canvas(resultsContainer, {
    backgroundColor:
      document.documentElement.getAttribute("data-theme") === "light"
        ? "#e6e9ff"
        : "#000b3c",
    scale: 2,
    logging: false,
    useCORS: true,
    allowTaint: true,
  })
    .then((canvas) => {
      // Convert canvas to blob
      canvas.toBlob((blob) => {
        // Create object URL
        const url = window.URL.createObjectURL(blob);
        // Create download link
        const link = document.createElement("a");
        link.href = url;
        link.download = "drag-queen-rankings.png";
        // Append link to body
        document.body.appendChild(link);
        // Trigger click
        link.click();
        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, "image/png");
    })
    .catch((error) => {
      console.error("Error generating image:", error);
      alert(
        "Sorry, there was an error downloading your rankings. Please try again."
      );
    });
}

//Indicates two elements to compare+++++++++++++++++++++++++++++++++++
export function showImage() {
  let str0 =
    "choice #" +
    numQuestion +
    "<br>" +
    Math.floor((finishSize * 100) / totalSize) +
    "% ranked";

  const queen1 = activeQueens[lstMember[cmp1][head1]];
  const queen2 = activeQueens[lstMember[cmp2][head2]];

  let str1 = `
    <div class="queen-badges">
      ${queen1.winner ? '<span title="Winner">👑</span>' : ""}
      ${
        queen1.missCongeniality
          ? '<span title="Miss Congeniality">👩‍❤️‍👩</span>'
          : ""
      }
    </div>
    <div class="queen-details">
      <div class="queen-name">${queen1.name}</div>
      <div class="queen-seasons">
        ${queen1.seasons
          .map(
            (s) =>
              `<span class="season-name">${s.season}:</span>` +
              `<span class="season-placement">${
                s.placement.length > 0
                  ? s.placement
                      .map(
                        (p) =>
                          p +
                          (p === 1
                            ? "st"
                            : p === 2
                            ? "nd"
                            : p === 3
                            ? "rd"
                            : "th")
                      )
                      .join(" / ")
                  : "TBD"
              }</span>`
          )
          .join("<br>")}
      </div>
    </div>`;

  let str2 = `
    <div class="queen-badges">
      ${queen2.winner ? '<span title="Winner">👑</span>' : ""}
      ${
        queen2.missCongeniality
          ? '<span title="Miss Congeniality">👩‍❤️‍👩</span>'
          : ""
      }
    </div>
    <div class="queen-details">
      <div class="queen-name">${queen2.name}</div>
      <div class="queen-seasons">
        ${queen2.seasons
          .map(
            (s) =>
              `<span class="season-name">${s.season}:</span>` +
              `<span class="season-placement">${
                s.placement.length > 0
                  ? s.placement
                      .map(
                        (p) =>
                          p +
                          (p === 1
                            ? "st"
                            : p === 2
                            ? "nd"
                            : p === 3
                            ? "rd"
                            : "th")
                      )
                      .join(" / ")
                  : "TBD"
              }</span>`
          )
          .join("<br>")}
      </div>
    </div>`;

  // Reset any lingering styles
  const leftField = document.getElementById("leftField");
  const rightField = document.getElementById("rightField");

  leftField.classList.remove("clicked");
  rightField.classList.remove("clicked");
  leftField.style = "";
  rightField.style = "";

  document.getElementById("battleNumber").innerHTML = str0;
  leftField.innerHTML = str1;
  rightField.innerHTML = str2;

  numQuestion++;
}

//Convert numeric value into a name (emoticon)+++++++++++++++++++++++++++++++
export function toNameFace(index) {
  // If we're using queensWithData or allWinners list
  if (activeQueens[index] && typeof activeQueens[index] === "object") {
    return activeQueens[index].name;
  }
  // If we're using a simple array of names
  return activeQueens[index];
}

// Modify the initialize function to shuffle before starting
export function initialize() {
  // Shuffle the active queens array before starting
  activeQueens = shuffleArray([...activeQueens]);
  initList();
  showImage();
}

export function startSorting() {
  const selectedList = document.getElementById("queenListSelect").value;
  switch (selectedList) {
    case "random":
      activeQueens = getRandomQueens(10);
      break;
    case "all":
      activeQueens = allWinners; // Pass the full objects
      break;
    case "full":
      activeQueens = allQueensWithData; // Pass the full objects
      break;
  }

  document.getElementById("splashScreen").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
  initialize();
}

export function recordChoice(choice) {
  if (finishFlag) {
    showResult();
    return;
  }

  let flag;
  const leftField = document.getElementById("leftField");
  const rightField = document.getElementById("rightField");

  // First, ensure both fields are reset
  leftField.classList.remove("clicked");
  rightField.classList.remove("clicked");
  leftField.style.transform = "";
  rightField.style.transform = "";
  leftField.style.background = "";
  rightField.style.background = "";

  if (choice == "left") {
    flag = -1;
    leftField.classList.add("clicked");
    // Use requestAnimationFrame to ensure the animation runs
    requestAnimationFrame(() => {
      setTimeout(() => {
        leftField.classList.remove("clicked");
        leftField.style.transform = "";
        leftField.style.background = "";
      }, 200);
    });
  } else if (choice == "right") {
    flag = 1;
    rightField.classList.add("clicked");
    requestAnimationFrame(() => {
      setTimeout(() => {
        rightField.classList.remove("clicked");
        rightField.style.transform = "";
        rightField.style.background = "";
      }, 200);
    });
  }

  sortList(flag);
}

// Add this to initialize theme from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  const root = document.documentElement;
  const themeButton = document.getElementById("themeToggle");

  if (savedTheme === "light") {
    root.setAttribute("data-theme", "light");
    themeButton.innerHTML = "☀️";
  }
});

export function toggleTheme() {
  const root = document.documentElement;
  const themeButton = document.getElementById("themeToggle");

  if (root.getAttribute("data-theme") === "light") {
    root.removeAttribute("data-theme");
    themeButton.innerHTML = "🌙";
    localStorage.setItem("theme", "dark");
  } else {
    root.setAttribute("data-theme", "light");
    themeButton.innerHTML = "☀️";
    localStorage.setItem("theme", "light");
  }
}

export function runTiebreakerRound(tiedGroups) {
  // ... function content ...
}

// Add these new functions
export function saveProgress() {
  const saveData = {
    lstMember,
    parent,
    equal,
    rec,
    cmp1,
    cmp2,
    head1,
    head2,
    nrec,
    numQuestion,
    totalSize,
    finishSize,
    finishFlag,
    activeQueens,
    winCounts,
  };

  localStorage.setItem("queenRankerProgress", JSON.stringify(saveData));

  // Show save confirmation
  const saveConfirm = document.createElement("div");
  saveConfirm.textContent =
    "Progress saved. You can exit and continue your ranking later.";
  saveConfirm.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--glass);
    padding: 20px 30px;
    border-radius: 10px;
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(10px);
    color: var(--text-color);
    font-size: 1.2em;
    text-align: center;
    max-width: 300px;
    box-shadow: 0 8px 32px rgba(255, 71, 226, 0.3);
    animation: fadeIn 0.3s ease;
    z-index: 1000;
  `;

  // Add a style tag for the animation if it doesn't exist
  if (!document.getElementById("saveConfirmStyle")) {
    const style = document.createElement("style");
    style.id = "saveConfirmStyle";
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -40%); }
        to { opacity: 1; transform: translate(-50%, -50%); }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(saveConfirm);
  setTimeout(() => {
    saveConfirm.style.animation = "fadeIn 0.3s ease reverse";
    setTimeout(() => saveConfirm.remove(), 300);
  }, 2000);
}

export function loadProgress() {
  const savedData = localStorage.getItem("queenRankerProgress");
  if (!savedData) return false;

  const data = JSON.parse(savedData);

  // Restore all the variables
  lstMember = data.lstMember;
  parent = data.parent;
  equal = data.equal;
  rec = data.rec;
  cmp1 = data.cmp1;
  cmp2 = data.cmp2;
  head1 = data.head1;
  head2 = data.head2;
  nrec = data.nrec;
  numQuestion = data.numQuestion - 1;
  totalSize = data.totalSize;
  finishSize = data.finishSize;
  finishFlag = data.finishFlag;
  activeQueens = data.activeQueens;
  winCounts = data.winCounts;

  // Update the display
  showImage();
  return true;
}

export function clearProgress() {
  localStorage.removeItem("queenRankerProgress");
  location.reload();
}

// Add this near the top with other event listeners
document.addEventListener("keydown", (e) => {
  // Secret shortcut: Press 'Shift + R' to skip to results
  if (e.shiftKey && e.key.toLowerCase() === "r") {
    // Only work with allQueens for testing
    if (activeQueens.length === allQueensWithData.length) {
      // Set up completion state
      finishFlag = 1;
      finishSize = totalSize;
      // Create a simple sequential ranking
      lstMember = [[...Array(activeQueens.length).keys()]];
      showResult();
    }
  }
});
