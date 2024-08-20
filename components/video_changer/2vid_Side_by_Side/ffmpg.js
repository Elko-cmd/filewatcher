const ffmpeg = require('fluent-ffmpeg');

// Define input files
const leftInput = './input1.mp4';
const rightInput = './input2.mp4';
const output = 'output.mp4';

// Define the desired output resolution (16:9 aspect ratio)
const outputWidth = 1920;
const outputHeight = 1080;
const halfWidth = outputWidth / 2;

// Create the ffmpeg command
ffmpeg()
    .input(leftInput)
    .input(rightInput)
    .complexFilter([
        `[0:v]scale=-1:${outputHeight},crop=${halfWidth}:${outputHeight}[left]`,  // Scale height, crop to center for left video
        `[1:v]scale=-1:${outputHeight},crop=${halfWidth}:${outputHeight}[right]`, // Scale height, crop to center for right video
        '[left][right]hstack=inputs=2' // Stack the two videos horizontally
    ])
    .outputOptions('-aspect', '16:9') // Ensure the output video has a 16:9 aspect ratio
    .output(output)
    .on('end', () => {
        console.log('Processing finished successfully');
    })
    .on('error', (err) => {
        console.error('Error occurred: ' + err.message);
    })
    .run();
