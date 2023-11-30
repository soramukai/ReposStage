import { ipcMain } from "electron";
import ffmpeg from 'fluent-ffmpeg'

export default class IPCsFfmpeg{
    static initialize(){
            ipcMain.on('electron:SendVideo', (event, filePath) => {
        // Logique de conversion FFmpeg ici
        const filePathToSend = 'converti.mp4'
        const outputFilePath = './src/renderer/src/video/'+filePathToSend;
        const ffmpegProcess = ffmpeg(filePath)
          .output(outputFilePath)
          .on('start', (commandLine) => {
            console.log(`Conversion en cours: ${commandLine}`);
          })
          .on('progress', (progress) => {
            // Envoyer la progression à la fenêtre de rendu
            event.sender.send('electron:progressPercent', progress.percent);
          })
          .on('end', () => {
            console.log('Conversion réussie');
            event.sender.send('electron:progressPercent', "100");
            event.sender.send('electron:conversionFile', filePathToSend);
          })
          .on('error', (err) => {
            console.error(`Erreur lors de la conversion: ${err.message}`);
          })
          .run();
        })
    }
}