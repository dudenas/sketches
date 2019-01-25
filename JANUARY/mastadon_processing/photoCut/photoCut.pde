color[] clrs;
int minDiam, maxDiam;

PImage img, src;

void setupVariables() {
  clrs = new color[3]; 
  clrs[0] = color(250, 250, 250);
  clrs[1] = color(5, 5, 5);
  clrs[2] = color(80, 0, 250);

  minDiam = 10;
  maxDiam = 200;

  src = loadImage("img.png");
}

void setup() {
  size(800, 800);
  setupVariables();
  img = src;
  if (args != null) {
    int stages = int(args[0]);
    newCut(stages);
  }
}

void draw() {
  background(clrs[0]);
  image(img, 0, 0, width, height);
  //saveImage();
  save("img/output.png");
  exit();
  noLoop();
}
