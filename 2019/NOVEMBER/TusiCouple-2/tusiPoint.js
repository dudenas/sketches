const tusiFrames = []

function createTusiFrames() {
  let curr = 1

  for (let y = 0; y < height; y += height / 4) {
    for (let x = 0; x < width; x += width / 4) {
      tusiFrames.push(new tusiFrame(x, y, curr))
      curr++
    }
  }
}

class tusiFrame {
  constructor(x, y, total) {
    this.x = x
    this.y = y
    this.total = total
    this.tusiPoints = []
    this.createTusiPoints()

  }
  createTusiPoints() {
    // create TusiPoints
    for (let i = 0; i < this.total; i++) {
      const theta = map(i, 0, this.total, 0, TWO_PI)
      const x = (R / 4) * cos(theta)
      const y = (R / 4) * sin(theta)
      this.tusiPoints.push(new tusiPoint(x, y))
    }
  }

  show() {
    // all graphics
    noFill();
    push()

    // main circle
    translate(this.x, this.y)
    stroke(clrs[1])
    strokeWeight(SW / 2)
    if (showLines) ellipse(0, 0, R, R)

    //  lines
    strokeWeight(SW / 2)
    for (let i = 0; i < this.total; i++) {
      const theta = map(i, 0, this.total, 0, PI)
      // console.log(theta)
      const x1 = (R / 2) * cos(theta)
      const y1 = (R / 2) * sin(theta)
      const x2 = (-R / 2) * cos(theta)
      const y2 = (-R / 2) * sin(theta)
      if (showLines) line(x1, y1, x2, y2)
    }

    // smaller circle
    push()
    rotate(angle + this.total)
    translate(R / 4, 0)
    strokeWeight(SW / 2)
    if (showLines) ellipse(0, 0, R / 2, R / 2)

    // point
    strokeWeight(SW * 4)
    // point(0, 0)

    // drawing circle
    rotate(-2 * (angle + this.total))
    for (let tp of this.tusiPoints) {
      tp.show();
    }
    pop()
    pop()
  }

}

class tusiPoint {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  show() {
    strokeWeight(SW * 4)
    point(this.x, this.y)
  }
}