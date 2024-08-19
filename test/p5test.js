import { emotionDetection } from "../components/P5_puppeteer-p5-ml5/runP5puppeteer.js";

//we need to pass the definitiv path of the vidoe to the function here.
let test = await emotionDetection(
  "C:/Users/nm/Desktop/Museumsnacht/filewatcher/outbox/etjw0ahhjw70207pa7oantj.mp4"
);

console.log("this is the emotion we deteced", test);
