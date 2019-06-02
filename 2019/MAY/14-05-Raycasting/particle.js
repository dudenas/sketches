class Particle {
  constructor() {
    this.pos = createVector(width / 2, height / 2)
    this.rays = []
    for (let a = 0; a < 360; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a)))
    }
  }

  update(x, y) {
    this.pos.set(x, y)
  }

  show() {
    for (let ray of this.rays) {
      ray.show()
    }
  }

  look(walls) {
    for (let ray of this.rays) {
      let closest = null
      let record = Infinity
      for (let wall of walls) {
        const pt = ray.cast(wall)
        if (pt) {
          const d = p5.Vector.dist(this.pos, pt)
          if (d < record) {
            closest = pt
            record = min(d, record)
          }

        }
      }
      if(closest)
      {
        stroke(clrs[1], 50)
        strokeWeight(SW)
        line(closest.x, closest.y, this.pos.x, this.pos.y)
        
      }
    }
  }
}