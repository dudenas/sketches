let count = 0
let total = 1500
let minD = 4
class Walker {
  constructor() {
    this.x = random(width)
    this.y = random(height)
    this.pos = createVector(map(noise(this.x), 0, 1, 0, width), map(noise(this.y), 0, 1, 0, height))

    this.path = []
    this.stop = false
    this.sw = random(minSW, SW)
    this.special = random(1) > 0.5
    this.new = true
  }

  checkCollision() {
    walkers.forEach(elm => {
      for (let p of elm.path) {
        const d = p.dist(this.pos)
        if (d < 2) this.stop = true
      }
    })
  }

  update() {
    if (!this.stop) {
      if (this.new) {
        this.path.push(this.pos.copy())
        this.new = false
      } else {
        this.path.push(this.pos.copy())
        this.x += incr
        this.y += incr
        this.pos.x = map(noise(this.x), 0, 1, 0, width)
        this.pos.y = map(noise(this.y), 0, 1, 0, height)
        this.checkCollision()
      }
    } else {
      pg.loadPixels()
      this.x = random(width)
      this.y = random(height)
      this.pos.x = map(noise(this.x), 0, 1, 0, width)
      this.pos.y = map(noise(this.y), 0, 1, 0, height)
      let near = false
      // for (let p of this.path) {
      //   const d = p.dist(this.pos)
      //   if (d < 200) near = true
      // }
      walkers.forEach(elm => {
        for (let p of elm.path) {
          const d = p.dist(this.pos)
          if (d < minD) near = true
        }
      })
      while ((brightness(pg.pixels[(floor(this.pos.x) + floor(this.pos.y) * width) * 4]) != 100) || near) {
        this.x = random(width)
        this.y = random(height)
        this.pos.x = map(noise(this.x), 0, 1, 0, width)
        this.pos.y = map(noise(this.y), 0, 1, 0, height)
        near = false
        walkers.forEach(elm => {
          for (let p of elm.path) {
            const d = p.dist(this.pos)
            if (d < minD) {
              near = true
            }
          }
        })
      }
      this.stop = false
      this.sw = random(minSW, SW)
      this.special = random(1) > 0.5
      this.new = true
      count++
      if (count == total) {
        finnished = true
      }
    }
  }

  show() {
    if (!this.new) {
      stroke(clrs[1])
      strokeWeight(this.sw)
      noFill()
      if (this.special) {
        line(this.pos.x, this.pos.y, this.path[this.path.length - 1].x, this.path[this.path.length - 1].y)
      } else point(this.pos.x, this.pos.y)
    }
  }
}