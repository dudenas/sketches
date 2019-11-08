class tusiPoint {
  constructor(x, y, index) {
    this.x = x
    this.y = y
    this.index = index
    this.trail = []
  }

  update() {
    this.trail.push({
      // x: this.x + this.x * cos(angle) + this.x * cos(-2 * angle),
      // x: this.x + this.x * cos(angle) + this.x * cos(-2 * angle + R / 4),
      x: this.x + this.x * cos(angle) - this.x * cos(3 * -angle),
      // y: this.y + this.y * sin(angle) + this.y * sin(-2 * angle),
      // y: this.y + this.y * sin(angle) + this.y * sin(-2 * angle + R / 4),
      y: this.y + this.y * sin(angle) - this.x * sin(2 * -angle),
    })
    if (this.trail.length > 20) this.trail.splice(0, 1)
  }

  show() {
    beginShape()
    strokeWeight(SW / 2)
    for (let i = 0; i < this.trail.length; i++) {
      // vertex(this.trail[i].x, this.trail[i].y)
      curveVertex(this.trail[i].x, this.trail[i].y)
    }
    endShape()
    strokeWeight(SW * 4)
    point(this.trail[0].x, this.trail[0].y)
    point(this.trail[this.trail.length - 1].x, this.trail[this.trail.length - 1].y)
  }
}

function createTusiPoints() {
  tusiPoints = []
  // create TusiPoints
  for (let i = 0; i < total; i++) {
    const theta = map(i, 0, total, 0, TWO_PI)
    const x = (R / 4) * cos(theta)
    const y = (R / 4) * sin(theta)
    tusiPoints.push(new tusiPoint(x, y, i))
  }
}