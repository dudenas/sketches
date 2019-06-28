const levels = 8

class Element {
  constructor(theta, randomSize, index) {
    this.theta = theta
    this.randomSize = randomSize
    this.index = index
  }

  show() {
    stroke(clrs[1])
    strokeWeight(1)
    noFill()
    push()
    rotate(this.theta)
    this.calcNext(0, 0)
    // line(0, 0, 0, len)
    pop()
  }

  calcNext(prevLen, curr) {
    if (this.randomSize[curr] < 10) fill(clrs[0])
    else noFill()
    if (this.index % 2) {
      ellipse(0, floor(this.randomSize[curr]) + prevLen, floor(this.randomSize[curr]) * 2)
      if (random(1) > 0.5) {
        line(0, 0, 0, floor(this.randomSize[curr]) + prevLen)
      }
    } else if (random(1) > 0.5) {
      ellipse(0, floor(this.randomSize[curr]) + prevLen, floor(this.randomSize[curr]) * 2)
    }
    if (curr < levels) {
      this.calcNext((floor(this.randomSize[curr]) * 2 + prevLen), ++curr)
    }
  }
}