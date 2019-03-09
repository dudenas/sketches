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
  capturer.start();
}

function saveDraw() {
  if (save) {
    capturer.capture(canvas);
    if (iter == maxIter) {
      console.log('finnished');
      capturer.stop();
      capturer.save();
      noLoop();
    } else {
      iter++;
    }
  }
}