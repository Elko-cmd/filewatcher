class joelClass {
  
  String[] myIMGLinst;
  int myWidth;
  int myHeight;
  int myLocX;
  int myLocY;
  int myCounter;
  PImage MyImg;
  String myDirPath;
  String myLocation;
  
  joelClass(String[] passName, int passW, int passH, int passX, int passY, String passPath, String location) {
    myIMGLinst = passName;
    myWidth = passW;
    myHeight = passH;
    myLocX = passX;
    myLocY = passY;
    myDirPath = passPath;
    myCounter = 0;
    myLocation = location;
    
    
    println("myX = " + myLocX);
    println("myY = " + myLocY);
    println("myIngList =" + myIMGLinst[0]);
  }
  
  void update(){
    MyImg = null;
    if (myCounter < myIMGLinst.length) {
      MyImg = loadImage(myDirPath + "/" + myIMGLinst[myCounter]);
      if (MyImg != null) {
        image(MyImg, myLocX*myWidth, myLocY*myHeight, myWidth, myHeight);
        textSize(48);
        text(myLocation, myLocX*myWidth, myLocY*myHeight+36);
      }
      myCounter=myCounter +2;
    } else {
      myCounter = 0;
    }
  }
  
  void updateIMGList(String[] passName, String passPath, String passLocation) {
    myIMGLinst = passName;
    myDirPath = passPath;
    myLocation = passLocation;
    myCounter = 0;
  }
  
  
}
