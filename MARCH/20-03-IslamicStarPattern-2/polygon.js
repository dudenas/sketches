//————————————————————————————————————————————— Polygon
class Polygon {
  constructor() {
    this.edges = [];
    this.vertices = [];
  }

  addVertex(x, y) {
    let a = createVector(x, y);
    let total = this.vertices.length;
    if (total > 0) {
      let prev = this.vertices[total - 1];
      let edge = new Edge(prev, a);
      this.edges.push(edge);
    }
    this.vertices.push(a);
  }

  hankin() {
    this.edges.forEach(elm => {
      elm.hankin();
    })
  }

  close() {
    let total = this.vertices.length;
    let last = this.vertices[total - 1];
    let first = this.vertices[0];
    let edge = new Edge(last, first);
    this.edges.push(edge);
  }

  show() {
    this.edges.forEach(elm => {
      elm.show();
    })
  }
}