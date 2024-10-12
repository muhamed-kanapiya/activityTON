let currentSlide = 0;
const slides = document.querySelectorAll(".onboarding-slide");
const totalSlides = slides.length;
const nextBtns = document.querySelectorAll(".next-btn");

// Define test mode
const testMode = true; // Change this to `false` in production

// Check if user has seen onboarding or if test mode is enabled
const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");

if (!hasSeenOnboarding || testMode) {
  document.querySelector(".onboarding-container").style.display = "flex";
  if (!testMode) {
    localStorage.setItem("hasSeenOnboarding", "true");
  }
} else {
  document.querySelector(".onboarding-container").style.display = "none";
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
      // On the last slide, hide onboarding
      document.querySelector(".onboarding-container").style.display = "none";
    }
  });
});

// Optional: Show onboarding on button click (e.g., in settings)
document.querySelector("#showOnboardingBtn").addEventListener("click", () => {
  document.querySelector(".onboarding-container").style.display = "flex";
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
