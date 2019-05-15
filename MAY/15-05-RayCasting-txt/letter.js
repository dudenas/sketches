let breakDistance = 25

// ————————————————————————————————————————————————————————————————————————————————— Letter
class Letter {
  constructor(letter, x, y) {
    this.pos = createVector(x, y)
    this.walls = []
    this.setupLetter(letter)
    this.setWalls()
  }

  // ————————————————————————————————————————————————————————————————————————————————— Letter setupLetter
  setupLetter(letter) {
    // set the letter
    let lsize = font.textBounds(letter, 0, 0, scl)
    // set the widht height
    this.w = lsize.w
    this.h = lsize.h
    let points = font.textToPoints(letter, -lsize.w / 2, lsize.h / 2, scl, {
      sampleFactor: 0.2,
      simplifyThreshold: 0
    })

    this.pos.x -= this.w / 6

    // all points
    this.pt = []
    // if there are two or more paths divide it into separate arrays
    this.dividePoints(points, 0)
  }

  // ————————————————————————————————————————————————————————————————————————————————— Letter dividePoints
  dividePoints(arr, index) {
    let temp = []
    let prev = null
    let d = 0
    let level = false
    for (let i = index; i < arr.length; i++) {
      let p = arr[i]
      if (prev) {
        d = dist(p.x, p.y, prev.x, prev.y)
      }
      if (d > breakDistance) {
        level = true
        index = i
        break
      } else {
        temp.push(p)
      }
      prev = p
    }

    // splice part of the points
    temp.splice(floor(temp.length / 2))

    this.pt.push(temp)
    if (level) this.dividePoints(arr, index)
  }

  // ————————————————————————————————————————————————————————————————————————————————— Letter dividePoints
  setWalls() {
    for (let i = 0; i < this.pt.length; i++) {
      let path = this.pt[i]
      for (let j = 0; j < path.length - 1; j++) {
        this.walls.push(new Boundary(path[j].x + this.pos.x, path[j].y + this.pos.y, path[j + 1].x + this.pos.x, path[j + 1].y + this.pos.y))
      }
    }

    walls = walls.concat(this.walls)
  }

  // ————————————————————————————————————————————————————————————————————————————————— Letter show
  show() {
    // stroke(clrs[1])
    // strokeWeight(SW)
    // noFill()

    for (let wall of this.walls) {
      wall.show()
    }

    // push()
    // translate(this.pos.x, this.pos.y)
    // for (let i = 0; i < this.pt.length; i++) {
    //   let path = this.pt[i]
    //   beginShape()
    //   for (let j = 0; j < path.length; j++) {
    //     let p = path[j]
    //     vertex(
    //       p.x,
    //       p.y
    //     )
    //   }
    //   endShape()
    // }
    // pop()
  }
}