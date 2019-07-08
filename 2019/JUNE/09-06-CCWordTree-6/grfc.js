let phrase = 'The tragedy of life is what dies in the hearts and souls of people while they live. Albert Einstein'


// ————————————————————————————————————————————————————————————————————————————————— Segment
class Segment {
  constructor(x, len, display, index, txt) {
    this.x = x
    this.y = 0
    this.index = index
    this.olen = len
    this.len = this.olen
    this.display = display
    if (txt) this.txt = this.display ? false : random(1) > 0.618
    this.phrase = ''
    this.active = random(1) > 0.618
    this.start = this.active
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
    let percent = ((frameCount + index) % totalFrames) / totalFrames
    percent = ease[styles[2]](percent);

    if (this.active) {
      this.len = map(sin(percent * TWO_PI + PI / 2), -1, 1, pow(this.olen, 1 / 10), this.olen)

      if (percent == 0) {
        if (this.start) this.start = false
        else {
          this.active = false
          this.len = this.olen
          this.setActive()
        }
      }
    }
  }

  // ————————————————————————————————————————————————————————————————————————————————— Segment setActive
  setActive() {
    let picked = false
    while (!picked) {
      let elm = this.root.segments[floor(random(this.root.segments.length))]
      if (elm != this && !elm.active) {
        picked = true
        elm.active = true
        elm.start = true
      }
    }
  }

  // ————————————————————————————————————————————————————————————————————————————————— Segment show
  show() {
    push()
    translate(0, this.y)
    stroke(clrs[1])
    strokeWeight(SW)
    noFill()
    if (this.display) line(this.x - this.len, 0, this.x + this.len, 0)
    if (this.txt) {
      noStroke()
      fill(clrs[1])
      text(this.phrase, this.x, 0)
    }
    pop()
  }
}

// ————————————————————————————————————————————————————————————————————————————————— Grfc
class Grfc {
  constructor(segments, y, index) {
    this.segments = segments
    this.y = y
    this.index = index
    this.setRoot()
  }
  // ————————————————————————————————————————————————————————————————————————————————— Grfc setRoot
  setRoot() {
    this.segments.forEach(elm => {
      elm.root = this
    });
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