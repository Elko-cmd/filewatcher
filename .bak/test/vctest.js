import { folderPath } from "../config.js";
import { videoConverter } from "../components/video_changer/vc.js";

videoConverter(
  folderPath + "/components/video_changer/1723123845.h264",
  folderPath + "/outbox",
  ".mp4"
);
