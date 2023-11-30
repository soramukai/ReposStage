import { ipcMain } from "electron";
import { saveData , showData , loadData , deleteRow , loadOneData , updateData} from "../entity/Line";

export default class IPCsSubtitle{
    static initialize(){
        ipcMain.on('subtitle:SaveData',async (event, _json:JSON)=>{
            saveData(_json);
          });
      
          ipcMain.on('subtitle:UpdateData',async (event, _json:JSON,_id:number)=>{
            console.log(_json+"\n"+_id)
            updateData(_json,_id);
          });
          
          ipcMain.handle('subtitle:LoadData',async ()=>{
            return loadData();
          });
      
          ipcMain.handle('subtitle:LoadOneData',async (event,_id)=>{
            return loadOneData(_id);
          });
          
          ipcMain.handle('subtitle:ShowData',async ()=>{
            showData();
          });
      
          ipcMain.handle('subtitle:DeleteRow',async (event,_id)=>{
           return deleteRow(_id);
          });
    }
}