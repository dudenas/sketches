let phrase = 'Those who are hungry, are the easiest to feed. '


// ————————————————————————————————————————————————————————————————————————————————— Segment
class Segment {
  constructor(x, len, display, index, j, ylen, txt) {
    this.x = x
    this.ylen = ylen * 2
    this.y = 0
    this.yorig = 0
    this.index = index
    this.len = len
    this.display = display
    if (txt) this.txt = this.display ? false : random(1) > 0.4
    this.phrase = ''
    this.goTop = (j + 1) % 4 == 0
    this.goBot = (j + 2) % 4 == 0
  }

  // ————————————————————————————————————————————————————————————————————————————————— Segment setTxt
  setTxt(index) {
    this.phrase = ''
    let bounds = myFont.textBounds(this.phrase, 0, 0, txtSize)
    while (this.len > bounds.w) {
      this.phrase += phrase[index]
      bounds = myFont.textBounds(this.phrase, 0, 0, txtSize)
      index = (index + 1) % phrase.length
    }
    return index
  }
  // ————————————————————————————————————————————————————————————————————————————————— Segment updateLen
  update(index) {
    let percent = ((frameCount + index * 2 + this.index) % totalFrames) / totalFrames
    // let percent = ((frameCount) % totalFrames) / totalFrames
    if (this.goBot) this.y = map(sin(percent * TWO_PI), -1, 1, -this.ylen, this.yorig)
    if (this.goTop) this.y = map(sin(percent * TWO_PI), -1, 1, this.ylen, this.yorig)
  }

  // ————————————————————————————————————————————————————————————————————————————————— Segment show
  // ————————————————————————————————————————————————————————————————————————————————— Segment showTxt
  showTxt() {
    push()
    translate(0, -this.y)
    if (this.txt) {
      noStroke()
      fill(clrs[1])
      text(this.phrase, this.x, 0)
    }
    pop()
  }

  showLine() {
    push()
    translate(0, this.y)
    stroke(clrs[1])
    strokeWeight(SW)
    noFill()
    if (this.display) line(this.x - this.len, 0, this.x + this.len, 0)
    pop()
  }

  showBox() {
    push()
    translate(0, this.y)
    noStroke()
    fill(clrs[0])
    if (this.display && this.goTop) rect(this.x - this.len, 0, this.len * 2, -this.ylen)
    if (this.display && this.goBot) rect(this.x - this.len, 0, this.len * 2, this.ylen)
    pop()
  }
}

// ————————————————————————————————————————————————————————————————————————————————— Grfc
class Grfc {
  constructor(segments, y, index) {
    this.segments = segments
    this.y = y
    this.index = index
  }

  // ————————————————————————————————————————————————————————————————————————————————— Grfc show
  showTxt() {
    push()
    translate(0, this.y)
    this.segments.forEach(elm => {
      elm.update(this.index)
      elm.showTxt()
    });
    pop()
  }

  showBox() {
    push()
    translate(0, this.y)
    this.segments.forEach(elm => {
      elm.showBox()
    });
    pop()
  }

  showLine() {
    push()
    translate(0, this.y)
    this.segments.forEach(elm => {
      elm.showLine()
    });
    pop()
  }
}