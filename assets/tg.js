window.onload = function () {
  Telegram.WebApp.ready(); // Marks the WebApp as ready
  Telegram.WebApp.expand(); // Request to open full height
};

// Event occurs whenever theme settings are changed in the user's Telegram app (including switching to night mode).
Telegram.WebApp.onEvent("themeChanged", function () {
  document.documentElement.className = Telegram.WebApp.colorScheme;
});

//userData
document.addEventListener("DOMContentLoaded", () => {
  // Access the WebAppUser object from initDataUnsafe
  const webAppUser = window.Telegram.WebApp.initDataUnsafe.user;

  console.log("WebAppUser Data:", webAppUser);

  // Display only the username inside the element with class 'user-name'
  const userNameDisplay = document.querySelector(".user-name");

  if (userNameDisplay && webAppUser.username) {
    userNameDisplay.textContent = webAppUser.username;
  }
});
