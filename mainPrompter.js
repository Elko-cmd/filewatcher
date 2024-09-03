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
  let randomName = Math.random().toString(36).substring(2, 15);
  console.log("Start eval switchcase :", list[t.folder]);
  t.path = t.path.replace(/\\/g, "/").replace(/\/\//g, "/");
  console.log("Start eval switchcase :", t.path, typeof t.path);
  // Convert video
  let a = await videoConverter(t.path, outbox, t.folder, ".mp4")
    .then((a) =>
      console.log("-> ////////////////////////////the converted file is: ", a)
    ).then((a) => {
      console.log(a, "a");
      workflow[3].inputs.text = MuseumslistPrompts[t.folder];
      workflow[105].inputs.video = a;
      workflow[104].inputs.filename_prefix =
        "ki_" + randomName + list[t.folder];
      workflow[7].inputs.steps = comfyUIRenderSteps;
      workflow[123].inputs.output_path = `C:/Users/SyncthingServiceAcct/Sync/outbox/IVG_KI_Museumsnacht_${randomName}_${
        list[t.folder]
      }`;
      console.log(workflow, "b");
      // Add the converted video to the queue
    }).then(async (a) => {
      let b = await queuePrompt(
        workflower,
        comfyUiServerAddresse,
        a,
        MuseumslistPrompts[t.folder],
        "okle"
      ).catch(console.error);

      return {
        success: true,
        message: b,
      };
    });
  //set
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
