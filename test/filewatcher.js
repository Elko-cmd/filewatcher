import { watchAndMoveMp4Files, watchInboxAndChildDirectories } from "../components/filewatcher/filewatcher";
import { videoConverter } from "../components/video_changer/videoconverter/vc.js";
import { workflow, comfyUiServerAddresse, outboxComfyui, promptText, inbox, outbox } from "../config.js"
import { queuePrompt } from "../components/prompter/prompter.js"
inbox = "/Users/elko/Sync/inbox/";
outbox = "/Users/elko/Documents/GitHub/Museumsnacht/IVG-KHK-2024/Filesystemwatcher/outbox"
let outboxSync = "/Users/elko/Sync/outbox/"


let t0 = async () => {
    let t = await watchInboxAndChildDirectories(inbox).catch(console.error);

    let t1 = await videoConverter(t.path, outbox, t.folder, ".mp4").catch(console.error);
    //TODO: add the specific prompt for the Museums here. 
    workflow[3].inputs.text = promptText.happy;
    let t2 = await queuePrompt(workflow, comfyUiServerAddresse, t1, promptText.happy).catch(console.error);
    let t3 = await watchAndMoveMp4Files(outboxComfyui, outboxSync, t.folder).catch(console.error);


    // switch (t.folder) {
    //     case "ivg-1":
    //         console.log("ivg-1").catch(console.error);
    //         let t1 = await videoConverter(t.path, outbox, t.folder, ".mp4").catch(console.error);
    //         break;

    //     case "ivg-2":
    //         console.log("ivg-2");
    //         let t1 = await videoConverter(t.path, outbox, t.folder, ".mp4");
    //         break;

    //     case "ivg-3":
    //         console.log("ivg-3");
    //         let t1 = await videoConverter(t.path, outbox, t.folder, ".mp4");
    //         break;

    //     case "ivg-4":
    //         console.log("ivg-4");
    //         let t1 = await videoConverter(t.path, outbox, t.folder, ".mp4");
    //         break;

    //     case "ivg-5":
    //         console.log("ivg-5");
    //         let t1 = await videoConverter(t.path, outbox, t.folder, ".mp4");
    //         break;

    //     case "ivg-6":
    //         console.log("ivg-6");
    //         let t1 = await videoConverter(t.path, outbox, t.folder, ".mp4");
    //         break;

    //     case "ivg-7":
    //         console.log("ivg-7");
    //         let t1 = await videoConverter(t.path, outbox, t.folder, ".mp4");
    //         break;

    //     case "ivg-8":
    //         console.log("ivg-8");
    //         let t1 = await videoConverter(t.path, outbox, t.folder, ".mp4");
    //         break;

    //     case "ivg-9":
    //         console.log("ivg-9");
    //         let t1 = await videoConverter(t.path, outbox, t.folder, ".mp4");
    //         break;

    //     case "ivg-10":
    //         console.log("ivg-10");
    //         let t1 = await videoConverter(t.path, outbox, t.folder, ".mp4");
    //         break;

    //     default:
    //         break;
    // }
}

t0()