import { watchAndMoveMp4Files } from "./components/filewatcher/filewatcher.js";
import { outboxComfyui, outboxSync } from "./config.js";

// // Move the file
// console.log(
//   "Starting filewatcherMover.js. This script will watch the ComfyUI outbox for new videos and move them to the Syncthing inbox once they are ready. The script will log the path of the moved file to the console."
// );
// let c = await watchAndMoveMp4Files(
//   outboxComfyui,
//   outboxSync,
//   "Museumsnacht24"
// ).catch();
// // Move the file and await the result
// console.log("////////////////////////////the file was moved to", c);


// const fs = require('fs');
// const chokidar = require('chokidar');

// async function watchAndCopyFolder(srcFolder, destFolder) {
//   const watcher = chokidar.watch(srcFolder, {
//     persistent: true,
//     ignoreInitial: true,
//     followSymlinks: true,
//   });

//   watcher.on('addDir', (path) => {
//     const folderName = path.split('/').pop();
//     const folderPath = `${srcFolder}/${folderName}`;
//     const filesInFolder = fs.readdirSync(folderPath);

//     if (filesInFolder.length === 76) {
//       copyFolder(folderPath, destFolder).then(() => {
//         deleteFolder(folderPath);
//       });
//     }
//   });
// }

// async function copyFolder(src, dest) {
//   return new Promise((resolve, reject) => {
//     fs.cp(src, dest, { recursive: true }, (err) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   });
// }

// async function deleteFolder(folderPath) {
//   return new Promise((resolve, reject) => {
//     fs.rmdir(folderPath, { recursive: true }, (err) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   });
// }

// watchAndCopyFolder(outboxComfyui, outboxSync);

