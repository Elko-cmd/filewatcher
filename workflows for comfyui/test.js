
let server_address = '127.0.0.1:8188';
let client_id = 'okle';

let prompt = require("../workflows for comfyui/workflow_api.json")



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