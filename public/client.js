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

        // clear my text msg send hone ke baad
    }
});

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim() 
        // mesgae trim krenge space hta dega
    };

    // Append message
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
    <div class="message-content">
        <div class="message-header">
            <h4 class="username">${msg.user}</h4>
            <span class="timestamp">${new Date().toLocaleTimeString()}</span>
        </div>
        <div class="message-body">
            <p class="message-text">${msg.message}</p>
        </div>
    </div>
`;

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
    // Scroll to the bottom of the message area
    messageArea.scrollTop = messageArea.scrollHeight;
}


// receive messages 

// client code browser run 

socket.on('message',(msg) => {
    // server me aagya 
    appendMessage(msg,'incoming')
    scrollToBottom();
})


// automaticall scorolll 

function scrollToBottom(msg) {

    messageArea.scrollTop = messageArea.scrollHeight;
}