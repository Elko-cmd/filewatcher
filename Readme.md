
# Automation for IVG-khk-2024
=====================================

## Overview
-----------

This script watches for changes in the inbox folder and triggers a workflow in ComfyUI when a change is detected. The workflow is defined in a JSON file located in the `./workflow` directory. The script then saves the resulting image in the outbox folder.

## Installation and Running
---------------------------

To install and run the script, follow these steps:

```bash
# Install bun
install bun

# Change into the project directory
cd ./Filesystemwatcher

# Install dependencies
bun install

# Run the script
bun run main.js
```

## ComfyUI Integration
----------------------

The script communicates with ComfyUI via HTTP requests. The ComfyUI server address and workflow file can be configured in the `./config.js` file.

*   The workflow file is located in `./workflow/[some workflow].json`.
*   The script sends a POST request to `http://127.0.0.1:8188/prompt` to trigger the workflow.
*   A GET request to the same address returns the length of the queue.

## Configuration
--------------

The script uses the following directories and files:

*   `./inbox`: watched for changes
*   `./outbox`: receives videos from ComfyUI
*   `./workflow/[some workflow].json`: workflow file

The `./config.js` file contains configuration options for the ComfyUI server address, inbox and outbox paths, and workflow file.

```javascript
import * as workflower from "./workflow/workflow_api.json";

export let comfyUiServerAddress = "127.0.0.1:8188/";
export let inbox = "./inbox";
export let outbox = "./outbox";

export let promptText = {
  happy: " ",
  sad: " ",
  angry: " ",
  fearful: " ",
  disgusted: " ",
  surprised: " ",
  neutral: " ",
};

export let workflow = workflower;

console.log(workflow);
console.log(promptText.happy);
```

## Dependencies
------------

The `package.json` file contains all dependencies required by the project. To install dependencies on another device, simply run `bun install`, which will generate the `node_modules` directory automatically.