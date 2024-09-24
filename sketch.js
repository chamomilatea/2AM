let pageTwoImage; 
let pageTwoOn = false;
let pageThreeImage;
let pageThreeOn = false; 
let overlayImage; 
let creepImage; // Variable for the creep image
let button; 
let buttonPageTwo; 
let overlayShown = false; 
let creepShown = false; // Track whether the creep image is shown
let creepTimeout; // To store the timeout ID for the creep image

function preload() {
  pageTwoImage = loadImage('Images/walkable.png');
  pageThreeImage = loadImage('Images/eerieaisle.png');
  overlayImage = loadImage('Images/handleholdingtomatoe.png'); 
  creepImage = loadImage('Images/creep1.png'); // Load the creep image
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
    
    // Show the overlay after 2 seconds if it's not already shown
    if (!overlayShown) {
      setTimeout(() => {
        overlayShown = true; // Mark the overlay as shown
        // Show the creep image 2 seconds after the overlay is shown
        creepTimeout = setTimeout(() => {
          creepShown = true; // Mark the creep image as shown
        }, 2000);
      }, 2000);
    }

    // Draw the overlay image if it's shown
    if (overlayShown) {
      image(overlayImage, 0, 0, width, height); // Display the overlay image
    }

    // Draw the creep image if it's shown
    if (creepShown) {
      image(creepImage, 0, 0, width, height); // Display the creep image
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
  pageThreeOn = false; 
  overlayShown = false; 
  creepShown = false; // Reset creep visibility
  clearTimeout(creepTimeout); // Clear any existing timeout
}

function pageThree() {
  pageThreeOn = true;
  pageTwoOn = false; 
  overlayShown = false; 
  creepShown = false; // Reset creep visibility
  clearTimeout(creepTimeout); // Clear any existing timeout
}
