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
    const watcher = fs.watch(
      inbox,
      { recursive: true },
      (eventType, filename) => {
        if (
          filename &&
          filename.endsWith(".h264") &&
          filename !== ".DS_Store"
        ) {
          const changedFilePath = path.join(inbox, filename);
          const folder = path.dirname(changedFilePath).split(path.sep).pop();
          console.log(
            `File ${changedFilePath} changed in folder ${folder} with event type: ${eventType}`
          );
          resolve({ path: changedFilePath, folder });
        }
      }
    );
  });
}



/**
 * Watches the specified inbox directory for .mp4 files and moves them to the outbox directory after validating the file size.
 *
 * @param {string} inbox - The path of the directory to watch for .mp4 files.
 * @param {string} outbox - The path of the directory to move the validated files to.
 * @param {string} prefix - The prefix to add to the moved file names.
 * @returns {Promise<void>}
 */
export async function watchAndMoveMp4Files(inbox, outbox, prefix) {
  return new Promise((resolve, reject) => {
    const watcher = fs.watch(inbox, { recursive: true }, async (eventType, filename) => {
      if (filename && filename.endsWith('.mp4')) {
        const changedFilePath = path.join(inbox, filename);
        console.log(`Detected change in file: ${changedFilePath}`);

        // Adding a delay to ensure the file is fully written before access
        setTimeout(async () => {
          try {
            // Check if the file still exists
            await fs.promises.access(changedFilePath, fs.constants.F_OK);

            // Get the file stats to validate size
            const stats = await fs.promises.stat(changedFilePath);
            if (stats.size > 0) {
              const nameWithoutExtension = filename.replace(/\.mp4$/, '');
              const cleanedName = nameWithoutExtension.replace(/_\d+$/, '');
              const newFileName = `${prefix}_${cleanedName}.mp4`;
              const destination = path.join(outbox, newFileName);

              try {
                await fs.promises.rename(changedFilePath, destination);
                console.log(`Moved ${changedFilePath} to ${destination}`);
              } catch (renameError) {
                console.error(`Error moving file to ${destination}:`, renameError);
              }
            }
          } catch (accessError) {
            console.error(`Error accessing or processing file at ${changedFilePath}:`, accessError);
          }
        }, 100); // Adjust the delay time as needed
      }
    });

    // Handle watcher errors (e.g., if the inbox path is invalid)
    watcher.on('error', (err) => {
      console.error('Watcher error:', err);
      reject(err);
    });

    // Resolve when the process completes, if needed (optional)
    watcher.on('close', () => {
      resolve();
    });
  });
}




/**
 * Watches the specified inbox directory for .mp4 files and moves them to the outbox directory after validating the file size.
 *
 * @param {string} inbox - The path of the directory to watch for .mp4 files.
 * @param {string} outbox - The path of the directory to move the validated files to.
 * @returns {void}
 */
export function watchAndMoveValidMp4Files2(inbox, outbox) {
  fs.watch(inbox, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.mp4')) {
      const changedFilePath = path.join(inbox, filename);
      console.log(`Detected change in file: ${changedFilePath}`);

      // Adding a delay to ensure the file is fully written before access
      setTimeout(() => {
        fs.stat(changedFilePath, (err, stats) => {
          if (err) {
            console.error(`Error getting stats for ${changedFilePath}:`, err);
            return;
          }

          // Check if the file size is greater than the threshold
          if (stats.size > 4600000) {
            const destination = path.join(outbox, filename);

            // Check existence of the file before attempting to move
            fs.access(changedFilePath, fs.constants.F_OK, (err) => {
              if (err) {
                console.error(`File does not exist anymore: ${changedFilePath}`, err);
                return;
              }

              // Move the file to the destination
              fs.rename(changedFilePath, destination, (err) => {
                if (err) {
                  console.error(`Error moving file to ${destination}:`, err);
                } else {
                  console.log(`Moved ${changedFilePath} to ${destination}`);
                }
              });
            });
          }
        });
      }, 200); // Increase the delay slightly if needed
    }
  });
}
