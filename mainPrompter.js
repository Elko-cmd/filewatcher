/**
 * This script watches the inbox for new files and starts the video conversion 
 * and comfy ui prompt process for each file it finds. It will log the folder 
 * name to the console and the path of the converted and prompted video file.
 * The script will also log any errors that occur during the process.
 
 * @author Elko Braas
 * @date 2024-08-31
 */
import { watchInboxAndChildDirectories } from "./components/filewatcher/filewatcher.js";
import { videoConverter } from "./components/video_changer/videoconverter/vc.js";
import {
  workflow,
  comfyUiServerAddresse,
  MuseumslistPrompts,
  inboxSync,
  vcOutput,
  comfyUIRenderSteps,
  list,
  outboxSync,
} from "./config.js";

import { queuePrompt } from "./components/prompter/prompter.js";

let inbox = inboxSync;
let outbox = vcOutput;

let workflower = workflow;
const date = new Date(Date.now());

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function evaluateSwitch(t) {
  // Generate a random name to ensure unique filename prefixes
  const randomName = Math.random().toString(36).substring(2, 15);

  // Normalize the path by replacing backslashes with forward slashes
  t.path = t.path.replace(/\\/g, "/").replace(/\/\//g, "/");
  console.log(`Start eval switchcase: ${list[t.folder]} at path: ${t.path}`);

  try {
    // Convert the video to the desired format
    const convertedFile = await videoConverter(t.path, outbox, t.folder, ".mp4");
    console.log("Converted file path:", convertedFile);

    // Configure the workflow with the converted video and other parameters
    configureWorkflow(randomName, convertedFile, t.folder);

    // Queue the prompt and wait for the result
    const queueResult = await queuePrompt(
      workflower,
      comfyUiServerAddresse,
      convertedFile,
      MuseumslistPrompts[t.folder],
      "okle"
    );

    // Return the success response with the queue result
    return {
      success: true,
      message: queueResult,
    };
  } catch (error) {
    // Log the error and return a failure response
    console.error("Error during evaluation:", error);
    return {
      success: false,
      message: error.message,
    };
  }
}

// Helper function to configure the workflow with necessary parameters
function configureWorkflow(randomName, convertedFile, folder) {
  // Access workflow steps and inputs, assigning the converted file and other configurations
  workflow[3].inputs.text = MuseumslistPrompts[folder];
  workflow[105].inputs.video = convertedFile;
  workflow[104].inputs.filename_prefix = `ki_${randomName}${list[folder]}`;
  workflow[7].inputs.steps = comfyUIRenderSteps;
  workflow[123].inputs.output_path = `C:/Users/SyncthingServiceAcct/Sync/outbox/IVG_KI_Museumsnacht_${randomName}_${list[folder]}`;
  
  // Log the configured workflow for debugging purposes
  console.log("Configured workflow:", JSON.stringify(workflow, null, 2));
}


let t0 = async () => {
  while (true) {
    let t = await watchInboxAndChildDirectories(inbox);
    if (t) {
      switch (t.folder) {
        case "ivg-1":
          await evaluateSwitch(t).then((a) => console.log(a));
          break;
        case "ivg-2":
          await evaluateSwitch(t).then((a) => console.log(a));
          break;
        case "ivg-3":
          await evaluateSwitch(t).then((a) => console.log(a));
          break;
        case "ivg-4":
          await evaluateSwitch(t).then((a) => console.log(a));
          break;
        case "ivg-5":
          await evaluateSwitch(t).then((a) => console.log(a));
          break;
        case "ivg-6":
          await evaluateSwitch(t).then((a) => console.log(a));
          break;
        case "ivg-7":
          await evaluateSwitch(t).then((a) => console.log(a));
          break;
        case "ivg-8":
          await evaluateSwitch(t).then((a) => console.log(a));
          break;
        case "ivg-9":
          await evaluateSwitch(t).then((a) => console.log(a));
          break;
        case "ivg-10":
          await evaluateSwitch(t).then((a) => console.log(a));
          break;
        default:
          break;
      }
    }
  }
};

console.log(
  "Started Programm at " +
    date
      .toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .toLocaleString() +
    ", watching the folder " +
    inbox
);

await t0();
