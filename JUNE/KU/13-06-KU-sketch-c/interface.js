let yearDrop, monthDrop, dayDrop;
let resSlider, resTxt,
  rSlider, rTxt,
  intervalSlider, intervalTxt,
  particlesSlider, particlesTxt

let intervalSliderValue = 100

//—————————————————————————————————————————————————————— buttonSetup
function interfaceSetup() {
  // fps
  fr = createP('').parent(select("#fps"));
  // Sliders
  resSlider = createSlider(1, 10, 1, 1)
  resSlider.parent('#resSlider')

  rSlider = createSlider(4, 12, 5, 0.1)
  rSlider.parent('#rSlider')

  intervalSlider = createSlider(25, 100, 100, 1)
  intervalSlider.parent('#intervalSlider')

  particlesSlider = createSlider(25, 125, 50, 1)
  particlesSlider.parent('#particlesSlider')

  // currentTime
  initTime()
}

//—————————————————————————————————————————————————————— buttonUpdate
function interfaceUpdate() {
  //fps
  fr.html(`fps | ${floor(frameRate())}`);
  // 
  document.getElementById('resTxt').innerHTML = `resolution x ${nf(resSlider.value(),2,0)}`;
  res = resSlider.value()

  // r slider
  document.getElementById('rTxt').innerHTML = `size ${nf(rSlider.value(),0,1)}`;
  r = rSlider.value()
  maxR = r * 3;

  // interval slider
  document.getElementById('intervalTxt').innerHTML = `interval ${nf(intervalSlider.value(),3,0)}`;
  intervalSliderValue = Number(intervalSlider.value())

  // particles slider
  document.getElementById('particlesTxt').innerHTML = `particles ${nf(particlesSlider.value(),3,0)}`;
  maxParticles = Number(particlesSlider.value())

}

//—————————————————————————————————————————————————————— setupMonth
function monthSetup(first) {
  if (monthDrop) {
    monthDrop.remove();
  }
  monthDrop = createSelect();
  monthDrop.parent(select("#dropDown")).id('monthDrop');
  // document.getElementById('monthDrop').setAttribute('padding', '2em')
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
    setFirstValues = true;
  });

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
  for (var i, j = 0; i = mySelect.options[j]; j++) {
    if (i.value == val) {
      mySelect.selectedIndex = j;
      break;
    }
  }
}

// functionality
$(document).ready(function () {
  console.log("ready!");
  // SAVE 
  $('#saveButton').click(() => saveFunction(saveGrfc))
  // CLRS
  $('a').click(function (e) {
    e.preventDefault();
    let myClass = this.className.split(/\s+/)
    if (myClass[0] == 'grfc') {
      if (myClass[1] == 'white') grfcBlack = false
      else grfcBlack = true
      grfcClr = grfcBlack ? clrs[4] : clrs[5]
      background(grfcClr, 255)
      // remove add class to see the change
      $(".grfc").addClass('unchecked').removeClass('checked')
    } else {
      switch (myClass[1]) {
        case 'blue':
          currClr = 2;
          break;
        case 'red':
          currClr = 3;
          break;
        case 'yellow':
          currClr = 1;
          break;
        case 'white':
          currClr = 0;
          break;
      }
      // remove add class to see the change
      $(".bg").addClass('unchecked').removeClass('checked')
      bgClr = clrs[currClr]
    }
    $(this).addClass('checked').removeClass('unchecked')
    return false;
  });
});