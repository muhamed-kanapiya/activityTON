let currentSlide = 0;
const slides = document.querySelectorAll(".onboarding-slide");
const totalSlides = slides.length;
const nextBtns = document.querySelectorAll(".next-btn");
const bottomMenu = document.querySelector(".bottom-menu");
const homepageContent = document.querySelector(".homepage-content");

// Define test mode
const testMode = false; // Change this to `false` in production

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

// Add button functionality
document.querySelector(".add-button").addEventListener("click", function () {
  const taskBlock = document.getElementById("task-block");

  // Toggle the 'show' class to slide up/down
  taskBlock.classList.toggle("show");
});

//Progress Bar
function updateProgress(percentage) {
  const progressBar = document.getElementById("progress-bar");
  const progressPercentage = document.getElementById("progress-percentage");
  const inspirationText = document.getElementById("inspiration-text");

  // Set the width of the progress bar
  progressBar.style.width = percentage + "%";

  // Update percentage text
  progressPercentage.textContent = percentage + "%";

  // Set inspirational text based on progress
  let text;
  if (percentage === 0) {
    text = "Let's get started! Every small step counts.";
  } else if (percentage < 25) {
    text = "You're just getting warmed up!";
  } else if (percentage < 50) {
    text = "Keep going, you're making progress!";
  } else if (percentage < 75) {
    text = "Great job! You're more than halfway there!";
  } else if (percentage < 100) {
    text = "Almost there! Finish strong!";
  } else {
    text = "Congratulations! You've achieved your daily goal!";
  }

  inspirationText.textContent = text;
}

// Example: Update progress to 75% (you can modify this based on your application logic)
updateProgress(75);

//tasks
let tasks = []; // Array to store tasks
let completedTasks = 0; // Counter for completed tasks

document
  .getElementById("task-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    const taskName = document.getElementById("task-name").value;
    const taskURL = document.getElementById("task-url").value;
    const taskDateTime = document.getElementById("task-datetime").value;
    const taskRepeat = document.getElementById("task-repeat").value;

    // Create a task object
    const task = {
      name: taskName,
      url: taskURL,
      dateTime: taskDateTime,
      repeat: taskRepeat,
      completed: false,
    };

    // Add the task to the array
    tasks.push(task);
    updateTasksDisplay();
    updateProgress(1); // Increment daily progress for each new task added
    document.getElementById("task-form").reset(); // Clear the form
  });

// Function to update the display of tasks
function updateTasksDisplay() {
  const todayTasksContainer = document.getElementById("today-tasks");
  const archivedTasksContainer = document.getElementById("archived-tasks");

  todayTasksContainer.innerHTML = "";
  archivedTasksContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-item";
    taskDiv.innerHTML = `
            <div>
                <strong>${task.name}</strong> - <a href="${
      task.url
    }" target="_blank">Link</a>
                <br>${new Date(task.dateTime).toLocaleString()}
            </div>
            <div>
                <button class="complete-btn" onclick="completeTask(${index})">Complete</button>
                <button class="archive-btn" onclick="archiveTask(${index})">Archive</button>
            </div>
        `;

    if (!task.completed) {
      todayTasksContainer.appendChild(taskDiv);
    } else {
      archivedTasksContainer.appendChild(taskDiv);
    }
  });
}

// Function to mark a task as complete
function completeTask(index) {
  tasks[index].completed = true;
  completedTasks++; // Increment the count of completed tasks
  updateProgress(1); // Increment daily progress for each completed task
  updateTasksDisplay();
}

// Function to archive a task
function archiveTask(index) {
  tasks[index].completed = true; // Mark as completed
  updateTasksDisplay();
}

// Function to update the progress
function updateProgress(points) {
  const currentProgress = parseInt(
    document.getElementById("progress-percentage").textContent
  );
  const newProgress = currentProgress + points;
  updateProgress(newProgress);
}

// Initial call to display tasks
updateTasksDisplay();
