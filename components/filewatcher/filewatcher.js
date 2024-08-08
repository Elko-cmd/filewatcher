import { videoConverter } from "../video_changer/vc.js";
import * as emotion_recognition from "./emotion_recognition/sketch.js";
import main from "./prompter/prompter.js";

const fs = require('fs');

const inbox = "../../inbox"
const outbox = "../../outbox"

let fileURL = "../../outbox/1489788235.mp4"
//converting video
videoConverter(fileURL, "outbox/1489788235.mp4");
//rebase the fileURL
fileURL = fileURL;
//Prompting Comfyui
main(fileURL, "destiny, gadget, underwater, lovestory, animals, photrealistic, computer ");


// Watch the folder for file changes, put them into a queue
// let queue = []

// const watcher = fs.watch(inbox, (eventType, filename) => {
//     if (filename) {
//         console.log(`File ${filename} changed with event type: ${eventType}`);
//         queue.push(filename);
//         console.log("Queue: " + queue);
//     }
// });

// Empty the queue while calling main
// async function run() {
//     queue.shift();
//     let result = await main();
//     return result;
// }

// Run the main function when the queue is not empty, or after 5 seconds have passed
// setInterval(async () => {
//     if (queue.length > 0 || !watcher) {
//         const result = await run();
//         if (result.status == 200) {
//             await run();
//         }
//     }
// }, 2000);
