PImage imageConveyor(PImage img, int stage, int maxStage, int minDiam, int maxDiam) {
  boolean horizontal = false;
  if (random(1) > 0.5) horizontal = true;
  int diam = floor(random(minDiam, maxDiam));
  if (stage < maxStage) return imageConveyor(nextImage(img, diam, horizontal), stage += 1, maxStage, minDiam, maxDiam);
  else return nextImage(img, diam, horizontal);
}

PImage nextImage(PImage img, int diam, boolean horizontal) {
  PImage newImg = new PImage(width, height);
  img.loadPixels();
  newImg.loadPixels();
  int startY = 0;
  int startX = 0;
  for (int i = 0; i < width; i += 1) {
    for (int j = 0; j < height; j += 1) {
      int indexA = i + j * img.width;
      int indexB = i + j * img.width;
      if (j >= startY && j < startY + diam && horizontal) {
        indexB = i + floor(map(j, startY, startY+diam, startY+diam, startY)) * img.width;
      }
      if (i > startX && i < startX + diam && !horizontal) {
        indexB = floor(map(i, startX, startX+diam, startX+diam, startX)) + j * img.width;
      }

      newImg.pixels[indexA] = img.pixels[indexB];
      if (j % (diam + startY) == 0 && j != 0 && j < height - diam * 2 && horizontal) {
        startY += diam * 2;
      }

      if (i % (diam + startX) == 0 && i != 0 && i < width - diam * 2 && !horizontal) {
        startX += diam * 2;
      }
    }
  } 
  newImg.updatePixels();
  img.updatePixels();
  return newImg;
}

void newCut(int stages) {
  //int stages = floor(random(2, 100));
  minDiam = floor(random(1, width/2));
  maxDiam = floor(random(minDiam, width));
  println("stages — " + stages, " | min — " + minDiam, " | max — " + maxDiam);
  img = imageConveyor(src, 0, stages, minDiam, maxDiam);
}
