let alpha = 5;
let data = undefined

// debug
let fr;
let debug = false;
let showCurrent = false;

// interval
let interval = 1;
let intervalFrames = 1;
let saving = false;

//—————————————————————————————————————————————————————— dataPreload
function preload() {
  if (data == undefined) data = loadJSON('data/data.json', () => console.log('data loaded'), JSON);
}

//————————————————————————————————————————————————————————————————————————————————— setup
function setup() {
  // asign to canvas css
  createCanvas(900, 500).parent('#show-canvas')
  pixelDensity(2);
  background(bgClr[0], bgClr[1], bgClr[2]);
  background(grfcClr, 255);
  fieldSetup();
  dataSetup();
  // setup interface
  buttonsSetup();
}


//————————————————————————————————————————————————————————————————————————————————— draw
function draw() {
  // set interval for a wave and update it
  if (intervalFrames % interval == 0) {
    if (frameRate() > 30) {
      if (currParticles < maxParticles) currParticles++
      generateWave();
    } else {
      if (currParticles > minParticles) currParticles -= 5
    }

    interval = floor(map(currValue, 0, 2, 100, 25));
    intervalFrames = 0;
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

  // interface update
  buttonUpdate();
}



//————————————————————————————————————————————————————————————————————————————————— helpFunctions
function bgDraw() {
  noStroke();
  fill(bgClr[0], bgClr[1], bgClr[2], alpha);
  rect(0, 0, width, height);
}