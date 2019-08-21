// saving
let save = true
let capturer
let totalFrames = 150

//———————————————————————————————————— save
// in initialization phase
function saveSetup() {
  pixelDensity(2)

  frameRate(60)
  capturer = new CCapture({
    format: 'png',
    framerate: 60,
    verbose: true
  })
  if (save) {
    capturer.start()
  }
}

function saveDraw() {
  if (save) {
    capturer.capture(canvas)
    if (frameCount == (totalFrames + 1) * 4) {
      console.log('finnished')
      capturer.stop()
      capturer.save()
      noLoop()
    }
  }
}