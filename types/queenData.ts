interface Season {
  season: string;  // e.g., "Season 6", "All Stars 4", "UK Season 2"
  placement: number[];  // e.g., [1] for sole winner, [1,1] for tied winner
}

interface Queen {
  name: string;  // The queen's name
  seasons: Season[];  // Array of seasons they competed in
  missCongeniality: boolean;  // Whether they won Miss Congeniality
  winner: boolean;  // Whether they won any season
}

// Example usage:
const exampleQueen: Queen = {
  name: "Monét X Change",
  seasons: [
    { season: "Season 10", placement: [6] },
    { season: "All Stars 4", placement: [1, 1] },  // Tied win with Trinity
    { season: "All Stars 7", placement: [3] }
  ],
  missCongeniality: true,
  winner: true
}; 