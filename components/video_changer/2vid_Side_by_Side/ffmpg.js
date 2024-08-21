const ffmpeg = require('fluent-ffmpeg');

// Define input files
const leftInput = './input1.mp4';
const rightInput = './input2.mp4';
const output = 'output.mp4';

// Define the desired output resolution (16:9 aspect ratio)
const outputWidth = 640;
const outputHeight = 360;
const halfWidth = outputWidth / 2;

// Create the ffmpeg command



/**
 * Creates a side-by-side video by combining two input videos and applying filters.
 *
 * @param {string} leftInput - The file path of the left input video.
 * @param {string} rightInput - The file path of the right input video.
 * @param {string} output - The file path where the output video will be saved.
 * @return {Promise<string>} A promise that resolves with the output file path when the processing is complete.
 */
export async function sideBySide(leftInput, rightInput, output) {
    return new Promise((resolve, reject) => {
        console.log('Processing side by side videos started...');
        ffmpeg()
            .input(leftInput)
            .input(rightInput)
            .complexFilter([
                `[0:v]scale=-1:${outputHeight},crop=${halfWidth}:${outputHeight}[left]`,  // Scale height, crop to center for left video
                `[1:v]scale=-1:${outputHeight},crop=${halfWidth}:${outputHeight}[right]`, // Scale height, crop to center for right video
                '[left][right]hstack=inputs=2' // Stack the two videos horizontally
            ])
            .outputOptions([
                '-preset fast',            // Use a faster preset for encoding
                '-threads 4',              // Let FFmpeg decide the number of threads based on the system's cores
                '-aspect 16:9',            // Ensure the output video has a 16:9 aspect ratio
                '-movflags +faststart'     // Optimize for web streaming
            ])
            .output(output)
            .on('end', () => {
                console.log('Processing finished successfully');
                resolve(output); // Resolve the promise with the output path
            })
            .on('error', (err) => {
                console.error('Error occurred: ' + err.message);
                reject(err); // Reject the promise with the error
            })
            .run();
    });
}



 let outpute = await sideBySide(leftInput, rightInput, output)
 console.log(outpute)
