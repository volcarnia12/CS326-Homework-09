import { Game } from './game.js';
import * as utils from './scrabbleUtils.js';
import { Rack } from './rack.js';

// Fetch the dictionary from the server.
const response = await fetch('dictionary.json');
if (!response.ok) {
  console.log(response.error);
} else {
  window.dictionary = await response.json();
}

// Set the number of players and the whose turn it is.
const NUMBER_OF_PLAYERS = 2;

// Player 1 starts the game
let turn = 0;


// Updates and displays the current payers turn.
function updateTurn() {
  document.getElementById('turn').innerText = document.getElementById(
    `p${(turn % NUMBER_OF_PLAYERS) + 1}-name`
  ).value;
}

function renderGame(game) {
  game.render(document.getElementById('board'));
}

function renderRacks(racks) {
  racks.forEach((rack, i) =>
    rack.render(document.getElementById(`p${i + 1}-rack`))
  );
}

async function saveWordScore(name, word, score){

  const options =  {
    method: "POST",
    body: JSON.stringify({
        name: name,
        word: word,
        score: score
    }),
    headers: { "Content-type": "application/json" }
  };
  await fetch('/wordScore', options);
  //return response;
}


const table = document.getElementById('table');
let nameArr = [];
let wordArr = [];
let scoreArr = [];



function displayWordScore(name, word, score){
  //const table = document.getElementById('table')
  /*table.style.width = '100px';
  table.style.border = '1px solid black';*/
  //console.log(nArr[0]);
  /*while (table.firstChild) {
    table.removeChild(table.firstChild);
  }*/
  //for (let i = 0; i < wordArr.length; i++) {
    const tr = table.insertRow();
    for (let j = 0; j < 3; j++) {
      //console.log(nArr[i]);
      if (j === 0){
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(name));
        td.style.border = '1px solid black';
      }
      else if (j === 1){
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(word));
        td.style.border = '1px solid black';
      }
      else {
        const td = tr.insertCell();
        //let scorer = sArr[i];
        td.appendChild(document.createTextNode(score.toString()));
        td.style.border = '1px solid black';
      }
    }
    //window.localStorage.setItem('wordTable', table.innerHTML);
  //}
  //body.appendChild(tbl);
  
}

// Create a new game.
const game = new Game();

// Display the player's turn.
updateTurn();

// An array of racks.
const racks = [];

// An array of scores for each player.
const scores = Array.from(Array(NUMBER_OF_PLAYERS), () => 0);

// Initialize the racks and player name's event handler.
for (let i = 0; i < NUMBER_OF_PLAYERS; ++i) {
  racks[i] = new Rack();

  racks[i].takeFromBag(7, game);

  // When the player's name changes, update the player's turn.
  document
    .getElementById(`p${i + 1}-name`)
    .addEventListener('change', updateTurn);
}

// Render the racks and the game board.
renderRacks(racks);
renderGame(game);

// Several changes to account for two players and dictionary.
document.getElementById('play').addEventListener('click', async () => {
  const word = document.getElementById('word').value;
  const x = parseInt(document.getElementById('x').value);
  const y = parseInt(document.getElementById('y').value);
  const direction = document.getElementById('direction').value === 'horizontal';

  // Get the rack for the current player's turn.
  const rack = racks[turn % NUMBER_OF_PLAYERS];

  // We need to remove tiles already on the grid from the word trying to be
  // constructed.
  let remaining = word;
  for (let i = 0; i < word.length; ++i) {
    const tile = direction
      ? game.getGrid()[x + i][y]
      : game.getGrid()[x][y + i];
    if (tile !== null) {
      if (tile !== word[i]) {
        alert(`The word intercepts already placed tiles.`);
        return;
      } else {
        remaining = remaining.replace(tile, '');
      }
    }
  }

  if (remaining === '') {
    alert('You need to place at least one tile!');
  }

  if (!utils.canConstructWord(rack.getAvailableTiles(), remaining)) {
    alert(`The word ${word} cannot be constructed.`);
  } else {
    try {
      const score = game.playAt(word, { x, y }, direction);
      scores[turn % NUMBER_OF_PLAYERS] += score;
      document.getElementById('word').value = '';
      renderGame(game);
      let name = document.getElementById(`p${(turn % NUMBER_OF_PLAYERS) + 1}-name`).value;
      // TODO: Save the player's name, word, and score to the server. You will
      //       need to use the `POST /wordScore` endpoint to do this. We
      //       recommend you write functions to do this for you rather than
      //       make calls to `fetch` directly in this function. For example:
      //
      //       `await saveWordScore(name, word, score);`
      //        
      //       You will also want to update the word score table in the UI.
      //       Again, we recommend a function for this. For example:
      //
      //       `displayWordScore(name, word, score);`
      /*app.post('/wordScore', (req, res) => {
        const options = req.query;
        await saveWordScore(options.name, options.word, options.score);
        //res.send("POST Request Called")
      })*/

      nameArr.push(name);
      wordArr.push(word);
      scoreArr.push(utils.baseScore(word));

      //console.log(nameArr);
      
    
      await saveWordScore(name, word, score);
      //await saveWordScore(name, word, utils.baseScore(word));
      displayWordScore(name, word, score);
      //displayWordScore(name, word, score);

      const used = utils.constructWord(rack.getAvailableTiles(), remaining);
      used.forEach((tile) => rack.removeTile(tile));
      rack.takeFromBag(used.length, game);
      renderRacks(racks);
      ++turn;

      updateTurn();
    } catch (e) {
      alert(e);
    }
  }
});

document.getElementById('reset').addEventListener('click', () => {
  game.reset();
  game.render(board);
});

document.getElementById('help').addEventListener('click', () => {
  // Updates to account for two racks.
  const availableTiles = racks[turn % NUMBER_OF_PLAYERS].getAvailableTiles();
  console.log(availableTiles);
  const possibilities = utils.bestPossibleWords(availableTiles);
  // const possibilities = utils.bestPossibleWords(
  //   racks[turn].getAvailableTiles()
  // );
  const hint = possibilities[Math.floor(Math.random() * possibilities.length)];
  document.getElementById('hint').innerText = hint;
});

async function saveGameScore(name, score){
  const options =  {
    method: "POST",
    body: JSON.stringify({
        name: name,
        score: score
    }),
    headers: { "Content-type": "application/json" }
  };
  await fetch('/gameScore', options);

}

async function topWordScores(){
  const responseWord = await fetch('/highestWordScores');
  const jsonWord = await responseWord.json();
  console.log(jsonWord);

  const topWords = document.getElementById('topWords');
  for (let i = 0; i < jsonWord.length; i++) {
    const tr = topWords.insertRow();
    for (let j = 0; j < 3; j++) {
      //console.log(nArr[i]);
      if (j === 0){
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(jsonWord[i].name));
        td.style.border = '1px solid black';
      }
      else if (j === 1){
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(jsonWord[i].word));
        td.style.border = '1px solid black';
      }
      else {
        const td = tr.insertCell();
        //let scorer = sArr[i];
        td.appendChild(document.createTextNode((jsonWord[i].score).toString()));
        td.style.border = '1px solid black';
      }
    }
  }
}

async function topGameScores(){
  const responseWord = await fetch('/highestGameScores');
  const jsonWord = await responseWord.json();
  console.log(jsonWord);

  const topGames = document.getElementById('topGames');
  for (let i = 0; i < jsonWord.length; i++) {
    const tr = topGames.insertRow();
    for (let j = 0; j < 2; j++) {
      //console.log(nArr[i]);
      if (j === 0){
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(jsonWord[i].name));
        td.style.border = '1px solid black';
      }
      else {
        const td = tr.insertCell();
        //let scorer = sArr[i];
        td.appendChild(document.createTextNode((jsonWord[i].score).toString()));
        td.style.border = '1px solid black';
      }
    }
  }
}

document.getElementById('end').addEventListener('click', async () => {
  // TODO: Add a button whose id is `end` before you complete this method.
  // TODO: Save the game scores to the server. You will need to use the
  //      `POST /gameScore` endpoint to do this. We recommend you write
  //      functions to do this for you rather than make calls to `fetch`
  //      directly in this function. For example:
  //
  //     `await saveGameScore(name, score[i]);`
  //
  //      Where `i` is the i'th player.
    let name1 = document.getElementById(`p${1}-name`).value;
    //await saveGameScore(name1, totalScore[0]);
    let name2 = document.getElementById(`p${2}-name`).value;
    await saveGameScore(name1, scores[0]);
    await saveGameScore(name2, scores[1]);
    console.log(scores[0]);
    console.log(scores[1]);

    topWordScores();
    topGameScores();
});
