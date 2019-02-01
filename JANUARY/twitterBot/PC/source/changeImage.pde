PImage imageConveyor(PImage img, int stage, int maxStage, int minDiamX, int maxDiamX, int minDiamY, int maxDiamY) {
  boolean horizontal = false;
  if (random(1) > 0.5) horizontal = true;
  int diamX = floor(random(minDiamX, maxDiamX));
  int diamY = floor(random(minDiamY, maxDiamY));
  if (stage < maxStage) return imageConveyor(nextImage(img, diamX, diamY, horizontal), stage += 1, maxStage, minDiamX, maxDiamX, minDiamY, maxDiamY);
  else return nextImage(img, diamX, diamY, horizontal);
}

PImage nextImage(PImage img, int diamX, int diamY, boolean horizontal) {
  PImage newImg = new PImage(width, height);
  img.loadPixels();
  newImg.loadPixels();
  int startY = 0;
  int startX = 0;
  for (int i = 0; i < img.width; i += 1) {
    for (int j = 0; j < img.height; j += 1) {
      int indexA = i + j * img.width;
      int indexB = i + j * img.width;      
      if (j > startY && j < startY + diamY && (horizontal|| random(1) > 0.05)) {
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
