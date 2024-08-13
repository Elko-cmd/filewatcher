// This is the main file for the Museumsnacht project. It is used to start the application. It contains all the necessary code to run the application.
//Todo: Add comments and code

import {fileWatcher} from './components/filewatcher/filewatcher.js'
import { videoConverter } from './components/video_changer/vc.js'
import { queuePrompt } from './components/prompter/prompter.js'


import { comfyUiServerAddresse, inbox, outbox, promptText,workflow } from './config'



let text = 'destiny, gadget, underwater, lovestory, animals, photrealistic, computer '
let convertedFilePath = 'outbox/1489788235.mp4'



let h264FilePath=await fileWatcher()

convertedFilePath=await videoConverter(h264FilePath)

let detecedEmotions = await emotion_recognition.sketch(convertedFilePath)
// Check if the detectedEmotions object has a key that matches any of the emotions in the promptText object. If it does, assign the value of that key to the variable text. If it doesn't, assign the value of the neutral key to the variable text.
text = promptText[detecedEmotions] || promptText.neutral

await queuePrompt(workflow, comfyUiServerAddresse, convertedFilePath,text)