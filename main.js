// This is the main file for the Museumsnacht project. It is used to start the application. It contains all the necessary code to run the application.
//Todo: Add comments and code

import { watchAndFire as fileWatcher } from "./components/filewatcher/filewatcher.js";
import { videoConverter } from "./components/video_changer/vc.js";
import { queuePrompt } from "./components/prompter/prompter.js";

import {
  comfyUiServerAddresse,
  inbox,
  outbox,
  promptText,
  workflow,
} from "./config";

let text =
  "destiny, gadget, underwater, lovestory, animals, photrealistic, computer ";
let convertedFilePath = "outbox/1489788235.mp4";

let h264FilePath = fileWatcher(
  inbox,
  () => {
    console.log("testing");
  },
  true
);

console.log(h264FilePath);
