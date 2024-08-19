// config.js
// ComfyUi Configuration
import * as workflower from "./workflow/workflow_api.json";
export let workflow = workflower;
export let comfyUiServerAddresse = "127.0.0.1:8188/";

export let promptText = {
  happy: "  ",
  sad: "  ",
  angry: "  ",
  fearful: "  ",
  disgusted: "  ",
  surprised: "  ",
  neutral: "  ",
};

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
