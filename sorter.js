// Arrays of queens
let testQueens = [
  "Jorgeous",
  "Raven",
  "Tammie Brown",
  "Delta Work",
  "Detox",
  "Alaska",
  "Gia Gunn",
  "Derrick Barry",
  "Nina Bo'nina Brown",
  "Utica Queen",
  "Mistress Isabelle Brooks",
  "Luxx Noir London",
  "Plane Jane",
  "Tayce",
  "Ivory Glaze",
  "Baby",
];

// Winners from all franchises
let allWinners = [
  // Regular US Season Winners
  "BeBe Zahara Benet",
  "Tyra Sanchez",
  "Raja",
  "Sharon Needles",
  "Jinkx Monsoon",
  "Bianca Del Rio",
  "Violet Chachki",
  "Bob the Drag Queen",
  "Sasha Velour",
  "Aquaria",
  "Yvie Oddly",
  "Jaida Essence Hall",
  "Symone",
  "Willow Pill",
  "Sasha Colby",
  "Nymphia Wind",

  // All Stars Winners
  "Chad Michaels",
  "Alaska",
  "Trixie Mattel",
  "Trinity the Tuck", 
  "Monét X Change",
  "Shea Couleé",
  "Kylie Sonique Love",
  "Jimbo",
  "Angeria Paris VanMichaels",

  // UK Winners
  "The Vivienne",
  "Lawrence Chaney",
  "Krystal Versace",
  "Danny Beard",
  "Ginger Johnson",
  "Kyran Thrax",

  // Down Under Winners
  "Kita Mean",
  "Spankie Jackzon",
  "Isis Avis Loren",
  "Lazy Susan",
];

// Switch between arrays by changing this variable
let activeQueens = testQueens;  // Change to allWinners to use full list

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
let winCounts = {};  // Track how many times each queen has won
let tieCount = 0;
const TIE_WARNING_THRESHOLD = 5;

// Add this Fisher-Yates shuffle function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//The initialization of the variable+++++++++++++++++++++++++++++++++++++++++++++
function initList() {
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
function sortList(flag) {
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
      "battle #" +
      (numQuestion - 1) +
      "<br>" +
      Math.floor((finishSize * 100) / totalSize) +
      "% sorted.";
    document.getElementById("battleNumber").innerHTML = str;
    showResult();
    finishFlag = 1;
  } else {
    showImage();
  }
}

//The results+++++++++++++++++++++++++++++++++++++++++++++++
function showResult() {
  // Before showing results, resolve any remaining ties
  let tiedGroups = findTiedQueens();
  if (tiedGroups.length > 0) {
    runTiebreakerRound(tiedGroups);
    return;
  }
  let ranking = 1;
  let sameRank = 1;
  let str = `
    <div id="resultsContainer" style="
      background: linear-gradient(135deg, 
        ${document.documentElement.getAttribute('data-theme') === 'light' 
          ? 'rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.8) 100%'
          : 'rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%'
        });
      backdrop-filter: blur(10px);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      padding: 20px;
      margin: 20px auto;
      max-width: 500px;
      box-shadow: ${document.documentElement.getAttribute('data-theme') === 'light'
        ? '0 8px 32px rgba(255, 71, 226, 0.15), inset 0 0 50px rgba(255, 71, 226, 0.1)'
        : '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 0 50px rgba(255, 255, 255, 0.1)'
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
          ${document.documentElement.getAttribute('data-theme') === 'light'
            ? 'rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%'
            : 'rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%'
          });
        border-radius: 10px;
        transition: transform 0.2s ease;
        box-shadow: ${document.documentElement.getAttribute('data-theme') === 'light'
          ? '0 2px 8px rgba(255, 71, 226, 0.1)'
          : 'none'
        };
        &:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg,
            ${document.documentElement.getAttribute('data-theme') === 'light'
              ? 'rgba(255, 71, 226, 0.1) 0%, rgba(255, 71, 226, 0.05) 100%'
              : 'rgba(255, 71, 226, 0.3) 0%, rgba(255, 71, 226, 0.1) 100%'
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
        ">${activeQueens[lstMember[0][i]]}</td>
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
      <button onclick='downloadResults()'>Download Rankings</button>
    </div>`;

  document.getElementById("resultField").innerHTML = str;

  // Hide the battle interface
  document.querySelector(".battle-container").style.display = "none";
  document.querySelector(".skip-buttons").style.display = "none";
  document.getElementById("battleNumber").style.display = "none";
}

function findTiedQueens() {
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
function downloadResults() {
  const resultsContainer = document.getElementById('resultsContainer');
  
  html2canvas(resultsContainer, {
    backgroundColor: document.documentElement.getAttribute('data-theme') === 'light' 
      ? '#e6e9ff' 
      : '#000b3c',
    scale: 2, // Higher quality
  }).then(canvas => {
    // Create download link
    const link = document.createElement('a');
    link.download = 'drag-queen-rankings.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}

//Indicates two elements to compare+++++++++++++++++++++++++++++++++++
function showImage() {
  let str0 = "battle #" + numQuestion + "<br>" + 
             Math.floor((finishSize * 100) / totalSize) + "% sorted.";
  let str1 = "" + toNameFace(lstMember[cmp1][head1]);
  let str2 = "" + toNameFace(lstMember[cmp2][head2]);

  // Reset any lingering styles
  const leftField = document.getElementById("leftField");
  const rightField = document.getElementById("rightField");
  
  leftField.classList.remove('clicked');
  rightField.classList.remove('clicked');
  leftField.style = "";
  rightField.style = "";

  document.getElementById("battleNumber").innerHTML = str0;
  leftField.innerHTML = str1;
  rightField.innerHTML = str2;

  numQuestion++;
}

//Convert numeric value into a name (emoticon)+++++++++++++++++++++++++++++++
function toNameFace(n) {
  return activeQueens[n];
}

// Modify the initialize function to shuffle before starting
function initialize() {
  // Shuffle the active queens array before starting
  activeQueens = shuffleArray([...activeQueens]);
  initList();
  showImage();
}

function startSorting() {
  // Set activeQueens based on selection
  const selectedList = document.getElementById('queenListSelect').value;
  activeQueens = selectedList === 'test' ? testQueens : allWinners;
  
  document.getElementById("splashScreen").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
  initialize();
}

function recordChoice(choice) {
  if (finishFlag) {
    showResult();
    return;
  }

  let flag;
  const leftField = document.getElementById("leftField");
  const rightField = document.getElementById("rightField");

  if (choice == "left") {
    flag = -1;
    leftField.classList.add('clicked');
    setTimeout(() => {
      leftField.classList.remove('clicked');
      leftField.style.transform = "";
      leftField.style.background = "";
    }, 200);
  } else if (choice == "right") {
    flag = 1;
    rightField.classList.add('clicked');
    setTimeout(() => {
      rightField.classList.remove('clicked');
      rightField.style.transform = "";
      rightField.style.background = "";
    }, 200);
  } else if (choice == "tie") {
    tieCount++;
    if (tieCount >= TIE_WARNING_THRESHOLD) {
      alert("Try to choose a favorite when possible to get more precise rankings!");
      tieCount = 0;
    }
    flag = 0;
  } else if (choice == "skip") {
    flag = Math.floor(Math.random() * 2) ? 1 : -1;
  }

  sortList(flag);
}

// Add at the top of the file
function toggleTheme() {
  const root = document.documentElement;
  const themeButton = document.getElementById('themeToggle');
  
  if (root.getAttribute('data-theme') === 'light') {
    root.removeAttribute('data-theme');
    themeButton.innerHTML = '🌙';
    localStorage.setItem('theme', 'dark');
  } else {
    root.setAttribute('data-theme', 'light');
    themeButton.innerHTML = '☀️';
    localStorage.setItem('theme', 'light');
  }
}

// Add this to initialize theme from localStorage
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const root = document.documentElement;
  const themeButton = document.getElementById('themeToggle');
  
  if (savedTheme === 'light') {
    root.setAttribute('data-theme', 'light');
    themeButton.innerHTML = '☀️';
  }

  // Add select expand/collapse handler
  const select = document.getElementById('queenListSelect');
  select.addEventListener('mousedown', function() {
    this.parentElement.classList.toggle('expanded');
  });
  
  select.addEventListener('blur', function() {
    this.parentElement.classList.remove('expanded');
  });
  
  select.addEventListener('change', function() {
    this.parentElement.classList.remove('expanded');
  });
});
