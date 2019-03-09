// saving
let save = false;
let totalFrames = 300;
let capturer;

//———————————————————————————————————— save
// in initialization phase
function saveSetup() {
  pixelDensity(2);
  capturer = new CCapture({
    format: 'png',
    framerate: 60,
    verbose: true
  });
  capturer.start();
}

function saveDraw() {
  if (save) {
    capturer.capture(canvas);
    if (frameCount > totalFrames) {
      capturer.stop();
      capturer.save();
    }
  }
}