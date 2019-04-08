// saving
let save = false;
let capturer;

//———————————————————————————————————— save
// in initialization phase
function saveSetup() {
  pixelDensity(2);
  capturer = new CCapture({
    format: 'png',
    framerate: 1,
    verbose: true
  });
  if (save) {
    capturer.start();
  }
}

function saveDraw() {
  if (save) {
    capturer.capture(canvas);
    if (frameCount == totalFrames) {
      console.log('finnished');
      capturer.stop();
      capturer.save();
      noLoop();
    }
  }
}