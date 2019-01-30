color[] clrs;
int minDiam, maxDiam;

PImage img, src;

void setupVariables() {
  clrs = new color[3]; 
  clrs[0] = color(250, 250, 250);
  clrs[1] = color(5, 5, 5);
  clrs[2] = color(80, 0, 250);

  minDiam = 200;
  maxDiam = width;

  if (args != null) {
    String url = args[0];
    src = loadImage(url, "png");
    if (src.width > src.height) {
      src.resize(0, width);
    }
  } else {
    src = loadImage("img.jpg");
  }

  if (src.width > src.height) {
    src.resize(0, height);
  } else {
    src.resize(width, 0);
  }
}

void setup() {
  size(800, 800);
  setupVariables();
  int stages = floor(random(2, 100));
  minDiam = floor(random(1, width));
  maxDiam = floor(random(minDiam, width*2));
  img = imageConveyor(src, 0, stages, minDiam, maxDiam);
  println("stages — " + stages, " | min — " + minDiam, " | max — " + maxDiam);
}

void draw() {
  background(clrs[0]);
  image(img, 0, 0, width, height);
  saveImage();
  noLoop();
  exit();
}
