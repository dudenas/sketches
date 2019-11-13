class tusiPoint {
  constructor(theta, index) {
    this.theta = theta
    this.index = index
    this.trail = []
  }

  update() {
    this.trail.push({
      x: (R / 4) * cos(-angle) - (R / 4) * cos(angle + this.theta),
      y: (R / 4) * sin(-angle) - (R / 4) * sin(angle + this.theta)
    })
    if (this.trail.length > 20) this.trail.splice(0, 1)
  }

  show() {
    beginShape()
    strokeWeight(SW / 2)
    for (let i = 0; i < this.trail.length; i++) {
      vertex(this.trail[i].x, this.trail[i].y)
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
    tusiPoints.push(new tusiPoint(theta, i))
  }
}