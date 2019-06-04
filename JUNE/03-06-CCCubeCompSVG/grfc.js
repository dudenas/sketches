let padd = 1

class Grfc {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.grfc = []
    this.setupGrid()
  }

  setupGrid() {
    for (let i = 0; i < grid; i++) {
      for (let j = 0; j < grid; j++) {
        let edge = false
        if (i == grid - 1 || j == grid - 1) edge = true
        let size = floor(random(1, 5))
        let x = i * gridSize
        let y = j * gridSize
        let found = false
        let count = 0
        // check if it is within the borders and does not touch the others
        while (!found && count < 500) {
          let countInside = 0
          let border = false
          if (x - size * gridSize < -gridSize || x + size * gridSize > scl || y - size * gridSize < -gridSize || y + size * gridSize > scl) {
            border = true
          } else {
            this.grfc.forEach(elm => {
              if (!elm.edge) {
                let d = dist(elm.x, elm.y, x, y)
                if (d < (elm.size + size) / 2 * (gridSize)) {
                  found = false
                } else {
                  countInside++
                }
              } else countInside++
            })
          }

          if (countInside == this.grfc.length && !border) found = true
          else {
            size = floor(random(1, 5))
          }
          count++
        }

        if (count == 500) edge = true
        if (random(1 / count) < 0.3) edge = true
        this.grfc.push(new Obj(x, y, size, edge))
      }
    }
  }

  show() {
    push()
    translate(this.x, this.y)
    stroke(clrs[1])
    strokeWeight(SWborder)
    noFill()
    // rect(0, 0, scl, scl)

    beginShape()
    strokeWeight(SWLine)
    this.grfc.forEach(elm => {
      elm.show()
    })
    endShape()
    pop()
  }
}

class Obj {
  constructor(x, y, size, edge) {
    this.x = x
    this.y = y
    this.shape = floor(random(2))
    this.size = size
    this.edge = edge
    this.cross = [random(1) > 0.5, random(1) > 0.5, random(1) > 0.5, random(1) > 0.5]
  }

  show() {
    push()
    translate(this.x, this.y)
    // grid
    stroke(clrs[1])
    strokeWeight(SWPoint)
    noFill()
    // rect(0, 0, gridSize, gridSize)
    if (saveGrfc == 0)
      if (this.y > 0) point(0, 0)
    translate(gridSize, gridSize)
    // obj
    strokeWeight(SWInside)
    if (!this.edge) {
      // vertex(this.x + gridSize, this.y + gridSize)
      if (saveGrfc == 1) {
        if (this.cross[0]) line(0, 0, gridSize * this.size, 0)
        if (this.cross[1]) line(-gridSize * this.size, 0, 0, 0)
        if (this.cross[2]) line(0, 0, 0, gridSize * this.size)
        if (this.cross[3]) line(0, -gridSize * this.size, 0, 0)
      }
      switch (this.shape) {
        case 0:
          if (saveGrfc == 2) ellipse(0, 0, (gridSize * this.size) * padd, (gridSize * this.size) * padd)
          break
        case 1:
          rectMode(CENTER)
          if (saveGrfc == 3) rect(0, 0, (gridSize * this.size) * padd, (gridSize * this.size) * padd)
          break
        default:
      }
    }
    pop()
  }
}