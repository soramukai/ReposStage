import {BrowserWindow, ipcMain } from "electron";

export default class ipcRepertoire {
    static initialisation(_mainWindow:BrowserWindow): void {   

    const fs = require('fs');
    const path = require('path');

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
    })

    // ipcMain.on('load-video', (event, filePath) => {
    //   const fileURL = `file://${path.resolve(filePath)}`;
    //   _mainWindow.webContents.send('load-video', fileURL);
    // });


    ipcMain.on('electron:recapitulatifRepertoire',(event,_cheminRepertoire:string)=>{
      try {
        // Liste le contenu du dossier
        const contenu = fs.readdirSync(_cheminRepertoire);
      
        // Filtrer les dossiers et les fichiers
        const dossiers = contenu.filter(element => {
          const cheminComplet = path.join(_cheminRepertoire, element);
          try {
            // Vérifier si le chemin est un dossier et si on a les permissions pour le lire
            return fs.statSync(cheminComplet).isDirectory() && !element.startsWith('System Volume Information');
          } catch (error) {
            // Ignorer les erreurs de permission ou d'accès
            return false;
          }
        });
      
        const fichiers = contenu.filter(element => {
          const cheminComplet = path.join(_cheminRepertoire, element);
          try {
            // Vérifier si le chemin est un fichier et si on a les permissions pour le lire
            return fs.statSync(cheminComplet).isFile();
          } catch (error) {
            // Ignorer les erreurs de permission ou d'accès
            return false;
          }
        });
        event.reply('electron:contenueDossier', dossiers,fichiers)
      } catch (error) {
        console.error('Erreur lors de la lecture du dossier :', error);
      }
      
      
    })

  }
}