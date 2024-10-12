window.onload = function () {
  Telegram.WebApp.ready(); // Marks the WebApp as ready
  Telegram.WebApp.expand(); // Request to open full height
};

// Event occurs whenever theme settings are changed in the user's Telegram app (including switching to night mode).
Telegram.WebApp.onEvent("themeChanged", function () {
  document.documentElement.className = Telegram.WebApp.colorScheme;
});

document.addEventListener("DOMContentLoaded", () => {
  const initData = window.Telegram.WebApp.initData;

  // Log the initData for testing
  console.log("Initialization Data:", initData);

  const decodedData = atob(initData);
  const dataObject = JSON.parse(decodedData);

  const infoDisplay = document.getElementById("info");
  const avatarUrl = dataObject.user.photo_url || ""; // Get avatar URL

  infoDisplay.innerHTML = `
        <div id="userInfo">
            <img id="avatar" src="${avatarUrl}" alt="User Avatar" width="50" height="50">
            <div>
                <h3>User Information</h3>
                <p>ID: ${dataObject.user.id}</p>
                <p>First Name: ${dataObject.user.first_name}</p>
                <p>Last Name: ${dataObject.user.last_name}</p>
                <p>Username: ${dataObject.user.username}</p>
            </div>
        </div>
    `;
});
