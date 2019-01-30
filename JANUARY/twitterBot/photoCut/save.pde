//————————————————SAVE————————————————
//void keyPressed() {
//  if (key == 's') saveImage();
//  if (key == 'n') {
//    int stages = floor(random(2,100));
//    minDiam = floor(random(1,width));
//    maxDiam = floor(random(minDiam, width*2));
//    img = imageConveyor(src, 0, stages, minDiam, maxDiam);
//    println("stages — " + stages, " | min — " + minDiam, " | max — " + maxDiam);
//    loop();
//  }
//}

void saveImage() {
  String timestamp = year() + nf(month(), 2) + nf(day(), 2) + nf(minute(), 2) + nf(second(), 2);
  //saveFrame("img/" + timestamp + ".png");
  saveFrame("img/" + "output" + ".png");
}
