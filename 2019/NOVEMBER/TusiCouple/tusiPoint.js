class tusiPoint {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  update() {

  }

  show() {
    strokeWeight(SW * 4)
    point(this.x, this.y)
  }
}

function createTusiPoints() {
  tusiPoints = []
  // create TusiPoints
  for (let i = 0; i < total; i++) {
    const theta = map(i, 0, total, 0, TWO_PI)
    const x = (R / 4) * cos(theta)
    const y = (R / 4) * sin(theta)
    tusiPoints.push(new tusiPoint(x, y))
  }
}