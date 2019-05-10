let SW = 12
let total = 5
let grfc
let ratio = 1.618
let r
let factor = 0

/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— Obj
class Obj {
  constructor(x, y, r_, index, parent) {
    this.x = x
    this.y = y
    this.r = r_
    this.index = index
    this.sw = SW
    index++

    this.parent = parent ? parent : null

    if (this.parent) {
      this.r2 = r - this.r
      this.angle = 0
    }

    let newR = this.r / ratio

    // create new grfc
    if (index < total) {
      this.grfc = new Obj(this.r - newR, 0, newR, index, this)
    }
  }

  //————————————————————————————————————————————————————————————————————————————————— Obj update
  update() {
    // let percent = ((frameCount) % (totalFrames)) / (totalFrames)
    let percent = ((frameCount + (total * factor - this.index * factor)) % (totalFrames)) / (totalFrames)
    percent = ease[styles[1]](percent)

    if (this.parent) {
      this.r = map(cos(percent * TWO_PI), 1, -1, this.parent.r / ratio, this.r / 2)
      this.r2 = r - this.r
      let angle = map(percent, 0, 1, 0, TWO_PI)
      this.angle = angle
      this.x = ((r - this.r)) * cos(angle)
      this.y = ((r - this.r)) * sin(angle)
      this.x2 = -((r - this.r2)) * cos(angle)
      this.y2 = -((r - this.r2)) * sin(angle)
    }

  }
  //————————————————————————————————————————————————————————————————————————————————— Obj show
  show() {
    stroke(clrs[1])
    strokeWeight(this.sw)
    noFill()

    push()
    translate(this.x, this.y)
    ellipse(0, 0, this.r * 2)
    pop()

    if (this.grfc) {
      this.grfc.update()
      this.grfc.show()
    }

    if (this.parent) {
      push()
      translate(this.x2, this.y2)
      // ellipse(0, 0, this.r2 * 2)
      rotate(this.angle)
      // arc(0, 0, this.r2 * 2, this.r2 * 2, PI, 0)
      arc(0, 0, this.r2 * 2, this.r2 * 2, 0, PI * this.index)
      pop()
    }

  }
}

/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— grfcDraw
function grfcDraw() {
  grfc.show()
  grfc.update()
}

//————————————————————————————————————————————————————————————————————————————————— grfcSetup
function grfcSetup() {
  r = width / 3
  grfc = new Obj(0, 0, r, 0)
}