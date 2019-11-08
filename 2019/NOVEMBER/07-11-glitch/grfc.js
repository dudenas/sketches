let clrs = [5, 250];

let scl = 4;
let cols, rows;
let myfont;
let pg;
let cells = [];
let maxSpeed = 4;
let maxForce = 0.5;

//————————————————————————————————————————————— preload Grfc
function preload() {
  myfont = loadFont("data/Silka-Bold.otf");
}

//————————————————————————————————————————————— setup Grfc
function setupGrfc() {
  cols = floor(width / scl);
  rows = floor(height / scl);

  // create font image
  let txtSize = width * 0.2;
  pg = createGraphics(width, height);
  pg.textSize(txtSize / 3);
  pg.textFont(myfont);
  pg.textAlign(CENTER, CENTER);
  pg.text("glitch", width / 2 - txtSize * 1.9, height / 2 - txtSize * 1.5);
  image(pg, 0, 0);

  // take values from the font and apply to the grid
  pg.loadPixels();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = (i * scl / 2 + j * scl * width) * 4;
      let c = pg.pixels[index + 3];
      let bright = brightness(c);
      if (bright > 0) {
        let c = new Cell(i * scl, j * scl);
        cells.push(c);
      }
    }
  }
}