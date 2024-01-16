import { ipcMain, dialog } from 'electron';
import * as fs from 'fs';

export default class IPCsRepository {
  static initialize(): void {
    ipcMain.handle('electron:selectRepos', async (event) => {
      try {
        console.log("AAA")
        const result = await dialog.showOpenDialog({
          title: 'Sélectionner un dossier',
          properties: ['openDirectory'],
        });
        console.log("BBB")

        if (!result.canceled) {
          const selectedFolderPath = result.filePaths[0];
          console.log("CCC")
          // Faire quelque chose avec le chemin du dossier sélectionné dans le processus principal
          return selectedFolderPath
        } else {
          console.log("CCC²²²")
          // L'utilisateur a annulé la sélection
          return null
        }
      } catch (error) {
        console.error('Erreur lors de la sélection du dossier:', error);
        throw error
      }
    });

ipcMain.handle('electron:getFolderContents', async (event, folder) => {
  try {
    const contents = fs.readdirSync(folder);
    return contents;
  } catch (error) {
    console.error('Error getting folder contents:', error);
    throw error;
  }
});
  }
  
}
