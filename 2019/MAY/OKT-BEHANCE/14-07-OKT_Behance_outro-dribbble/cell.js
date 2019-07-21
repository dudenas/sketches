//————————————————————————————————————————————————————————————————————————————————— Cell
class Cell {
  constructor(x, y, scl, letter) {
    this.pos = createVector(x, y)
    this.posOriginal = this.pos.copy()
    this.letter = letter
    this.angle = 0
    this.original = 0
    this.target = createVector()
  }

  //————————————————————————————————————————————————————————————————————————————————— Cell update
  update() {
    let percent = (frameCount % totalFrames) / totalFrames
    this.angle = map(percent, 0, 1, this.original, this.original + TWO_PI)
  }
  //————————————————————————————————————————————————————————————————————————————————— Cell setAngle
  setTarget(other) {
    this.target = other.pos
    this.setAngle()
  }

  //————————————————————————————————————————————————————————————————————————————————— Cell setTarget
  setAngle() {
    this.pos = this.posOriginal.copy()
    let target = this.target.copy()
    let diff = target.sub(this.pos)
    this.angle = diff.heading()
    this.original = this.angle
  }

  //————————————————————————————————————————————————————————————————————————————————— Cell show
  show() {
    stroke(clrs[1])
    strokeWeight(1)
    noFill()
    push()
    translate(this.pos.x + scl / 2, this.pos.y + scl / 2)
    rotate(this.angle)

    noStroke()
    fill(clrs[1])
    text(this.letter, 0, 0)
    pop()
  }

}