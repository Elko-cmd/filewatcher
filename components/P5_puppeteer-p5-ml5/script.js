const puppeteer = require("puppeteer");
export var emot = " ";

let emotions = [
  "neutral",
  "happy",
  "sad",
  "angry",
  "fearful",
  "disgusted",
  "surprised",
];
async function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * Launches a headless browser, sets the viewport size, serves a local HTML file,
 * captures console messages, waits for the sketch to run, and closes the browser.
 *
 * @return {Promise<void>} A promise that resolves when the sketch has finished running.
 */
export async function runSketch(filePath) {
  // Launch a headless browser
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--allow-file-access-from-files",
      "--autoplay-policy=no-user-gesture-required",
    ],
  });
  const page = await browser.newPage();
  const fileUrl = `file://${__dirname}/index.html`;
  await page.goto(fileUrl, { waitUntil: "networkidle0" });

  await page.setViewport({ width: 640, height: 480 });

  await page.waitForSelector("canvas");
  let file = filePath;
  await page.evaluate((value) => {
    window.setFilePath(value);
  }, file);

  await delay(100);
  await page.reload();


  let emotion;
  page.on("console", (msg) => {
    const type = msg.type(); // Get the message type
    const message = msg.text(); // Get the message text
    console.log(`[${type.toUpperCase()}] ${message}`); // Log the type and message
    if (emotions.some((emotion) => message.includes(emotion))) {
      console.log(message);
      emotion = message;
    }
  });
  // Wait for the sketch to run for a specified time (e.g., 10 seconds)
  await delay(10000); // Wait for 10 seconds

  // Close the browser
  //await browser.close();
  return emotion;
}
emot = await runSketch("1723226863.mp4").catch(console.error);
console.log(emot, "emot");

