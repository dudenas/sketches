// Convert a circle into a square
// by considering it as a set of alternating straight lines and arcs
// in which the arcs shrink while the lines grow.
// (Technically, a variant of Circle06)
// Golan Levin, August 2016

var radius;
var squarePoints = [];
var nSquarePoints = 4;
var bDrawDebug = false;

//-----------------------------------------
function setup() {
  createCanvas(400, 400);
  radius = width / 2 * 0.75;

  for (var i = 0; i < nSquarePoints; i++) { // triangle vertices
    var x = radius * cos(i * TWO_PI / nSquarePoints - HALF_PI);
    var y = radius * sin(i * TWO_PI / nSquarePoints - HALF_PI);
    squarePoints[i] = {
      x, y
    };
  }
}

//-----------------------------------------
function draw() {
  background(255);
  noFill();
  push();
  translate(width / 2, height / 2);
  rotate(PI * 0.25);

  var currentRadii01 = 0.5 + 0.5 * sin(millis() / 2000.0);
  var rad = currentRadii01 * radius;
  var phase = cos(millis() / 2000.0);

  stroke(0);
  strokeWeight(3);
  strokeJoin(ROUND);
  beginShape();
  for (var i = 0; i < nSquarePoints; i++) {
    
    px = map(currentRadii01, 0, 1, squarePoints[i].x, 0);
    py = map(currentRadii01, 0, 1, squarePoints[i].y, 0);
    if (phase < 0){
      px = 0-px; 
      py = 0-py; 
    }

    var ang1 = (i + 1) * TWO_PI / nSquarePoints + HALF_PI / 2 + PI;
    var ang2 = (i + 2) * TWO_PI / nSquarePoints + HALF_PI / 2 + PI;
  
    var nPointsInArc = 60;
    for (var j = 0; j <= nPointsInArc; j++) {
      var t = map(j,0,nPointsInArc, ang1,ang2);
      var ax = px + rad * cos(t);
      var ay = py + rad * sin(t);
      vertex(ax, ay);
    }

  }
  endShape(CLOSE);

  if (bDrawDebug) {
    stroke(255, 0, 0, 64);
    strokeWeight(1);
    for (var i = 0; i < nSquarePoints; i++) {
      var px = map(currentRadii01, 0, 1, squarePoints[i].x, 0);
      var py = map(currentRadii01, 0, 1, squarePoints[i].y, 0);
      line(0, 0, px, py);
    }
  }
  pop();
}