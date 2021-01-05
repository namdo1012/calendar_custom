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

let clickedBtn = {
  isclicked: false,
  posRow: 0,
  posCol: 0,
  clickedDay: 0,
  clickedMonth: -1,
  clickedYear: -1,
};

function getNextMonth(currentMonth) {
  if (currentMonth === 11) return 0;
  return currentMonth + 1;
}

let today = new Date();
let currentMonth = today.getMonth();
let nextMonth = getNextMonth(currentMonth);
let currentYear = today.getFullYear();
// let selectYear = document.getElementById("year");
// let selectMonth = document.getElementById("month");
let monthAndYearCurrent = document.getElementById("monthAndYearCurrent");
let monthAndYearNext = document.getElementById("monthAndYearNext");

showCalendar(
  currentMonth,
  currentYear,
  "calendar-body--current",
  monthAndYearCurrent
);
showCalendar(nextMonth, currentYear, "calendar-body--next", monthAndYearNext);

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  nextMonth = getNextMonth(currentMonth);
  nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  showCalendar(
    currentMonth,
    currentYear,
    "calendar-body--current",
    monthAndYearCurrent
  );
  showCalendar(nextMonth, nextYear, "calendar-body--next", monthAndYearNext);
}

function previous() {
  nextMonth = currentMonth;
  nextYear = currentYear;
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(
    currentMonth,
    currentYear,
    "calendar-body--current",
    monthAndYearCurrent
  );
  showCalendar(nextMonth, nextYear, "calendar-body--next", monthAndYearNext);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year, nameClass, monthAndYear) {
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let tbl = document.getElementById(nameClass); // body of the calendar

  // clearing all previous cells
  tbl.innerHTML = "";

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML = months[month] + " " + year;
  // selectYear.value = year;
  // selectMonth.value = month;

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
        const cellPrice = document.createElement("div");

        cell.appendChild(cellBtn);
        let cellText = document.createTextNode(date);

        // Add text to btn
        cellBtn.appendChild(cellText);

        // Add price div to btn
        cellBtn.appendChild(cellPrice);
        cellPrice.innerHTML = "đ1.2M";
        cellPrice.classList.add("cellPrice");

        // Save pos of btn in table
        cellBtn.dataset.posRow = i + 1; // row counts from 1
        cellBtn.dataset.posCol = j + 1; // column counts from 1
        cellBtn.dataset.month = month;
        cellBtn.dataset.year = year;
        // cellBtn.dataset.day = cellText;

        // Add class to btn
        cellBtn.classList.add("cellBtn");

        // Style clicked button
        if (
          date === clickedBtn.clickedDay &&
          month === clickedBtn.clickedMonth &&
          year === clickedBtn.clickedYear
        )
          cellBtn.classList.add("cellBtn-clicked");

        // Disable btn if isClickedBtn = true;
        if (clickedBtn.isclicked) {
          if (year < clickedBtn.clickedYear) {
            cellBtn.disabled = true;
          } else if (
            year === clickedBtn.clickedYear &&
            month < clickedBtn.clickedMonth
          ) {
            cellBtn.disabled = true;
          } else if (
            year === clickedBtn.clickedYear &&
            month === clickedBtn.clickedMonth &&
            date < clickedBtn.clickedDay
          ) {
            cellBtn.disabled = true;
          }
        }

        // Add onclick handle to btn
        cellBtn.onclick = function (e) {
          // Disable onclicked style on all btn _ except today
          const cellBtnList = document.querySelectorAll(".cellBtn");
          cellBtnList.forEach((el) => {
            if (el.classList.contains("cellBtn-clicked"))
              el.classList.remove("cellBtn-clicked");
          });

          // Add style to btn just have been clicked
          cellBtn.classList.add("cellBtn-clicked");

          // set values to clicked button
          let clickedBtnEle = e.target.closest(".cellBtn");
          tmpText = clickedBtnEle.textContent;
          clickedBtn.isclicked = true;
          clickedBtn.posRow = parseInt(clickedBtnEle.dataset.posRow);
          clickedBtn.posCol = parseInt(clickedBtnEle.dataset.posCol);
          clickedBtn.clickedDay = parseInt(
            tmpText.replace(
              tmpText.substr(tmpText.indexOf("đ"), tmpText.length),
              ""
            )
          );
          clickedBtn.clickedMonth = parseInt(clickedBtnEle.dataset.month);
          clickedBtn.clickedYear = parseInt(clickedBtnEle.dataset.year);
          console.log(clickedBtn);

          // Show calendar again based on clicked button
          showCalendar(
            currentMonth,
            currentYear,
            "calendar-body--current",
            monthAndYearCurrent
          );
          showCalendar(
            nextMonth,
            currentYear,
            "calendar-body--next",
            monthAndYearNext
          );
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
  const calendarContainer = document.querySelector(".calendar__container");
  calendarContainer.classList.toggle("show");
}
