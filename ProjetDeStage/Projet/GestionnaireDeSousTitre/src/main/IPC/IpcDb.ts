//@ts-nocheck
import { ipcMain } from "electron";
import { creerLigne, chargerLigne, supprimerLigne,modifierLigne } from '../Entitee/EntiteeLigne'
import { creerVersion , chargerVersion,chargerVersionDeLangue, modifierVersion,supprimerVersion } from '../Entitee/EntiteeVersion'
import { creerLangue, chargerLangue, modifierLangue, supprimerLangue } from "../Entitee/EntiteeLangue";
import { creerPersonnage,chargerPersonnage, modifierPersonnage, supprimerPersonnage } from "../Entitee/EntiteePersonnage";
import { creerCouleur, chargerCouleur } from '../Entitee/EntiteeCouleur'
import  dbConnection  from '../Class/dbConnection.ts';

export default class IpcDb {

    static initialisation(): void {
        ipcMain.on('electron:initialiserDatabase',async (event,_path)=>{
            console.log("passe par ipcDb.ts")
            dbConnection.initialisationBaseDeDonnee(_path)
        })
        ipcMain.on('electron:dbSwitchOff',async (event)=>{
            dbConnection.dbOn=false
        })
        ipcMain.on('electron:dbSwitchOn',async (event)=>{
            dbConnection.dbOn=true
        })
        ipcMain.handle('electron:dbActive',async (event)=>{
            return await dbConnection.dbOn
        })
        //////////////////Fonction de comunication avec la base de donné avec typeorm//////////////////

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
        ipcMain.handle('electron:chargerVersionDeLangue',async (event,_langue:string)=>{
            const t = await chargerVersionDeLangue(_langue);
            return t;
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
        ipcMain.on('electron:supprimerSousTitre',async (event,_uid)=>{
            await supprimerLigne(_uid);
        })
        ipcMain.on('electron:modifierLigne',async (event,_uid,_json)=>{
            await modifierLigne(_uid,_json)
        })

        //Personnage
        ipcMain.on('electron:creerPersonnage',async (event, _json:JSON)=>{
            await creerPersonnage(_json);
        });
        ipcMain.handle('electron:chargerPersonnage',async ()=>{
            return await chargerPersonnage();
        });
        ipcMain.on('electron:modifierPersonnage',async (event,_idNomAModifier:number,_json:JSON)=>{
            console.log(_json)
            await modifierPersonnage(_idNomAModifier,_json);
        })
        ipcMain.on('electron:supprimerPersonnage',async (event,_idPersonnageASupprimer:number)=>{
            await supprimerPersonnage(_idPersonnageASupprimer);
        })
        //Couleur
        ipcMain.on('electron:creerCouleur',async (event,_json:JSON)=>{
            await creerCouleur(_json);
        })
        ipcMain.handle('electron:chargerCouleur',async ()=>{
            return await chargerCouleur();
        });
    }
}