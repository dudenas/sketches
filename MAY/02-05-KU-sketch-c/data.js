let SW2 = 2;
let SW1 = 1;

let data;
let month;

// set date 
const YEAR = 2020;
const MONTH = 12;
let DAY = 23;
let framesToChangeTime = 10;
let framesToChangeDay = 60 * 5;

let myFontEL, myFontL;
let padd = 10;

let currTime = 0;
let currValue = 0;
let currX, currY = 0;
let day = undefined;
let update = true;


//—————————————————————————————————————————————————————— dataPreload
function preload() {
  data = loadJSON('data/data.json', gotData, JSON);

  function gotData() {
    console.log('data loaded');
  }

  myFontEL = loadFont('data/Silka-ExtraLight.otf');
  myFontL = loadFont('data/Silka-Light.otf');
}

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
  if (month != undefined) {
    day = month[DAY];
    if (day != undefined) {
      let step = floor((width - padd * 2) / 24);
      for (let i = 0; i < 1000 && day[i] != undefined; i++) {
        let hour = float(day[i].hour);
        let minute = float(day[i].minute);
        let second = float(day[i].second);
        let xh = step * hour + padd * 2;
        let xms = map((minute * 60 + second), 0, 60 * 60 + 60, 0, step);
        let x = xh + xms;
        let value = float(day[i].value);
        let y2 = map(value, 0, 2, y1, height / 4 * 3);
        // set current value
        if (i == currTime) {
          currValue = day[currTime].value;
          currX = x;
          currY = y2;
        }

        // calculate min and max
        if (value < min) {
          min = value;
        };
        if (value > max) {
          max = value;
        };

        if (debug) {
          let sw = SW1;
          if (xms == 0) {
            sw = SW2;
            textFont(myFontEL);
            noStroke();
            fill(clrs[1]);
            text(hour, x, y1 - padd * 2);
          }

          stroke(clrs[1]);
          strokeWeight(sw);
          noFill();
          line(x, y1, x, y2);

          textFont(myFontL);
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
  }

  // draw current time
  stroke(clrs[2]);
  strokeWeight(SW);
  line(currX, y1, currX, currY);

  // draw text
  noStroke();
  fill(clrs[3]);
  text(`${YEAR} ${MONTH} ${DAY} — min ${nf(min,1,2)} / max ${nf(max,1,2)} — currValue ${nf(currValue, 1, 2)}`, width / 2, height - padd);

  // if (frameCount % framesToChangeDay == 0) {
  //   DAY++;
  //   update = true;
  // }
  // if (month[DAY] == undefined) {
  //   DAY = 1;
  // }
}