function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 0, 0, 0); // Clear the background each frame
  addGrain(); // Add grain effect
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw(); // Redraw the canvas after resizing
}

function addGrain() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let index = (x + y * width) * 4;
      let grain = random(0, 225);
      pixels[index] = grain; // Red
      pixels[index + 1] = grain; // Green
      pixels[index + 2] = grain; // Blue
      pixels[index + 3] = 150; // Alpha (transparency)
    }
  }
  updatePixels();
}