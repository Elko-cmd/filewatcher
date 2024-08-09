# What does the script do? 
The script watches for changes in the inbox folder. If something changes in the inbox it establishes a connection with ComfyUi and promps it with the workflow `./workflow/[some workflow].json`.
It then saves the image in the outbox folder.

# How to install and run
```bash
install node
cd ./Filesystemwatcher
npm install
npm run fsWatcher.js
```


# Comfyui 
ComfyUi Javascript Api 
https://github.com/StableCanvas/comfyui-client?tab=readme-ov-file

# Config of filewatcher 

- ./inbox will be watched
- ./outbox will get the images from ComfyUI
- `./workflow/some workflow.json`  will be used for the workflow
  
```js
const path = "./inbox" // Inboxfolder
const outbox = "./outbox" //Outboxfolder
const serverAddress = '127.0.0.1:8188'; //Serveradress for ComfyUI
```

package.json file contains all of your dependencies. When you need to download your project on another device, all you need to do is run npm install - that will generate node_modules automatically.