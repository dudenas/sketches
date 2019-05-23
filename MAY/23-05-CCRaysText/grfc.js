let phrase = 'slice '
let totalFrames = 120

//————————————————————————————————————————————————————————————————————————————————— gLine
class gLine {
  constructor(start, end, root) {
    this.start = start
    this.orig = start.copy()
    this.end = end
    this.len = p5.Vector.sub(this.end, this.start).mag()
    this.left = this.len
    this.root = root
    this.phrase = ''
    this.index = 0
    this.txtSize = random(txtSize, txtSize * 2)

    if (this.root) {
      this.lines = []
      this.createLines()
      this.setText()
    }
  }

  setText() {
    if (this.root) {
      this.lines.forEach(elm => {
        let y1 = elm.start.y
        let y2 = elm.end.y
        let len = abs(y2 - y1)
        let bounds = myFont.textBounds(elm.phrase, 0, 0, this.txtSize)
        while (len > bounds.w) {
          elm.phrase += phrase[this.index]
          bounds = myFont.textBounds(elm.phrase, 0, 0, this.txtSize)
          this.index = (this.index + 1) % phrase.length
        }
      })
    }
  }

  update() {
    if (this.root) {
      this.lines.forEach(elm => {
        let percent = ((frameCount + this.index * 2) % totalFrames) / totalFrames
        elm.start.y = map(cos(percent * TWO_PI), -1, 1, -elm.end.y, elm.orig.y * 2)
        elm.start.x = map(sin(percent * TWO_PI), -1, 1, elm.orig.x / 5 * 4, elm.orig.x)
      })
    }
  }

  //————————————————————————————————————————————————————————————————————————————————— gLine createLines
  createLines() {
    let tempEnd = this.end.copy()
    while (this.left > minSize) {
      let picRandom = 0
      while (picRandom < minSize) {
        picRandom = random(this.left)
      }
      this.left -= (picRandom + gap)
      let newEnd = createVector(this.start.x, tempEnd.y)
      let newStart = createVector(this.start.x, tempEnd.y - picRandom)
      tempEnd = createVector(this.start.x, tempEnd.y - picRandom - gap)
      this.lines.push(new gLine(newStart, newEnd))
    }

    let newEnd = createVector(this.start.x, this.start.y)
    this.lines[this.lines.length - 1].start = newEnd
  }

  //————————————————————————————————————————————————————————————————————————————————— gLine show
  show() {
    if (this.root) {
      this.lines.forEach(elm => {

        stroke(clrs[1])
        noFill()
        strokeWeight(SW)

        line(elm.start.x + this.txtSize / 4, elm.start.y, elm.end.x + this.txtSize / 4, elm.end.y)

        noStroke()
        fill(clrs[1])
        push()
        translate(elm.start.x, elm.start.y)
        rotate(PI / 2)
        textSize(this.txtSize)
        text(elm.phrase, 0, 0)
        pop()

      })
    }
  }
}