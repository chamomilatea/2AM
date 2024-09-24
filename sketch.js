let pageTwoImage;
let pageTwoOn = false;
let pageThreeImage;
let pageThreeOn = false; 
let overlayImage; // Variable for the overlay image
let creepImage, handleHoldingTomatoeImage; // Variable for the creep image
let overlayShown = false; // Track whether the overlay is shown
let creepShown = false; // Track whether the creep is shown
let button; 
let buttonPageTwo; 
let overlayShown = false; // Track whether the overlay is shown

function preload() {
  pageTwoImage = loadImage('Images/walkable.png');
  pageThreeImage = loadImage('Images/eerieaisle.png');
  overlayImage = loadImage('Images/handleholdingtomatoe.png'); // Load the overlay image
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
} background(0, 0, 0, 0.5);
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
                
        // Show the creep image 2 seconds after the overlay image
        setTimeout(() => {
          creepShown = true;
        }, 2000);
      }, 5000);
    }
    
    // Draw the overlay image if it's shown
    if (overlayShown) {
      image(overlayImage, 0, 0, width, height); // Display the overlay image
    }
      // Draw the creep image if shown
      if (creepShown) {
        image(creepImage, 0, 0, width, height); // Display the creep
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

function fadeInImage(img) {
  let opacity = 0;
  const interval = setInterval(() => {
    opacity += 0.05;
    if (opacity >= 1) {
      opacity = 1;
      clearInterval(interval);
    }
    background(0); // Clear the background
    tint(255, opacity * 255); // Apply the opacity
    image(img, 0, 0, width, height); // Draw the image
  }, 50); // Adjust the interval time for the fade-in effect
}

function fadeOutAndChangeImage(newImage) {
  let opacity = 1;
  const interval = setInterval(() => {
    opacity -= 0.05;
    if (opacity <= 0) {
      opacity = 0;
      clearInterval(interval);
      // Change to the new image and fade it in
      fadeInImage(newImage);
    }
    background(0); // Clear the background
    tint(255, opacity * 255); // Apply the opacity
    image(pageTwoImage, 0, 0, width, height); // Draw the current image
  }, 50); // Adjust the interval time for the fade-out effect
}
