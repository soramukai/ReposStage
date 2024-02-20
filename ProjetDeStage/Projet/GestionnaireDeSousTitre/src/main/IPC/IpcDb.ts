import { ipcMain,IpcMainEvent } from "electron";
import  dbConnection  from '../Class/dbConnection';

export default class IpcDb {

    static initialisation(): void {
        ipcMain.on('electron:initialiserDatabase',async (event: IpcMainEvent, _path: string): Promise<void>=>{
            await dbConnection.recupererDataSource(_path)
            if(dbConnection.dbOn){
                event.reply('electron:connectionReussi')
            }
        })
        ipcMain.on('electron:fermerDatabase',async (_): Promise<void>=>{
            await dbConnection.fermetureConnectionBaseDeDonnee()
        })
        ipcMain.handle('electron:dbActive',(): boolean=>{
            return dbConnection.dbOn
        })
    }
}