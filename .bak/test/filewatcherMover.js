import { watchAndMoveMp4Files } from "../../components/filewatcher/filewatcher.js";
import { outboxComfyui, outboxSync } from "../../config.js";

// Move the file
console.log(
  "Starting filewatcherMover.js. This script will watch the ComfyUI outbox for new videos and move them to the Syncthing inbox once they are ready. The script will log the path of the moved file to the console."
);
let c = await watchAndMoveMp4Files(outboxComfyui, outboxSync).catch(
  console.error
);
// Move the file and await the result
console.log("////////////////////////////the file was moved to", c);
