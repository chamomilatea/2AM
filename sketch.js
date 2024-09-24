let pageTwoImage;
let pageTwoOn = false;
let pageThreeImage;
let pageThreeOn = false; 
let overlayImage; // Variable for the overlay image
let button; 
let buttonPageTwo; 
let overlayShown = false; // Track whether the overlay is shown

function preload() {
  pageTwoImage = loadImage('Images/walkable.png');
  pageThreeImage = loadImage('Images/eerieaisle.png');
  overlayImage = loadImage('Images/handleholdingtomatoe.png'); // Load the overlay image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  pixelDensity(1);
  
  button = select("button");
  button.mousePressed(pageTwo); 

  buttonPageTwo = createButton("?");
  buttonPageTwo.position(100, 100);
  buttonPageTwo.mousePressed(pageThree); 
  buttonPageTwo.hide(); 

  background(0, 0, 0, 0.5);
}

function draw() {
  if (!pageTwoOn && !pageThreeOn) {
    addGrain();
    button.style('display', 'block');
    buttonPageTwo.hide(); 
  } else if (pageTwoOn) {
    button.style('display', 'none');
    buttonPageTwo.show(); 
    image(pageTwoImage, 0, 0, width, height);
  } else if (pageThreeOn) {
    button.style('display', 'none');
    buttonPageTwo.hide();
    background(pageThreeImage);
    
    // Show the overlay after 5 seconds if it's not already shown
    if (!overlayShown) {
      setTimeout(() => {
        overlayShown = true; // Mark the overlay as shown
      }, 5000);
    }

    // Draw the overlay image if it's shown
    if (overlayShown) {
      image(overlayImage, 0, 0, width, height); // Display the overlay image
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  addGrain();
}

function addGrain() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let index = (x + y * width) * 4;
      let grain = random(0, 225);
      pixels[index] = grain;
      pixels[index + 1] = grain;
      pixels[index + 2] = grain;
      pixels[index + 3] = 50; 
    }
  }
  updatePixels();
}

function pageTwo() {
  pageTwoOn = true;
  pageThreeOn = false; // Reset pageThreeOn when going to pageTwo
  overlayShown = false; // Reset overlay when switching pages
}

function pageThree() {
  pageThreeOn = true;
  pageTwoOn = false; // Reset pageTwoOn when going to pageThree
  overlayShown = false; // Reset overlay when switching pages
}
