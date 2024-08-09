import { videoConverter } from "../video_changer/vc.js";
import * as emotion_recognition from "./emotion_recognition/sketch.js";
import main from "./prompter/prompter.js";

const fs = require('fs');

const inbox = "../../inbox"
const outbox = "../../outbox"

let fileURL = "../../outbox/1489788235.mp4"

let fileUrlFromFileWatcher;

let prompt = require('./workflows/workflow_api (3).json');

let mainPlumbingFunction = async (fileUrlFromFileWatcher, outbox = "../video_changer/out", prompt) => {
    // Initialize variables to hold the file URL and the prompt
    let fileUrlFromVideoConverter;
    let promptResult;
    try {
        // Try to convert the file to mp4 and get the new file URL
        fileUrlFromVideoConverter = await videoConverter(fileUrlFromFileWatcher, outbox, ".mp4")

        // If the conversion is successful, proceed to prompt the ComfyUi
        // with the new file URL
        promptResult = await main(fileUrlFromVideoConverter, prompt)

        // If everything is successful, return an object indicating the status and message
        return { status: 200, message: 'Done', file: promptResult }

    } catch (error) {
        // If there is an error, log the error and return an object indicating the status and message
        console.error("Error:", error);
        return { status: 500, message: 'Error' }
    }
}
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
