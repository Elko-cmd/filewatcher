// config.js
// ComfyUi Configuration
import * as workflower from "./workflow/workflow_api.json";
export let workflow = workflower;
export let comfyUiServerAddresse = "127.0.0.1:8188/";
export let outboxComfyui = "C:/Users/nm/Desktop/Museumsnacht/filewatcher/outbox";

export let promptText = {
  happy: "happy,colorfull, joyfull, 4k",
  sad: "  ",
  angry: "  ",
  fearful: "  ",
  disgusted: "  ",
  surprised: "  ",
  neutral: "  ",
};

export let Museumslist = {
  "0001": "IVG-1  KUBAtour Kulturbahnhof",
  "0002": "IVG-2	Landesmuseum",
  "0003": "IVG-3	Grimmwelt",
  "0004": "IVG-4	Sepulkral",
  "0005": "IVG-5	Hafen",
  "0006": "IVG-6	Fridi",
  "0007": "IVG-7	Ottoneum",
  "0008": "IVG-8	KHK	Server",
  "0009": "IVG-9	WH-22	Brain",
}

//Folder Paths
export let folderPath = "C:/Users/nm/Desktop/Museumsnacht/filewatcher";
export let inbox = folderPath + "/inbox";
export let outbox = folderPath + "/outbox";

/**
 * This function logs all variables in the config file.
 * @function
 * @name logVariables
 * @returns {undefined}
 */
export function logVariables() {
  console.log("Variables in config.js:");
  console.log("comfyUiServerAddresse:", comfyUiServerAddresse);
  console.log("inbox:", inbox);
  console.log("outbox:", outbox);
  console.log("promptText:", promptText);
  console.log("workflow:", workflow);

  console.log("End of config.js");
}
