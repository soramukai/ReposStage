import { ipcMain } from "electron";
import { creerPersonnage,chargerPersonnage, modifierPersonnage, supprimerPersonnage } from "../Entitee/EntiteePersonnage";
import { creerLangue, chargerLangue, modifierLangue, supprimerLangue } from "../Entitee/EntiteeLangue";
import { creerVersion , chargerVersion, modifierVersion,supprimerVersion } from '../Entitee/EntiteeVersion'
import { creerLigne, chargerLigne } from '../Entitee/EntiteeLigne'
import { creerCouleur, chargerCouleur } from '../Entitee/EntiteeCouleur'

export default class IpcDb {

  static initialisation(): void {
    //////////////////Fonction de comunication avec la base de donné avec typeorm//////////////////
    //Personnage
    ipcMain.on('electron:creerPersonnage',async (event, _json:JSON)=>{
        await creerPersonnage(_json);
    });
    ipcMain.handle('electron:chargerPersonnage',async ()=>{
        return await chargerPersonnage();
    });
    ipcMain.on('electron:modifierPersonnage',async (event,_idNomAModifier:number,_json:JSON)=>{
        await modifierPersonnage(_idNomAModifier,_json);
    })
    ipcMain.on('electron:supprimerPersonnage',async (event,_idPersonnageASupprimer:number)=>{
        await supprimerPersonnage(_idPersonnageASupprimer);
    })

    //Langue
    ipcMain.on('electron:creerLangue',async (event,_json:JSON)=>{
        await creerLangue(_json);
    })
    ipcMain.handle('electron:chargerLangue',async ()=>{
        return await chargerLangue();
    });    
    ipcMain.on('electron:modifierLangue',async (event,_idNomAModifier:number,_json:JSON)=>{
        await modifierLangue(_idNomAModifier,_json);
    })
    ipcMain.on('electron:supprimerLangue',async (event,_idLangueASupprimer:number)=>{
        await supprimerLangue(_idLangueASupprimer);
    })

    //Version
    ipcMain.on('electron:creerVersion',async (event,_version:JSON)=>{
        await creerVersion(_version);
    })
    
    ipcMain.handle('electron:chargerVersion',async ()=>{
        return await chargerVersion();
    });
    ipcMain.on('electron:modifierVersion',async (event,_idVersionAModifier:number,_json:JSON)=>{
        await modifierVersion(_idVersionAModifier,_json);
    })
    ipcMain.on('electron:supprimerVersion',async (event,_idVersionASupprimer:number)=>{
        await supprimerVersion(_idVersionASupprimer);
    })

    //Ligne
    ipcMain.on('electron:creerLigne',async (event,_json:JSON)=>{
        await creerLigne(_json);
    })
    ipcMain.handle('electron:chargerLigne',async ()=>{
        return await chargerLigne();
    });

    //Couleur
    ipcMain.on('electron:creerCouleur',async (event,_json:JSON)=>{
        await creerCouleur(_json);
    })
    ipcMain.handle('electron:chargerCouleur',async ()=>{
        return await chargerCouleur();
    });
  }
}