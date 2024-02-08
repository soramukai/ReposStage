import {BrowserWindow, ipcMain } from "electron";

export default class ipcRepertoire {
    static initialisation(_mainWindow:BrowserWindow): void {   
    const fs = require('fs');
    const path = require('path');

    ipcMain.on('electron:selectionDossier', (event) => {
      const { dialog } = require('electron');
      dialog.showOpenDialog(_mainWindow, {
        properties: ['openDirectory'],
      }).then((result) => {
        if (!result.canceled && result.filePaths.length > 0) {
          event.reply('electron:renvoyerUrlDossier', result.filePaths[0]);
        }
      });
    })

    ipcMain.on('load-video', (event, _filePath) => {
      const fileURL = `file://${path.resolve(_filePath)}`;
      _mainWindow.webContents.send('load-video', fileURL);
    });

    ipcMain.on('electron:supprimerElement',(event,_filePath)=>{
      fs.unlink(_filePath, err => {
        if (err) {
          console.error('Erreur lors de la suppression du fichier :', err);
          return;
        }
        console.log('Le fichier a été supprimé avec succès.');
      });
    })

    ipcMain.on('electron:copierElement',(event,_fichierSource,_cheminDestination)=>{

      fs.copyFile(_fichierSource, _cheminDestination, (err) => {
        if (err) {
          console.error("Erreur lors de la copie du fichier :", err);
          return;
        }
        console.log("Le fichier a été copié avec succès.");
        event.reply('electron:copieSucces')
      });
    })

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