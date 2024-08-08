import * as emotion_recognition from "./emotion_recognition/sketch.js";
import main from "./prompter/prompter.js";

const fs = require('fs');

const inbox = "./inbox"
const outbox = "./outbox"

let fileURL ="./outbox/1489788235.mp4"
//Prompting 
main(fileURL,"destiny, gadget, underwater, lovestory, animals, photrealistic, computer ");


//ComfyUIClient-Setup-Variables 
const serverAddress = '192.168.1.196:42421';
let p = require('./workflows/workflow_api (3).json');
let prompt = JSON.parse(JSON.stringify(p));
const clientId = 'okle';
const client = new ComfyUIClient(serverAddress, clientId);


// Set the text prompt for our positive CLIPTextEncode

prompt['12'].inputs.text = 'destiny, gadget, underwater, lovestory, animals, photrealistic, computer ';
prompt['10'].inputs.steps = 50;
prompt['10'].inputs.cfg = 8.0;
let seed = () => Math.floor(Math.random() * 10000000000000)


async function setup() {
    await client.connect();
    console.log('Connected!');
}
async function setdown() {
    await client.disconnect();
}
async function main() {
    prompt['10'].inputs.seed = seed();
    prompt["1"].inputs.video.local_url = fileURL;
    emotion_recognition.fileUrl = fileUrl;
    emotion_recognition.detecedEmotions

    const images = await client.getImages(prompt);
    await client.saveImages(images, outbox);
    //console.log(images);

    return { status: 200, message: 'Done' }
}

setup();

//Filesystemwatcher 
console.log(`Path: ${inbox}`);
//Watch the folder for file changes, put them into a queue
let queue = []

const watcher = fs.watch(inbox, (eventType, filename) => {
    if (filename) {
        console.log(`File ${filename} changed with event type: ${eventType}`);
        queue.push(filename);
        console.log("Queue: " + queue);
    }
});

// Empty the queue while calling main
async function run() {
    queue.shift();
    let result = await main();
    return result;
}

// Run the main function when the queue is not empty, or after 5 seconds have passed
setInterval(async () => {
    if (queue.length > 0 || !watcher) {
        const result = await run();
        if (result.status == 200) {
            await run();
        }
    }
}, 2000);


