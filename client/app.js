let socket = new WebSocket('ws://localhost:3000');

const sendLetter = (e) => {
    e.preventDefault();
    const input = document.querySelector('input');
    if(input.value) {
        socket.send(input.value);
        input.value = "";
    }
    input.focus();
}

document.querySelector('form').addEventListener('submit', sendLetter);

socket.addEventListener("open", () => {
    console.log('I have connected!');
})

socket.addEventListener('message', async ({ data }) => {
    let obj = await JSON.parse(data);
    switch(obj.type){
        case 'success': document.getElementById('word').innerText = obj.value;
                        break;
        case 'failure': document.getElementById('hangmanPic').innerText = obj.value;
                        break;
        default: throw new Error();
    }
})