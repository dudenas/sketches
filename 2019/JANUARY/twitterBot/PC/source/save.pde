void saveImage() {
  println("saving...");
  if (args != null && args[2] != "undefined") {
    save("img/" + "output" + int(args[2]) + ".png");
  } else {
    save("img/" + "output" + ".png");
  }
  println("saved");
}
