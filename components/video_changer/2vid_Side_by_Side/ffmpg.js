const ffmpeg = require('fluent-ffmpeg');

// Define input files
const leftInput = "./input2.mp4"
const rightInput = './input1.mp4';
const output = 'output.mp4';

// Create the ffmpeg command
ffmpeg()
    .input(leftInput)
    .input(rightInput)
    .complexFilter([
        '[0:v]scale=426x266[left];[1:v]scale=426x266[right]', // Adjust scale to ensure same resolution
        '[left][right]hstack' // Stack the two videos horizontally
    ])
    .output(output)
    .on('end', () => {
        console.log('Processing finished successfully');
    })
    .on('error', (err) => {
        console.error('Error occurred: ' + err.message);
    })
    .run();
