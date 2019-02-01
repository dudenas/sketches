import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class photoCut extends PApplet {

int[] clrs;
int minDiamX, maxDiamX;
int minDiamY, maxDiamY;

PImage art_img, src;
int w, h;

public void setupVariables() {
  clrs = new int[3]; 
  clrs[0] = color(250, 250, 250);
  clrs[1] = color(5, 5, 5);
  clrs[2] = color(80, 0, 250);

  if (args != null && PApplet.parseInt(args[0]) != -1) {
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

public void settings() {
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

public void setup() {
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

public void draw() {
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
public PImage imageConveyor(PImage img, int stage, int maxStage, int minDiamX, int maxDiamX, int minDiamY, int maxDiamY) {
  boolean horizontal = false;
  if (random(1) > 0.5f) horizontal = true;
  int diamX = floor(random(minDiamX, maxDiamX));
  int diamY = floor(random(minDiamY, maxDiamY));
  if (stage < maxStage) return imageConveyor(nextImage(img, diamX, diamY, horizontal), stage += 1, maxStage, minDiamX, maxDiamX, minDiamY, maxDiamY);
  else return nextImage(img, diamX, diamY, horizontal);
}

public PImage nextImage(PImage img, int diamX, int diamY, boolean horizontal) {
  PImage newImg = new PImage(width, height);
  img.loadPixels();
  newImg.loadPixels();
  int startY = 0;
  int startX = 0;
  for (int i = 0; i < img.width; i += 1) {
    for (int j = 0; j < img.height; j += 1) {
      int indexA = i + j * img.width;
      int indexB = i + j * img.width;      
      if (j > startY && j < startY + diamY && (horizontal|| random(1) > 0.05f)) {
        indexB = i + floor(map(j, startY, startY+diamY, startY+diamY, startY))* img.width ;
      }
      if (i > startX && i < startX + diamX && (!horizontal)) {
        indexB = floor(map(i, startX, startX+diamX, startX+diamX, startX)) + j * img.width;
      }

      newImg.pixels[indexA] = img.pixels[indexB];
      if (j % (diamY + startY) == 0 && j != 0 && j < img.height - diamY * 2 && horizontal) {
        startY += diamY * 2;
      }

      if (i % (diamX + startX) == 0 && i != 0 && i < img.width - diamX * 2 && !horizontal) {
        startX += diamX * 2;
      }
    }
  } 
  newImg.updatePixels();
  img.updatePixels();
  return newImg;
}
public void saveImage() {
  println("saving...");
  if (args != null && args[2] != "undefined") {
    save("img/" + "output" + PApplet.parseInt(args[2]) + ".png");
  } else {
    save("img/" + "output" + ".png");
  }
  println("saved");
}
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "photoCut" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
