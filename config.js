// config.js
// ComfyUi Configuration
export let workflow = require("./workflow/workflow_api.json");
export let comfyUiServerAddresse = "127.0.0.1:8188/";
export let outboxComfyui = "C:/ComfyUI_windows_portable/ComfyUI/output";
export let comfyUIRenderSteps = 25;

//Syncthing Config
export let SyncfolderWindows = "C:/Users/SyncthingServiceAcct/Sync";
export let outboxSync = SyncfolderWindows + "/outbox";
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
  "ivg-1":
    "(Masterpiece, Best Quality:1.2),Transform the video into a scene where a grand, historic train station seamlessly merges with the ambiance of an art museum. The station should feature intricate architectural details like vaulted ceilings, large arched windows, and ornate pillars. The platforms are lined with classic, vintage trains, while the interior resembles an art gallery, with sculptures and paintings displayed along the walls. Soft, warm lighting highlights the artworks, casting a golden glow over the polished marble floors. Passengers are seen admiring the exhibits as they walk by, blending the bustle of travel with the serenity of a museum visit. The overall mood is a blend of nostalgia and cultural sophistication.",
  "ivg-2":
    "(Masterpiece, Best Quality:1.2),Transform the video into a visual journey through the Hessisches Landesmuseum in Kassel. Begin with the museums exterior, highlighting its historic architecture with the dominant central tower and Renaissance-inspired design. Transition into the interior, moving through the three levels of exhibition space. Showcase the diverse collections, starting with ancient artifacts from the Prehistoric and Early History section, such as ancient tools, weapons, and burial items. Next, glide through the Applied Arts collection, focusing on medieval sculptures, ornate altars, and intricately designed objects like historical glass and porcelain. Finally, enter the Folk Art section, revealing traditional Hessian costumes, handmade toys, and domestic items from the 19th century. The atmosphere should evoke a sense of history and cultural richness, with soft lighting and a color palette that emphasizes the earthy tones of ancient artifacts and the vibrant hues of folk art. Incorporate subtle animations, such as shimmering light on gemstones or the gentle movement of fabric in traditional costumes, to bring the museums exhibits to life.",
  "ivg-3":
    "(Masterpiece, Best Quality:1.2),Transform the video into a vibrant, colorful journey through the enchanting world of the Brothers Grimm fairy tales. Each scene should depict iconic moments from various stories, such as Rapunzels golden hair cascading down a tall tower, Hansel and Gretels candy-covered gingerbread house in a lush forest, and Cinderellas sparkling glass slipper at a grand ball. The overall atmosphere should be magical and whimsical, with bright, saturated colors like rich greens, deep blues, and shimmering golds. Add playful elements like twinkling stars, glowing lanterns, and lively woodland creatures that move through the scenes, bringing the fairy tales to life. The characters should be expressive and full of personality, dressed in elaborate, colorful costumes that reflect the fantastical nature of their stories. The transitions between scenes should be smooth and fluid, creating a seamless journey through the Brothers Grimms world of wonder and magic.",
  "ivg-4": "(Masterpiece, Best Quality:1.2),IVG-4	Sepulkral",
  "ivg-5": "(Masterpiece, Best Quality:1.2),IVG-5	Hafen",
  "ivg-6": "(Masterpiece, Best Quality:1.2),IVG-6	Fridi",
  "ivg-7": "(Masterpiece, Best Quality:1.2),IVG-7	Ottoneum",
  "ivg-8": "(Masterpiece, Best Quality:1.2),IVG-8	KHK	Server",
  "ivg-9": "(Masterpiece, Best Quality:1.2),IVG-9	WH-22	Brain",
};
//Maps Namingconvention for head-client
export let list = {
  "ivg-1": "_001",
  "ivg-2": "_002",
  "ivg-3": "_003",
  "ivg-4": "_004",
  "ivg-5": "_005",
  "ivg-6": "_006",
  "ivg-7": "_007",
  "ivg-8": "_008",
  "ivg-9": "_009",
  "ivg-10": "_010",
};
//Folder Paths
//export let folderPath = "C:/Users/nm/Desktop/Museumsnacht/filewatcher";
//export let inbox = folderPath + "/inbox";
//export let outbox = folderPath + "/outbox";
