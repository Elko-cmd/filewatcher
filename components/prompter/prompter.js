const { ComfyUIClient } = require('comfy-ui-client');

async function setup() {
    await client.connect();
    console.log('Connected!');
}
export async function main(fileURL, prompting) {
    console.log("prompting from prompter in main: " + prompting);
    //ComfyUIClient-Setup-Variables 
    const serverAddress = '192.168.1.196:42421';
    let p = require('../../workflows/workflow_api (3).json');
    let prompt = JSON.parse(JSON.stringify(p));
    const clientId = 'okle';
    const client = new ComfyUIClient(serverAddress, clientId);

    // Set the text prompt for our positive CLIPTextEncode

    prompt['10'].inputs.steps = 50;
    prompt['10'].inputs.cfg = 8.0;
    let seed = () => Math.floor(Math.random() * 10000000000000)


    //Prompt the server
    await setup()
    prompt['10'].inputs.seed = seed();
    prompt["1"].inputs.video.local_url = fileURL;
    prompt['12'].inputs.text = prompting;


    const images = await client.getImages(prompt);
    await client.saveImages(images, outbox);
    //console.log(images);

    return { status: 200, message: 'Done' }
}


