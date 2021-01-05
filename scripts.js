let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let tbl = document.getElementById("calendar-body"); // body of the calendar

  // clearing all previous cells
  tbl.innerHTML = "";

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // creates a table row
    let row = document.createElement("tr");

    //creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        let cell = document.createElement("td");
        const cellBtn = document.createElement("button");
        cell.appendChild(cellBtn);
        let cellText = document.createTextNode(date);

        // Add text to btn
        cellBtn.appendChild(cellText);

        // Add class to btn
        cellBtn.classList.add("cellBtn");

        // Add onclick handle to btn
        cellBtn.onclick = function () {
          // Disable onclicked style on all btn _ except today
          const cellBtnList = document.querySelectorAll(".cellBtn");
          cellBtnList.forEach((el) => {
            if (el.classList.contains("cellBtn-clicked"))
              el.classList.remove("cellBtn-clicked");
          });

          // Add style to btn just have been clicked
          cellBtn.classList.add("cellBtn-clicked");
        };

        // Set style for today
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          //   cell.classList.add("bg-info");
          cellBtn.classList.add("today-style");
        } // color today's date

        row.appendChild(cell);
        date++;
      }
    }

    tbl.appendChild(row); // appending each row into calendar body.
  }
}

function popupCalendar() {
  //   var calendarContainer = document.getElementById("calendar");
  //   popup.classList.toggle("show");
  const calendarContainer = document.querySelector(".calendar__container");
  calendarContainer.classList.toggle("show");
}
