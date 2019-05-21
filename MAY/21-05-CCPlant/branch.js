let tree = []
let phrase = 'grow '
let speed = 0.05
let totalFrames = 15

//————————————————————————————————————————————————————————————————————————————————— Branch
class Branch {
  constructor(start, end, parent) {
    this.start = start
    this.end = end
    this.v = p5.Vector.sub(this.end, this.start)
    this.angle = this.v.heading()
    this.len = 0
    this.lenOriginal = this.v.mag()
    this.parent = parent
    this.finnished = false
    this.startFrame = 0
    this.curr = ''
    this.index = 0
  }
  //————————————————————————————————————————————————————————————————————————————————— Branch update
  update() {
    if (this.startFrame == 0) {
      this.startFrame = frameCount
    }
    let percent = (frameCount - this.startFrame) / totalFrames
    this.len = map(percent, 0, 1, 0, this.lenOriginal)

    if (percent >= 1) this.finnished = true
  }

  //————————————————————————————————————————————————————————————————————————————————— Branch branch
  branch(direction, n, angle) {
    let dir = p5.Vector.sub(this.end, this.start)
    dir.rotate(angle * direction)
    dir.mult(decrease)
    let newEnd = p5.Vector.add(this.end, dir)
    let br = new Branch(this.end, newEnd, this)
    tree.push(br)
    if (n < levels) {
      n++
      let index = tree.length - 1
      tree[index].branch(1, n, random(1) > 0.5 ? angle : random(0, Math.PI / 8))
      tree[index].branch(-1, n, random(1) > 0.5 ? angle : random(0, Math.PI / 8))
    }
  }

  //————————————————————————————————————————————————————————————————————————————————— Branch show
  show() {
    if (debug) {
      stroke(clrs[1])
      strokeWeight(1)
      noFill()
      line(this.start.x, this.start.y, this.end.x, this.end.y)
    }
    noStroke()
    fill(clrs[1])
    push()
    // translate((this.start.x + this.end.x)/2, this.start.y)
    translate(this.start.x, this.start.y)
    rotate(this.angle)
    let txtSize = map(this.lenOriginal, 0, startLen, 4, 18)

    let bounds = myFont.textBounds(this.curr, 0, 0, txtSize)
    while (this.len > bounds.w) {
      this.curr += phrase[this.index]
      bounds = myFont.textBounds(this.curr, 0, 0, txtSize)
      this.index = (this.index + 1) % phrase.length
    }

    textSize(txtSize)
    text(this.curr, 0, 0)
    pop()
  }
}