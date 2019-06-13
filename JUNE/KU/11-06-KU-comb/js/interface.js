let yearDrop, monthDrop, dayDrop;
let tempYear, tempMonth, tempDay

//—————————————————————————————————————————————————————— setupMonth
function monthSetup(first) {
  // remove values
  while (monthDrop.firstChild) {
    monthDrop.removeChild(monthDrop.firstChild)
  }

  // append values
  for (key in data[YEAR]) {
    const li = document.createElement("li")
    li.innerHTML = key
    $(li).on('click', updateTime)
    monthDrop.appendChild(li)
  }

  // SET FIRST VALUES
  if (!first) {
    const val = document.getElementById("month");
    tempMonth = Number(monthDrop.firstChild.innerHTML)
    val.innerHTML = tempMonth
    daySetup();
  } else {
    // first values
    document.getElementById("month").innerHTML = MONTH
    tempMonth = Number(MONTH)
    daySetup(true);
  }

  // monthdrop on change
  $(monthDrop).on('click', () => {
    const val = document.getElementById("month");
    tempMonth = Number(val.innerHTML)
    daySetup();
  })
}

//—————————————————————————————————————————————————————— setupDay
function daySetup(first) {
  // remove values
  while (dayDrop.firstChild) {
    dayDrop.removeChild(dayDrop.firstChild)
  }

  // append values
  for (key in data[YEAR][MONTH]) {
    const li = document.createElement("li")
    li.innerHTML = key
    $(li).on('click', updateTime)
    dayDrop.appendChild(li)
  }

  // SET FIRST VALUES
  if (!first) {
    const val = document.getElementById("day");
    tempDay = Number(dayDrop.firstChild.innerHTML)
    val.innerHTML = tempDay
  } else {
    // first values
    document.getElementById("day").innerHTML = DAY
    tempDay = Number(DAY)
    setNextValue = true;
    setFirstValues = true;
  }

  // dayDrop on change
  $(dayDrop).on('click', () => {
    const val = document.getElementById("day");
    tempDay = Number(val.innerHTML)
  })
}

//—————————————————————————————————————————————————————— initTime
function initTime() {
  var today = new Date();
  DAY = today.getDate();
  MONTH = today.getMonth() + 1;
  YEAR = today.getFullYear();
  month = data[YEAR][MONTH];
  day = month[DAY];
  let hour = today.getHours();
  let minute = today.getMinutes();
  let tempTime = (hour * 60 + minute) / (24 * 60);
  currTime = floor(map(tempTime, 0, 1, 0, 96));

  // append values
  yearDrop = document.getElementById("year-ul")
  monthDrop = document.getElementById("month-ul")
  dayDrop = document.getElementById("day-ul")

  for (key in data) {
    const li = document.createElement("li")
    li.innerHTML = key
    $(li).on('click', updateTime)
    yearDrop.appendChild(li)
  }

  // yeardrop on change
  $(yearDrop).on('click', () => {
    const val = document.getElementById("year");
    tempYear = Number(val.innerHTML)
    monthSetup();
  })

  // SET INIT YEAR
  document.getElementById("year").innerHTML = YEAR
  tempYear = Number(YEAR)

  // setupmonth and day
  monthSetup(true);

  // set init values
  document.querySelectorAll(".data-date-target").forEach(elm => {
    elm.innerHTML = `${YEAR} ${nf(MONTH,2,0)} ${nf(DAY,2,0)}`
  })
}

//—————————————————————————————————————————————————————— setInitDropDownValues
// function setInitDropDownValue(mySelect, val) {
//   const arr = mySelect.getElementsByTagName('li')
//   for (let i = 0; i < arr.length; i++) {
//     if (Number(arr[i].innerHTML) == val) {
//       document.getElementById("year").innerHTML = val
//       break;
//     }
//   }
// }