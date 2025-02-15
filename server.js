const express = require('express');


const app = express();

const http = require('http').createServer(app);

const PORT = process.env.PORT || 4000
const path = require('path');



http.listen(PORT , () =>{
    console.log(`Listening on ${PORT} is running`);
});


// for file sending 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));

})

app.use(express.static(__dirname + '/public'))

// socket 

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('connected...')

    // terminal showing
    socket.on('message',(msg) => {
        // console.log(msg)
        socket.broadcast.emit ('message',msg)
    })

})






