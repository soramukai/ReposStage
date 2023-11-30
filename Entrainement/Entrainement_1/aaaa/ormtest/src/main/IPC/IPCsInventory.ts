import { ipcMain } from "electron";
import { saveData , showData , loadData , deleteRow , loadOneData , updateData} from "../entity/Item";


export default class IPCsInventory {

  static initialize(): void {
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
  }
}