let scl = 10;
let cols, rows;
let grid;
let myfont;
let pg;
let obj;
let r;

//————————————————————————————————————————————————————————————————————————————————— grfcUpdate
function grfcUpdate() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noFill();
      if (grid[i][j] == 1) {
        let x = i * scl;
        let y = j * scl;
        push();
        translate(x, y);
        let pos = createVector(x, y);
        let diff = p5.Vector.sub(obj, pos);
        fill(clrs[1]);
        rect(0, 0, scl, scl);
        pop();
      }
      stroke(clrs[1]);
      noFill();
      if (!save) rect(i * scl, j * scl, scl, scl);
    }
  }

  let percent = (frameCount % totalFrames) / totalFrames;
  percent = ease[styles[1]](percent);
  obj.x = width / 2 + r * cos(map(sin(percent * TWO_PI), -1, 1, PI / 2, TWO_PI + PI / 2));
  obj.y = height / 2 + r * sin(map(sin(percent * TWO_PI), -1, 1, PI / 2, TWO_PI + PI / 2));
  ellipse(obj.x, obj.y, 15, 15);
  // image(pg, 0, 0);
}


//————————————————————————————————————————————————————————————————————————————————— grfcSetup
function grfcSetup() {
  cols = floor(width / scl);
  rows = floor(height / scl);
  grid = make2Darray(cols, rows);

  // create font image
  let txtSize = 312;
  pg = createGraphics(width, height);
  pg.textSize(txtSize);
  pg.textFont(myfont);
  pg.textAlign(CENTER, CENTER);
  pg.fill(clrs[1]);
  pg.noStroke();
  pg.text("2", width / 4, height / 4 - scl * txtSize / (txtSize / 3.5));


  // take values from the font and apply to the grid
  pg.loadPixels();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = (i * scl + j * scl * width) * 4;
      let c = pg.pixels[index + 3];
      let bright = brightness(c);
      if (bright > 10) {
        grid[i][j] = 1;
      } else {
        grid[i][j] = 0;
      }
    }
  }


  // create moving object which will rule the animation
  r = width / 3;
  obj = createVector();
}