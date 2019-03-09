// saving
let save = false;
let totalFrames = 150;
let capturer;

// in initialization phase
function saveSetup() {
  capturer = new CCapture({
    format: 'png',
    framerate: 30,
    verbose: true
  });
}

function saveDraw() {
  if (save) {
    capturer.capture(canvas);
    if (frameCount == totalFrames + 1) {
      capturer.stop();
      capturer.save();
    }
  }
}