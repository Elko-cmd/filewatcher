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
  // Capture all console messages from the page and log them to the Node.js console

  // Evaluate a function in the browser context, passing the fileUrl as an argument to the function.
  // This function calls the setValue function in the p5.js sketch, which sets the fileUrl variable
  // in the p5.js sketch to the value of the fileUrl argument.
  // This allows us to pass the fileUrl to the p5.js sketch from the Node.js script.

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
//Not Allowed to Load Local Resource
//Error Message:

//Not allowed to load local resource: blob:null/...

//Solution:
//This error typically occurs when the browser restricts access to local files for security reasons,
//especially when using file:// protocol. To fix this, serve your files through a local server instead
//of accessing them via file paths. Here are a couple of ways to do this:

//Using Python (if installed):

//Open your terminal and navigate to the directory of your HTML file.
//Run: python -m http.server 8000
//Then access your page at http://localhost:8000/yourfile.html.

//Using Node.js with http-server:

//If you have Node.js installed, you can install http-server globally:
//npm install -g http-server

//Then navigate to your project directory in the terminal and run:
//http-server

//Access your project at the given URL (e.g., http://127.0.0.1:8080).
