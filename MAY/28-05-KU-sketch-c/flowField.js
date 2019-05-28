let cols, rows;
let ratio = 40;
let scl;
let grid;
let SW = 1;
let time = 0;
let fieldSpeed = Math.PI / 120;
let deviation = -Math.PI * 2; //-Math.PI / 2; //Math.PI / 4;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— cell
class Cell {
  constructor(p, x, y) {
    this.p = p;
    this.pos = this.p.createVector(x * scl + scl / 2, y * scl + scl / 2);
    this.angle = 0;
    // this.setupAngle();
  }
  //————————————————————————————————————————————————————————————————————————————————— cell updateAngle
  updateAngle() {
    let index = this.p.floor(this.p.map(this.pos.x / scl, 0, this.p.width / scl, 0, 96));
    let max = this.p.map(this.p.pow(day[index].value, 1.5), 0, 2, 0, deviation);
    this.angle = this.p.map(this.p.noise(this.pos.x / (this.p.width), this.pos.y / (this.p.height), time), 0, 1, -max, max);
    // this.angle = map(pow(day[index].value, 1.5), 0, 2, 0, deviation);
  }

  //————————————————————————————————————————————————————————————————————————————————— cell setupAngle
  // setupAngle() {
  //   let index = this.p.floor(this.p.map(this.pos.x / scl, 0, this.p.width / scl, 0, 96));
  //   this.angle = this.p.map(this.p.pow(day[index].value, 1.5), 0, 2, 0, deviation);
  // }

  //————————————————————————————————————————————————————————————————————————————————— cell show
  show() {
    this.p.stroke(clrs[1]);
    this.p.strokeWeight(SW);
    this.p.noFill();
    this.p.push();
    this.p.translate(this.pos.x, this.pos.y);
    this.p.rotate(this.angle);
    this.p.line(-scl / 2, 0, scl / 2, 0);
    // rect(0, 0, scl, scl);
    this.p.pop();
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— fieldSetup
function fieldSetup(p) {
  scl = p.width / ratio;
  cols = p.floor(p.width / scl);
  rows = p.floor(p.height / scl);
  grid = make2Darray(cols, rows);
  console.log(`scale ${scl} / cols ${cols} / rows ${rows}`);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(p, i, j);
    }
  }
}

//————————————————————————————————————————————————————————————————————————————————— fieldDraw
function fieldDraw() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

//————————————————————————————————————————————————————————————————————————————————— fieldDraw
function fieldUpdate() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].updateAngle();
    }
  }

  // increase time
  time += fieldSpeed;
}

//————————————————————————————————————————————————————————————————————————————————— 2dArray
function make2Darray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}