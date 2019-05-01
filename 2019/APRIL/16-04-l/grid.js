let scl = 6;
let ratio = 540 / scl;
let grfc = [];
let cols, rows;

function gridSetup() {
  cols = floor(width / ratio);
  rows = floor(height / ratio) + 1;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      stroke(clrs[1]);
      let x = i * ratio;
      let y = j * ratio;
      grfc.push(new Obj(x + ratio / 2, y + ratio / 2, i, j));
    }
  }
};