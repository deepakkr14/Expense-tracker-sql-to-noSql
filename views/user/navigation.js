const leaderboardbtn = document.querySelector("#leaderboard");
const viewexpensebtn = document.querySelector("#viewexpenses");
const addexpensebtn = document.querySelector("#addexpenses");
const reportsbtn = document.querySelector("#reports");
const logoutbtn = document.querySelector("#logout");
const buypremumbtn = document.querySelector("#buypremium");
const lightbtn = document.querySelector("#light");
const darkbtn = document.querySelector("#dark");

leaderboardbtn.addEventListener("click", () => {
  window.location.href = "./leaderboards.html";
});
viewexpensebtn.addEventListener("click", () => {
  window.location.href = "./viewexpense.html";
});
addexpensebtn.addEventListener("click", () => {
  window.location.href = "./addexpenses.html";
});
reportsbtn.addEventListener("click", () => {
  window.location.href = "./reports.html";
});
buypremumbtn.addEventListener("click", () => {
  window.location.href = "./leaderboards.html";
});

// mode change
const html = document.getElementById("html");
const button = document.querySelector("#mySwitch");
button.addEventListener("change", function () {
  const isChecked = button.checked;
  // Change the mode.
  if (isChecked) {
    html.setAttribute("data-bs-theme", "light");
  } else {
    html.setAttribute("data-bs-theme", "dark");
  }
});
