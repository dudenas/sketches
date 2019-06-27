// set date 
let YEAR = 2020;
let MONTH = 4;
let DAY = 23;
let framesToChangeTime = 15 * 60 * 60; // 15 min interval, 60 seconds per minute, 60 frames per second

let setFirstValues = true;
let currTime = 0;
let currValue = 0;
let nextValue;

let month
let day

// booleans
let setNewModalData = true

//—————————————————————————————————————————————————————— dataSetup
function dataSetup() {
  month = data[YEAR][MONTH];
  day = month[DAY];
  textAlign(CENTER, CENTER);
}

//—————————————————————————————————————————————————————— dataDraw
function dataUpdate() {
  let min = Infinity;
  let max = 0;
  let med = 0;
  let count = 0;

  if (setFirstValues) {
    if (month != undefined) {
      if (day != undefined) {
        for (let i = 0; i < 1000 && day[i] != undefined; i++) {
          let value = float(day[i].value);
          // set current value
          if (i == currTime) {
            // set values to lerp between them
            if (day[currTime + 1] != undefined) {
              nextValue = day[currTime + 1].value;
              // if it's the first day
              if (setFirstValues) {
                setFirstValues = false;
                currValue = floor(day[currTime].value * 100) / 100;
              }
            } else {
              nextValue = day[currTime].value;
            }
          }
          // calculate min med max
          // min
          if (setNewModalData) {
            if (value < min) {
              min = value;
            };
            // max
            if (value > max) {
              max = value;
            };
            // med
            med += value
            count++
          }
        }
      }
    }
  }

  // update current time
  if (frameCount % framesToChangeTime == 0) {
    currTime++;
    setFirstValues = true;
  }

  if (day[currTime] == undefined) {
    currTime = 0;
    setFirstValues = true;
  }

  // draw current time and set it
  currValue = lerp(currValue, nextValue, 1 / framesToChangeTime);

  // UPDATE HTML CURR SWELL VALUES
  document.querySelector('.data-swell-target').innerHTML = nf(currValue, 0, 2)

  // SET DATA
  if (setNewModalData) setModalData(min, nf(med / count, 0, 2), max)
}

// set data for graph
function setModalData(min, med, max) {
  const totalKeys = Object.keys(day).length
  const step = floor(totalKeys / 24)
  for (let i = 0, j = 0; i < totalKeys; i += step, j++) {
    let value = Number(nf(day[i].value, 0, 2));
    data_graph[j] = value
  }
  data_graph[24] = nf(day[totalKeys - 1].value, 0, 2)
  setNewModalData = false

  // SWELL
  // min
  document.querySelector('.data-swell-min-target').innerHTML = nf(min, 0, 2)
  // mid
  document.querySelector('.data-swell-mid-target').innerHTML = nf(med, 0, 2)
  // max
  document.querySelector('.data-swell-max-target').innerHTML = nf(max, 0, 2)
}