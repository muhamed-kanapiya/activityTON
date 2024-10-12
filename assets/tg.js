window.onload = function () {
  Telegram.WebApp.ready(); // Marks the WebApp as ready
  Telegram.WebApp.expand(); // Request to open full height
};

// Event occurs whenever theme settings are changed in the user's Telegram app (including switching to night mode).
Telegram.WebApp.onEvent("themeChanged", function () {
  document.documentElement.className = Telegram.WebApp.colorScheme;
});
