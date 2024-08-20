const hbjs = require("handbrake-js");
/**
 * Converts a video file from the input path to the specified file format and saves it in the outbox path.
 *
 * @param {string} [inputPath=""] - The path of the input video file.
 * @param {string} [outboxPath="../../outbox"] - The path where the converted video file will be saved.
 * @param {string} [fileFormat="mp4"] - The file format of the converted video file.
 * @return {Promise<string>} The path of the converted video file.
 */
export async function videoConverter(
  inputPath = "",
  outboxPath = "../../outbox",
  fileFormat = "mp4"
) {
  let randomName =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  console.log(randomName);

  let outPath = outboxPath + "/" + randomName + fileFormat;

  hbjs
    .spawn({
      input: inputPath,
      output: outPath,
    })
    .on("error", (err) => {
      // invalid user input, no video found etc
    })
    .on("progress", (progress) => {
      console.log(
        "Percent complete: %s, ETA: %s",
        progress.percentComplete,
        progress.eta
      );
    })
    .on("complete", () => {
      console.log("done");
      console.log(outPath);
    });
  return outPath;
}

// This is an example of how to use the videoConverter function.

let u = await videoConverter("./1723123845.h264", "./", ".mp4");
console.log(u);