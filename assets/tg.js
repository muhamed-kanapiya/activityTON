window.onload = function () {
  Telegram.WebApp.ready(); // Marks the WebApp as ready
  Telegram.WebApp.expand(); // Request to open full height
};

// Event occurs whenever theme settings are changed in the user's Telegram app (including switching to night mode).
Telegram.WebApp.onEvent("themeChanged", function () {
  document.documentElement.className = Telegram.WebApp.colorScheme;
});

//initData
document.addEventListener("DOMContentLoaded", () => {
  const initData = window.Telegram.WebApp.initData;

  // Log the raw initData for testing
  console.log("Raw Init Data:", initData);

  // Decode the URL-encoded string
  const decodedInitData = decodeURIComponent(initData);
  console.log("Decoded Init Data:", decodedInitData);

  // Parse the query string into an object
  const params = new URLSearchParams(decodedInitData);
  const userJson = params.get("user"); // Extract user JSON string
  const userObject = JSON.parse(userJson); // Parse the user JSON string

  // Display user information
  const infoDisplay = document.getElementById("info");
  const avatarUrl = userObject.photo_url || ""; // Use the appropriate property if it exists

  infoDisplay.innerHTML = `
        <div id="userInfo">
            <img id="avatar" src="${avatarUrl}" alt="User Avatar" width="50" height="50">
            <div>
                <h3>User Information</h3>
                <p>ID: ${userObject.id}</p>
                <p>First Name: ${userObject.first_name}</p>
                <p>Last Name: ${userObject.last_name}</p>
                <p>Username: ${userObject.username}</p>
                <p>Language Code: ${userObject.language_code}</p>
            </div>
        </div>
    `;
});
