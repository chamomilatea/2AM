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
let creepScale = 1; // Scale for the creep image
let zoomingIn = false; // Track whether we are zooming in
let fadeToBlack = false; // Track whether we are fading to black
let fadeOpacity = 0; // Opacity for the fade effect
let showText = false; // Track whether to show the "2AM" text

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
          zoomingIn = true; // Start zooming in
        }, 2000);
      }, 2000);
    }

    // Draw the overlay image if it's shown
    if (overlayShown) {
      image(overlayImage, 0, 0, width, height); // Display the overlay image
    }

    // Draw the creep image if it's shown
    if (creepShown) {
      if (zoomingIn) { // If we are zooming in
        creepScale += 0.05; // Increase scale for zooming effect
        if (creepScale >= 2) { // Stop zooming when scale reaches 2x
          creepScale = 2; // Cap the scale at 2
          zoomingIn = false; // Stop the zooming process
          fadeToBlack = true; // Start fading to black
        }
      }
      // Center the creep image and apply scale
      let x = (width - creepImage.width * creepScale) / 2;
      let y = (height - creepImage.height * creepScale) / 2;
      image(creepImage, x, y, creepImage.width * creepScale, creepImage.height * creepScale);
    }

    // Handle fade to black effect
    if (fadeToBlack) {
      fadeOpacity += 5; // Increase opacity
      if (fadeOpacity >= 255) {
        fadeOpacity = 255; // Cap opacity
        showText = true; // Show the text after fade
      }
      fill(0, fadeOpacity); // Set fill color to black with current opacity
      rect(0, 0, width, height); // Draw the rectangle over the entire canvas
    }

    // Draw the "2AM" text in the center of the screen if fade is complete
    if (showText) {
      textSize(64); // Set text size
      fill(255); // Set text color to white
      textAlign(CENTER, CENTER); // Center the text
      text("2AM", width / 2, height / 2); // Draw the text
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
  creepScale = 1; // Reset creep scale
  zoomingIn = false; // Reset zoom state
  fadeToBlack = false; // Reset fade state
  fadeOpacity = 0; // Reset fade opacity
  showText = false; // Reset text visibility
  clearTimeout(creepTimeout); // Clear any existing timeout
}

function pageThree() {
  pageThreeOn = true;
  pageTwoOn = false; 
  overlayShown = false; 
  creepShown = false; // Reset creep visibility
  creepScale = 1; // Reset creep scale
  zoomingIn = false; // Reset zoom state
  fadeToBlack = false; // Reset fade state
  fadeOpacity = 0; // Reset fade opacity
  showText = false; // Reset text visibility
  clearTimeout(creepTimeout); // Clear any existing timeout
}
