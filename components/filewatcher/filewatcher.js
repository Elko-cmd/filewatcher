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
