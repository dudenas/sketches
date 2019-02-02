color[] clrs;
int minDiamX, maxDiamX;
int minDiamY, maxDiamY;

PImage art_img, src;
int w, h;

void setupVariables() {
  clrs = new color[3]; 
  clrs[0] = color(250, 250, 250);
  clrs[1] = color(5, 5, 5);
  clrs[2] = color(80, 0, 250);

  if (args != null && int(args[0]) != -1) {
    String url = args[0];
    src = loadImage(url, "png");
  } else {
    src = loadImage("img.jpg");
  }

  // resizes the image to the canvas and pushes it to the middle
  src.resize(width, 0);
  if (src.height < height) {
    src.resize(0, height);
    int x = (src.width - width)/2;
    int y = 0;
    src.copy(x, y, width, height, 0, 0, width, height);
  } else {
    int x = 0;
    int y = (src.height - height)/2;
    src.copy(x, y, width, height, 0, 0, width, height);
  }
  //println(src.width, src.height);
}

void settings() {
  println("started processing");
  if (args != null) {
    if (args[1].equals("fb")) {
      w = 851;
      h = 315;
    } else if (args[1].equals("twitter")) {
      w = 1500;
      h = 500;
    } else {
      w = 1024;
      h = 1024;
    }
  } else {
    w = 1024;
    h = 1024;
  }
  size(w, h);
  println("got the size");
}

void setup() {
  setupVariables();
  int stages = floor(random(10, 50));
  minDiamX = floor(random(1, width-1));
  maxDiamX = floor(random(minDiamX, width));
  minDiamY = floor(random(1, height-1));
  maxDiamY = floor(random(minDiamY, height));

  // create temp Image which would be the size of the canvas
  PImage temp = new PImage(width, height);
  temp.copy(src, 0, 0, width, height, 0, 0, width, height);
  println("stages — " + stages, " | min — " + minDiamX, " | max — " + maxDiamX);
  art_img = imageConveyor(temp, 0, stages, minDiamX, maxDiamX, minDiamY, maxDiamY);
  noLoop();
}

void draw() {
  background(clrs[0]);
  //image(src, 0, 0, src.width, src.height);

  //image(src, 0, 0, src.width, src.height);

  //image(src, 0, 0, src.width, src.height);
  //filter(BLUR,4);
  //blendMode(ADD);
  //image(art_img, 0, 0, width, height);


  image(art_img, 0, 0, width, height);
  filter(BLUR, 4);
  blendMode(ADD);
  image(src, 0, 0, src.width, src.height);
  filter(BLUR, 4);
  blendMode(DIFFERENCE);
  image(art_img, 0, 0, width, height);
  filter(BLUR, 12);
  blendMode(MULTIPLY);
  image(art_img, 0, 0, width, height);
  blendMode(SCREEN);
  image(art_img, 0, 0, width, height);
  blendMode(ADD);
  filter(2);
  tint(255, 25);
  image(art_img, 0, 0, width, height);


  //image(art_img, 0, 0, width, height);
  saveImage();
  exit();
}
