// =============================================
// STEP 1: Set up the image array 
// =============================================
// Array of all images to cycle through
// Customize these paths to your own images
const images = [
  './assets/image-content/image-1.png',
  './assets/image-content/image-2.png',
  './assets/image-content/image-3.png',
  './assets/image-content/image-4.png',
  './assets/image-content/image-5.png',
  './assets/image-content/image-6.png'
];

// =============================================
// STEP 2: Reference HTML elements 
// =============================================
// Connect to the elements we need to change
const imageContent = document.querySelector('.image-content');   // Image container
const mainButton = document.getElementById('main-button');       // Image switch button
const finalMessage = document.querySelector('.final-message');   // Final message
const resetButton = document.getElementById('reset-button');     // Reset button (new)
const confettiCanvas = document.getElementById('confetti-canvas'); // Confetti canvas

// =============================================
// STEP 3: Track what image we're at 
// =============================================
// Start with the first image (index 0)
let currentIndex = 0;

// =============================================
// STEP 4: Update image function 
// =============================================
// Function to change images with fade effect
function updateImage() {
  // Fade out current image
  imageContent.style.opacity = 0;
  
  // Preload next image
  const img = new Image();
  img.src = images[currentIndex];
  
  // When image is loaded
  img.onload = () => {
    // Change to new image
    imageContent.style.backgroundImage = `url('${images[currentIndex]}')`;
    
    // Fade in new image
    imageContent.style.opacity = 1;
  };
}

// =============================================
// STEP 5: Initial image display 
// =============================================
// Show first image when page loads
updateImage();

// =============================================
// STEP 6: Button click handler 
// =============================================
// Change image when button is clicked
mainButton.addEventListener('click', () => {
  // Go to next image
  currentIndex++;
  
  // Update if not at the end
  if (currentIndex < images.length) {
    updateImage();
  }
  
  // Once at the last image, show the final message, hide the hatch button, and trigger confetti
  if (currentIndex === images.length - 1) {
    mainButton.style.display = 'none';
    finalMessage.style.display = 'block';
    resetButton.style.display = 'block';
    launchConfetti(); // new confetti trigger
  }
});

// =============================================
// STEP 7: Reset button functionality (new)
// =============================================
// Resets the hatch state to the beginning
resetButton.addEventListener('click', () => {
  currentIndex = 0;                      // Reset index
  updateImage();                         // Show first egg image
  mainButton.style.display = 'block';    // Show hatch button again
  finalMessage.style.display = 'none';   // Hide final message
  resetButton.style.display = 'none';    // Hide reset button
  clearConfetti();                       // Remove confetti
});

// =============================================
// STEP 8: Confetti functions (new)
// =============================================
// Creates advanced confetti animation using canvas
function launchConfetti() {
  // Set canvas dimensions
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  
  const ctx = confettiCanvas.getContext('2d');
  const confettiCount = 250;
  const gravity = 0.5;
  const terminalVelocity = 5;
  const drag = 0.075;
  const colors = [
    { front: '#f8e473', back: '#d4af37' }, // Yellow/Gold
    { front: '#fd9acc', back: '#e76a9b' }, // Pink
    { front: '#84f1d2', back: '#4ecdc4' }, // Teal
    { front: '#a3d9ff', back: '#5fa8ff' }, // Blue
    { front: '#d6c2ef', back: '#9b7cce' }  // Purple
  ];
  
  // Confetti class
  class Confetti {
    constructor() {
      this.randomModifier = Math.random() * 3;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.dimensions = {
        x: 5 + this.randomModifier,
        y: 10 + this.randomModifier * 2
      };
      this.position = {
        x: Math.random() * confettiCanvas.width,
        y: -10
      };
      this.rotation = Math.random() * 2 * Math.PI;
      this.scale = {
        x: 1,
        y: 1
      };
      this.velocity = {
        x: -5 + Math.random() * 10,
        y: 1 + Math.random() * 3
      };
      this.oscillationSpeed = 0.5 + Math.random() * 2;
      this.oscillationDistance = 0.5 + Math.random() * 2;
      this.wiggleSpeed = 1 + Math.random() * 3;
      this.wiggleMagnitude = 1 + Math.random() * 2;
    }
    
    update() {
      // Apply drag to velocity
      this.velocity.x -= this.velocity.x * drag;
      this.velocity.y = Math.min(this.velocity.y + gravity, terminalVelocity);
      
      // Add wiggle for more dynamic movement
      const wiggle = Math.sin(Date.now() * 0.001 * this.wiggleSpeed) * this.wiggleMagnitude;
      
      // Update position based on velocity and wiggle
      this.position.x += this.velocity.x + wiggle;
      this.position.y += this.velocity.y;
      
      // Oscillate scale for spinning effect
      this.scale.y = Math.cos((this.position.y + this.randomModifier) * this.oscillationSpeed) * this.oscillationDistance;
      
      // Remove confetti when out of view
      return this.position.y <= confettiCanvas.height;
    }
    
    draw() {
      ctx.translate(this.position.x, this.position.y);
      ctx.rotate(this.rotation);
      ctx.scale(this.scale.x, this.scale.y);
      
      ctx.fillStyle = this.scale.y > 0 ? this.color.front : this.color.back;
      ctx.fillRect(-this.dimensions.x / 2, -this.dimensions.y / 2, this.dimensions.x, this.dimensions.y);
      
      // Reset transform
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  }
  
  // Create confetti pieces
  const confettiPieces = Array.from({ length: confettiCount }, () => new Confetti());
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    // Update and draw confetti
    confettiPieces.forEach((confetto, index) => {
      if (confetto.update()) {
        confetto.draw();
      } else {
        // Remove confetto if it's out of view
        confettiPieces.splice(index, 1);
      }
    });
    
    // Continue animation if there are still confetti pieces
    if (confettiPieces.length > 0) {
      requestAnimationFrame(animate);
    }
  }
  
  // Start animation
  animate();
}

// Clear confetti
function clearConfetti() {
  const ctx = confettiCanvas.getContext('2d');
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}