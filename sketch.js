function setup() {
    createCanvas(window.innerWidth, 1000);
    background(0);
  }
  
  function draw() {
    background(0); // Clear the background each frame
    addGrain(); // Add grain effect
    circle(mouseX, mouseY, width * 0.01);
  }
  
  function addGrain() {
    loadPixels();
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let index = (x + y * width) * 4;
        let grain = random(0, 255);
        pixels[index] = grain; // Red
        pixels[index + 1] = grain; // Green
        pixels[index + 2] = grain; // Blue
        pixels[index + 3] = 50; // Alpha (transparency)
      }
    }
    updatePixels();
  }