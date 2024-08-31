const hbjs = require("handbrake-js");

/**
 * Converts a video file from the input path to the specified file format and saves it in the outbox path.
 *
 * @param {string} [inputPath=""] - The path of the input video file.
 * @param {string} [outboxPath="../../outbox"] - The path where the converted video file will be saved.
 * @param {string} [fileFormat="mp4"] - The file format of the converted video file.
 * @param {string} [IVGName="IVG"] - The name of the folder where the converted video came from.
 * @return {Promise<string>} The path of the converted video file.
 */
export async function videoConverter(
  inputPath = "",
  outboxPath = "../../outbox",
  IVGName = "IVG",
  fileFormat = "mp4"
) {
  let randomName =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  console.log(randomName);

  let outPath = outboxPath + "/" + IVGName + "_" + randomName + fileFormat;

  try {
    await hbjs
      .spawn({
        input: inputPath,
        output: outPath,
      })
      .on("error", (err) => {
        // invalid user input, no video found etc
        throw err;
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
        return outPath;
      });
  } catch (err) {
    console.error("Error: ", err);
    throw err;
  }

 
}
// This is an example of how to use the videoConverter function.

 //let u = await videoConverter("C:\\Users\\SyncthingServiceAcct\\Sync\\inbox\\ivg-1\\7232aee212.h264", "../out", "0001", ".mp4");
//console.log(u);

