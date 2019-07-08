let sketch = function (p) {
  p.setup = function () {
    p.createCanvas(540, 540, p.SVG)
    p.pixelDensity(1)
    p.scale(1 / 3)
    p.noLoop()
  };

  p.draw = function () {
    grfc.forEach(elm => {
      elm.grfc.forEach(obj => {
        p.show(obj)
      })
    })
  };

  p.save_canvas = function () {
    p.save(`elm${saveGrfc}`)
    saveGrfc = (saveGrfc + 1) % 4
    console.log(saveGrfc)
    if (saveGrfc != 0) {
      svg = new p5(sketch, "hidden_div")
      svg.save_canvas()
    }
  }

  p.show = function (elm) {
    p.push()
    p.translate(elm.x, elm.y)
    // grid
    p.stroke(clrs[1])
    p.strokeWeight(SWPoint)
    p.noFill()

    if (saveGrfc == 0) {
      if (elm.y > 0) p.point(0, 0)
    }
    p.translate(gridSize, gridSize)
    // obj
    p.strokeWeight(SWInside)
    if (!elm.edge) {
      if (saveGrfc == 1) {
        if (elm.cross[0]) p.line(0, 0, gridSize * elm.size, 0)
        if (elm.cross[1]) p.line(-gridSize * elm.size, 0, 0, 0)
        if (elm.cross[2]) p.line(0, 0, 0, gridSize * elm.size)
        if (elm.cross[3]) p.line(0, -gridSize * elm.size, 0, 0)
      }
      switch (elm.shape) {
        case 0:
          if (saveGrfc == 2) p.ellipse(0, 0, (gridSize * elm.size) * padd, (gridSize * elm.size) * padd)
          break
        case 1:
          rectMode(CENTER)
          if (saveGrfc == 3) p.rect(0, 0, (gridSize * elm.size) * padd, (gridSize * elm.size) * padd)
          break
        default:
      }
    }
    p.pop()
  }
};

svg = new p5(sketch, "hidden_div")