import {
  watchAndMoveMp4Files,
  watchInboxAndChildDirectories,
} from "../../components/filewatcher/filewatcher.js";
import { videoConverter } from "../../components/video_changer/videoconverter/vc.js";
import {
  workflow,
  comfyUiServerAddresse,
  outboxComfyui,
  promptText,
  MuseumslistPrompts,
  outboxSync,
  inboxSync,
} from "../../config.js";
import { queuePrompt } from "../../components/prompter/prompter.js";
let inbox = inboxSync;
let outbox = "C:/Users/nm/Desktop/Museumsnacht/filewatcher";

let workflower = workflow;
let t1,
  t2,
  t3 = null;
const date = new Date(Date.now());

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function evaluateSwitch(t) {
  //List to add numbers to the video name
  let list = {
    "ivg-1": "_001",
    "ivg-2": "_002",
    "ivg-3": "_003",
    "ivg-4": "_004",
    "ivg-5": "_005",
    "ivg-6": "_006",
    "ivg-7": "_007",
    "ivg-8": "_008",
    "ivg-9": "_009",
    "ivg-10": "_010",
  };
  console.log("Start eval switchcase :", list[t.folder]);
  t.path = t.path.replace(/\\/g, "/").replace(/\/\//g, "/");
  console.log("Start eval switchcase :", t.path, typeof t.path);
  // Convert video
  let a = await videoConverter(t.path, outbox, t.folder, ".mp4").then((a) =>
    console.log("-> ////////////////////////////the converted file is: ", a)
  );
  // Add the converted video to the queue
  workflow[3].inputs.text = MuseumslistPrompts[t.folder];
  workflow[104].inputs.filename_prefix =
    "ki_" + Math.random().toString(36).substring(2, 15) + list[t.folder];
  workflow[7].inputs.steps = 2;
  let b = await queuePrompt(
    workflower,
    comfyUiServerAddresse,
    a,
    MuseumslistPrompts[t.folder],
    "okle"
  ).catch(console.error);

  return {
    success: true,
  };
}

let t0 = async () => {
  while (true) {
    let t = await watchInboxAndChildDirectories(inbox);
    if (t) {
      switch (t.folder) {
        case "ivg-1":
          await evaluateSwitch(t);
          break;
        case "ivg-2":
          await evaluateSwitch(t);
          break;
        case "ivg-3":
          await evaluateSwitch(t);
          break;
        case "ivg-4":
          await evaluateSwitch(t);
          break;
        case "ivg-5":
          await evaluateSwitch(t);
          break;
        case "ivg-6":
          await evaluateSwitch(t);
          break;
        case "ivg-7":
          await evaluateSwitch(t);
          break;
        case "ivg-8":
          await evaluateSwitch(t);
          break;
        case "ivg-9":
          await evaluateSwitch(t);
          break;
        case "ivg-10":
          await evaluateSwitch(t);
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

// switch (t.folder) {
//   case "ivg-1":
//     await evaluateSwitch(t);
//     break;

//   case "ivg-2":
//     console.log("ivg-2");
//     t1 = await videoConverter(t.path, outbox, t.folder, ".mp4").catch(
//       console.error
//     );
//     //TODO: add the specific prompt for the Museums here.
//     workflow[3].inputs.text = MuseumslistPrompts["ivg-2"];
//     t2 = await queuePrompt(
//       workflow,
//       comfyUiServerAddresse,
//       t1,
//       MuseumslistPrompts["ivg-2"]
//     ).catch(console.error);
//     t3 = await watchAndMoveMp4Files(outboxComfyui, outboxSync, t.folder).catch(
//       console.error
//     );

//     break;

//   case "ivg-3":
//     console.log("ivg-3");
//     t1 = await videoConverter(t.path, outbox, t.folder, ".mp4").catch(
//       console.error
//     );
//     //TODO: add the specific prompt for the Museums here.
//     workflow[3].inputs.text = MuseumslistPrompts["ivg-3"];
//     t2 = await queuePrompt(
//       workflow,
//       comfyUiServerAddresse,
//       t1,
//       MuseumslistPrompts["ivg-3"]
//     ).catch(console.error);
//     t3 = await watchAndMoveMp4Files(outboxComfyui, outboxSync, t.folder).catch(
//       console.error
//     );

//     break;

//   case "ivg-4":
//     console.log("ivg-4");
//     t1 = await videoConverter(t.path, outbox, t.folder, ".mp4").catch(
//       console.error
//     );
//     //TODO: add the specific prompt for the Museums here.
//     workflow[3].inputs.text = MuseumslistPrompts["ivg-4"];
//     t2 = await queuePrompt(
//       workflow,
//       comfyUiServerAddresse,
//       t1,
//       MuseumslistPrompts["ivg-4"]
//     ).catch(console.error);
//     t3 = await watchAndMoveMp4Files(outboxComfyui, outboxSync, t.folder).catch(
//       console.error
//     );

//     break;

//   case "ivg-5":
//     console.log("ivg-5");
//     t1 = await videoConverter(t.path, outbox, t.folder, ".mp4").catch(
//       console.error
//     );
//     //TODO: add the specific prompt for the Museums here.
//     workflow[3].inputs.text = MuseumslistPrompts["ivg-5"];
//     t2 = await queuePrompt(
//       workflow,
//       comfyUiServerAddresse,
//       t1,
//       MuseumslistPrompts["ivg-5"]
//     ).catch(console.error);
//     t3 = await watchAndMoveMp4Files(outboxComfyui, outboxSync, t.folder).catch(
//       console.error
//     );

//     break;

//   case "ivg-6":
//     console.log("ivg-6");
//     t1 = await videoConverter(t.path, outbox, t.folder, ".mp4").catch(
//       console.error
//     );
//     //TODO: add the specific prompt for the Museums here.
//     workflow[3].inputs.text = MuseumslistPrompts["ivg-6"];
//     t2 = await queuePrompt(
//       workflow,
//       comfyUiServerAddresse,
//       t1,
//       MuseumslistPrompts["ivg-6"]
//     ).catch(console.error);
//     t3 = await watchAndMoveMp4Files(outboxComfyui, outboxSync, t.folder).catch(
//       console.error
//     );

//     break;

//   case "ivg-7":
//     console.log("ivg-7");
//     t1 = await videoConverter(t.path, outbox, t.folder, ".mp4").catch(
//       console.error
//     );
//     //TODO: add the specific prompt for the Museums here.
//     workflow[3].inputs.text = MuseumslistPrompts["ivg-7"];
//     t2 = await queuePrompt(
//       workflow,
//       comfyUiServerAddresse,
//       t1,
//       MuseumslistPrompts["ivg-7"]
//     ).catch(console.error);
//     t3 = await watchAndMoveMp4Files(outboxComfyui, outboxSync, t.folder).catch(
//       console.error
//     );

//     break;

//   case "ivg-8":
//     console.log("ivg-8");
//     t1 = await videoConverter(t.path, outbox, t.folder, ".mp4").catch(
//       console.error
//     );
//     //TODO: add the specific prompt for the Museums here.
//     workflow[3].inputs.text = MuseumslistPrompts["ivg-8"];
//     t2 = await queuePrompt(
//       workflow,
//       comfyUiServerAddresse,
//       t1,
//       MuseumslistPrompts["ivg-8"]
//     ).catch(console.error);
//     t3 = await watchAndMoveMp4Files(outboxComfyui, outboxSync, t.folder).catch(
//       console.error
//     );

//     break;

//   case "ivg-9":
//     console.log("ivg-9");

//     break;

//   case "ivg-10":
//     console.log("ivg-10");

//     break;

//   default:
//     break;
// }
