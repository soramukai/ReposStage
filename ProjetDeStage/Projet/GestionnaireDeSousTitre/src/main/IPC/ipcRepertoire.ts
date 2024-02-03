import { BrowserWindow, ipcMain } from "electron";

export default class ipcRepertoire {
    static initialisation(_mainWindow:BrowserWindow): void {   

    ipcMain.on('electron:selectionDossier', (event) => {
        console.log("passe ICI")
        const { dialog } = require('electron');
        dialog.showOpenDialog(_mainWindow, {
          properties: ['openDirectory'],
        }).then((result) => {
          if (!result.canceled && result.filePaths.length > 0) {
            event.reply('electron:renvoyerUrlDossier', result.filePaths[0]);
          }
        });

        // ipcMain.on('electron:selectionVideo', (event, filePath) => {
        //   // Send the file path to the renderer process
        //   console.log(filePath)
        //   event.sender.send('electron:chargerVideo', filePath);
        // });

      })
    }
}