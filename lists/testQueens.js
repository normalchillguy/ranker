console.log('testQueens.js is loading');
import { allQueens } from './allQueens.js';

export function getRandomQueens(count = 10) {
  // Create a copy of allQueens array
  const shuffled = [...allQueens];
  
  // Shuffle array using Fisher-Yates algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Return first 'count' queens
  return shuffled.slice(0, count);
} 