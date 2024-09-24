let pageTwoImage; // Variable to hold the image for page two
let pageTwoOn = false; // State to track if page two is currently active
let pageThreeImage; // Variable to hold the image for page three
let pageThreeOn = false; // State to track if page three is currently active
let overlayImage; // Variable to hold the overlay image
let creepImage; // Variable for the creep image
let button; // Button for navigating to page two
let buttonPageTwo; // Button for navigating to page three
let overlayShown = false; // Track whether the overlay image is shown
let creepShown = false; // Track whether the creep image is shown
let creepTimeout; // To store the timeout ID for the creep image
let creepScale = 1; // Scale factor for the creep image (initially normal size)
let zoomingIn = false; // Track whether we are zooming in on the creep image

function preload() {
  // Load images for different pages and overlays
  pageTwoImage = loadImage('Images/walkable.png'); // Load the walkable page image
  pageThreeImage = loadImage('Images/eerieaisle.png'); // Load the eerie aisle page image
  overlayImage = loadImage('Images/handleholdingtomatoe.png'); // Load the overlay image
  creepImage = loadImage('Images/creep1.png'); // Load the creep image
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that fills the window
  colorMode(HSB); // Set color mode to HSB
  pixelDensity(1); // Set pixel density for better performance
  
  // Set up buttons
  button = select("button"); // Select the existing button from the HTML
  button.mousePressed(pageTwo); // Attach pageTwo function to button click

  buttonPageTwo = createButton("?"); // Create a new button for page three
  buttonPageTwo.position(100, 100); // Set position for the button
  buttonPageTwo.mousePressed(pageThree); // Attach pageThree function to button click
  buttonPageTwo.hide(); // Initially hide the page three button

  background(0, 0, 0, 0.5); // Set initial background color with transparency
}

function draw() {
  // Main rendering loop
  if (!pageTwoOn && !pageThreeOn) { // If neither page is active
    addGrain(); // Add grain effect to the background
    button.style('display', 'block'); // Show the button for page two
    buttonPageTwo.hide(); // Hide the button for page three
  } else if (pageTwoOn) { // If page two is active
    button.style('display', 'none'); // Hide the button for page two
    buttonPageTwo.show(); // Show the button for page three
    image(pageTwoImage, 0, 0, width, height); // Draw the page two image
  } else if (pageThreeOn) { // If page three is active
    button.style('display', 'none'); // Hide the button for page two
    buttonPageTwo.hide(); // Hide the button for page three
    background(pageThreeImage); // Set the background to page three image
    
    // Show the overlay after 2 seconds if it's not already shown
    if (!overlayShown) {
      setTimeout(() => { // Delay showing the overlay
        overlayShown = true; // Mark the overlay as shown
        // Show the creep image 2 seconds after the overlay is shown
        creepTimeout = setTimeout(() => { // Delay for creep image
          creepShown = true; // Mark the creep image as shown
          zoomingIn = true; // Start zooming in effect
        }, 2000);
      }, 2000);
    }

    // Draw the overlay image if it's shown
    if (overlayShown) {
      image(overlayImage, 0, 0, width, height); // Display the overlay image
    }

    // Draw the creep image if it's shown
    if (creepShown) {
      if (zoomingIn) { // If we are in zooming mode
        creepScale += 0.05; // Increase scale for zooming effect
        if (creepScale >= 2) { // Stop zooming when scale reaches 2x
          creepScale = 2; // Cap the scale at 2
          zoomingIn = false; // Stop the zooming process
        }
      }
      // Center the creep image and apply the current scale
      let x = (width - creepImage.width * creepScale) / 2; // Calculate x position
      let y = (height - creepImage.height * creepScale) / 2; // Calculate y position
      image(creepImage, x, y, creepImage.width * creepScale, creepImage.height * creepScale); // Draw the creep image
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size when window is resized
  addGrain(); // Add grain effect to the new canvas size
}

function addGrain() {
  loadPixels(); // Load pixel data for manipulation
  for (let x = 0; x < width; x++) { // Loop through each pixel column
    for (let y = 0; y < height; y++) { // Loop through each pixel row
      let index = (x + y * width) * 4; // Calculate pixel index
      let grain = random(0, 225); // Generate random grain value
      pixels[index] = grain; // Set red channel
      pixels[index + 1] = grain; // Set green channel
      pixels[index + 2] = grain; // Set blue channel
      pixels[index + 3] = 50; // Set alpha (transparency)
    }
  }
  updatePixels(); // Update the canvas with modified pixel data
}

function pageTwo() {
  pageTwoOn = true; // Set state to active for page two
  pageThreeOn = false; // Set state to inactive for page three
  overlayShown = false; // Reset overlay visibility
  creepShown = false; // Reset creep visibility
  creepScale = 1; // Reset creep scale to normal
  zoomingIn = false; // Reset zoom state
  clearTimeout(creepTimeout); // Clear any existing timeout for the creep image
}

function pageThree() {
  pageThreeOn = true; // Set state to active for page three
  pageTwoOn = false; // Set state to inactive for page two
  overlayShown = false; // Reset overlay visibility
  creepShown = false; // Reset creep visibility
  creepScale = 1; // Reset creep scale to normal
  zoomingIn = false; // Reset zoom state
  clearTimeout(creepTimeout); // Clear any existing timeout for the creep image
}
