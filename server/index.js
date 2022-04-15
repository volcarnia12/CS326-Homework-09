import express from 'express';
import { readFile, writeFile } from 'fs/promises';
// TODO: import the morgan middleware from 'morgan'

const WORD_SCORE_FILE = 'word-scores.json';
const GAME_SCORE_FILE = 'game-scores.json';

// Returns a function that will read a score file.
function readScoreFile(path) {
  return async () => {
    try {
      const scoreFile = await readFile(path, 'utf8');
      const scores = JSON.parse(scoreFile);
      return scores;
    } catch (error) {
      // Likely the file doesn't exist
      return [];
    }
  };
}

// Create functions for reading from score files.
const readWordScores = readScoreFile(WORD_SCORE_FILE);
const readGameScores = readScoreFile(GAME_SCORE_FILE);

// Returns a function that will save a word score to a word score file.
function saveToWordScoreFile(path) {
  return async (name, word, score) => {
    const data = { name, word, score };
    const scores = await readWordScores();
    scores.push(data);
    writeFile(path, JSON.stringify(scores), 'utf8');
  };
}

// Returns a function that will save a game score to a game score file.
function saveToGameScoreFile(path) {
  return async (name, score) => {
    const data = { name, score };
    const scores = await readGameScores();
    scores.push(data);
    writeFile(path, JSON.stringify(scores), 'utf8');
  };
}

// Create functions for saving to score files.
const saveWordScore = saveToWordScoreFile(WORD_SCORE_FILE);
const saveGameScore = saveToGameScoreFile(GAME_SCORE_FILE);

async function top10WordScores() {
  const scores = await readWordScores();
  const sorted = scores.sort((a, b) => b.score - a.score);
  const top = sorted.slice(0, 10);
  return top;
}

async function top10GameScores() {
  const scores = await readGameScores();
  const sorted = scores.sort((a, b) => b.score - a.score);
  const top = sorted.slice(0, 10);
  return top;
}

// Create the Express app and set the port number.
const app = express();
const port = 3000;

// Add Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO: Add the morgan middleware to the app.
// TODO: Add the express.static middleware to the app.

// TODO: Implement the ExpressJS routes for this server.

// Add your code here. 😎 👍
// You can do this! Make sure you reference example applications covered in
// class and in the associated exercises!

// This matches all routes that are not defined.
app.all('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

// Start the server.
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
