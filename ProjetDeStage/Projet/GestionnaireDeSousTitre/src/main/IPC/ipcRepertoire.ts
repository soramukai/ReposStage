// @ts-ignore (define in dts)
import {BrowserWindow, ipcMain, dialog, OpenDialogueReturnValue } from "electron";
import * as fs from 'fs';
import * as path from 'path';

export default class ipcRepertoire {
    static initialisation(_mainWindow:BrowserWindow): void {   

    ipcMain.on('electron:selectionDossier', (event): void => {
      dialog.showOpenDialog(_mainWindow, {
        properties: ['openDirectory'],
      }).then((result: OpenDialogueReturnValue): void => {
        if (!result.canceled && result.filePaths.length > 0) {
          event.reply('electron:renvoyerUrlDossier', result.filePaths[0]);
        }
      });
    })

    ipcMain.on('load-video', (_, _filePath: string): void => {
      const fileURL = `file://${path.resolve(_filePath)}`;
      _mainWindow.webContents.send('load-video', fileURL);
    });

    ipcMain.on('electron:supprimerElement',(_, _filePath: string): void=>{
      fs.unlink(_filePath, err => {
        if (err) {
          console.error('Erreur lors de la suppression du fichier :', err);
        }else{
          console.log('Le fichier a été supprimé avec succès.');
        }
      });
    })

    ipcMain.on('electron:copierElement',(event, _fichierSource: string,_cheminDestination: string): void=>{

      fs.copyFile(_fichierSource, _cheminDestination, (err: NodeJS.ErrnoException | null): void => {
        if (err) {
          console.error("Erreur lors de la copie du fichier :", err);
        }else{
          console.log("Le fichier a été copié avec succès.");
          event.reply('electron:copieSucces')
        }
      });
    })

    ipcMain.on('electron:recapitulatifRepertoire',(event, _cheminRepertoire:string): void=>{
      try {
        // Liste le contenu du dossier
        const contenu = fs.readdirSync(_cheminRepertoire);
      
        // Filtrer les dossiers et les fichiers
        const dossiers: string[] = contenu.filter(element => {
          const cheminComplet: string = path.join(_cheminRepertoire, element);
          try {
            // Vérifier si le chemin est un dossier et si on a les permissions pour le lire
            return fs.statSync(cheminComplet).isDirectory() && !element.startsWith('System Volume Information');
          } catch (error) {
            // Ignorer les erreurs de permission ou d'accès
            return false;
          }
        });
      
        const fichiers: string[] = contenu.filter(element => {
          const cheminComplet: string = path.join(_cheminRepertoire, element);
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