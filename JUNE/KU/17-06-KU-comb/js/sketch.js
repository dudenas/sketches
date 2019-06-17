let alpha = 5;
let data = undefined

// debug
let fr;
let showCurrent = false;

// interval
let interval = 1;
let intervalFrames = 1;
let running = false;


//—————————————————————————————————————————————————————— dataPreload
function preload() {
  if (data == undefined) data = loadJSON('js/data/data.json', () => console.log('data loaded'), JSON);
}

//————————————————————————————————————————————————————————————————————————————————— setup
function setup() {
  // asign to canvas css
  createCanvas(800, 500).parent('#show-canvas')
  pixelDensity(2);
  background(bgClr[0], bgClr[1], bgClr[2]);
  background(grfcClr, 255);

  // field setup
  fieldSetup();
  // data setup
  dataSetup();
  // time initial setup
  initTime()
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

  // update data
  dataUpdate();


  // update particles
  if (!running) {
    // draw background
    bgDraw();

    // update field
    fieldUpdate();

    particlesUpdate();
  }
}



//————————————————————————————————————————————————————————————————————————————————— helpFunctions
function bgDraw() {
  noStroke();
  fill(bgClr[0], bgClr[1], bgClr[2], alpha);
  rect(0, 0, width, height);
}