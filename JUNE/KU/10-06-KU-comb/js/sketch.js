// style
let clrs = [
  [50, 65, 185], 0, [255, 0, 85], 255
];

let bgClr = clrs[0]
let grfcClr = clrs[1]

let alpha = 5;
let data = undefined

// debug
let fr;
let debug = false;
let showCurrent = false;

// interval
let interval = 1;
let intervalFrames = 1;

//—————————————————————————————————————————————————————— dataPreload
function preload() {
  if (data == undefined) data = loadJSON('js/data/data.json', () => console.log('data loaded'), JSON);
}

//————————————————————————————————————————————————————————————————————————————————— setup
function setup() {
  // asign to canvas css
  console.log('test')
  createCanvas(800, 500).parent('#show-canvas')
  pixelDensity(2);
  background(bgClr[0], bgClr[1], bgClr[2]);
  background(grfcClr, 255);
  fieldSetup();
  dataSetup();
  // setup interface
  initTime();

  setupSaveCanvas()
}


//————————————————————————————————————————————————————————————————————————————————— draw
function draw() {
  // set interval for a wave and update it
  if (intervalFrames % interval == 0) {
    generateWave();
    interval = floor(map(currValue, 0, 2, 100, 25));
    intervalFrames = 0;
    // console.log(currValue, interval)
  }

  intervalFrames++;
  // update data / field / particle
  dataUpdate();

  // // draw background
  bgDraw();

  // // debug information
  if (debug) {
    fieldDraw();
  }
  fieldUpdate();

  particlesUpdate();
}

//————————————————————————————————————————————————————————————————————————————————— helpFunctions
function keyPressed() {
  if (key == ' ') {
    debug = !debug;
  }

  if (key == 's' || key == 'S') {
    showCurrent = !showCurrent;
  }
  if (key == 'a' || key == 'A') {
    saveInsta()
  }

}


//————————————————————————————————————————————————————————————————————————————————— helpFunctions
function bgDraw() {
  noStroke();
  fill(bgClr[0], bgClr[1], bgClr[2], alpha);
  rect(0, 0, width, height);
}