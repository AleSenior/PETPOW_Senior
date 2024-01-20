// socket: websocket that connects to the server
let socket = new WebSocket('ws://localhost:3000');

// sendLetter(e): sends letter in the input space through the websocket
const sendLetter = (e) => {
    e.preventDefault();
    const input = document.querySelector('input');
    if(input.value) {
        socket.send(input.value);
        input.value = "";
    }
    input.focus();
}

// "sendLetter(e)" is executed when the form is submitted
document.querySelector('form').addEventListener('submit', sendLetter);

// When the socket is opened, "I have connected!" is printed to the console
socket.addEventListener("open", () => {
    console.log('I have connected!');
})

// When the socket receives a message, it processes it differently depending on the content
socket.addEventListener('message', async ({ data }) => {
    let obj = await JSON.parse(data);
    switch(obj.type){
        // On a "success" message, the guessed letter is revealed in the hidden word
        case 'success': document.getElementById('word').innerText = obj.value;
                        break;
        // On a "failure" message, the hangman picture is updated
        case 'failure': document.getElementById('hangmanPic').innerText = obj.value;
                        break;
        // On a "victory" message, the form is replaced by a victory message
        case 'victory': console.log(obj.value);
                        let victoryMessage = document.createElement("h2");
                        victoryMessage.setAttribute('id', "victoryMessage");
                        victoryMessage.innerText = '¡Victoria!';
                        document.getElementById('letterSender').replaceWith(victoryMessage);
                        break;
        // On a "defeat" message, the form is replaced by a defeat message
        case 'defeat' : console.log(obj.value);
                        let defeatMessage = document.createElement("h2");
                        defeatMessage.setAttribute('id', "defeatMessage");
                        defeatMessage.innerText = '¡Derrota!';
                        document.getElementById('letterSender').replaceWith(defeatMessage);
                        break;
        // The client isn't supposed to receive any other type of message, so if it does, an error is thrown.
        default: throw new Error("Unknown message");
    }
})