const socket = io();

let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area'); 
do {
    name = prompt('Please enter your name:');
} while (!name);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
        e.target.value = ''; 

    }
});

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim() 

    };

    appendMessage(msg, 'outgoing');
    // after sending text area blank
    textarea.value = ''
    scrollToBottom();
    // Send to server
    socket.emit('message', msg);
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type; 

    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);

    messageArea.scrollTop = messageArea.scrollHeight;
}


// receive messages 

// client code browser run 

socket.on('message',(msg) => {
    appendMessage(msg,'incoming')
    scrollToBottom();
})


// automaticall scorolll 

function scrollToBottom(msg) {

    messageArea.scrollTop = messageArea.scrollHeight;
}
