let SW2 = 2;
let SW1 = 1;


// set date 
let YEAR = 2020;
let MONTH = 4;
let DAY = 23;
let framesToChangeTime = 15 * 60 * 60; // 15 min interval, 60 seconds per minute, 60 frames per second

let padd = 10;

let setFirstValues = true;
let currTime = 0;
let currValue = 0;
let currX = 0,
  currY = 0;

let nextValue;
let nextX,
  nextY;

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
  let y1 = padd * 4;
  let setNextValue = false;

  if (setFirstValues) {
    if (month != undefined) {
      // day = month[DAY];
      if (day != undefined) {
        // individual step
        let step = floor((width - padd * 2) / 24);
        for (let i = 0; i < 1000 && day[i] != undefined; i++) {
          let hour = float(day[i].hour);
          let minute = 15 * i % 60;
          let xh = step * hour + padd * 2;
          let xms = map((minute), 0, 60, 0, step);
          let x = xh + xms;
          let value = float(day[i].value);
          let y2 = map(value, 0, 2, y1, height / 4 * 3);
          // set next value if there is one
          if (setNextValue) {
            setNextValue = false;
            nextX = x;
            nextY = y2;
          }

          // set current value
          if (i == currTime) {
            // set values to lerp between them
            if (day[currTime + 1] != undefined) {
              nextValue = day[currTime + 1].value;
              setNextValue = true;
              // if it's the first day
              if (setFirstValues) {
                setFirstValues = false;
                currValue = floor(day[currTime].value * 100) / 100;
                currX = x;
                currY = y2;
              }
            } else {
              nextValue = day[currTime].value;
              nextX = x + step;
              nextY = y2;
            }
          }

          // calculate min med max
          // min
          if (setModalData) {
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
  currX = lerp(currX, nextX, 1 / framesToChangeTime);
  currY = lerp(currY, nextY, 1 / framesToChangeTime);

  // UPDATE HTML CURR SWELL VALUES
  document.querySelector('.data-swell-target').innerHTML = nf(currValue, 0, 2)

  // SET DATA
  if (setNewModalData) setModalData(min, nf(med / count, 0, 2), max)

  if (showCurrent) {
    stroke(clrs[2]);
    strokeWeight(SW);
    line(currX, y1, currX, currY);

    // draw text
    noStroke();
    fill(clrs[3]);
    text(`${YEAR} ${MONTH} ${DAY} — min ${nf(min,1,2)} / max ${nf(max,1,2)} — currValue ${nf(currValue, 1, 2)}`, width / 2, height - padd);
  }
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