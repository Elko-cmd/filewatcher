let capture;
let captureWidth = 640;    
let captureHeight = 480;
let directory = "esempio.mp4"; // Ensure this file is in the correct directory

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
  createCanvas(captureWidth, captureHeight);
  
  // Load the video instead of the camera
  capture = createVideo(directory, videoLoaded);
  capture.size(captureWidth, captureHeight);
  capture.hide();
  
  const faceOptions = { withLandmarks: true, withExpressions: true, withDescriptors: false };
  faceapi = ml5.faceApi(capture, faceOptions, faceReady);
  
  capture.onended(videoEnded); // Add event listener for video end
}

function videoLoaded() {
  logToServer("Video loaded successfully.");
  capture.loop(); // Loop the video
  capture.noLoop();
  capture.volume(0); // Mute the video
}

function videoEnded() {
  // Calculate and print the most prevalent emotion
  let mostPrevalentEmotion = getMostPrevalentEmotion();
  logToServer("Most prevalent emotion: " + mostPrevalentEmotion);
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

function faceReady() {
  logToServer("Face API is ready.");
  faceapi.detect(gotFaces);
}

function gotFaces(error, result) {
  if (error) {
    logToServer("Face API error: " + error);
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

function logToServer(message) {
  // Send log messages to the server
  fetch('/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  })
  .then(response => {
    if (!response.ok) {
      console.error('Failed to log message to server:', response.statusText);
    }
  })
  .catch(error => {
    console.error('Error sending log to server:', error);
  });
}

function draw() {
  background(0);
  
  image(capture, 0, 0, captureWidth, captureHeight); // Display the video
  
  push();
  fill('green');
  if (detections.length > 0) {
    for (let i = 0; i < detections.length; i++) {
      let points = detections[i].landmarks.positions;

      for (let j = 0; j < points.length; j++) {
        circle(points[j]._x, points[j]._y, 5);
      }
      
      for (let k = 0; k < emotions.length; k++) {
        let thisEmotion = emotions[k];
        let thisEmotionLevel = detections[i].expressions[thisEmotion];
        
        text(thisEmotion + " value: " + thisEmotionLevel.toFixed(2), 40, 30 + 30 * k);
        rect(40, 30 + 30 * k, thisEmotionLevel * 100, 10);
      }  
    }
  }
  pop();
}
