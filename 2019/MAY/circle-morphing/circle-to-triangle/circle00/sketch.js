// Convert a circle into a triangle, 
// by sampling a circle into many segments, 
// and then locally averaging each point with its neighbors, 
// except for the three special corner vertices.
// Golan Levin, January 2017

var radius;
var cx, cy;
var nCirclePoints = 120;
let padd = 15
let txtSize = 8
var circlePoints = [];

//-----------------------------------------
function setup() {
  createCanvas(400, 400);
  radius = width / 2 * 0.75;
  cx = width / 2;
  cy = height / 2;

  for (var i = 0; i < nCirclePoints; i++) {
    var t = map(i, 0, nCirclePoints, 0, TWO_PI) - HALF_PI;
    var x = radius * cos(t);
    var y = radius * sin(t);
    circlePoints[i] = {
      x,
      y
    };
  }
  textSize(txtSize)
}

//-----------------------------------------
function draw() {
  background(255);

  translate(width / 2, height / 2)
  beginShape();
  for (var i = 0; i < nCirclePoints; i++) {
    if (i % (nCirclePoints / 5) !== 0) {
      var h = (i - 1 + nCirclePoints) % nCirclePoints;
      var j = (i + 1 + nCirclePoints) % nCirclePoints;
      circlePoints[i].x = (circlePoints[h].x + circlePoints[i].x + circlePoints[j].x) / 3.0;
      circlePoints[i].y = (circlePoints[h].y + circlePoints[i].y + circlePoints[j].y) / 3.0;

      noStroke()
      fill(0)
      textAlign(CENTER, CENTER)
      let dir = createVector(circlePoints[i].x, circlePoints[i].y).normalize()

      if (i % 2 == 0) {
        text(i, circlePoints[i].x + dir.x * padd, circlePoints[i].y + dir.y * padd)
      }


      noFill();
      stroke(0);
      strokeWeight(1)
      line(circlePoints[i].x, circlePoints[i].y, circlePoints[i].x - dir.x * padd, circlePoints[i].y - dir.y * padd)
    }

    strokeWeight(2)
    vertex(circlePoints[i].x, circlePoints[i].y);

  }
  noFill();
  stroke(0);
  endShape(CLOSE);
}