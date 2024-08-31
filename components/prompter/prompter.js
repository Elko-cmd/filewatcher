
let server_address = '127.0.0.1:8188';
let client_id = 'okle';
import { workflow } from "../../config";
let prompt = workflow
let texter ="(Masterpiece, Best Quality:1.2), Create a surrealistic portrait showing hidden, gifted faces emerging from a complex network of neural connections and brain structures. The faces should be mysterious and expressive, with bright colors and fascinating details that reflect the intelligence and creativity of the human mind. The background should be abstract and dreamlike to emphasize the idea of the hidden brain";

//prompt[7].inputs.steps = 10;

/**
 * Sends a prompt to the server for processing and logs the current text input and seed.
 * Optionally, you can include a file path to attach a video file to the prompt.
 * 
 * @async
 * @function queuePrompt
 * @param {object} prompt - The prompt object to be sent to the server.
 * @param {string} server_address - The address of the server where the prompt will be sent.
 * @param {string} [filePath=undefined] - The file path to a video file to attach to the prompt (optional).
 * @param {string} [text=texter] - The text input to include in the prompt (optional, defaults to `texter`).
 * @param {string} [client_id="okle"] - The client ID to include with the prompt (optional, defaults to "okle").
 * @returns {Promise<object>} The server's response to the prompt.
 * 
 * @example
 * const prompt = { ... }; // Your prompt object
 * const serverAddress = "localhost:8000";
 * const filePath = "/path/to/video.mp4";
 * const text = "Sample text";
 * const clientId = "myClientId";
 * 
 * queuePrompt(prompt, serverAddress, filePath, text, clientId)
 *   .then(response => {
 *     console.log("Prompt processed successfully:", response);
 *   })
 *   .catch(error => {
 *     console.error("Error processing prompt:", error);
 *   });
 */
export async function queuePrompt(prompt,server_address,filePath=undefined,text = texter,client_id="okle") {
    const p = { prompt, client_id };
    
    p.prompt[7].inputs.seed = Math.floor(Math.random() * 10000000000000);
    p.prompt[3].inputs.text = text;

    if(filePath){
        p.prompt[105].inputs.video = filePath;
    }
 
    // console.log
    console.log(p.prompt[3].inputs.text);
    console.log(p.prompt[7].inputs.seed);
    
    //stringify the prompt
    const data = JSON.stringify(p);

    //fetch the comfyui endpoint with a POST request with the prompt
    return fetch(`http://${server_address}/prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data
    })
    .then(response => response.json())
    .then(
        fetch(`http://${server_address}/prompt`)
        .then(response => response.json())
        .then(data => console.log("Prompt Queue seed:" + p.prompt[7].inputs.seed + "Prompt Queue remaining: " + data.exec_info.queue_remaining ))
        .catch(error => console.error(error))
    )
 
  }

 // queuePrompt(prompt,"127.0.0.1:8188",undefined)

