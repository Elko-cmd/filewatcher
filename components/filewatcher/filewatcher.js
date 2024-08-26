let fs = require("fs");

import * as path from "path";

/**
 * Watches the specified inbox directory for file changes and triggers the provided fireFunction when a change is detected.
 *
 * @param {string} inbox - The path of the directory to watch for file changes.
 * @param {function} fireFunction - The function to call when a file change is detected.
 * @param {boolean} [stopOnChange=false] - Whether to stop watching for changes after a file change is detected.
 * @returns {Promise<string>} A promise that resolves with the path of the changed file when a change is detected.
 * @return {import("fs").FSWatcher} The file system watcher object.
 */
export async function watchAndFire(inbox, fireFunction, stopOnChange = false) {
  return new Promise((resolve) => {
    const watcher = fs.watch(inbox, (eventType, filename) => {
      if (filename) {
        const changedFilePath = path.join(inbox, filename);
        console.log(
          `File ${changedFilePath} changed with event type: ${eventType}`
        );
        fireFunction(changedFilePath);
        if (stopOnChange) {
          watcher.close();
        }
        resolve(changedFilePath);
      }
    });
  });
}


/**
 * Watches the specified inbox directory and its child directories for file changes and returns the path and folder of the changed file when a change is detected.
 * The function will only fire if the changed file has the ending .h264
 *
 * @param {string} inbox - The path of the directory to watch for file changes.
 * @returns {Promise<{path: string, folder: string}>} A promise that resolves with the path and folder of the changed file when a change is detected.
 */
export async function watchInboxAndChildDirectories(inbox) {
  return new Promise((resolve) => {
    const watcher = fs.watch(inbox, { recursive: true }, (eventType, filename) => {
      if (filename && filename.endsWith(".h264") && filename !== ".DS_Store") {
        const changedFilePath = path.join(inbox, filename);
        const folder = path.dirname(changedFilePath).split(path.sep).pop();
        console.log(`File ${changedFilePath} changed in folder ${folder} with event type: ${eventType}`);
        resolve({ path: changedFilePath, folder });
      }
    });
  });
}

/**
 * Watches the specified inbox directory for changes and moves the changed file to the outbox directory if it has the .mp4 extension.
 * The function will only fire if the changed file has the ending .mp4 and the file is completely written.
 * 
 * @param {string} inbox - The path of the directory to watch for file changes.
 * @param {string} outbox - The path of the directory to move the changed files to.
 * @returns {Promise<void>}
 */
export async function watchAndMoveMp4Files(inbox, outbox, prefix) {
  return new Promise((resolve) => {
    const watcher = fs.watch(inbox, { recursive: true }, (eventType, filename) => {
      if (filename && filename.endsWith(".mp4")) {
        const changedFilePath = path.join(inbox, filename);
        fs.stat(changedFilePath, (err, stats) => {
          if (err) {
            console.error(err);
          } else {
            if (stats.size > 0) {
              const newFileName = prefix + "_" + filename;
              const destination = path.join(outbox, newFileName);
              fs.rename(changedFilePath, destination, (err) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log(`Moved ${changedFilePath} to ${destination}`);
                }
              });
            }
          }
        });
      }
    });
  });
}

