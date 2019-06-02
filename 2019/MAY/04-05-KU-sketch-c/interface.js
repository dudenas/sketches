let speedSlider, speedSliderDiv;
let yearDrop, monthDrop, dayDrop;
let currentTimeButton, currentTimeOn = false;

//—————————————————————————————————————————————————————— buttonSetup
function buttonsSetup() {
  // fps
  fr = createP('').parent(select("#fps"));
  // speed
  speedSliderDiv = createP('').parent(select("#speedSlider"));
  speedSlider = createSlider(1, 5, 1).parent(select("#speedSlider"));
  // currentTime
  currentTimeButton = createCheckbox('currentTime', false).parent(select("#currentTime"));
  currentTimeButton.changed(() => {
    var today = new Date();
    currentTimeOn = !currentTimeOn;
    if (currentTimeOn) {
      DAY = today.getDate();
      MONTH = today.getMonth() + 1;
      YEAR = today.getFullYear();
      month = data[YEAR][MONTH];
      day = month[DAY];
      let hour = today.getHours();
      let minute = today.getMinutes();
      let tempTime = (hour * 60 + minute) / (24 * 60 + 60);
      currTime = floor(map(tempTime, 0, 1, 0, 96));
      setNextValue = true;
      setFirstValues = true;
    } else {
      YEAR = Number(yearDrop.value());
      monthSetup();
    }
  });

  // dropw down date
  yearDrop = createSelect();
  yearDrop.parent(select("#dropDown"));
  yearDrop.option('2019');
  yearDrop.option('2020');
  yearDrop.changed(() => {
    if (!currentTimeOn) {
      YEAR = Number(yearDrop.value());
      monthSetup();
    }
  });
  YEAR = Number(yearDrop.value());

  // setupmonth
  monthSetup();

  // setupday
  daySetup();
}

//—————————————————————————————————————————————————————— buttonUpdate
function buttonUpdate() {
  //fps
  fr.html(`fps | ${floor(frameRate())}`);
  // speed
  speedSliderDiv.html(`speed | ${speedSlider.value()}`);
  switch (speedSlider.value()) {
    case 1:
      framesToChangeTime = 15 * 60 * 60;
      break;
    case 2:
      framesToChangeTime = 15 * 15;
      break;
    case 3:
      framesToChangeTime = 15 * 5;
      break;
    case 4:
      framesToChangeTime = 15;
      break;
    case 5:
      framesToChangeTime = 5;
      break;
  }
  // framesToChangeTime = floor(map(speedSlider.value(), 1, 5, 15 * 60 * 60, 15));
}

//—————————————————————————————————————————————————————— setupMonth
function monthSetup() {
  if (monthDrop) {
    monthDrop.remove();
  }
  monthDrop = createSelect();
  monthDrop.parent(select("#dropDown"));
  let i = 1;
  while (i <= 12) {
    if (data[YEAR][i] != undefined) {
      monthDrop.option(i);
    }
    i++;
  }

  MONTH = Number(monthDrop.value());
  daySetup();

  monthDrop.changed(() => {
    if (!currentTimeOn) {
      MONTH = Number(monthDrop.value());
      month = data[YEAR][MONTH];
      daySetup();
    }
  });
}

//—————————————————————————————————————————————————————— setupDay
function daySetup() {
  if (dayDrop) dayDrop.remove();
  dayDrop = createSelect();
  dayDrop.parent(select("#dropDown"));
  let i = 1;
  while (month[i] != undefined) {
    dayDrop.option(i);
    i++;
  }

  DAY = Number(dayDrop.value());
  day = month[DAY];

  dayDrop.changed(() => {
    if (!currentTimeOn) {
      DAY = Number(dayDrop.value());
      day = month[DAY];
      setNextValue = true;
      setFirstValues = true;
    }
  });

  setNextValue = true;
  setFirstValues = true;
}