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
  createCanvas(900, 500).id('main-canvas').parent('#show-canvas')
  pixelDensity(2);
  background(bgClr[0], bgClr[1], bgClr[2]);
  background(grfcClr, 255);
  // field setup
  fieldSetup();
  // data setup
  dataSetup();
  // interface setup 
  interfaceSetup();
}


//————————————————————————————————————————————————————————————————————————————————— draw
function draw() {
  // set interval for a wave and update it
  if (intervalFrames % interval == 0) {
    currParticles = maxParticles
    generateWave();

    interval = floor(map(currValue, 0, 2, intervalSliderValue, 25));
    intervalFrames = 0;
  }
  intervalFrames++;

  // data update
  dataUpdate();

  // draw background
  bgDraw();

  // field update
  fieldUpdate();

  // particle update
  particlesUpdate();

  // interface update
  interfaceUpdate();
}



//————————————————————————————————————————————————————————————————————————————————— helpFunctions
function bgDraw() {
  noStroke();
  fill(bgClr[0], bgClr[1], bgClr[2], alpha);
  rect(0, 0, width, height);
}