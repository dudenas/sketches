//————————————————————————————————————————————————————————————————————————————————— blob
class blob {
  constructor(x, y) {
    this.minx = x
    this.miny = y
    this.maxx = x
    this.maxy = y
    this.points = []
    this.points.push(createVector(x, y))
    this.taken = false
  }

  convert() {
    this.w = this.maxx - this.minx
    this.h = this.maxy - this.miny
    this.x = (this.minx + this.maxx) / 2
    this.y = (this.miny + this.maxy) / 2
  }

  //————————————————————————————————————————————————————————————————————————————————— blob add
  add(x, y) {
    this.minx = min(this.minx, x)
    this.miny = min(this.miny, y)
    this.maxx = max(this.maxx, x)
    this.maxy = max(this.maxy, y)
    this.points.push(createVector(x, y))
  }

  //————————————————————————————————————————————————————————————————————————————————— blob add
  addClose(other) {
    this.minx = min(this.minx, other.minx)
    this.maxx = max(this.maxx, other.maxx)
    this.miny = min(this.miny, other.miny)
    this.maxy = max(this.maxy, other.maxy)
  }

  //————————————————————————————————————————————————————————————————————————————————— blob isNear
  isNear(x, y) {
    // let cx = (this.minx + this.maxx) / 2
    // let cy = (this.miny + this.maxy) / 2

    // let cx = max(min(x, this.maxx), this.minx)
    // let cy = max(min(y, this.maxy), this.miny)

    // let d = dist(cx, cy, x, y);
    // return (d < threshold)

    let record = Infinity
    this.points.forEach(elm => {
      let d = dist(elm.x, elm.y, x, y);
      if (d < record) record = d
    })

    return record
  }

  //————————————————————————————————————————————————————————————————————————————————— blob isClose
  isClose(other) {
    return (abs(this.maxx - other.minx) < minDist || abs(this.minx - other.maxx) < minDist) &&
      (abs(this.maxy - other.miny) < minDist || abs(this.miny - other.maxy) < minDist)
  }

  //————————————————————————————————————————————————————————————————————————————————— blob show
  show() {
    rectMode(CENTER)
    stroke(clrs[2])
    strokeWeight(1)
    rect(this.x, this.y, this.w, this.h)

    // rectMode(CORNERS)
    // stroke(clrs[2])
    // strokeWeight(1)
    // rect(this.minx, this.miny, this.maxx, this.maxy)

    // stroke(clrs[3])
    // strokeWeight(4)
    // point(this.minx, this.miny)
    // point(this.maxx, this.maxy)

    // this.points.forEach((elm) => {
    //   stroke(clrs[3])
    //   strokeWeight(2)
    //   point(elm.x, elm.y)
    // })
  }
}