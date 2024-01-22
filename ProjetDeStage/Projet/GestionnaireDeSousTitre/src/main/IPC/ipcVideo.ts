import { ipcMain } from "electron";


export default class ipcVideo {

  static initialize(): void {
  ipcMain.on('electron:getVideo', (event, filePath) => {
    // Send the file path to the renderer process
    console.log(filePath)
    event.sender.send('load-video', filePath);
  });
  }
}