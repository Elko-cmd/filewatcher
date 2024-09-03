const hbjs = require("handbrake-js");

/**
 * Converts a video file from the input path to the specified file format and saves it in the outbox path.
 *
 * @param {string} [inputPath=""] - The path of the input video file.
 * @param {string} [outboxPath="../../outbox"] - The path where the converted video file will be saved.
 * @param {string} [IVGName="IVG"] - The name of the folder where the converted video came from.
 * @param {string} [fileFormat="mp4"] - The file format of the converted video file.
 * @return {Promise<string>} The path of the converted video file.
 */
export async function videoConverter(
  inputPath = "",
  outboxPath = "../../outbox",
  IVGName = "IVG",
  fileFormat = "mp4"
) {
  const randomName =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const outPath = `${outboxPath}/${IVGName}_${randomName}.${fileFormat}`;

  console.log(randomName);

  // Return a promise that resolves when the conversion is complete
  return new Promise((resolve, reject) => {
    hbjs
      .spawn({
        input: inputPath,
        output: outPath,
      })
      .on("error", (err) => {
        // Handle any error that occurs during the conversion process
        console.error("Error: ", err);
        reject(err);
      })
      .on("progress", (progress) => {
        console.log(
          "Percent complete: %s, ETA: %s",
          progress.percentComplete,
          progress.eta
        );
      })
      .on("complete", () => {
        console.log("Conversion done");
        console.log(outPath);
        resolve(outPath); // Resolve the promise with the output path
      });
  });
}

// This is an example of how to use the videoConverter function.

//let u = await videoConverter("C:\\Users\\SyncthingServiceAcct\\Sync\\inbox\\ivg-1\\7232aee212.h264", "../out", "0001", ".mp4");
//console.log(u);

