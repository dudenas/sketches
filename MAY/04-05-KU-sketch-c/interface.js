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
    dataSetup();
  });

  // setupmonth
  monthSetup();

  dayDrop = createSelect();
  dayDrop.parent(select("#dropDown"));
  for (let i = 1; i <= 31; i++) {
    dayDrop.option(i);
  }

  dayDrop.changed(() => {
    DAY = Number(dayDrop.value());
    dataSetup();
  });
}

//—————————————————————————————————————————————————————— buttonUpdate
function buttonUpdate() {
  // monthSetup();
  //fps
  fr.html(`fps | ${floor(frameRate())}`);
  // speed
  speedSliderDiv.html(`speed | ${speedSlider.value()}`);
  framesToChangeTime = map(speedSlider.value(), 1, 5, 15 * 60 * 60, 15);
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

  monthDrop.changed(() => {
    MONTH = Number(monthDrop.value());
    dataSetup();
  });
}