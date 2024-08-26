import java.io.File;
import processing.video.*;

//path to the folder that contains the videos
String directoryPath = "/home/joel/IVG_001";

//turning above path into a usable variable
File dir = new File(directoryPath);
int dirItemCount;

// initiating an Array of 9 Movies
Movie[] movies = new Movie[9];
// the speed at which the videos should playback
float playbackSpeed = 1.5;
int videoWidth;
int videoHeight;

int checkTimeInSeconds = 10;
int timeNow ;



void setup() {
  //small window for testing
  size(426*3, 266*3, P2D);
  background(0);
  videoWidth = round(width/3);
  videoHeight = round(height/3);
  
  String[] names = dir.list();
  dirItemCount = names.length;
 
  loadVideoGrid(names);
  timeNow = millis();
  
}

void loadVideoGrid(String[] videoList){
  
  for( int x=0; x<9; x++){
     String moviePath = directoryPath + "/" + videoList[x];
     
     
     // Load and play the video in a loop 
     movies[x] = new Movie(this, moviePath);
     movies[x].speed(playbackSpeed);
     movies[x].loop();
    
  }
  
}

//void movieEvent(Movie m) {
//  m.read();
//}

void checkTime() {
  int m = millis();
  if (m > (timeNow + (checkTimeInSeconds*1000))){
    timeNow = millis();
    String[] names = dir.list();
    if (names.length > dirItemCount){
      for (int x=0; x<9; x++){
         if (movies[x].available() == true) {
          movies[x].stop();
        }
      }
      loadVideoGrid(names);
      dirItemCount = names.length;
    } else {
      println("nothing to load");
    }
  }

}

void draw() {
  checkTime();
  
  int counter = 0;
  for( int x=0; x<3; x++){
    for (int y=0; y<3; y++) {
      if (movies[counter].available() == true) {
        movies[counter].read(); 
      }
      image(movies[counter], x*videoWidth, y*videoHeight, videoWidth, videoHeight);
      counter++;
    }
  }
}
