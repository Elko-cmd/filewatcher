export let detecedEmotions;
export let fileUrl;


let capture;
let capturewidth = 640;    
let captureheight = 480;
var directory = fileUrl;


let emotions = ["neutral", "happy", "sad", "angry", "fearful", "disgusted", "surprised"];
let emotionCounters = {
  neutral: 0,
  happy: 0,
  sad: 0,
  angry: 0,
  fearful: 0,
  disgusted: 0,
  surprised: 0
};

let faceapi;
let detections = [];

function setup() {
  createCanvas(capturewidth, captureheight);
  
  // Load the video instead of the camera
  capture = createVideo(directory, videoLoaded);
  capture.size(capturewidth, captureheight);
  
  capture.hide();
  
  const faceOptions = {withLandmarks: true, withExpressions: true, withDescriptors: false};
  
  faceapi = ml5.faceApi(capture, faceOptions, faceReady);
  
  capture.onended(videoEnded); // Add event listener for video end
}

function videoLoaded() {
  capture.loop(); // Loop the video
  capture.noLoop();
  capture.volume(0); // Mute the video
}

function videoEnded() {
  // Calculate and print the most prevalent emotion
  let mostPrevalentEmotion = getMostPrevalentEmotion();
  console.log("Most prevalent emotion: " + mostPrevalentEmotion);
  mostPrevalentEmotion = detecedEmotions;
  return mostPrevalentEmotion
}

function getMostPrevalentEmotion() {
  let maxEmotion = '';
  let maxCount = 0;
  for (let emotion in emotionCounters) {
    if (emotionCounters[emotion] > maxCount) {
      maxCount = emotionCounters[emotion];
      maxEmotion = emotion;
    }
  }
  return maxEmotion;
}

function faceReady(){
  faceapi.detect(gotFaces);
}

function gotFaces(error, result){
  if (error){
    console.log(error);
    return;
  }
  detections = result;
  
  // Update emotion counters
  if (detections.length > 0) {
    for (let i = 0; i < detections.length; i++) {
      for (let emotion of emotions) {
        emotionCounters[emotion] += detections[i].expressions[emotion];
      }
    }
  }
  
  faceapi.detect(gotFaces);
}

function draw() {
  background(0);
  
  image(capture, 0, 0, capturewidth, captureheight); // Display the video
  
  push();
  fill('green');
  if (detections.length > 0){
    for (let i = 0; i < detections.length; i++){
      let points = detections[i].landmarks.positions;

      for (let j = 0; j < points.length; j++){
        circle(points[j]._x, points[j]._y, 5);
      }
      
      for (let k = 0; k < emotions.length; k++) {
        let thisemotion = emotions[k];
        let thisemotionlevel = detections[i].expressions[thisemotion];
        
        text(thisemotion + " value: " + thisemotionlevel, 40, 30 + 30 * k);
        rect(40, 30 + 30 * k, thisemotionlevel * 100, 10);
      }  
    }
  }
  pop();
}

