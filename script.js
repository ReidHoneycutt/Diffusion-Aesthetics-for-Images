//this is a nice little animation I recreated from a web source(link in description)

let W = window.innerWidth;
let H = window.innerHeight;

var grid;
var next;
var dA = 0.1;
var dB = 0.5;
var feed = 0.029;
var k = 0.065;
var arr = [[0.05, 0.2, 0.05], [0.2, -1, 0.2], [0.05, 0.2, 0.05]];

function setup() {
  createCanvas(W, H);
  // changing the pixelDensity to a value other than 1 results in the image being stretched repeated along the canvas on axes of different angles
  pixelDensity(1.1);
  grid = [];
  next = [];  
  for (var x = 1; x < W-1; x++) {
    grid[x] = [];
    next[x] = [];
    for (var y = 1; y < H-1; y++) {
      grid[x][y] = { a: 1, b: 0}; 
      next[x][y] = { a: 1, b: 0};
    }
  }
  // this is where you create the diffused image -formed using squares of side length 40
  for (let k = 0; k < 20; k++) {
	let x;
	let y;
	if (k % 2 == 0) {
		x = Math.floor(W/2);
    	y = Math.floor(H/2);
	} else {
    	x = Math.floor(W/2 - 40);
    	y = Math.floor(H/2);
  	}
    for (var i = 0; i < 50; i++) {
      for (var j = 0; j < 50; j++) {
         grid[i+x][j+y].b = 1;
      }
    }
  }
}

function draw() {
  background(51);
  for (var x = 3; x < W-3; x++) {
    for (var y = 3; y < H-3; y++) {
      var a = grid[x][y].a;
      var b = grid[x][y].b;
      next[x][y].a = a + (dA * laplaceA(x, y)) - (a * b * b) + (feed * (1-a));
      next[x][y].b = b + (dB * laplaceB(x, y)) + (a * b * b) - ((k + feed) * b);
    }
  }
  
  loadPixels();
  for (let x = 1; x < W-1; x++) {
    for (let y = 1; y < H-1; y++) {
      var pix = (x+y*W)*4;
      pixels[pix+0] = Math.floor(grid[x][y].a*255);
      pixels[pix+1] = 0;
      pixels[pix+2] = Math.floor(grid[x][y].b*255);
      pixels[pix+3] = 255;
    }
  }
  updatePixels();
  swap();
}

function laplaceA(x, y) {
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      sum += arr[i][j] * grid[x-1+i][y-1+j].a
    }
  }
  return sum;
}

function laplaceB(x, y) {
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      sum += arr[i][j] * grid[x-1+i][y-1+j].b
    }
  }
  return sum;
}
  
function swap() {
  var temp = grid;
  grid = next;
  next = grid;
}
