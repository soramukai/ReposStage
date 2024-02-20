import { ipcMain,IpcMainEvent } from "electron";
import { creerLigne, chargerLigne, supprimerLigne,modifierLigne,dupliquerLigne, EntiteeLigne } from '../Entitee/EntiteeLigne'
import { creerVersion , chargerVersion,chargerVersionDeLangue, modifierVersion,supprimerVersion, EntiteeVersion } from '../Entitee/EntiteeVersion'
import { creerLangue, chargerLangue, modifierLangue, supprimerLangue, EntiteeLangue } from "../Entitee/EntiteeLangue";
import { creerPersonnage,chargerPersonnage, modifierPersonnage, supprimerPersonnage, EntiteePersonnage } from "../Entitee/EntiteePersonnage";
import { creerCouleur, chargerCouleur, EntiteeCouleur } from '../Entitee/EntiteeCouleur'
import {JsonPersonnageLangueCouleur,JsonLigne,JsonVersion} from "../Interface/InterfaceJson";

export default class IpcEntitee {
    static initialisation(): void {
    
        //Langue
        ipcMain.on('electron:creerLangue',async (event: IpcMainEvent, _json:JsonPersonnageLangueCouleur): Promise<void>=>{
            if(await creerLangue(_json)){
                event.reply('electron:creationLangueReussi');
            }
        })
        ipcMain.handle('electron:chargerLangue',async (): Promise<EntiteeLangue[]>=>{
            return await chargerLangue();
        });    
        ipcMain.on('electron:modifierLangue',async (event: IpcMainEvent, _idNomAModifier:number,_json:JsonPersonnageLangueCouleur): Promise<void>=>{
            if(await modifierLangue(_idNomAModifier,_json)){
                event.reply('electron:modificationLangueReussi');
            }
        })
        ipcMain.on('electron:supprimerLangue',async (event: IpcMainEvent, _idLangueASupprimer:number): Promise<void>=>{
            if(await supprimerLangue(_idLangueASupprimer)){
                event.reply('electron:suppressionLangueReussi');
            }
        })
        //Version
        ipcMain.on('electron:creerVersion',async (event: IpcMainEvent, _version:JsonVersion): Promise<void>=>{
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
        ipcMain.on('electron:modifierVersion',async (event: IpcMainEvent, _idVersionAModifier:number,_json:JsonVersion): Promise<void>=>{
            if(await modifierVersion(_idVersionAModifier,_json)){
                event.reply('electron:modificationVersionReussi')
            }
        })
        ipcMain.on('electron:supprimerVersion',async (event: IpcMainEvent, _idVersionASupprimer:number): Promise<void>=>{
            if(await supprimerVersion(_idVersionASupprimer)){
                event.reply('electron:supressionVersionReussi')
            }
        })

        //Ligne
        /**
         * Écoute l'événement 'electron:creerLigne' et gère la création d'une ligne de sous-titre.
         * @param event L'événement IPC envoyé par le processus de rendu.
         * @param _ligne Les données JSON nécessaires à la création de la ligne de sous-titre.
         * @returns Une promesse résolue si la création de la ligne est réussie, sinon une promesse rejetée.
         */
        ipcMain.on('electron:creerLigne',async (event: IpcMainEvent, _ligne: JsonLigne): Promise<void>=>{
            if(await creerLigne(_ligne)){
                event.reply('electron:creationLigneReussi')
            }
        })
        /**
         * Gère la requête 'electron:chargerLigne' et renvoie les lignes de sous-titres récuperé de la base de données .
         * @returns Une promesse résolue contenant les entités de ligne chargées.
         */
        ipcMain.handle('electron:chargerLigne',async (): Promise<EntiteeLigne[]>=>{
            return await chargerLigne();
        });
        /**
         * Écoute l'événement 'electron:supprimerSousTitre' et gère la suppression d'une ligne de sous-titre.
         * @param event L'événement IPC envoyé par le processus de rendu.
         * @param _uid L'identifiant unique de la ligne de sous-titre à supprimer.
         * @returns Une promesse résolue si la suppression de la ligne est réussie, sinon une promesse rejetée.
         */
        ipcMain.on('electron:supprimerSousTitre',async (event: IpcMainEvent, _uid:number): Promise<void>=>{
            if(await supprimerLigne(_uid)){
                event.reply('electron:suppressionLigneReussi')
            }
        })
        /**
         * Écoute l'événement 'electron:modifierLigne' et gère la modification d'une ligne de sous-titre.
         * @param event L'événement IPC envoyé par le processus de rendu.
         * @param _uid L'identifiant unique de la ligne de sous-titre à modifier.
         * @param _ligne Les nouvelles données JSON pour la ligne de sous-titre à modifiée.
         * @returns Une promesse résolue si la modification de la ligne est réussie, sinon une promesse rejetée.
         */
        ipcMain.on('electron:modifierLigne',async (event: IpcMainEvent, _uid: number,_ligne: JsonLigne): Promise<void>=>{
            //Apelle de la methode modifierLigne et verification de son retour boolean
            if(await modifierLigne(_uid,_ligne)){
                //Si le retour est true: renvoie d'une requette interceptable par la vue qui en à fait l'apelle
                event.reply('electron:modificationLigneReussi')
            }
        })
        /**
         * Écoute l'événement 'electron:dupliquerLigne' et gère la duplication d'une ligne de sous-titre.
         * @param event L'événement IPC envoyé par le processus de rendu.
         * @param _uid L'identifiant unique de la ligne de sous-titre à dupliquer.
         * @returns Une promesse résolue si la duplication de la ligne est réussie, sinon une promesse rejetée.
         */
        ipcMain.on('electron:dupliquerLigne',async (event: IpcMainEvent, _uid: number): Promise<void>=>{
            if(await dupliquerLigne(_uid)){
                event.reply('electron:duplicationLigneReussi')
            }
        })

        //Personnage
        ipcMain.on('electron:creerPersonnage',async (event: IpcMainEvent, _json: JsonPersonnageLangueCouleur): Promise<void>=>{
            if(await creerPersonnage(_json)){
                event.reply('electron:creationPersonnageReussi')
            }
        });
        ipcMain.handle('electron:chargerPersonnage',async (): Promise<EntiteePersonnage[]>=>{
            return await chargerPersonnage();
        });
        ipcMain.on('electron:modifierPersonnage',async (event: IpcMainEvent, _idNomAModifier:number,_json: JsonPersonnageLangueCouleur): Promise<void>=>{
            if(await modifierPersonnage(_idNomAModifier,_json)){
                event.reply('electron:modificationPersonnageReussi')
            }
        })
        ipcMain.on('electron:supprimerPersonnage',async (event: IpcMainEvent, _idPersonnageASupprimer:number): Promise<void>=>{
            if(await supprimerPersonnage(_idPersonnageASupprimer)){
                event.reply('electron:suppressionPersonnageReussi')
            }
        })
        //Couleur
        ipcMain.on('electron:creerCouleur',async (event: IpcMainEvent, _json: JsonPersonnageLangueCouleur): Promise<void>=>{
            if(await creerCouleur(_json)){
                event.reply('electron:creationCouleurReussi')
            }
        })
        ipcMain.handle('electron:chargerCouleur',async (): Promise<EntiteeCouleur[]>=>{
            return await chargerCouleur();
        });
    }
}