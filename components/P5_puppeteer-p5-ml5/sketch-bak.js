let capture;
let captureWidth = 640;
let captureHeight = 480;
let directory = "1723123845.mp4";

let emotions = [
  "neutral",
  "happy",
  "sad",
  "angry",
  "fearful",
  "disgusted",
  "surprised",
];
let emotionCounters = {
  neutral: 0,
  happy: 0,
  sad: 0,
  angry: 0,
  fearful: 0,
  disgusted: 0,
  surprised: 0,
};

let faceapi;
let detections = [];
let playButton;

function setup() {
  createCanvas(captureWidth, captureHeight);

  // Create a button to start the video
  playButton = createButton("Start Video");
  playButton.id("playButton");
  playButton.position(10, captureHeight + 10);
  playButton.mousePressed(startVideo);

  // Load the video
  capture = createVideo(directory, videoLoaded);
  capture.size(captureWidth, captureHeight);
  capture.hide();

  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: false,
  };
  faceapi = ml5.faceApi(capture, faceOptions, faceReady);
}

function startVideo() {
  getAudioContext().resume(); // Resume the audio context for sound
  playButton.hide(); // Hide the button after clicking
  capture.play(); // Start the video (only once)
  capture.volume(1); // Set volume to 1
}

function videoLoaded() {
  console.log("Video loaded");
}

function faceReady() {
  console.log("Face API is ready");
  faceapi.detect(gotFaces); // Start detecting faces
}

function gotFaces(error, result) {
  if (error) {
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
  faceapi.detect(gotFaces); // Continue detecting
  //console.log("try to detect faces!");
}

function draw() {
  background(0);
  image(capture, 0, 0, captureWidth, captureHeight); // Display the video

  // Draw the detections and emotions
  if (detections.length > 0) {
    for (let i = 0; i < detections.length; i++) {
      let points = detections[i].landmarks.positions;

      for (let j = 0; j < points.length; j++) {
        fill(0, 255, 0);
        circle(points[j]._x, points[j]._y, 5);
      }

      for (let k = 0; k < emotions.length; k++) {
        let thisEmotion = emotions[k];
        let thisEmotionLevel = detections[i].expressions[thisEmotion];
        fill(255);
        text(
          thisEmotion + " value: " + thisEmotionLevel.toFixed(2),
          40,
          30 + 30 * k
        );
        rect(40, 30 + 30 * k, thisEmotionLevel * 100, 10);
      }
    }
  }
}
