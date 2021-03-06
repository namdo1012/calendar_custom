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

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

let clickedBtn = {
  isclicked: false,
  posRow: 0,
  posCol: 0,
  clickedDay: 0,
  clickedMonth: -1,
  clickedYear: -1,
  price: 1.2,
};

let isCheckInSelected = false;
let isCheckOutSelected = false;
let checkInBtn = null;
let checkOutBtn = null;

let totalPayCal_1 = 0;
let totalPayCal_2 = 0;
let totalPay = 0;

function getNextMonth(currentMonth) {
  if (currentMonth === 11) return 0;
  return currentMonth + 1;
}

// Booking Form
const usernameInput = document.getElementById("usernameInput");
const emailInput = document.getElementById("emailInput");
const btnSaveChange = document.getElementById("btn_save_change");
const bookingBtn = document.getElementById("btn__booking");
const bookingModal = document.getElementById("exampleModal");

let today = new Date();
let currentMonth = today.getMonth();
let nextMonth = getNextMonth(currentMonth);
let currentYear = today.getFullYear();
// let selectYear = document.getElementById("year");
// let selectMonth = document.getElementById("month");
let monthAndYearCurrent = document.getElementById("monthAndYearCurrent");
let monthAndYearNext = document.getElementById("monthAndYearNext");
const doneBtn = document.querySelector(".btn__handle--done");
const resetBtn = document.querySelector(".btn__handle--reset");

// Booking Info box
const checkInInfo = document.querySelector(".info__content--checkin");
const checkOutInfo = document.querySelector(".info__content--checkout");
const totalInfo = document.querySelector(".info__content--total");

// Show calendar
showCalendar(
  currentMonth,
  currentYear,
  "calendar-body--current",
  monthAndYearCurrent
);
showCalendar(nextMonth, currentYear, "calendar-body--next", monthAndYearNext);

// Disable bookingBtn
bookingBtn.style.display = "none";

function getISOStringDate(date) {
  // var today = new Date();
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = date.getFullYear();

  return (date = mm + "/" + dd + "/" + yyyy);
}

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
  // Disable done btn when start
  if (!isCheckInSelected || !isCheckOutSelected) {
    doneBtn.disabled = true;

    // Clear all booking info
    checkInInfo.innerHTML = "";
    checkOutInfo.innerHTML = "";
    totalInfo.innerHTML = "";
  } else {
    doneBtn.disabled = false;
  }

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
  let price;
  let totalPayTmp = 0;

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
        price = 1.2;
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
          isCheckInSelected &&
          date === checkInBtn.clickedDay &&
          month === checkInBtn.clickedMonth &&
          year === checkInBtn.clickedYear
        )
          cellBtn.classList.add("cellBtn-clicked");

        if (
          isCheckOutSelected &&
          date === checkOutBtn.clickedDay &&
          month === checkOutBtn.clickedMonth &&
          year === checkOutBtn.clickedYear
        )
          cellBtn.classList.add("cellBtn-clicked");

        // Disable btn if isClickedBtn = true;
        // If isCheckInSelected = true => disable all btn before checkInBtn
        if (isCheckInSelected === true) {
          if (year < checkInBtn.clickedYear) {
            cellBtn.disabled = true;
          } else if (
            year === checkInBtn.clickedYear &&
            month < checkInBtn.clickedMonth
          ) {
            cellBtn.disabled = true;
          } else if (
            year === checkInBtn.clickedYear &&
            month === checkInBtn.clickedMonth &&
            date < checkInBtn.clickedDay
          ) {
            cellBtn.disabled = true;
          }
        }

        // If isCheckOutSelected = true => disable all btn after checkOutBtn
        // if (isCheckOutSelected === true) {
        //   if (year > checkOutBtn.clickedYear) {
        //     cellBtn.disabled = true;
        //   } else if (
        //     year === checkOutBtn.clickedYear &&
        //     month > checkOutBtn.clickedMonth
        //   ) {
        //     cellBtn.disabled = true;
        //   } else if (
        //     year === checkOutBtn.clickedYear &&
        //     month === checkOutBtn.clickedMonth &&
        //     date > checkOutBtn.clickedDay
        //   ) {
        //     cellBtn.disabled = true;
        //   }
        // }

        // If isCheckIn and isCheckout => change background of middle button and count total pay
        if (isCheckInSelected === true && isCheckOutSelected === true) {
          let currentBtnTime = new Date(year, month, date).getTime();
          let checkInTime = new Date(
            checkInBtn.clickedYear,
            checkInBtn.clickedMonth,
            checkInBtn.clickedDay
          ).getTime();
          let checkOutTime = new Date(
            checkOutBtn.clickedYear,
            checkOutBtn.clickedMonth,
            checkOutBtn.clickedDay
          ).getTime();
          if (currentBtnTime > checkInTime && currentBtnTime < checkOutTime) {
            cellBtn.classList.add("dayPlan-style");
            totalPayTmp += price;
          }
        }

        // Add onclick handle to btn
        cellBtn.onclick = function (e) {
          // Remove onclicked styles on all btn
          // const cellBtnList = document.querySelectorAll(".cellBtn");
          // cellBtnList.forEach((el) => {
          //   if (el.classList.contains("cellBtn-clicked"))
          //     el.classList.remove("cellBtn-clicked");
          // });

          // Add style to btn just have been clicked
          // cellBtn.classList.add("cellBtn-clicked");

          // Set values to clicked button
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

          // If NOT have checked in => choose check in (isCheckInSelected = true)
          if (isCheckInSelected === false) {
            isCheckInSelected = true;
            // Deep clone object
            checkInBtn = JSON.parse(JSON.stringify(clickedBtn));
          }
          // If HAVE checked in, choose check out (isCheckOutSelected = true)
          else if (isCheckOutSelected === false) {
            isCheckOutSelected = true;
            checkOutBtn = JSON.parse(JSON.stringify(clickedBtn));
            // Reselect checkout day
          } else if (isCheckOutSelected === true) {
            checkOutBtn = JSON.parse(JSON.stringify(clickedBtn));
          }
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

  if (nameClass === "calendar-body--current") {
    totalPayCal_1 = totalPayTmp;
  }
  if (nameClass === "calendar-body--next") {
    totalPayCal_2 = totalPayTmp;
  }

  totalPayTmp = totalPayCal_1 + totalPayCal_2;
  if (isCheckInSelected && isCheckOutSelected) {
    totalPay = totalPayTmp + checkInBtn.price + checkOutBtn.price;
  }
}

function popupCalendar() {
  const calendarContainer = document.querySelector(".calendar__container");
  calendarContainer.classList.toggle("show");
}

function handleReset() {
  isCheckInSelected = false;
  isCheckOutSelected = false;
  checkInBtn = null;
  checkOutBtn = null;

  totalPayCal_1 = 0;
  totalPayCal_2 = 0;
  totalPay = 0;

  showCalendar(
    currentMonth,
    currentYear,
    "calendar-body--current",
    monthAndYearCurrent
  );
  showCalendar(nextMonth, currentYear, "calendar-body--next", monthAndYearNext);

  bookingBtn.style.display = "none";
}

function handleDone() {
  checkInInfo.innerHTML = `${checkInBtn.clickedDay} ${
    months[checkInBtn.clickedMonth]
  }, ${checkInBtn.clickedYear}`;

  checkOutInfo.innerHTML = `${checkOutBtn.clickedDay} ${
    months[checkOutBtn.clickedMonth]
  }, ${checkOutBtn.clickedYear}`;

  totalInfo.innerHTML = `đ${totalPay.toFixed(2)}M`;

  // bookingBtn.disabled = false;
  bookingBtn.style.display = "initial";
}

function handleBooking(e) {
  e.preventDefault();
  console.log("Booking..");
  var url =
    "https://script.google.com/macros/s/AKfycbzi3YEazktudOygQybCByIWTtZTNAadIHA5sq-hP3OzOrsz4vE/exec";

  const today = new Date();
  const todayDay = String(today.getDate()).padStart(2, "0");
  const todayMonth =
    months[parseInt(String(today.getMonth() + 1).padStart(2, "0")) - 1];
  const todayYear = today.getFullYear();

  // Change display of save change button
  btnSaveChange.innerHTML = "Saving...";
  btnSaveChange.disabled = true;

  const info = {
    username: usernameInput.value,
    email: emailInput.value,
    checkInDate: `${checkInBtn.clickedDay} ${
      months[checkInBtn.clickedMonth]
    }, ${checkInBtn.clickedYear}`,
    checkOutDate: `${checkOutBtn.clickedDay} ${
      months[checkOutBtn.clickedMonth]
    }, ${checkOutBtn.clickedYear}`,
    bookingDate: `${todayDay} ${todayMonth}, ${todayYear}`,
    totalPay: `đ${totalPay.toFixed(2)}M`,
  };

  fetch(url, {
    method: "POST",
    cache: "no-cache",
    redirect: "follow",
    cors: "no-cors",
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((res) => {
      // Change display of save change button
      btnSaveChange.innerHTML = "Saved";
      btnSaveChange.disabled = true;
      setTimeout(function () {
        hideModal();
        handleReset();
      }, 1000);
    })
    .catch((err) => {
      console.log(err);
      console.log("Something Went Wrong");
      // Change display of save change button
      btnSaveChange.innerHTML = "Saved";
      btnSaveChange.disabled = true;
      setTimeout(function () {
        hideModal();
        handleReset();
      }, 1000);
    });
}

function hideModal() {
  // get modals
  const modals = document.getElementsByClassName("modal");

  // on every modal change state like in hidden modal
  for (let i = 0; i < modals.length; i++) {
    modals[i].classList.remove("show");
    modals[i].setAttribute("aria-hidden", "true");
    modals[i].setAttribute("style", "display: none");
  }

  // get modal backdrops
  const modalsBackdrops = document.getElementsByClassName("modal-backdrop");

  // remove every modal backdrop
  for (let i = 0; i < modalsBackdrops.length; i++) {
    document.body.removeChild(modalsBackdrops[i]);
  }
}

btnSaveChange.addEventListener("click", handleBooking);
