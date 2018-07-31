var img;
function preload() {
  img = loadImage('slam.png');
}

function setup() {
  	createCanvas(window.innerWidth, window.innerHeight);
	// image(img, 100, 100, 50, 50);
	background(193,49,255);
}

function draw() {
  // background(220);
	// ellipse(mouseX+random(5),mouseY+random(5),50,50);
	image(img, mouseX, mouseY, 300, 169);
}