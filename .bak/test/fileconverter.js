import { videoConverter } from "../components/video_changer/videoconverter/vc";


function watchAndLogFile(folderPath) {
    const fs = require('fs');
    const path = require('path');

    const watcher = fs.watch(folderPath, { recursive: true }, (eventType, filename) => {
        if (filename) {
            console.log(eventType + ": " + path.join(folderPath, filename));
           let t = async () => await videoConverter(path.join(folderPath, filename),"./","0001",".mp4");
            console.log(t)
        }
    });
}
 watchAndLogFile("C:/Users/SyncthingServiceAcct/Sync/inbox")