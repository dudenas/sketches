// grfc
let phrase = 'VISKASAPIEJA'
let photos = []

// grid
let cols, rows
let cells = []

//————————————————————————————————————————————————————————————————————————————————— GrfcSetup
function grfcSetup() {
  // cols and rows
  cols = floor(width / scl)
  rows = floor(height / scl)

  // setup grfc
  for (let i = 0; i < totalPhotos; i++) {
    let found = false
    let x, y
    while (!found) {
      x = floor(random(2, cols - 1)) * scl
      y = floor(random(2, rows - 1)) * scl
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
    photos.push(new Grfc(x, y))
  }

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
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.w = floor(random(3,6)) * scl
    this.h = floor(random(3,6)) * scl
    // this.w = 100
    // this.h = 100
    if(imgMode)
    {
      this.img = imgs[floor(random(totalPhotos))]
      this.createMask()
      this.img.mask(this.pg);
    }
  }

  createMask() {
    this.pg = createGraphics(this.img.width, this.img.height)
    this.pg.pixelDensity(2);
    this.pg.scale(1);
    this.pg.background(255, 255, 255, 0)
    this.pg.fill(0)
    // this.pg.rectMode(CORNER)
    this.pg.rectMode(CENTER)
    this.pg.rect(this.img.width/2, this.img.height/2, this.w, this.h)
  }

  show() {
    if (debug) {
      noFill();
      strokeWeight(4)
      stroke(clrs[1])
      rectMode(CENTER)
      rect(this.pos.x, this.pos.y, this.w, this.h)

    } else {
      noStroke()
      fill(clrs[1])
      rectMode(CENTER)
      rect(this.pos.x, this.pos.y, this.w, this.h)
    }

    if(imgMode)
    {
      imageMode(CENTER)
      image(this.img, this.pos.x, this.pos.y)
    }
  }
}