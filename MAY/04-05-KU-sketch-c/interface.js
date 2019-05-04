let speedSlider, speedSliderDiv;
let yearDrop, monthDrop, dayDrop;

//—————————————————————————————————————————————————————— buttonSetup
function buttonsSetup() {
  // fps
  fr = createP('').parent(select("#fps"));
  // speed
  speedSliderDiv = createP('').parent(select("#speedSlider"));
  speedSlider = createSlider(1, 5, 1).parent(select("#speedSlider"));

  // dropw down date
  yearDrop = createSelect();
  yearDrop.parent(select("#dropDown"));
  yearDrop.option('2019');
  yearDrop.option('2020');
  yearDrop.changed(() => {
    YEAR = Number(yearDrop.value());
    monthSetup();
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
      framesToChangeTime = 15 * 60;
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
      framesToChangeTime = 10;
      break;
  }
  // framesToChangeTime = floor(map(speedSlider.value(), 1, 5, 15 * 60 * 60, 15));
  console.log(framesToChangeTime);
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
    MONTH = Number(monthDrop.value());
    month = data[YEAR][MONTH];
    daySetup();
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
    DAY = Number(dayDrop.value());
    day = month[DAY];
    currTime = 0;
    setFirstValues = true;
  });

  currTime = 0;
  setFirstValues = true;
}