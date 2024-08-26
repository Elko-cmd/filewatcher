import { sideBySide } from "../components/video_changer/2vid_Side_by_Side/ffmpg";

let outputPath = await sideBySide("/Users/elko/Documents/GitHub/Museumsnacht/IVG-KHK-2024/Filesystemwatcher/components/video_changer/2vid_Side_by_Side/input1.mp4", "/Users/elko/Documents/GitHub/Museumsnacht/IVG-KHK-2024/Filesystemwatcher/components/video_changer/2vid_Side_by_Side/input2.mp4", "./output.mp4");

console.log(outputPath)