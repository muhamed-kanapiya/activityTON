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

  // Display user information
  const infoDisplay = document.getElementById("info");

  infoDisplay.innerHTML = `
        <div id="userInfo">
                        <div>
                <h3>User Information</h3>
                <p>ID: ${webAppUser.id}</p>
                <p>First Name: ${webAppUser.first_name}</p>
                <p>Last Name: ${webAppUser.last_name}</p>
                <p>Username: ${webAppUser.username}</p>
            </div>
        </div>
    `;
});
