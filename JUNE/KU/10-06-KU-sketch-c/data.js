let SW2 = 2;
let SW1 = 1;

let month;

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

let day = undefined;
let update = true;

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
  let y1 = padd * 4;
  let setNextValue = false;
  if (month != undefined) {
    day = month[DAY];
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

        // calculate min and max
        if (value < min) {
          min = value;
        };
        if (value > max) {
          max = value;
        };

        // show data
        if (debug) {
          let sw = SW1;
          if (xms == 0) {
            sw = SW2;
            noStroke();
            fill(clrs[1]);
            text(hour, x, y1 - padd * 2);
          }

          stroke(clrs[1]);
          strokeWeight(sw);
          noFill();
          line(x, y1, x, y2);

          noStroke();
          fill(clrs[1]);
          push();
          let add = 0;
          if (i % 2 == 0) add = padd * 4;
          translate(x, y2 + padd * 2 + add);
          rotate(PI / 2);
          text(nf(value, 1, 2), 0, 0);
          pop();
        }
      }
    }
  }

  // update current time
  if (frameCount % framesToChangeTime == 0) currTime++;
  if (day[currTime] == undefined) {
    currTime = 0;
    setNextValue = true;
    setFirstValues = true;
  }

  // draw current time and set it
  currValue = lerp(currValue, nextValue, 1 / framesToChangeTime);
  currX = lerp(currX, nextX, 1 / framesToChangeTime);
  currY = lerp(currY, nextY, 1 / framesToChangeTime);

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