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
        ipcMain.on('electron:initialiserDatabase',async (event, _path: string): Promise<void>=>{
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
        //////////////////Fonction de comunication avec la base de donné avec typeorm//////////////////

        //Langue
        ipcMain.on('electron:creerLangue',async (event, _json:JsonPersonnageLangueCouleur): Promise<void>=>{
            if(await creerLangue(_json)){
                event.reply('electron:creationLangueReussi');
            }
        })
        ipcMain.handle('electron:chargerLangue',async (): Promise<EntiteeLangue[]>=>{
            return await chargerLangue();
        });    
        ipcMain.on('electron:modifierLangue',async (event, _idNomAModifier:number,_json:JsonPersonnageLangueCouleur): Promise<void>=>{
            if(await modifierLangue(_idNomAModifier,_json)){
                event.reply('electron:modificationLangueReussi');
            }
        })
        ipcMain.on('electron:supprimerLangue',async (event, _idLangueASupprimer:number): Promise<void>=>{
            if(await supprimerLangue(_idLangueASupprimer)){
                event.reply('electron:suppressionLangueReussi');
            }
        })

        //Version
        ipcMain.on('electron:creerVersion',async (event, _version:JsonVersion): Promise<void>=>{
            if(await creerVersion(_version)){
                event.reply('electron:creationVersionReussi');
            }
        })
        ipcMain.handle('electron:chargerVersion',async (): Promise<EntiteeVersion[]>=>{
            return await chargerVersion();
        });
        ipcMain.handle('electron:chargerVersionDeLangue',async (_, _langue:string): Promise<EntiteeVersion[]>=>{
            return await chargerVersionDeLangue(_langue);
        });
        ipcMain.on('electron:modifierVersion',async (event, _idVersionAModifier:number,_json:JsonVersion): Promise<void>=>{
            if(await modifierVersion(_idVersionAModifier,_json)){
                event.reply('electron:modificationVersionReussi')
            }
        })
        ipcMain.on('electron:supprimerVersion',async (event, _idVersionASupprimer:number): Promise<void>=>{
            if(await supprimerVersion(_idVersionASupprimer)){
                event.reply('electron:supressionVersionReussi')
            }
        })

        //Ligne
        ipcMain.on('electron:creerLigne',async (event, _json: JsonLigne): Promise<void>=>{
            if(await creerLigne(_json)){
                event.reply('electron:creationLigneReussi')
            }
        })
        ipcMain.handle('electron:chargerLigne',async (): Promise<EntiteeLigne[]>=>{
            return await chargerLigne();
        });
        ipcMain.on('electron:supprimerSousTitre',async (event, _uid:number): Promise<void>=>{
            if(await supprimerLigne(_uid)){
                event.reply('electron:suppressionLigneReussi')
            }
        })
        ipcMain.on('electron:modifierLigne',async (event, _uid: number,_json: JsonLigne): Promise<void>=>{
            if(await modifierLigne(_uid,_json)){
                event.reply('electron:modificationLigneReussi')
            }
        })
        ipcMain.on('electron:dupliquerLigne',async (event, _uid: number): Promise<void>=>{
            if(await dupliquerLigne(_uid)){
                event.reply('electron:duplicationLigneReussi')
            }
        })

        //Personnage
        ipcMain.on('electron:creerPersonnage',async (event, _json: JsonPersonnageLangueCouleur): Promise<void>=>{
            if(await creerPersonnage(_json)){
                event.reply('electron:creationPersonnageReussi')
            }
        });
        ipcMain.handle('electron:chargerPersonnage',async (): Promise<EntiteePersonnage[]>=>{
            return await chargerPersonnage();
        });
        ipcMain.on('electron:modifierPersonnage',async (event, _idNomAModifier:number,_json: JsonPersonnageLangueCouleur): Promise<void>=>{
            if(await modifierPersonnage(_idNomAModifier,_json)){
                event.reply('electron:modificationPersonnageReussi')
            }
        })
        ipcMain.on('electron:supprimerPersonnage',async (event, _idPersonnageASupprimer:number): Promise<void>=>{
            if(await supprimerPersonnage(_idPersonnageASupprimer)){
                event.reply('electron:suppressionPersonnageReussi')
            }
        })
        //Couleur
        ipcMain.on('electron:creerCouleur',async (event, _json: JsonPersonnageLangueCouleur): Promise<void>=>{
            if(await creerCouleur(_json)){
                event.reply('electron:creationCouleurReussi')
            }
        })
        ipcMain.handle('electron:chargerCouleur',async (): Promise<EntiteeCouleur[]>=>{
            return await chargerCouleur();
        });
    }
}