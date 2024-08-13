
let server_address = '127.0.0.1:42421';
let client_id = 'okle';

let prompt = require("../workflows for comfyui/workflow_api (5)-picture.json")



async function queuePrompt(prompt) {
    const p = { prompt, client_id };
    const data = JSON.stringify(p);
    return fetch(`http://${server_address}/prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data
    })
    .then(response => response.json());
  }

queuePrompt(prompt)