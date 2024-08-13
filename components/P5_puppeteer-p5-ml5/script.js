const puppeteer = require('puppeteer');

async function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function runSketch() {
    // Launch a headless browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Set the viewport size
    await page.setViewport({ width: 640, height: 480 });

    // Serve the local HTML file
    const fileUrl = `file:///Users/riccardoventura/Desktop/puppeteer-p5-ml5/index.html`;
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });

    // Capture all console messages from the page and log them to the Node.js console
    page.on('console', msg => {
        const type = msg.type(); // Get the message type
        const message = msg.text(); // Get the message text
        console.log(`[${type.toUpperCase()}] ${message}`); // Log the type and message
    });

    // Wait for the sketch to run for a specified time (e.g., 10 seconds)
    await delay(10000); // Wait for 10 seconds

    // Close the browser
    await browser.close();
}

runSketch().catch(console.error);


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