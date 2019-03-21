// saving
let save = false;
let totalFrames = 50;
let capturer;

//———————————————————————————————————— save
// in initialization phase
function saveSetup() {
  pixelDensity(2);
  capturer = new CCapture({
    format: 'png',
    framerate: 30,
    verbose: true
  });
  if (save) {
    capturer.start();
  }
}

function saveDraw() {
  if (save) {
    capturer.capture(canvas);
    if (frameCount >= totalFrames * 25 / 4) {
      capturer.stop();
      capturer.save();
      noLoop();
    }
  }
}