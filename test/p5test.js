import { runSketch } from "../components/P5_puppeteer-p5-ml5/script.js";

//we need to pass the definitiv path of the vidoe to the function here.
let test = await runSketch("/Users/elko/Documents/GitHub/Museumsnacht/IVG-KHK-2024/Filesystemwatcher/components/P5_puppeteer-p5-ml5/1723226863.mp4")

console.log("this is the emotion we deteced", test)