var videos = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  let videoWidth = windowWidth / 3;
  let videoHeight = windowHeight / 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = i * videoWidth;
      let y = j * videoHeight;
      let video = createVideo("../P5_puppeteer-p5-ml5/esempio.mp4");
      video.position(x, y);
      video.size(videoWidth, videoHeight);
      video.loop();
      video.speed(100);
      video.play();
      videos.push(video);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  let videoWidth = windowWidth / 3;
  let videoHeight = windowHeight / 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = i * videoWidth;
      let y = j * videoHeight;
      videos[i * 3 + j].position(x, y);
      videos[i * 3 + j].size(videoWidth, videoHeight);
    }
  }
}

