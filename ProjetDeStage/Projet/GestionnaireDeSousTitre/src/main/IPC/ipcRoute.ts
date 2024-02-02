import { ipcMain,BrowserWindow } from "electron";

export default class ipcRoute {

  static initialize(): void {
    //////////////////Fonction de comunication avec la base de donné avec typeorm//////////////////
    ipcMain.on('electron:gestionLangue', (event, data) => {
        let nouvelleFenetre = new BrowserWindow({
          width: 800,
          height: 600,
          webPreferences: {
            nodeIntegration: true,
          },
        });
    
        // Chargez le composant cible dans la nouvelle fenêtre
        nouvelleFenetre.loadFile('./src/renderer/src/components/EcranModificationLVA.vue');
    
        // Optionnel : Ouvrez les outils de développement
        nouvelleFenetre.webContents.openDevTools();
    
        // Envoyez les données à la nouvelle fenêtre
        nouvelleFenetre.webContents.send('electron:gestionLangue', data);
      });

  }
}