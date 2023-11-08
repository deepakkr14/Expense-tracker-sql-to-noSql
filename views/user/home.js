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
// Sample data for the pie chart
var expenseData = {
  labels: ["Food", "Transportation", "Entertainment", "Others"],
  datasets: [
    {
      data: [500, 300, 200, 100], // Replace with your actual expense data
      // backgroundColor: ["#FF5733", "#33FF57", "#5733FF", "#FF33A6"], // Colors for each category
    },
  ],
};

// Get the canvas element
var ctx = document.getElementById("expenseChart").getContext("2d");

// Create the pie chart
var expenseChart = new Chart(ctx, {
  type: "pie",
  data: expenseData,
});

function myFunction() {
  let ul = document.querySelector("#category");
  let li = document.createElement("li");
  li.className = "list-group-item";
  let person = prompt("Please Enter category name");
  if (person != null) {
    li.textContent = person;
    ul.appendChild(li);
    alert("categories updated");
  }
}
