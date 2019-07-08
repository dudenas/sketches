let phrase = 'Art is a lie that tells the truth. Picasso '


// ————————————————————————————————————————————————————————————————————————————————— Segment
class Segment {
  constructor(x, len, display) {
    this.x = x
    this.origX = x
    this.len = len
    this.origLen = len
    this.display = display
    this.txt = this.display ? false : random(1) > 0.7
    this.phrase = ''
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
    let percent = ((frameCount + index * 2) % totalFrames) / totalFrames
    this.len = map(sin(percent * TWO_PI), -1, 1, this.origLen, this.nextLen)
    this.x = map(sin(percent * TWO_PI), -1, 1, this.origX, this.nextX)
  }

  // ————————————————————————————————————————————————————————————————————————————————— Segment show
  show() {
    stroke(clrs[1])
    strokeWeight(SW)
    noFill()
    if (this.display) line(this.x - this.len, 0, this.x + this.len, 0)
    else if (this.txt) {
      noStroke()
      fill(clrs[1])
      text(this.phrase, this.x, 0)
    }
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
  show() {
    push()
    translate(0, this.y)
    this.segments.forEach(elm => {
      elm.update(this.index)
      elm.show()
    });
    pop()
  }
}