import { videoConverter } from "../../video_changer/vc.js";
import * as emotion_recognition from "./emotion_recognition/sketch.js";
import { prompterQueue } from "./prompter/prompter.js";
import { comfyUiServerAddresse, inbox, outbox } from "../../../config.js";
const fs = require("fs");

let fileURL = "../../outbox/1489788235.mp4";

let fileUrlFromFileWatcher;

let workflow = require("./workflows/workflow_api (3).json");

let promptText =
  "destiny, gadget, underwater, lovestory, animals, photrealistic, computer ";

let mainPlumbingFunction = async (
  fileUrlFromFileWatcher,
  outbox = "../video_changer/out"
) => {
  // Initialize variables to hold the file URL and the prompt
  let fileUrlFromVideoConverter;
  let promptResult;
  try {
    // Try to convert the file to mp4 and get the new file URL
    fileUrlFromVideoConverter = await videoConverter(
      fileUrlFromFileWatcher,
      outbox,
      ".mp4"
    );

    //! Emotion recognition needs to bee implemented here.

    // If the conversion is successful, proceed to prompt the ComfyUi
    // with the new file URL
    promptResult = await prompterQueue(
      fileUrlFromVideoConverter,
      promptText,
      workflow,
      comfyUiServerAddresse
    );

    // If everything is successful, return an object indicating the status and message
    return { status: 200, message: "Done", file: promptResult };
  } catch (error) {
    // If there is an error, log the error and return an object indicating the status and message
    console.error("Error:", error);
    return { status: 500, message: "Error" };
  }
};
