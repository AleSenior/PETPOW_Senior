let socket = new WebSocket('ws://localhost:8080');

socket.onmessage() = (event) => {
    const msg = JSON.parse(event.data);
    document.getElementById('word').innerHTML = "<p>Hola Mundo!</p>"
}