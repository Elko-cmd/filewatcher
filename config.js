// config.js
// ComfyUi Configuration
export let workflow = require("./workflow/workflow_api(5).json");
export let comfyUiServerAddresse = "127.0.0.1:8188/";
export let outboxComfyui = "C:/ComfyUI_windows_portable/ComfyUI/output";
export let comfyUIRenderSteps = 10;

//Syncthing Config
export let SyncfolderWindows = "C:/Users/nm/Sync";
export let outboxSync = SyncfolderWindows + "/renders";
export let inboxSync = SyncfolderWindows + "/inbox";
//Videoconverter
export let vcOutput =
  "C:/Users/nm/Desktop/Museumsnacht/filewatcher/converterDump";

export let promptText = {
  happy: "happy,colorfull, joyfull, 4k",
  sad: "  ",
  angry: "  ",
  fearful: "  ",
  disgusted: "  ",
  surprised: "  ",
  neutral: "  ",
};

export let MuseumslistPrompts = {
  "ivg-1": "",
  "ivg-2":
    "(Masterpiece, Best Quality:1.2),IVG-4	Sepulkral, Death, santa muerte, happy, sad, ",
  "ivg-3": "",
  "ivg-4":
    "(Masterpiece, Best Quality:1.2),IVG-6	Frid, contempoary art, white cube, clean, mondrian, 4k",
  "ivg-5":
    "(Masterpiece, Best Quality:1.2),Transform the video into a vibrant, colorful journey through the enchanting world of the Brothers Grimm fairy tales. Each scene should depict iconic moments from various stories, such as Rapunzels golden hair cascading down a tall tower, Hansel and Gretels candy-covered gingerbread house in a lush forest, and Cinderellas sparkling glass slipper at a grand ball. The overall atmosphere should be magical and whimsical, with bright, saturated colors like rich greens, deep blues, and shimmering golds. Add playful elements like twinkling stars, glowing lanterns, and lively woodland creatures that move through the scenes, bringing the fairy tales to life. The characters should be expressive and full of personality, dressed in elaborate, colorful costumes that reflect the fantastical nature of their stories. The transitions between scenes should be smooth and fluid, creating a seamless journey through the Brothers Grimms world of wonder and magic.",

  "ivg-6":
    "(Masterpiece, Best Quality:1.2),IVG-5	Hafen, creativ, sunset, haven, ships, golden hour",

  "ivg-7":
    "(Masterpiece, Best Quality:1.2), historic garnments, cultural art, 4k, birght colors, medieval",
  "ivg-8":
    "(Masterpiece, Best Quality:1.2),IVG-7	Ottoneum, dinosaurs, wild, beastly, party, vivid , 4k",

  "ivg-9":
    "(Masterpiece, Best Quality:1.2), comic, funny faces, bright colors, ducktales, 4k,humor ",
};

//Maps Namingconvention for head-client
export let list = {
  "ivg-1": "_000",
  "ivg-9": "_001",
  "ivg-3": "_000",
  "ivg-7": "_002",
  "ivg-5": "_003",
  "ivg-2": "_004",
  "ivg-6": "_005",
  "ivg-4": "_006",
  "ivg-8": "_007",
  "ivg-10": "_010",
};
//Folder Paths
//export let folderPath = "C:/Users/nm/Desktop/Museumsnacht/filewatcher";
//export let inbox = folderPath + "/inbox";
//export let outbox = folderPath + "/outbox";
