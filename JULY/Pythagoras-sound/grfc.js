const grfc = []
const txtPadd = 10
const maxPoint = 10

function setupGrfc() {
  textSize(4)
  textAlign(CENTER, CENTER)

  for (let m = -maxPoint; m < maxPoint; m++) {
    beginShape()
    for (let n = -maxPoint; n < maxPoint; n++) {
      if (n != m) {
        const a = pow(m, 2) - pow(n, 2)
        const b = 2 * m * n
        grfc.push(new Grfc(a, b, m, n))
      }
    }
    strokeWeight(1)
    endShape(OPEN)
  }
}

function showGrfc() {
  for (let j = -maxPoint; j < maxPoint; j++) {
    beginShape()
    for (let i = -maxPoint; i < maxPoint; i++) {
      grfc.forEach(elm => {
        if (elm.m == i && elm.n == j) elm.show()
      })
    }
    strokeWeight(1)
    endShape()
  }
}

class Grfc {
  constructor(a, b, m, n) {
    this.a = a
    this.b = b
    this.m = m
    this.n = n
  }

  show() {
    noStroke()
    fill(clrs[1])
    text(`(${this.a},  ${this.b} )`, this.a, -this.b - txtPadd)
    stroke(clrs[1])
    strokeWeight(3)
    noFill()
    point(this.a, -this.b)
    vertex(this.a, -this.b)
  }
}