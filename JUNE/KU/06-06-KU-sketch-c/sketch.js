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
  if (data == undefined) data = loadJSON('data/data.json', () => console.log('data loaded'), JSON);
}

//————————————————————————————————————————————————————————————————————————————————— setup
function setup() {
  // asign to canvas css
  createCanvas(800, 500).parent('#show-canvas')
  pixelDensity(2);
  background(bgClr[0], bgClr[1], bgClr[2]);
  background(grfcClr, 255);
  fieldSetup();
  dataSetup();
  // setup interface
  buttonsSetup();

  setupSaveCanvas()
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
    console.log(currParticles)
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

  // interface update
  buttonUpdate();
}

//————————————————————————————————————————————————————————————————————————————————— helpFunctions
function keyPressed() {
  if (key == ' ') {
    debug = !debug;
  }

  if (key == 's' || key == 'S') {
    showCurrent = !showCurrent;
  }

  // SAVE
  if (key == 'q' || key == 'Q') {
    saveInsta()
  }
  if (key == 'w' || key == 'W') {
    saveFacebook()
  }
  if (key == 'e' || key == 'E') {
    saveDesktop()
  }
  if (key == 'r' || key == 'R') {
    saveMobile()
  }

  // next color
  if (key == 'n' || key == 'N') {
    currClr = (currClr + 1) % 3
    bgClr = clrs[currClr]
  }
  // diff grfc clr
  if (key == 'm' || key == 'M') {
    grfcBlack = !grfcBlack
    grfcClr = grfcBlack ? clrs[3] : clrs[4]
    background(grfcClr, 255)
  }

}


//————————————————————————————————————————————————————————————————————————————————— helpFunctions
function bgDraw() {
  noStroke();
  fill(bgClr[0], bgClr[1], bgClr[2], alpha);
  rect(0, 0, width, height);
}