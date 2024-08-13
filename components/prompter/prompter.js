// ** queuePrompt from https://stablecanvas.github.io/comfyui-client/classes/ComfyUIApiClient.html#queuePrompt
// queuePrompt(queue_index, options): Promise<QueuePrompt>
// Parameters
// queue_index: number
// The index at which to queue the prompt, passing -1 will insert the prompt at the front of the queue

// options: {
//     prompt: any;
//     workflow: any;
// }
// prompt: any
// The prompt to queue

// workflow: any
// This png info to be added to resulting image

// Returns Promise<QueuePrompt>
// The response from the server

// Defined in src/ComfyUIApiClient.ts:132

const { ComfyUIClient } = require('comfy-ui-client');

let defaultPrompt = "destiny, gadget, underwater, lovestory, animals, photrealistic, computer";

async function setup() {
    await client.connect();
    console.log('Connected!');
}
/**
 * Queues a prompt for the ComfyUIClient.
 *
 * @param {string} fileURL - The URL of the file.
 * @param {string} [promptText='destiny, gadget, underwater, lovestory, animals, photrealistic, computer'] - The prompt text.
 * @param {object} workflow - The workflow object.
 * @param {string} [serverAddresse='192.168.1.196:42421'] - The server address.
 * @return {Promise<{status: number, message: string}>} A promise that resolves to an object with a status and a message.
 */
export async function prompterQueue(fileURL, promptText = defaultPrompt, workflow, serverAddresse = '192.168.1.196:42421') {
    console.log("prompting from prompter in main: " + prompting);
    //ComfyUIClient-Setup-Variables 

    let p = workflow
    let workflow = JSON.parse(JSON.stringify(p));
    const clientId = 'okle';
    const client = new ComfyUIClient(serverAddresse, clientId);

    // Set the text prompt for our positive CLIPTextEncode

    // workflow['10'].inputs.steps = 50;
    // workflow['10'].inputs.cfg = 8.0;
    let seed = () => Math.floor(Math.random() * 10000000000000)
    //Prompt the server
    await setup()
    //every prompt needs a random seed
    workflow['10'].inputs.seed = seed();
    //Every prompt needs a video
    workflow["1"].inputs.video.local_url = fileURL;

    workflow['12'].inputs.text = promptText;


    // const images = await client.getImages(workflow);
    // await client.saveImages(images, outbox);
    //console.log(images);

    await client.queuePrompt(client.queue.length + 1, { prompt: promptText, workflow: workflow });

    return { status: 200, message: 'Done' }
}


