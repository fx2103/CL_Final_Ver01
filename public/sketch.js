let flowers = [];
let socket;
let draggingFlower = null; // Variable to track the flower being dragged

function preload(){
  bgImage = loadImage('https://cdn.glitch.global/8c93b6c9-9dc6-4089-8240-b26b2c58c581/pots_v05.png?v=1730724313078');
}

function setup() {
  createCanvas(windowWidth, windowHeight/2).parent('sketch-holder');
  image(bgImage, 0, 0, width, height);

  // Ensure window.socket is defined before using it
  if (window.socket) {
    socket = window.socket;
    socket.on('msg', (data) => {
      createNewFlower(data);
    });
  } else {
    console.error("Socket is not defined. Ensure app.js is loaded before sketch.js.");
  }
}

function createNewFlower(data) {
  let flower = {
    x: random(50, 600),
    y: random(50, 500),
    name: data.name,
    message: data.msg,
    type: data.plant,
    isDragging: false // Property to track dragging state
  };
  flowers.push(flower);
}

function draw() {
  image(bgImage, 0, 0, width, height);
  for (let flower of flowers) {
    // Update position if the flower is being dragged
    if (flower.isDragging) {
      flower.x = mouseX;
      flower.y = mouseY;
    }

    // Draw the flower
    drawFlower(flower.x, flower.y, flower.type);

    // Display name and message when hovered
    if (dist(mouseX, mouseY, flower.x, flower.y) < 25) {
      fill(255);
      noStroke();
      text(`${flower.name}: ${flower.message}`, flower.x, flower.y - 10);
    }
  }
}

function drawFlower(x, y, type) {
  push();
  translate(x, y);
  
  stroke(34, 139, 34); 
  strokeWeight(4);
  line(0, 0, 0, 70); 
  
  noStroke(); 
  
  if (type === 'flower_01') {
    fill(255, 204, 0);
    for (let i = 0; i < 10; i++) {
      ellipse(0, 25, 30, 50);
      rotate(PI / 5);
    }
    fill(255, 150, 0);
    ellipse(0, 0, 30, 30);
  } else if (type === 'flower_02') {
    fill(171, 130,197);
    beginShape();
    for (let i = 0; i < 16; i++) {
      let angle = map(i, 0, 16, 0, TWO_PI);
      let r = i % 2 === 0 ? 30 : 45;
      let x = r * cos(angle);
      let y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    fill(87, 6, 140);
    ellipse(0, 0, 20, 20);
    } else if (type === 'flower_03') {
    fill(255, 210, 200); 
    for (let i = 0; i < 12; i++) {
      ellipse(0, 15, 20, 50);
      rotate(PI / 6);
    }
    fill(255); 
    ellipse(0, 0, 30, 30);
  } else if (type === 'flower_04') {
    fill(255, 100, 100); 
    for (let i = 0; i < 20; i++) {
      ellipse(0, 15, 8, 50);
      rotate(PI / 10);
    }
    fill(255, 240, 170); 
    ellipse(0, 0, 20, 20);
  } else if (type === 'flower_05') {
    fill(255,170, 0); 
    for (let i = 0; i < 16; i++) {
      ellipse(0, 25, 18, 35);
      rotate(PI / 8);
    }
    fill(139, 69, 19); 
    ellipse(0, 0, 50, 50);
  }
  pop();
}

// Handle mousePressed event to start dragging a flower
function mousePressed() {
  for (let flower of flowers) {
    if (dist(mouseX, mouseY, flower.x, flower.y) < 25) {
      flower.isDragging = true;
      draggingFlower = flower; // Track which flower is being dragged
      break;
    }
  }
}

// Handle mouseReleased event to stop dragging
function mouseReleased() {
  if (draggingFlower) {
    draggingFlower.isDragging = false;
    draggingFlower = null;
  }
}

// Resize the canvas automatically when the window gets resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight/2); 
  background(bgImage); 
}
