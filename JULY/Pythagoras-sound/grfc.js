const grfc = []
const txtPadd = 10
const maxPoint = 10

let currentPointIdx = -10
let currentRowIdx = 8

function setupGrfc() {
  textSize(4)
  textAlign(CENTER, CENTER)

  for (let m = -maxPoint; m < maxPoint; m++) {
    beginShape()
    for (let n = 0; n < maxPoint; n++) {
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

function updateGrfc() {
  if (currentPointIdx == maxPoint + 1) {
    currentPointIdx = -10
    currentRowIdx++
    if (currentRowIdx == maxPoint) {
      currentRowIdx = 0
    }
  }
  grfc.forEach(elm => {
    if (elm.m == currentPointIdx && elm.n == currentRowIdx) elm.highlight()
  })
  currentPointIdx++
}

class Grfc {
  constructor(a, b, m, n) {
    this.a = a
    this.b = b
    this.m = m
    this.n = n
  }

  highlight() {
    stroke(clrs[2])
    strokeWeight(5)
    point(this.a, -this.b)
    // UPDATE note
    updateNote(this.a, this.b)

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