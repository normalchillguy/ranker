console.log("testQueens.js is loading");
import { allQueensWithData } from "./allQueensWithData.js";

export function getRandomQueens(count = 10) {
  // Create a copy of allQueensWithData array
  const shuffled = [...allQueensWithData];

  // Shuffle array using Fisher-Yates algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Return first 'count' queens
  return shuffled.slice(0, count);
}
