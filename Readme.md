# mainMover.js and MainPrompter.js

This repository contains two scripts that are part of the video processing pipeline for the Museumsnacht project.

## mainMover.js

This script watches the `inbox` folder for new video files and moves them to the `outbox` folder. It will log the path of the moved file to the console.

## MainPrompter.js

This script watches the `inbox` folder for new files and starts the video conversion and comfy ui prompt process for each file it finds. It will log the folder name to the console and the path of the converted and prompted video file. The script will also log any errors that occur during the process.

The script will run indefinitely until it is manually stopped.

## config.js

The config.js file contains the configuration for the scripts. It has the following properties:

* `outboxComfyui`: The folder where the comfy ui prompt process will save its output.
* `inboxSync`: The folder where the mainMover.js will look for new video files.
* `outboxSync`: The folder where the mainMover.js will move new video files.
* `vcOutput`: The folder where the video converter will save its output.
* `promptText`: The text prompts that will be used in the comfy ui prompt process.

# How to install
To install, run the following commands in your terminal
```bash
#for windows
powershell -c "irm bun.sh/install.ps1|iex"
#for mac 
brew install oven-sh/bun/bun

cd filewatcher
bun install
```
## How to run the scripts
To run the scripts, you will need to have [bun](https://bun.sh/) installed on your computer. Once you have bun installed, you can run the scripts by opening a terminal and typing `bun run mainMover.js` and `bun run MainPrompter.js`. This will start the mainMover.js and MainPrompter.js scripts, respectively.

## Comfyui Videopipeline

The comfy ui videopipeline is a workflow that converts a video file into a video file that is optimized for the comfy ui prompt process. The workflow consists of the following steps:

1. The video file is loaded into the comfy ui prompt process and a text prompt is associated with it.
2. The comfy ui prompt process uses the text prompt to generate a video that is optimized for the prompt.
3. The generated video is saved to the `outboxComfyui` folder.

The comfy ui videopipeline is started by running the `MainPrompter.js` script. This script will watch the `inboxSync` folder for new video files and start the comfy ui prompt process for each new file it finds. The script will also log any errors that occur during the process.

## Models used

The models used in this project are:

* VEA. `sdxl_vae.safetensors`
* AnimateDiff Model: `mm_sdxl_v10_beta.ckp`
* Controlnet: `controlnet-sd-xl-1.0-softedge-dexined.safetensors`
* Checkpoint: `sd_xl_base_1.0.safetensors`