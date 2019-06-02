let letters = [];
let SW = 12;
let padd, rows, cols;
let scl = 3;
let totalPoints

/////////////5////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— Letter
class Letter {
  constructor(x, y, i, j) {
    this.x = x
    this.y = y
    this.x1 = -scl / 2 + padd
    this.x2 = scl / 2 - padd
    this.y1 = -scl / 2 + padd
    this.y2 = scl / 2 - padd
    this.i = i
    this.j = j
    this.sw = SW
    this.maxPoints = (i + j * cols) + 2
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter setPoints
  setPoints() {
    this.path = []
    this.path.push(createVector(this.x2, this.y1))
    this.path.push(createVector(this.x2, this.y2 / 2))
    for (let i = 0; i < totalPoints; i++) {
      let angle = map(i, 0, totalPoints, 0, PI / 3 * 2)
      let r = abs(this.x2 - this.x1) / 2
      let x = r * cos(angle)
      let y = this.y2 / 2 + r * sin(angle)
      this.path.push(createVector(x, y))
    }
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter playWithPoints


  //————————————————————————————————————————————————————————————————————————————————— Letter update
  update() {
    let percent = ((frameCount + this.i * 2 + this.j * 2) % (totalFrames)) / (totalFrames);
    percent = ease[styles[0]](percent);
    totalPoints = map(sin(percent * TWO_PI), -1, 1, 1, this.maxPoints);
    this.setPoints()
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter show
  show() {
    push()
    translate(this.x, this.y)
    stroke(clrs[1])
    strokeWeight(1)
    noFill()
    // ellipse(0, 0, scl, scl)
    strokeWeight(this.sw)

    beginShape()
    for (let i = 0; i < this.path.length; i++) {
      let pt = this.path[i]
      vertex(pt.x, pt.y)
    }
    endShape()

    pop()
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— grfcDraw
function grfcDraw() {
  for (let l of letters) {
    l.update();
    l.show();
  }
}

//————————————————————————————————————————————————————————————————————————————————— grfcSetup
function grfcSetup() {
  rows = scl
  cols = scl
  padd = width / (scl * 4);
  scl = floor(width / scl)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      letters.push(new Letter(i * scl + scl / 2, j * scl + scl / 2, i, j));
    }
  }
}

function keyPressed() {
  if (key == ' ') noLoop()
}