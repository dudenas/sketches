let SW2 = 2;
let SW1 = 1;

let data;
let month;

// set date 
let YEAR = 2020;
let MONTH = 4;
let DAY = 23;
let framesToChangeTime = 60;
let framesToChangeDay = 60 * 5;

let myFontEL, myFontL;
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
function dataSetup(p) {
  month = data[YEAR][MONTH];
  day = month[DAY];
  p.textAlign(p.CENTER, p.CENTER);
}

//—————————————————————————————————————————————————————— dataDraw
function dataUpdate(p) {
  let min = Infinity;
  let max = 0;
  let y1 = padd * 4;
  let setNextValue = false;
  if (month != undefined) {
    day = month[DAY];
    if (day != undefined) {
      // individual step
      let step = p.floor((p.width - padd * 2) / 24);
      for (let i = 0; i < 1000 && day[i] != undefined; i++) {
        let hour = p.float(day[i].hour);
        let minute = 15 * i % 60;
        let xh = step * hour + padd * 2;
        let xms = p.map((minute), 0, 60, 0, step);
        let x = xh + xms;
        let value = p.float(day[i].value);
        let y2 = p.map(value, 0, 2, y1, p.height / 4 * 3);
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
              currValue = p.floor(day[currTime].value);
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
            p.textFont(myFontEL);
            p.noStroke();
            p.fill(clrs[1]);
            p.text(hour, x, y1 - padd * 2);
          }

          p.stroke(clrs[1]);
          p.strokeWeight(sw);
          p.noFill();
          p.line(x, y1, x, y2);

          p.textFont(myFontL);
          p.noStroke();
          p.fill(clrs[1]);
          p.push();
          let add = 0;
          if (i % 2 == 0) add = padd * 4;
          p.translate(x, y2 + padd * 2 + add);
          p.rotate(p.PI / 2);
          p.text(p.nf(value, 1, 2), 0, 0);
          p.pop();
        }
      }
    }
  }

  // update current time
  if (p.frameCount % framesToChangeTime == 0) currTime++;
  if (day[currTime] == undefined) {
    currTime = 0;
    setNextValue = true;
    setFirstValues = true;
  }

  // draw current time and set it
  currValue = p.lerp(currValue, nextValue, 1 / framesToChangeTime);
  currX = p.lerp(currX, nextX, 1 / framesToChangeTime);
  currY = p.lerp(currY, nextY, 1 / framesToChangeTime);

  p.stroke(clrs[2]);
  p.strokeWeight(SW);
  p.line(currX, y1, currX, currY);

  // draw text
  p.noStroke();
  p.fill(clrs[3]);
  p.text(`${YEAR} ${MONTH} ${DAY} — min ${p.nf(min,1,2)} / max ${p.nf(max,1,2)} — currValue ${p.nf(currValue, 1, 2)}`, p.width / 2, p.height - padd);

  // change to the next day
  // if (frameCount % framesToChangeDay == 0) {
  //   DAY++;
  //   update = true;
  // }
  // if (month[DAY] == undefined) {
  //   DAY = 1;
  // }
}