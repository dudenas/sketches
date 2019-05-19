// grfc
let phrase = 'VISKASAPIEJA'
let photos = []

// grid
let cols, rows
let cells = []

//————————————————————————————————————————————————————————————————————————————————— GrfcSetup
function grfcSetup(p) {
  cells = []
  photos = []
  // cols and rows
  cols = p.floor(p.width / scl)
  rows = p.floor(p.height / scl)

  // setup grfc
  for (let i = 0; i < totalPhotos; i++) {
    let found = false
    let x, y
    while (!found) {
      x = p.floor(p.random(2, cols - 1)) * scl
      y = p.floor(p.random(2, rows - 1)) * scl
      // set not to over flow
      found = true
      for (let j = 0; j < photos.length; j++) {
        let other = photos[j]
        if (x > other.pos.x - other.w &&
          x < other.pos.x + other.w &&
          y > other.pos.y - other.h &&
          y < other.pos.y + other.h) {
          found = false
          break
        }
      }
    }
    photos.push(new Grfc(x, y, p))
  }

  // setup letters
  let letterIndex = 0
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let letter = phrase[letterIndex % phrase.length]
      cells.push(new Cell(i * scl, j * scl, scl, letter, p))
      letterIndex++
    }
  }

  // setup letter targets
  cells.forEach((elm) => {
    photos.forEach((other) => {
      elm.setTarget(other)
    })
  })
}

//————————————————————————————————————————————————————————————————————————————————— GrfcDraw
function grfcDraw() {
  cells.forEach((elm) => {
    elm.update()
    elm.show()
  })

  photos.forEach((elm) => {
    elm.show()
  })
}

//————————————————————————————————————————————————————————————————————————————————— Grfc
class Grfc {
  constructor(x, y, p) {
    this.p = p
    this.pos = this.p.createVector(x, y)
    this.w = this.p.floor(this.p.random(3, 6)) * scl
    this.h = this.p.floor(this.p.random(3, 6)) * scl
    // this.w = this.p.floor(this.p.random(3, 6)) * scl
    // this.h = this.w
    // this.w = 100
    // this.h = 100
  }

  createMask() {
    this.pg = p.createGraphics(this.img.width, this.img.height)
    this.pg.pixelDensity(2);
    this.pg.scale(1);
    this.pg.background(255, 255, 255, 0)
    this.pg.fill(0)
    // this.pg.rectMode(CORNER)
    this.pg.rectMode(CENTER)
    this.pg.rect(this.img.width / 2, this.img.height / 2, this.w, this.h)
  }

  show() {
    if (debug) {
      this.p.noFill();
      this.p.strokeWeight(4)
      this.p.stroke(clrs[1])
      this.p.rectMode(this.p.CENTER)
      this.p.rect(this.pos.x, this.pos.y, this.w, this.h)

    } else {
      this.p.noStroke()
      this.p.fill(clrs[1])
      this.p.rectMode(this.p.CENTER)
      this.p.rect(this.pos.x, this.pos.y, this.w, this.h)
    }
  }
}