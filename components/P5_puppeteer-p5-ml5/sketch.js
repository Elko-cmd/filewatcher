let capture;
let captureWidth = 640;
let captureHeight = 480;
let directory =
  "C:/Users/nm/Desktop/Museumsnacht/filewatcher/outbox/etjw0ahhjw70207pa7oantj.mp4";

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
let isVideoLoaded = false;
let isFaceApiReady = false;

async function preload() {
  document.querySelector("input").addEventListener("input", (event) => {
    directory = event.target.value;
    if (directory.endsWith(".mp4")) {
      s1();
    }
  });
}

async function s1() {
  createCanvas(captureWidth, captureHeight);
  console.log(directory, "from setup");

  // Load the video and set up face API
  capture = await createVideo(directory, videoLoaded);
  capture.size(captureWidth, captureHeight);
  capture.hide();

  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: false,
  };

  try {
    faceapi = await ml5.faceApi(capture, faceOptions, faceReady);
    setTimeout(() => capture.play(), 2000);
    capture.onended(videoEnded); // Handle video end
  } catch (err) {
    console.error("Error initializing faceApi: ", err);
  }
}

function videoLoaded() {
  console.log("Video loaded");
  isVideoLoaded = true;  // Indicate that the video is loaded
  capture.volume(1); // Set volume to 1
}

function faceReady() {
  console.log("Face API is ready");
  isFaceApiReady = true;  // Indicate that Face API is ready
  faceapi.detect(gotFaces); // Start detecting faces
}

function gotFaces(error, result) {
  if (error) {
    console.error("Error detecting faces: ", error);
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
}

function videoEnded() {
  // Calculate and print the most prevalent emotion
  let mostPrevalentEmotion = getMostPrevalentEmotion();
  console.log(mostPrevalentEmotion);
}

function getMostPrevalentEmotion() {
  let maxEmotion = "";
  let maxCount = 0;
  for (let emotion in emotionCounters) {
    if (emotionCounters[emotion] > maxCount) {
      maxCount = emotionCounters[emotion];
      maxEmotion = emotion;
    }
  }
  return maxEmotion;
}

function draw() {
  background(0);

  if (isVideoLoaded && isFaceApiReady) {  // Check if both video and Face API are ready
    image(capture, 0, 0, 640, 480); // Display the video

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
}
