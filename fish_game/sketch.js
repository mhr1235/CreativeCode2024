let fishes = []; // Array to hold fish objects
let net;
let netImg;
let points = 0;
let fishCreationRate = 60; // Controls how often new fish are created
let fishCreationTimer = 0; // Timer for fish creation

function preload(){
  netImg = loadImage('net.png');
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
  
  net = new Net();
}

function draw() {
  background("lightcyan");
  
  // Displaying and updating each fish
  for (let i = 0; i < fishes.length; i++) {
    fishes[i].body();
    fishes[i].move();
    fishes[i].checkCollision();
  }
  
  net.body();
  
  // SCORE BOARD
  fill(0);
  textSize(50);
  text("score: " + points, 100, 400);
  
  // Check if it's time to create a new fish
  if (frameCount % fishCreationRate === 0) {
    createRandomFish();
  }
}

// NET
class Net {
  constructor(){
    
  }
  
  body(){
    image(netImg, mouseX, mouseY - 30, 100, 100);
  }
}

// FISH
class Fish {
  constructor(x, y, r, c){
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
  }
  
  body(){
    fill(this.c);
    noStroke();
    ellipse(this.x, this.y, 70, 50);
    triangle(this.x, this.y, this.x + 50, this.y - 30, this.x + 50, this.y + 30);
    fill(255);
    ellipse(this.x - 10, this.y, 10, 10);
  }
  
  move(){
    if (this.x <= 0){
      this.x = 600;
    } else {
      this.x -= this.r;
    }
  }
  
  remove(){
    this.x = -100;
    this.y = -100;
  }
  
  checkCollision(){
    let distFromNet = dist(mouseX, mouseY, this.x, this.y); 
    if (distFromNet <= 50){
      this.remove();
      points++;
    }
  }
}

// Function to create a random fish
function createRandomFish() {
  let x = width + 50; // Start fish off-screen
  let y = random(height); // Random y position
  let speed = random(8, 10); // Random speed
  let color = random(["blue", "red", "green", "yellow"]); // Random color
  fishes.push(new Fish(x, y, speed, color)); // Create new fish and add it to the array
}
