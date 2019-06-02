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
let minPhoto = 10
let maxPhoto = 20

//————————————————————————————————————————————————————————————————————————————————— GrfcSetup
function grfcSetup() {
  cells = []
  onTop = []
  photos = []
  // cols and rows
  cols = floor(width / scl)
  rows = floor(height / scl)

  // setup grfc
  for (let i = 0; i < totalPhotos; i++) {
    let found = false
    let x, y, w, h
    let maxTry = 0
    while (maxTry < 10000 && !found) {
      if (i == 0) {
        // set the photo
        temp = random(minPhoto, maxPhoto)
        w = floor(temp) * scl
        h = w / 1.5
        x = floor(random(temp / 2, cols - temp / 2)) * scl
        y = floor(random(temp / 2 / 1.5, rows - temp / 2 / 1.5)) * scl
      } else if (i == 2) {
        // set the logo
        temp = 4
        w = floor(temp) * scl
        h = w
        x = floor(random(temp / 2, cols - temp / 2)) * scl
        y = floor(random(temp / 2, rows - temp / 2)) * scl
      }

      // set the date
      if (i == 1) {
        w = dateW * scl
        h = dateH * scl
        x = floor(random(dateW / 2, cols - dateW / 2)) * scl
        y = floor(random(dateH / 2, rows - dateH / 2)) * scl
      }

      // set not to over flow
      found = true
      if (photos.length > 0) {
        let lm = (x + w / 2 > (floor(cols / 2) - dateW / 2) * scl)
        let rm = (x - w / 2 < (floor(cols / 2) + dateW / 2) * scl)
        let tm = (y + h / 2 > (floor(rows / 2) - dateH / 2) * scl)
        let bm = (y - h / 2 < (floor(rows / 2) + dateH / 2) * scl)

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
      }

      maxTry++
    }
    if (i == 0) photos.push(new Grfc(x, y, w, h))
    else if (i == 1) photos.push(new Grfc(x, y, w, h, false, true))
    else photos.push(new Grfc(x, y, w, h, true, false))
  }

  // setup letters
  let letterIndex = 0
  let bringFront = false
  for (let i = 0; i < cols; i++) {
    if (random(1) > 0.75) bringFront = true
    else bringFront = false
    for (let j = 0; j < rows; j++) {
      let letter = phrase[letterIndex % phrase.length]

      if (bringFront) onTop.push(new Cell(i * scl, j * scl, scl, letter))
      else cells.push(new Cell(i * scl, j * scl, scl, letter))
      letterIndex++
    }
  }

  // setup letter targets
  cells.forEach((elm) => {
    photos.forEach((other) => {
      elm.setTarget(other)
    })
  })

  onTop.forEach((elm) => {
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
    if (!elm.logoShow && !elm.dateShow) elm.show()
  })

  onTop.forEach((elm) => {
    elm.update()
    elm.show()
  })

  photos.forEach((elm) => {
    if (elm.logoShow || elm.dateShow) elm.show()
  })
}

//————————————————————————————————————————————————————————————————————————————————— Grfc
class Grfc {
  constructor(x, y, w, h, logoShow, dateShow) {
    this.pos = createVector(x, y)
    this.w = w
    this.h = h
    this.logoShow = logoShow
    this.dateShow = dateShow
  }

  show() {
    // pic
    if (debug) {
      noFill();
      strokeWeight(4)
      stroke(clrs[1])
      rectMode(CENTER)
      rect(this.pos.x, this.pos.y, this.w, this.h)
    } else {
      noStroke()
      fill(clrs[2])
      rectMode(CENTER)
      rect(this.pos.x, this.pos.y, this.w, this.h)
    }

    // logo
    if (this.logoShow) {
      imageMode(CENTER)
      image(logo, this.pos.x, this.pos.y, floor(4) * scl, floor(4) * scl)
    }

    // date
    if (this.dateShow) {
      imageMode(CENTER)
      image(date, this.pos.x, this.pos.y, dateW * scl, dateH * scl)
    }

    if (!this.dateShow && !this.logoShow) {
      imageMode(CENTER)
      image(img, this.pos.x, this.pos.y, this.w, this.h)
    }
  }
}