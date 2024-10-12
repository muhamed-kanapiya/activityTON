let currentSlide = 0;
const slides = document.querySelectorAll(".onboarding-slide");
const totalSlides = slides.length;
const nextBtns = document.querySelectorAll(".next-btn");
const bottomMenu = document.querySelector(".bottom-menu");
const homepageContent = document.querySelector(".homepage-content");

// Define test mode
const testMode = true; // Change this to `false` in production

// Check if user has seen onboarding or if test mode is enabled
const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");

if (!hasSeenOnboarding || testMode) {
  document.querySelector(".onboarding-container").style.display = "flex";
  bottomMenu.classList.remove("visible"); // Ensure bottom menu is hidden
  homepageContent.classList.remove("visible"); // Ensure homepage content is hidden
  if (!testMode) {
    localStorage.setItem("hasSeenOnboarding", "true");
  }
} else {
  document.querySelector(".onboarding-container").style.display = "none";
  bottomMenu.classList.add("visible"); // Show bottom menu if onboarding is skipped
  homepageContent.classList.add("visible"); // Show homepage content if onboarding is skipped
}

// Slide transition function
const moveToSlide = (index) => {
  const offset = -index * 100; // Move by 100% for each slide
  slides.forEach((slide) => {
    slide.style.transform = `translateX(${offset}%)`;
  });
  currentSlide = index;
};

// Next button functionality
nextBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (index < totalSlides - 1) {
      moveToSlide(index + 1);
    } else {
      // On the last slide, hide onboarding and show bottom menu and homepage content
      document.querySelector(".onboarding-container").style.display = "none";
      bottomMenu.classList.add("visible"); // Show bottom menu after onboarding
      homepageContent.classList.add("visible"); // Show homepage content after onboarding
    }
  });
});

// Optional: Show onboarding on button click (e.g., in settings)
document.querySelector("#showOnboardingBtn").addEventListener("click", () => {
  document.querySelector(".onboarding-container").style.display = "flex";
  bottomMenu.classList.remove("visible"); // Hide bottom menu during onboarding
  homepageContent.classList.remove("visible"); // Hide homepage content during onboarding
  moveToSlide(0); // Reset to the first slide
});

// Add touch/drag functionality for mobile
let startX, currentX;
document
  .querySelector(".onboarding-container")
  .addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

document
  .querySelector(".onboarding-container")
  .addEventListener("touchmove", (e) => {
    currentX = e.touches[0].clientX;
  });

document
  .querySelector(".onboarding-container")
  .addEventListener("touchend", () => {
    if (startX > currentX + 50 && currentSlide < totalSlides - 1) {
      moveToSlide(currentSlide + 1); // Swipe left
    } else if (startX < currentX - 50 && currentSlide > 0) {
      moveToSlide(currentSlide - 1); // Swipe right
    }
  });
