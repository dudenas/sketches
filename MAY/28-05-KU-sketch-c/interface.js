let speedSlider, speedSliderDiv;
let yearDrop, monthDrop, dayDrop;
let currentTimeButton, currentTimeOn = false;

//—————————————————————————————————————————————————————— buttonSetup
function buttonsSetup(p) {
  // fps
  fr = p.createP('').parent(p.select("#fps"));
  // speed
  speedSliderDiv = p.createP('').parent(p.select("#speedSlider"));
  speedSlider = p.createSlider(1, 5, 1).parent(p.select("#speedSlider"));
  // currentTime
  currentTimeButton = p.createCheckbox('currentTime', false).parent(p.select("#currentTime"));
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
      currTime = p.floor(p.map(tempTime, 0, 1, 0, 96));
      setNextValue = true;
      setFirstValues = true;
    } else {
      YEAR = Number(yearDrop.value());
      monthSetup(p);
    }
  });


  // dropw down date
  yearDrop = p.createSelect();
  yearDrop.parent(p.select("#dropDown"));
  yearDrop.option('2019');
  yearDrop.option('2020');
  yearDrop.changed(() => {
    if (!currentTimeOn) {
      YEAR = Number(yearDrop.value());
      monthSetup(p);
    }
  });
  YEAR = Number(yearDrop.value());

  // setupmonth
  monthSetup(p);

  // setupday
  daySetup(p);
}

//—————————————————————————————————————————————————————— buttonUpdate
function buttonUpdate(p) {
  //fps
  fr.html(`fps | ${p.floor(p.frameRate())}`);
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
function monthSetup(p) {
  if (monthDrop) {
    monthDrop.remove();
  }
  monthDrop = p.createSelect();
  monthDrop.parent(p.select("#dropDown"));
  let i = 1;
  while (i <= 12) {
    if (data[YEAR][i] != undefined) {
      monthDrop.option(i);
    }
    i++;
  }

  MONTH = Number(monthDrop.value());
  daySetup(p);

  monthDrop.changed(() => {
    if (!currentTimeOn) {
      MONTH = Number(monthDrop.value());
      month = data[YEAR][MONTH];
      daySetup(p);
    }
  });
}

//—————————————————————————————————————————————————————— setupDay
function daySetup(p) {
  if (dayDrop) dayDrop.remove();
  dayDrop = p.createSelect();
  dayDrop.parent(p.select("#dropDown"));
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