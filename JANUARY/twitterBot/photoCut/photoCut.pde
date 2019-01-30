color[] clrs;
int minDiam, maxDiam;

PImage art_img, src;
int w, h;

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

  // resizes the image to the canvas and pushes it to the middle
  if (src.width > src.height) {
    src.resize(0, height);
    int x = (src.width - width)/2;
    int y = 0;
    src.copy(x, y, width, height, 0, 0, width, height);
  } else {
    src.resize(width, 0);
    int x = 0;
    int y = (src.height - height)/2;
    src.copy(x, y, width, height, 0, 0, width, height);
  }
}

void settings() {
  if (args != null && args[1] != null) {
    w = 851;
    h = 315;
  } else {
    w = 800;
    h = 800;
  }
  size(w, h);
  pixelDensity(2);
}

void setup() {
  setupVariables();
  int stages = floor(random(2, 100));
  minDiam = floor(random(1, width));
  maxDiam = floor(random(minDiam, width*2));

  // create temp Image which would be the size of the canvas
  PImage temp = new PImage(width, height);
  temp.copy(src, 0, 0, width, height, 0, 0, width, height);
  art_img = imageConveyor(temp, 0, stages, minDiam, maxDiam);
  println("stages — " + stages, " | min — " + minDiam, " | max — " + maxDiam);
}

void draw() {
  background(clrs[0]);
  image(src, 0, 0, src.width, src.height);
  image(art_img, 0, 0, width, height);
  filter(GRAY);
  saveImage();
  noLoop();
  exit();
}
