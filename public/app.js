window.addEventListener('load', function () {
    let socket = io();

    socket.on('connect', function () {
        console.log("Connected to the server");
    });

    // Listen for initial list of flowers from the server
    socket.on('initialFlowers', function (flowers) {
        flowers.forEach(flower => {
            createNewFlower(flower); // Ensure this function exists in sketch.js
        });
    });

    // Listen for new flower data from the server
    socket.on('msg', function (data) {
        // Directly create a new flower only when a new one is sent from the server
        createNewFlower(data);
    });

    let nameInput = document.getElementById('name-input');
    let msgInput = document.getElementById('msg-input');
    let plantDropDown = document.getElementById('dropdownMenu');
    let sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function () {
        let curName = nameInput.value;
        let curMsg = msgInput.value;
        let curPlant = plantDropDown.value;
        let msgObj = { "name": curName, 'plant': curPlant, "msg": curMsg };

        // Send the message object to the server
        socket.emit('msg', msgObj);

        // Clear input fields (optional)
        nameInput.value = '';
        msgInput.value = '';
    });
  
    let screenshotButton = document.getElementById('screenshot-button');
    screenshotButton.addEventListener('click', () =>{
      html2canvas(document.body).then( canvas => {
        let link = document.createElement('a');
        link.download = 'screenshot.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    })
});