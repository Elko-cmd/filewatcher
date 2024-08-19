// This is the main file for the Museumsnacht project. It is used to start the application. It contains all the necessary code to run the application.
//Todo: Add comments and code

import { watchAndFire as fileWatcher } from "./components/filewatcher/filewatcher.js";
import { videoConverter } from "./components/video_changer/vc.js";
import { emotionDetection } from "./components/P5_puppeteer-p5-ml5/runP5puppeteer.js";
import { queuePrompt } from "./components/prompter/prompter.js";

import {
  comfyUiServerAddresse,
  inbox,
  outbox,
  promptText,
  workflow,
  folderPath,
} from "./config";

let changedFilePath = "";
let h264FilePath = await fileWatcher(
  inbox,
  async (filePath) => {
    let convertedFilepath = await videoConverter(
      filePath,
      folderPath + "/outbox",
      ".mp4"
    );
    console.log("This is a converted filepath:", convertedFilepath);
    let emotion = await emotionDetection(convertedFilepath);
    console.log(emotion);
  },
  false
);

console.log(h264FilePath);
