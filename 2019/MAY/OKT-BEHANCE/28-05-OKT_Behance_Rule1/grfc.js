// grfc
let phrase = 'VISKASAPIEJA'
let logo

// grid
let cols, rows
let cells = []
let totalFrames = 90
let logoSize = 3


//————————————————————————————————————————————————————————————————————————————————— GrfcSetup
function grfcSetup() {
  cells = []
  // cols and rows
  cols = floor(width / scl)
  rows = floor(height / scl)

  // set the logo
  let w = floor(logoSize) * scl
  let h = w
  let x = floor(cols / 2) * scl
  let y = floor(rows / 2) * scl
  logo = new Grfc(x, y, w, h)

  // setup letters
  let letterIndex = 0
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let letter = phrase[letterIndex % phrase.length]

      cells.push(new Cell(i * scl, j * scl, scl, letter))
      letterIndex++
    }
  }

  // just to match the beginning
  logo.update()

  // setup letter targets
  cells.forEach((elm) => {
    elm.setTarget(logo)
  })

  // just to match the beginning
  cells.forEach((elm) => {
    elm.update()
  })
}

//————————————————————————————————————————————————————————————————————————————————— GrfcDraw
function grfcDraw() {
  cells.forEach((elm) => {
    elm.update()
    elm.show()
  })

  logo.update()
  logo.show()
}

//————————————————————————————————————————————————————————————————————————————————— Grfc
class Grfc {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y)
    this.w = w
    this.h = h
  }

  update() {
    let r = width / 5 * 2
    let percent = (frameCount % totalFrames) / totalFrames
    let angle = map(percent, 0, 1, 0, TWO_PI)
    this.pos.x = width / 2 + r * cos(angle) - xpadd
    this.pos.y = height / 2 + r * sin(angle) - ypadd
  }

  show() {
    if (skelet) {
      stroke(clrs[3])
      strokeWeight(4)
      noFill()
      ellipseMode(CENTER)
      ellipse(this.pos.x, this.pos.y, this.w / 3, this.h / 3)
    } else {
      noStroke()
      fill(clrs[2])
      rectMode(CENTER)
      rect(this.pos.x, this.pos.y, this.w, this.h)

      imageMode(CENTER)
      image(logoImg, this.pos.x, this.pos.y, floor(logoSize) * scl, floor(logoSize) * scl)
    }
  }
}