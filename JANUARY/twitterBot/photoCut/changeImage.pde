PImage imageConveyor(PImage img, int stage, int maxStage, int minDiam, int maxDiam) {
  int diam = floor(random(minDiam, maxDiam));
  if (stage < maxStage) return imageConveyor(nextImage(img, diam), stage += 1, maxStage, minDiam, maxDiam);
  else return nextImage(img, diam);
}

PImage nextImage(PImage img, int diam) {
  PImage newImg = new PImage(width, height);
  img.loadPixels();
  newImg.loadPixels();
  int startX = 0;
  for (int i = 0; i < img.width; i ++) { 
    for (int j = 0; j < img.height - 1; j ++) {
      int indexA = i + j * img.width;
      int indexB = i + j * img.width;
      if (i > startX && i < startX + diam) {
        indexB = floor(map(i, startX, startX+diam, startX+diam, startX)) + j * img.width;
      }
      newImg.pixels[indexA] = img.pixels[indexB];
    }
    if (i % (diam + startX) == 0 && i != 0) {
      startX += diam * 2;
    }
  } 
  newImg.updatePixels();
  img.updatePixels();
  return newImg;
}