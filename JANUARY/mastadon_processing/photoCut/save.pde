//————————————————SAVE————————————————
void keyPressed() {
  //if (key == 's') saveImage();
  //if (key == 'n') {
  //  newCut();
    
  //  loop();
  //}
}
void saveImage() {
  String timestamp = year() + nf(month(), 2) + nf(day(), 2) + nf(minute(), 2) + nf(second(), 2);
  saveFrame("img/" + timestamp + ".png");
}
