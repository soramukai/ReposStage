import { BrowserWindow, ipcMain } from "electron";
import {re} from './'
import { saveData , showData , loadData , deleteRow , loadOneData , updateData} from "../main/entity/Item";
import ffmpeg from 'fluent-ffmpeg'


export default class IPCs {

  static initialize(window: BrowserWindow): void {
    //////////////////Fonction de comunication avec la base de donné avec typeorm//////////////////
    ipcMain.on('electron:SaveData',async (event, _json:JSON)=>{
      saveData(_json);
    });

    ipcMain.on('electron:UpdateData',async (event, _json:JSON,_id:number)=>{
      console.log(_json+"\n"+_id)
      updateData(_json,_id);
    });
    
    ipcMain.handle('electron:LoadData',async ()=>{
      return loadData();
    });

    ipcMain.handle('electron:LoadOneData',async (event,_id)=>{
      return loadOneData(_id);
    });
    
    ipcMain.handle('electron:ShowData',async ()=>{
      showData();
    });

    ipcMain.handle('electron:DeleteRow',async (event,_id)=>{
     return deleteRow(_id);
    });

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