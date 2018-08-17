var img;
var bgImg;
function preload() {
  img = loadImage('slam.png');
  bgImg = loadImage('slam-bg.png');
}

function setup() {
  	createCanvas(window.innerWidth, window.innerHeight);
	image(bgImg, 0, 0, 1200, 675);
	// background(193,49,255);
}

function draw() {
	image(img, mouseX+200, mouseY+200, 300, 132);
}