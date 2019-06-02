// grfc
let phrase = 'VISKASAPIEJA'
let logo

// grid
let cols, rows
let cells = []
let totalFrames = 90
let logoSize = 4


//————————————————————————————————————————————————————————————————————————————————— GrfcSetup
function grfcSetup() {
  cells = []
  // cols and rows
  cols = floor(width / scl)
  rows = floor(height / scl)

  // set the logo
  let w = floor(logoSize) * scl
  let h = w
  let x = floor(random(cols)) * scl
  let y = floor(random(rows)) * scl
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

  // logo.show()
}

//————————————————————————————————————————————————————————————————————————————————— Grfc
class Grfc {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y)
    this.w = w
    this.h = h
  }

  show() {
    noStroke()
    fill(clrs[2])
    rectMode(CENTER)
    rect(this.pos.x, this.pos.y, this.w, this.h)


    imageMode(CENTER)
    image(logoImg, this.pos.x, this.pos.y, floor(logoSize) * scl, floor(logoSize) * scl)
  }
}