let fov = 60

class Particle {
  constructor() {
    this.pos = createVector(width / 2, height / 2)
    this.prev = this.pos.copy()
    this.rays = []
    this.heading = 0
    for (let a = -fov; a < fov; a += dt) {
      this.rays.push(new Ray(this.pos, radians(a + this.heading + PI)))
    }
  }

  updateFOV() {
    this.rays = []
    for (let a = -fov; a < fov; a += dt) {
      this.rays.push(new Ray(this.pos, radians(a) + this.heading + PI))
    }
  }

  rotate() {
    this.diff = this.prev.sub(this.pos)
    this.heading = this.diff.heading()
    let index = 0
    for (let a = -fov; a < fov; a += dt) {
      this.rays[index].setAngle(radians(a) + this.heading + PI)
      index++
    }
  }

  update(x, y) {
    this.pos.set(x, y)
    this.rotate()
    this.prev = this.pos.copy()
  }

  show() {
    for (let ray of this.rays) {
      ray.show()
    }
  }

  look(walls) {
    const scene = []
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i]
      let closest = null
      let record = Infinity
      for (let wall of walls) {
        const pt = ray.cast(wall)
        if (pt) {
          let d = p5.Vector.dist(this.pos, pt)
          const a = ray.dir.heading() - this.heading
          d *= cos(a)
          if (d < record) {
            closest = pt
            record = min(d, record)
          }

        }
      }
      if (closest) {
        stroke(clrs[1], 50)
        strokeWeight(SW)
        line(closest.x, closest.y, this.pos.x, this.pos.y)

      }
      scene[i] = record
    }
    return scene
  }
}