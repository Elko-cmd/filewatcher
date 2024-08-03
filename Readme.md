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

# Progress

Video in -> FSWatcher -> EmotionDetection -> Promptting -> AwaitComfyUIResponse -> Loop

# Problem 
To FIX: the ml5.js cannot run in NODE.js, The Filewatcher needs access to the Filesystem to see if something changes. 
```js
const fs = require('fs');
```
is NODE.js specific. We could use the experimental Browser FileSystem API
https://developer.mozilla.org/en-US/docs/Web/API/File_System_API

or try to "pupeteer" m5l.js 

https://github.com/ml5js/ml5-library/issues/377#issuecomment-725067267
-->

This some kind of hack, but puppeteer can be used to run ml5 with node.

The snippet below assumes that you have a server that has an ml5 script that trains a model (classifier.train()), then saves it ( classifier.save()), and finally displays an element with id donewhen finished training.

I wrote an article with more details in case this may be useful to anyone https://dev.to/merlos/how-to-use-ml5-with-nodejs-and-puppeteer-step-by-step-132e

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  // Navigate to the page that trains the model
  await page.goto('http://localhost:5000')

  // if you want to trigger some function in the page use evaluate
  console.log(await page.evaluate('ml5.version')) // prints "0.5.0"

  // Display browser console messages on screen
  page.on('console', msg => console.log('>', msg.text()));

  // This allows to save the model when classifier.save() is called.
  // downloadPath is the folder in which the model will be saved.
  await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: './'})
 
  //Wait till element with id="done" is visible
  //By default puppeteer will wait 30s and then throw error. `timeout = 0` disables the timeout.
  await page.waitForSelector('#done', {visible: true, timeout: 0})

  console.log("DONE!") 
  browser.close()
})();
```