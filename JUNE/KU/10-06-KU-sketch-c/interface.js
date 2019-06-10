let yearDrop, monthDrop, dayDrop;
let resSlider, resTxt, rSlider, rTxt

//—————————————————————————————————————————————————————— buttonSetup
function buttonsSetup() {
  // fps
  fr = createP('').parent(select("#fps"));
  // resSlider
  resSlider = createSlider(1, 10, 1, 1)
  resSlider.parent('#resSlider')
  rSlider = createSlider(4, 6, 4.5, 0.1)
  rSlider.parent('#rSlider')

  // currentTime
  initTime()
}

//—————————————————————————————————————————————————————— buttonUpdate
function buttonUpdate() {
  //fps
  fr.html(`fps | ${floor(frameRate())}`);
  // 
  document.getElementById('resTxt').innerHTML = `resolution x ${resSlider.value()}`;
  res = resSlider.value()

  // r slider
  document.getElementById('rTxt').innerHTML = `size ${nf(rSlider.value(),0,1)}`;
  r = rSlider.value()
  maxR = r * 3;
}

//—————————————————————————————————————————————————————— setupMonth
function monthSetup(first) {
  if (monthDrop) {
    monthDrop.remove();
  }
  monthDrop = createSelect();
  monthDrop.parent(select("#dropDown")).id('monthDrop');
  let i = 1;
  while (i <= 12) {
    if (data[YEAR][i] != undefined) {
      monthDrop.option(i);
    }
    i++;
  }

  // SET FIRST VALUES
  if (!first) {
    MONTH = Number(monthDrop.value())
    daySetup();
  } else {
    setInitDropDownValue(document.getElementById('monthDrop'), MONTH)
    daySetup(true);
  }

  monthDrop.changed(() => {
    MONTH = Number(monthDrop.value());
    month = data[YEAR][MONTH];
    daySetup();
  });
}

//—————————————————————————————————————————————————————— setupDay
function daySetup(first) {
  if (dayDrop) dayDrop.remove();
  dayDrop = createSelect();
  dayDrop.parent(select("#dropDown")).id('dayDrop');
  let i = 1;
  while (month[i] != undefined) {
    dayDrop.option(i);
    i++;
  }

  // SET FIRST VALUES
  if (!first) {
    DAY = Number(dayDrop.value());
    day = month[DAY]
  } else {
    setInitDropDownValue(document.getElementById('dayDrop'), DAY)
  }

  dayDrop.changed(() => {
    DAY = Number(dayDrop.value());
    day = month[DAY];
    setNextValue = true;
    setFirstValues = true;
  });

  setNextValue = true;
  setFirstValues = true;
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

  // dropw down date
  yearDrop = createSelect();
  yearDrop.parent(select("#dropDown")).id('yearDrop')
  yearDrop.option('2019')
  yearDrop.option('2020')
  yearDrop.changed(() => {
    YEAR = Number(yearDrop.value());
    monthSetup();
  });

  // SET INIT YEAR
  setInitDropDownValue(document.getElementById('yearDrop'), YEAR)

  // setupmonth and day
  monthSetup(true);
}

//—————————————————————————————————————————————————————— setInitDropDownValues
function setInitDropDownValue(mySelect, val) {
  // console.log(mySelect, val)
  for (var i, j = 0; i = mySelect.options[j]; j++) {
    if (i.value == val) {
      mySelect.selectedIndex = j;
      break;
    }
  }
}