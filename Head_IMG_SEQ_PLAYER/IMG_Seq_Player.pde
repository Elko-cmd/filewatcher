import java.io.File;

// locationlist
String[] locationList = {"KUBAtour", "Landesmuseum", "Grimmwelt", "Sepulkral Museum", "Hafenstraße", "Fridericianum", "WH22"};

//path to the folder that contains the videos
String directoryPath = "/Users/elko/Downloads/forElk/IVG_001/";

//turning above path into a usable variable
File dir = new File(directoryPath);
int dirItemCount;




joelClass[] joel01 = new joelClass[9];

void setup(){
  size(426*3, 266*3);
  fullScreen();
  background(0);
  frameRate(60);
  
  String[] names = dir.list();
  //sorting the files so that newest files with higher timestamp are at the top
  names = sort(names);
  names = reverse(names);
  dirItemCount = names.length;
  
  int videoWidth = round(width/3);
  int videoHeight = round(height/3);
  
  for (int x = 0; x < 9; x++){
    File imgDir = new File(directoryPath + "/" + names[x]);
    String[] imgList = imgDir.list();
    imgList = sort(imgList);
   // imgList = reverse(imgList);
   String location = checkLocation(names[x]);
    joel01[x] = new joelClass(imgList, videoWidth, videoHeight, x%3, int(x/3), (directoryPath + "/" + names[x]), location );
  }
}

void draw(){
  checkFolder();
  for (int x = 0; x < 9; x++){
    joel01[x].update();
  }
  
}

// checking the folder for change
void checkFolder() {
    String[] names = dir.list();
    if (names.length != dirItemCount){
      //sorting the files so that newest files with higher timestamp are at the top
      names = sort(names);
      names = reverse(names);
      dirItemCount = names.length;
      for (int x=0; x<9; x++){
         File imgDir = new File(directoryPath + "/" + names[x]);
         String[] imgList = imgDir.list();
         imgList = sort(imgList);
         String location = checkLocation(names[x]);
         joel01[x].updateIMGList(imgList, (directoryPath + "/" + names[x]), location);
      }
    } 
}

String checkLocation(String fileName) {
  String passString;
  println("checking location for = " + fileName);
  int locationInt = int(fileName.charAt(fileName.length()-1))-49;
  if (locationInt < 0 || locationInt > 6 ) {
    passString = "unknown location";
  } else {
    passString = locationList[locationInt];
  }
 // println("Location= " + locationList[locationInt]);
  return(passString);
}
