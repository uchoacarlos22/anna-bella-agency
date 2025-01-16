const images = [
  "images/portfolio1.jpg",
  "images/portfolio2.jpg",
  "images/portfolio3.jpg",
];

let currentIndex = 0;

const mainCard = document.getElementById("main-card");
const thumbnails = document.getElementById("thumbnails");
const nextButton = document.getElementById("next-button");

function updateCarousel() {
  // Update the main card
  mainCard.style.backgroundImage = `url(${images[currentIndex]})`;

  // Clear thumbnails
  thumbnails.innerHTML = "";

  // Populate thumbnails
  for (let i = 0; i < images.length; i++) {
    if (i === currentIndex) continue; // Skip the current main image

    const thumbnailCard = document.createElement("div");
    thumbnailCard.className = "thumbnail-card";
    thumbnailCard.style.backgroundImage = `url(${images[i]})`;
    thumbnails.appendChild(thumbnailCard);
  }
}

nextButton.addEventListener("click", () => {
  // Move to the next image in the array
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
});

// Initialize carousel
updateCarousel();
