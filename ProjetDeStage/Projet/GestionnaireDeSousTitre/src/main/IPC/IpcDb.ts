import { ipcMain } from "electron";
import { creerLigne, chargerLigne, supprimerLigne,modifierLigne,dupliquerLigne, EntiteeLigne } from '../Entitee/EntiteeLigne'
import { creerVersion , chargerVersion,chargerVersionDeLangue, modifierVersion,supprimerVersion, EntiteeVersion } from '../Entitee/EntiteeVersion'
import { creerLangue, chargerLangue, modifierLangue, supprimerLangue, EntiteeLangue } from "../Entitee/EntiteeLangue";
import { creerPersonnage,chargerPersonnage, modifierPersonnage, supprimerPersonnage, EntiteePersonnage } from "../Entitee/EntiteePersonnage";
import { creerCouleur, chargerCouleur, EntiteeCouleur } from '../Entitee/EntiteeCouleur'
import  dbConnection  from '../Class/dbConnection';
import {JsonPersonnageLangueCouleur,JsonLigne,JsonVersion} from "../Interface/InterfaceJson";

export default class IpcDb {

    static initialisation(): void {
        ipcMain.on('electron:initialiserDatabase',async (_, _path: string): Promise<void>=>{
            dbConnection.initialisationBaseDeDonnee(_path)
        })
        ipcMain.on('electron:dbSwitchOff',(): void=>{
            dbConnection.dbOn=false
        })
        ipcMain.on('electron:dbSwitchOn',(): void=>{
            dbConnection.dbOn=true
        })
        ipcMain.handle('electron:dbActive',(): boolean=>{
            return dbConnection.dbOn
        })
        //////////////////Fonction de comunication avec la base de donné avec typeorm//////////////////

        //Langue
        ipcMain.on('electron:creerLangue',async (_, _json:JsonPersonnageLangueCouleur): Promise<void>=>{
            await creerLangue(_json);
        })
        ipcMain.handle('electron:chargerLangue',async (): Promise<EntiteeLangue[]>=>{
            return await chargerLangue();
        });    
        ipcMain.on('electron:modifierLangue',async (_, _idNomAModifier:number,_json:JsonPersonnageLangueCouleur): Promise<void>=>{
            await modifierLangue(_idNomAModifier,_json);
        })
        ipcMain.on('electron:supprimerLangue',async (_, _idLangueASupprimer:number): Promise<void>=>{
            await supprimerLangue(_idLangueASupprimer);
        })

        //Version
        ipcMain.on('electron:creerVersion',async (_, _version:JsonVersion): Promise<void>=>{
            await creerVersion(_version);
        })
        ipcMain.handle('electron:chargerVersion',async (): Promise<EntiteeVersion[]>=>{
            return await chargerVersion();
        });
        ipcMain.handle('electron:chargerVersionDeLangue',async (_, _langue:string): Promise<EntiteeVersion[]>=>{
            return await chargerVersionDeLangue(_langue);
        });
        ipcMain.on('electron:modifierVersion',async (_, _idVersionAModifier:number,_json:JsonVersion): Promise<void>=>{
            await modifierVersion(_idVersionAModifier,_json);
        })
        ipcMain.on('electron:supprimerVersion',async (_, _idVersionASupprimer:number): Promise<void>=>{
            await supprimerVersion(_idVersionASupprimer);
        })

        //Ligne
        ipcMain.on('electron:creerLigne',async (_, _json: JsonLigne): Promise<void>=>{
            await creerLigne(_json);
        })
        ipcMain.handle('electron:chargerLigne',async (): Promise<EntiteeLigne[]>=>{
            return await chargerLigne();
        });
        ipcMain.on('electron:supprimerSousTitre',async (_, _uid:number): Promise<void>=>{
            await supprimerLigne(_uid);
        })
        ipcMain.on('electron:modifierLigne',async (_, _uid: number,_json: JsonLigne): Promise<void>=>{
            await modifierLigne(_uid,_json)
        })
        ipcMain.on('electron:dupliquerLigne',async (_, _uid: number): Promise<void>=>{
            await dupliquerLigne(_uid)
        })

        //Personnage
        ipcMain.on('electron:creerPersonnage',async (_, _json: JsonPersonnageLangueCouleur): Promise<void>=>{
            await creerPersonnage(_json);
        });
        ipcMain.handle('electron:chargerPersonnage',async (): Promise<EntiteePersonnage[]>=>{
            return await chargerPersonnage();
        });
        ipcMain.on('electron:modifierPersonnage',async (_, _idNomAModifier:number,_json: JsonPersonnageLangueCouleur): Promise<void>=>{
            await modifierPersonnage(_idNomAModifier,_json);
        })
        ipcMain.on('electron:supprimerPersonnage',async (_, _idPersonnageASupprimer:number): Promise<void>=>{
            await supprimerPersonnage(_idPersonnageASupprimer);
        })
        //Couleur
        ipcMain.on('electron:creerCouleur',async (_, _json: JsonPersonnageLangueCouleur): Promise<void>=>{
            await creerCouleur(_json);
        })
        ipcMain.handle('electron:chargerCouleur',async (): Promise<EntiteeCouleur[]>=>{
            return await chargerCouleur();
        });
    }
}