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

  // Log the raw initData for testing
  console.log("Raw Init Data:", initData);

  // Fix URL-safe base64 to standard base64
  const base64 = initData.replace(/-/g, "+").replace(/_/g, "/");

  // Add padding if necessary
  const padding =
    base64.length % 4 === 0 ? "" : "=".repeat(4 - (base64.length % 4));

  let decodedData;
  try {
    decodedData = atob(base64 + padding);
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
  } catch (error) {
    console.error("Error decoding initData:", error);
  }
});
