export const queensWithData = [
  {
    name: "Bianca Del Rio",
    seasons: [
      { season: "Season 6", placement: [1] }
    ],
    missCongeniality: false,
    winner: true
  },
  {
    name: "Katya",
    seasons: [
      { season: "Season 7", placement: [5] },
      { season: "All Stars 2", placement: [2, 3] }
    ],
    missCongeniality: true,
    winner: false
  },
  {
    name: "Sasha Velour",
    seasons: [
      { season: "Season 9", placement: [1] }
    ],
    missCongeniality: false,
    winner: true
  },
  {
    name: "Jinkx Monsoon",
    seasons: [
      { season: "Season 5", placement: [1] },
      { season: "All Stars 7", placement: [1] }
    ],
    missCongeniality: false,
    winner: true
  },
  {
    name: "Alyssa Edwards",
    seasons: [
      { season: "Season 5", placement: [6] },
      { season: "All Stars 2", placement: [5] } 
    ],
    missCongeniality: false,
    winner: false
  },
  {
    name: "BenDeLaCreme",
    seasons: [
      { season: "Season 6", placement: [5] },
      { season: "All Stars 3", placement: [6] } 
    ],
    missCongeniality: true,
    winner: false
  },
  {
    name: "Trixie Mattel",
    seasons: [
      { season: "Season 7", placement: [6] },
      { season: "All Stars 3", placement: [1] }
    ],
    missCongeniality: false,
    winner: true
  },
  {
    name: "Bob the Drag Queen",
    seasons: [
      { season: "Season 8", placement: [1] }
    ],
    missCongeniality: false,
    winner: true
  },
  {
    name: "Alaska",
    seasons: [
      { season: "Season 5", placement: [2, 3] }, 
      { season: "All Stars 2", placement: [1] }
    ],
    missCongeniality: false,
    winner: true
  },
  {
    name: "Shangela",
    seasons: [
      { season: "Season 2", placement: [12] },
      { season: "Season 3", placement: [6] },
      { season: "All Stars 3", placement: [3, 4] }  
    ],
    missCongeniality: false,
    winner: false
  },
  {
    name: "Monét X Change",
    seasons: [
      { season: "Season 10", placement: [6] },
      { season: "All Stars 4", placement: [1] }, 
      { season: "All Stars 7", placement: [2] }
    ],
    missCongeniality: true,
    winner: true
  },
  {
    name: "Mistress Isabelle Brooks",
    seasons: [
      { season: "Season 15", placement: [3, 4] }
    ],
    missCongeniality: false,
    winner: false
  },
  {
    name: "Bimini Bon-Boulash",
    seasons: [
      { season: "UK Season 2", placement: [2, 3] }
    ],
    missCongeniality: false,
    winner: false
  },
  {
    name: "Tayce",
    seasons: [
      { season: "UK Season 2", placement: [2, 3] }
    ],
    missCongeniality: false,
    winner: false
  },
  {
    name: "Spankie Jackzon",
    seasons: [
      { season: "Down Under Season 2", placement: [1] }
    ],
    missCongeniality: false,
    winner: true
  },
  {
    name: "Jimbo",
    seasons: [
      { season: "Canada Season 1", placement: [4] },
      { season: "UK vs The World Season 1", placement: [7] },
      { season: "All Stars 8", placement: [1] }
    ],
    missCongeniality: false,
    winner: true
  },
  {
    name: "Jorgeous",
    seasons: [
      { season: "Season 14", placement: [7] },
      { season: "All Stars 9", placement: [4,5,6,7,8] }
    ],
    missCongeniality: false,
    winner: false
  },
  {
    name: "Naomi Smalls",
    seasons: [
      { season: "Season 8", placement: [2, 3] }, 
      { season: "All Stars 4", placement: [3, 4] }  
    ],
    missCongeniality: false,
    winner: false
  },
  {
    name: "Ginger Johnson",
    seasons: [
      { season: "UK Season 5", placement: [1] }
    ],
    missCongeniality: false,
    winner: true
  },
  {
    name: "Valentina",
    seasons: [
      { season: "Season 9", placement: [7] },
      { season: "All Stars 4", placement: [7] }
    ],
    missCongeniality: true,
    winner: false
  },
  {
    name: "Detox",
    seasons: [
      { season: "Season 5", placement: [4] },
      { season: "All Stars 2", placement: [2, 3] }  
    ],
    missCongeniality: false,
    winner: false
  },
  {
    name: "Heidi N Closet",
    seasons: [
      { season: "Season 12", placement: [6] },
      { season: "All Stars 8", placement: [3] }
    ],
    missCongeniality: true,
    winner: false
  }
];

// Helper function to get just names when needed
export function getQueenNames() {
  return queensWithData.map(queen => queen.name);
} 