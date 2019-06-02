// grfc
let phrase = 'VISKASAPIEJA'
let photos = []

// grid
let cols, rows
let cells = []
let onTop = []

// date
let date, logo
let dateW = 10
let dateH = 4

//————————————————————————————————————————————————————————————————————————————————— GrfcSetup
function grfcSetup(p) {
  cells = []
  onTop = []
  photos = []
  // cols and rows
  cols = p.floor(p.width / scl)
  rows = p.floor(p.height / scl)

  // setup grfc
  for (let i = 0; i < totalPhotos; i++) {
    let found = false
    let x, y, w, h
    let maxTry = 0
    while (maxTry < 1000 && !found) {
      if (i == 0) {
        temp = 4
        logo.resize(p.floor(temp) * scl, 0)
      } else {
        temp = p.random(5, 10)
      }
      w = p.floor(temp) * scl
      h = w
      x = p.floor(p.random(temp / 2, cols - temp / 2)) * scl
      y = p.floor(p.random(temp / 2, rows - temp / 2)) * scl
      // set not to over flow
      found = true
      let lm = (x + w / 2 > (p.floor(cols / 2) - dateW / 2) * scl)
      let rm = (x - w / 2 < (p.floor(cols / 2) + dateW / 2) * scl)
      let tm = (y + h / 2 > (p.floor(rows / 2) - dateH / 2) * scl)
      let bm = (y - h / 2 < (p.floor(rows / 2) + dateH / 2) * scl)
      if (photos.length > 0) {
        for (let j = 0; j < photos.length; j++) {
          let other = photos[j]
          let ls = (x + w / 2 > other.pos.x - other.w / 2)
          let rs = (x - w / 2 < other.pos.x + other.w / 2)
          let ts = (y + h / 2 > other.pos.y - other.h / 2)
          let bs = (y - h / 2 < other.pos.y + other.h / 2)

          if ((ls && rs && ts && bs) || (lm && rm && tm && bm)) {
            found = false
            break
          }
        }
      } else {
        if (lm && rm && tm && bm) {
          found = false
        }
      }
      maxTry++
    }
    if (i == 0) photos.push(new Grfc(x, y, p, w, h, true))
    else photos.push(new Grfc(x, y, p, w, h))
  }

  // setup letters
  let letterIndex = 0
  let bringFront = false
  for (let i = 0; i < cols; i++) {
    if (p.random(1) > 0.75) bringFront = true
    else bringFront = false
    for (let j = 0; j < rows; j++) {
      let letter = phrase[letterIndex % phrase.length]

      if (bringFront) onTop.push(new Cell(i * scl, j * scl, scl, letter, p))
      else cells.push(new Cell(i * scl, j * scl, scl, letter, p))
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
function grfcDraw(p) {
  cells.forEach((elm) => {
    elm.update()
    elm.show()
  })

  photos.forEach((elm) => {
    elm.show()
  })

  onTop.forEach((elm) => {
    elm.update()
    elm.show()
  })

  if (debug) {
    p.noFill();
    p.strokeWeight(4)
    p.stroke(clrs[1])
  } else {
    p.noStroke()
    p.fill(clrs[2])
  }
  p.rect(p.floor(cols / 2) * scl, p.floor(rows / 2) * scl, dateW * scl, dateH * scl)
}

//————————————————————————————————————————————————————————————————————————————————— Grfc
class Grfc {
  constructor(x, y, p, w, h, logoShow) {
    this.p = p
    this.pos = this.p.createVector(x, y)
    this.w = w
    this.h = h
    this.logoShow = logoShow
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
      this.p.fill(clrs[2])
      this.p.rectMode(this.p.CENTER)
      this.p.rect(this.pos.x, this.pos.y, this.w, this.h)
    }
    if (this.logoShow) {
      this.p.imageMode(this.p.CENTER)
      this.p.image(logo, this.pos.x, this.pos.y)
    }
  }
}