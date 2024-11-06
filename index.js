// setup
let express = require('express');
let app = express();
app.use('/', express.static('public'));

let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});

let io = require('socket.io')(server);

// Array to store all planted flowers
let plantedFlowers = [];

io.sockets.on('connection', function (socket) {
    console.log("We have a new client: " + socket.id);

    // Send existing flowers to the new client
    socket.emit('initialFlowers', plantedFlowers);

    // Listen for a message named 'msg' from this client
    socket.on('msg', function (data) {
        console.log("Received a 'msg' event");
        console.log(data);

        // Store the new flower data in the array
        plantedFlowers.push(data);

        // Send the new flower to all clients, including this one
        io.sockets.emit('msg', data);
    });

    // Listen for this client to disconnect
    socket.on('disconnect', function () {
        console.log("A client has disconnected: " + socket.id);
    });
});
