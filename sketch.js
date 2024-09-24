
//SYD: just switch to p5.js for the rest of the class
//We've suffered enough with HTML and CSS :)
//Need preload function to load images
//Design tip: I would make the transparency of grain effect lower
let pageTwoImage;
let pageTwoOn = false; // need this to toggle things on and off
let button; //need to make this global cause we use it in draw & setup
function preload(){

  pageTwoImage = loadImage('Images/walkable.png');

}
let pageThreeImage;
let pageThreeOn = false; // need this to toggle things on and off

function preload(){

  pageThreeImage = loadImage('Images/eerieaisle.png');
}

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  //Syd: added colorMode hue,sat,brightness
  colorMode(HSB);

  //SYD: I totally forgot about pixel density!!
  //So you need this to set the density of your pixel to 1 because depending
  //on what screen you view the piece on, the default pixel density will be different
  //since you are using pixles to create your grain effect, you need this. 
  //That's why it worked on VS Code and not on the browser.
  pixelDensity(1); // Set the pixel density to 1 for better performance
  
  //Syd: I'll get you started with the button code and let you finish it
  button = select("button");
  button.mousePressed(pageTwo); //Create a page 2

   // Create a new button for page two
   buttonPageTwo = createButton('Next Page');
   buttonPageTwo.position(100, 100); // Adjust position as needed
   buttonPageTwo.mousePressed(pageThree); // Create a page 3
   buttonPageTwo.hide(); // Initially hide the button

  background(0, 0, 0, 0.5); // Clear the background each frame


}

function draw() {

  if(!pageTwoOn){ //if page 2 is not on
  addGrain(); // Add grain effect
  button.style('display', 'block') //this styles the button using p5 instead of css
  buttonPageTwo.hide(); // Hide the page two button
  } else {
    button.style('display', 'none') //hide the button
    buttonPageTwo.show(); // Show the page two button
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  addGrain(); // Add grain effect

  //Syd:Not sure we need redraw here
  //redraw(); // Redraw the canvas after resizing
}

function addGrain() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let index = (x + y * width) * 4;
      let grain = random(0, 225); //black&white
      pixels[index] = grain; // Red
      pixels[index + 1] = grain; // Green
      pixels[index + 2] = grain; // Blue
      pixels[index + 3] = 50; // Alpha (transparency)
    }
  }
  updatePixels();
}

function pageTwo() {
  //Create a boolean to toggle things on and off (like the grain and button)
  pageTwoOn = true;
  //Syd: Display the image
  image(pageTwoImage, 0, 0, width, height); //image, x,y,width,height
}
function pageThree() {
  pageThreeOn = true;
  background(pageThreeImage); // Display the page three image
}

// function changeImage() {
//   const img = document.getElementById('background-image');
//   img.style.opacity = 0; // Start fade out
//   setTimeout(() => {
//     img.src = 'Images/topdowngroceryselectyourgroceryitem.jpg'; // Change to the next image
//     img.style.opacity = 1; // Fade in
//   }, 500); // Adjust the timeout to match the transition duration
// }