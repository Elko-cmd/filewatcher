import { emotionDetection } from "../components/P5_puppeteer-p5-ml5/runP5puppeteer.js";

//we need to pass the definitiv path of the vidoe to the function here.
let test = await emotionDetection(
    "/Users/elko/Documents/GitHub/Museumsnacht/IVG-KHK-2024/Filesystemwatcher/components/P5_puppeteer-p5-ml5/esempio.mp4"
);

console.log("this is the emotion we deteced", test);
