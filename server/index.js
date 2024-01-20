const WebSocket = require('ws');

// The server is created with ws (https://www.npmjs.com/package/ws)
let wss = new WebSocket.Server({ port: 3000 });

// players: array of the clients currently connected
let players = [];

// hangman: array of hangman pics in ASCII art
let hangman = [`
  +---+
  |   |
      |
      |
      |
      |
=========
`, `
  +---+
  |   |
  O   |
      |
      |
      |
=========
`, `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========
`, `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========
`, `
  +---+
  |   |
  O   |
 /|\\\  |
      |
      |
=========
`, `
  +---+
  |   |
  O   |
 /|\\\  |
 /    |
      |
=========
`, `
  +---+
  |   |
  O   |
 /|\\\  |
 / \\\  |
      |
=========
`];

// word: string containing the word for the game
// hiddenWord: string containing the letters that have been unlocked by the players
// failures: count of times the players have failed to guess a letter
var word = '';
var hiddenWord = '';
var failures = 0;

// getWord(): fetches a random word from the API and returns it
async function getWord(){
    let obj = await fetch('https://pow-3bae6d63ret5.deno.dev/word').then((response) => response.json());
    return obj.word;
}

// revealLetters(): unlocks the guessed letter from the hidden word and return the new hidden word
function revealLetters(word, hiddenWord, letter){
    let newHiddenWord = ''
    for(let i = 0; i < word.length; i++){
        if(word[i] == letter) newHiddenWord += letter;
        else newHiddenWord += hiddenWord[i];
    }
    return newHiddenWord;
}

// wss.on('connection', f(ws)): does "f" for each connection "ws"
wss.on('connection', async (ws) => {
    if(players.length >= 3) ws.close();
    else {
        players.push(ws);
        console.log(`Player ${players.indexOf(ws) + 1} has connected!`);
    }

    if(players.length == 1){
        word = await getWord();
        console.log(word);
        hiddenWord = Array.from(word).map(() => '_').join('');
        failures = 0;
    }
    ws.send(JSON.stringify({type: 'failure', value: hangman[failures]}));
    ws.send(JSON.stringify({type: 'success', value: hiddenWord}));

    //ws.on('message', f(m)): does "f" when "ws" receives a message "m"
    ws.on('message', (message) => {
        console.log(message.toString('utf8'));
        if(word.indexOf(message.toString('utf8')) == -1){
            failures++;
            for(let player of players){
                player.send(JSON.stringify({type: 'failure', value: hangman[failures]}));
            }
            if(failures == 6){
                for(let player of players){
                    player.send(JSON.stringify({type: 'defeat', value: 'You lose!'}));
                }
            }
        }
        else{
            hiddenWord = revealLetters(word, hiddenWord, message.toString('utf8'));
            console.log(message.toString('utf8'));
            console.log(hiddenWord);
            for(let player of players){
                player.send(JSON.stringify({type: 'success', value: hiddenWord}));
            }
            if(hiddenWord == word){
                for(let player of players){
                    player.send(JSON.stringify({type: 'victory', value: 'You win!'}));
                }
            }
        }
    })

    //ws.on('close', f()): does "f" when ws closes
    ws.on('close', () => {
        if(players.indexOf(ws) >= 0){
            console.log(`Player ${players.indexOf(ws) + 1} has disconnected.`);
            players.splice(players.indexOf(ws), 1);
        }
    })
})