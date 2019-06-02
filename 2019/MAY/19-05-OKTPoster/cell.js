//————————————————————————————————————————————————————————————————————————————————— Cell
class Cell {
  constructor(x, y, scl, letter) {
    this.pos = createVector(x, y)
    this.posOriginal = this.pos.copy()
    this.r = scl
    this.letter = letter
    this.angle = 0
    this.target = createVector()
    this.minD = Infinity
  }

  //————————————————————————————————————————————————————————————————————————————————— Cell update
  update() {
    this.setAngle()
  }
  //————————————————————————————————————————————————————————————————————————————————— Cell setAngle
  setTarget(other) {
    let d = this.pos.dist(other.pos)
    if (d < this.minD) {
      this.minD = d
      this.target = other.pos
    }
  }

  //————————————————————————————————————————————————————————————————————————————————— Cell setTarget
  setAngle() {
    this.pos = this.posOriginal.copy()
    let target = this.target.copy()
    let diff = target.sub(this.pos)
    this.angle = diff.heading()

    // set attraction
    // diff.setMag(map(diff.mag(), 0, 100, 1, 15))
    // this.pos.add(diff)

  }

  //————————————————————————————————————————————————————————————————————————————————— Cell show
  show() {
    stroke(clrs[1])
    strokeWeight(1)
    noFill()
    push()
    translate(this.pos.x + scl / 2, this.pos.y + scl / 2)
    rotate(this.angle)

    if (debug) {
      rectMode(CENTER)
      rect(0, 0, this.r, this.r)

    }
    noStroke()
    fill(clrs[1])
    text(this.letter, 0, 0)
    pop()
  }

}