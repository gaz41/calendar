// Function to display the current time
function displayTime() {
  const now = new Date(); // Get the current date and time
  const timeString = now.toLocaleTimeString(); // Format the time as a string
  document.getElementById("time").innerText = timeString; // Update the time display
}
setInterval(displayTime, 1000); // Update the time every second

// Initialize a new Date object to represent the current date
const date = new Date();

// Function to render the calendar
const renderCalendar = () => {
  date.setDate(1); // Set the date to the first day of the current month

  const monthDays = document.querySelector(".days"); // Select the element to display the days
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate(); // Get the last day of the current month
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0,
  ).getDate(); // Get the last day of the previous month

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const firstDayIndex = (date.getDay() + 6) % 7; // Get the index of the first day of the month
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDay(); // Get the index of the last day of the current month
  const nextDays = lastDayIndex < 3 ? 7 - lastDayIndex : 14 - lastDayIndex; // Calculate the number of days to display from the next month

  const options1 = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = new Date().toLocaleDateString(undefined, options1);
  document.getElementById("dateToday").innerText = formattedDate; // Update today's date display
  document.getElementById("currentMonth").innerText =
    `${months[date.getMonth()]} ${date.getFullYear()}`; // Update current month display

  let days = ""; // Initialize a string to hold the HTML for the days

  // Generate the previous month's days
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  // Generate the current month's days AND highlight today's date
  for (let i = 1; i <= lastDay; i++) {
    const isToday =
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear();
    // if isToday is true then assign today class
    days += `<div class="day ${isToday ? "today" : ""}" onclick="toggleDay(this)">${i}</div>`;
  }

  // Generate the next month's days
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
  }

  // Update the HTML with the generated days
  monthDays.innerHTML = days;
};

// Function to toggle the color and border of the clicked day
function toggleDay(element) {
  if (!element.classList.contains("today")) {
    const previouslySelected = document.querySelector(".day.selected");
    if (previouslySelected && previouslySelected !== element) {
      previouslySelected.classList.remove("selected");
      previouslySelected.style.color = ""; // Reset color
      previouslySelected.style.borderColor = ""; // Reset border color
    }

    element.classList.toggle("selected");
    element.style.color = element.classList.contains("selected")
      ? "#056b6b" // Change color
      : ""; // Reset color
    element.style.borderColor = element.classList.contains("selected")
      ? "#056b6b" // Change border color
      : ""; // Reset border color
  }
}

// Event listener for the previous month button
document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1); // Decrease the month by 1
  renderCalendar(); // Re-render the calendar
});

// Event listener for the next month button
document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1); // Increase the month by 1
  renderCalendar(); // Re-render the calendar
});

// Initial call to render the calendar
renderCalendar();

// COPYRIGHT NOTICE
// Select DOM element
const copyright = document.getElementById("copy");

// Dynamically generate copyright information
copyright.innerHTML =
  "Copyright &copy; " + // Start of the copyright string
  new Date().getFullYear() + // Get the current year
  ` <a href="https://www.gaz41.com">gaz41.com</a>. <span class="copy2">All Rights Reserved</span>`;
