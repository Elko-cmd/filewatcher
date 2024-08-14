import * as workflower from "./workflows for comfyui/workflow_api.json"
export let comfyUiServerAddresse  ="127.0.0.1:8188/";
export let inbox = "./inbox"
export let outbox = "./outbox"

export let promptText = {
    "happy": "  ",
    "sad": "  ",
    "angry": "  ",
    "fearful": "  ",
    "disgusted": "  ",
    "surprised": "  ",
    "neutral": "  "
}
export let workflow = workflower

console.log(workflow)
console.log(promptText.happy) 