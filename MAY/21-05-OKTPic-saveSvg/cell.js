//————————————————————————————————————————————————————————————————————————————————— Cell
class Cell {
  constructor(x, y, scl, letter, p) {
    this.p = p
    this.pos = this.p.createVector(x, y)
    this.posOriginal = this.pos.copy()
    this.r = scl
    this.letter = letter
    this.angle = 0
    this.target = this.p.createVector()
    this.minD = Infinity
  }

  //————————————————————————————————————————————————————————————————————————————————— Cell update
  update() {
    this.setAngle()
  }
  //————————————————————————————————————————————————————————————————————————————————— Cell setAngle
  setTarget(other) {
    if (!other.logoShow && !other.dateShow) {
      let d = this.pos.dist(other.pos)
      if (d < this.minD) {
        this.minD = d
        this.target = other.pos
      }
    }
  }

  //————————————————————————————————————————————————————————————————————————————————— Cell setTarget
  setAngle() {
    this.pos = this.posOriginal.copy()
    let target = this.target.copy()
    let diff = target.sub(this.pos)
    this.angle = diff.heading()
  }

  //————————————————————————————————————————————————————————————————————————————————— Cell show
  show() {
    this.p.stroke(clrs[1])
    this.p.strokeWeight(1)
    this.p.noFill()
    this.p.push()
    this.p.translate(this.pos.x + scl / 2, this.pos.y + scl / 2)
    this.p.rotate(this.angle)

    if (debug) {
      this.p.rectMode(this.p.CENTER)
      this.p.rect(0, 0, this.r, this.r)

    }

    this.p.noStroke()
    this.p.fill(clrs[1])
    this.p.text(this.letter, 0, 0)
    this.p.pop()
  }

}