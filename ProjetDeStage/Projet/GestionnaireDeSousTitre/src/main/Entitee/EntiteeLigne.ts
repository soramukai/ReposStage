import dbConnection from '../Class/dbConnection';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, Repository } from 'typeorm';
import { EntiteeVersion } from './EntiteeVersion';
import { EntiteePersonnage } from './EntiteePersonnage';
import {JsonLigne} from '../Interface/InterfaceJson';

@Entity()
export class EntiteeLigne {
    @Column()
    ligne_id_interne: number;

    @PrimaryColumn()
    ligne_id: number;

    @Column()
    ligne_timecode_Debut: string;

    @Column()
    ligne_timecode_Fin: string;

    @Column()
    ligne_z_index: number;

    @Column()
    ligne_texte: string;

    @PrimaryColumn()
    version_id: number;

    @Column()
    ligne_couleur: string;

    @Column()
    ligne_couleur_hexa: string;

    @Column({ nullable: true })
    personnage_id: number|undefined|null;

    @ManyToOne(() => EntiteeVersion, version => version.lignes,{onDelete:"CASCADE",nullable:false})
    @JoinColumn({ name: 'version_id' })
    version: EntiteeVersion;

    @ManyToOne(() => EntiteePersonnage, personnage => personnage.lignes,{onDelete: "SET NULL",nullable:true})
    @JoinColumn({ name: 'personnage_id' })
    personnage: EntiteePersonnage|undefined|null;
}

export async function creerLigne(_json: JsonLigne):Promise<boolean>{
    const table: Repository<EntiteeLigne>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteeLigne)
    if(!_json.id){
        _json.id =- 1
    }
    const check:EntiteeLigne|null|undefined = await table?.findOne({
        where: {
            ligne_id: _json["id"],
            version_id: _json["versionId"]
    }})
    if(!check){
        const ligne:EntiteeLigne = new EntiteeLigne();
        if(_json.id == -1){
            ligne.ligne_id = await getMax('ligne_id')
        }else{
            ligne.ligne_id =_json.id
        }
        ligne.ligne_timecode_Debut = _json.timeCodeDebut;
        ligne.ligne_timecode_Fin = _json.timeCodeFin;
        ligne.ligne_z_index = _json.zIndex;
        ligne.ligne_texte = _json.texte;
        ligne.ligne_couleur = _json.couleur;
        ligne.ligne_couleur_hexa = _json.couleurHexa;
        ligne.version_id=_json.versionId
        ligne.personnage_id=_json.personnageId
        ligne.ligne_id_interne = await getMax('ligne_id_interne')

        await table?.save(ligne);
        //console.log("La ligne à été sauvegardée")
        return true
    }
    else {
        //console.error("La ligne existe déjà")
        return false
    }
}

export async function chargerLigne():Promise<EntiteeLigne[]>{
    const table: Repository<EntiteeLigne>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteeLigne)
    return table? await table.find({ relations: ["version", "version.langue","personnage"]}):[]
}

/**
 * Modifie une ligne de sous-titre existante dans la base de données.
 * @param _uid L'identifiant unique de la ligne à modifier.
 * @param _ligne Les nouvelles données JSON pour la ligne.
 * @returns Une promesse résolue avec la valeur true si la modification est réussie, 
   sinon une promesse résolue avec la valeur false.
 */
export async function modifierLigne(_uid:number,_ligne:JsonLigne):Promise<boolean>{
    try{
        //Recuperation de la table de la base de données dedié aux sous-titres
        const table: Repository<EntiteeLigne>|undefined=(await   
        dbConnection.recupererDataSource())?.getRepository(EntiteeLigne)
        //Recuperation de la ligne existante grace à l'identifiant unique "_uid"
        const oldLigne: EntiteeLigne|null|undefined = await table?.findOne({
            where: {
                ligne_id_interne:_uid
        }})
        //Si la ligne existante a bien été récuperé
        if(oldLigne){
            //Création d'une nouvelle instance d'entitée vierge
            const newLigne: EntiteeLigne = new EntiteeLigne()
            //Modification des attributs de l'entité en fonction des elements du Json
            newLigne.ligne_id_interne = _uid
            newLigne.ligne_timecode_Debut = !_ligne.timeCodeDebut ? oldLigne.ligne_timecode_Debut : _ligne.timeCodeDebut
            newLigne.ligne_timecode_Fin = !_ligne.timeCodeFin ? oldLigne.ligne_timecode_Fin : _ligne.timeCodeFin
            newLigne.ligne_z_index = !_ligne.zIndex ? oldLigne.ligne_z_index : _ligne.zIndex
            newLigne.ligne_texte = !_ligne.texte ? oldLigne.ligne_texte : _ligne.texte
            newLigne.ligne_couleur = !_ligne.couleur ? oldLigne.ligne_couleur : _ligne.couleur
            newLigne.ligne_couleur_hexa = !_ligne.couleurHexa ? oldLigne.ligne_couleur_hexa : _ligne.couleurHexa
            //Si le json ne contient aucune valeur pour l'id du personnage, alors celui ci ne sera pas modifié
            newLigne.personnage_id = await recupererIdPersonnage(_ligne.personnageId,oldLigne.personnage_id)
            //Si le json contient un id, celui ci est recherché dans la table version et assigné si trouvé
            newLigne.version_id = await recupererIdVersion(_ligne.versionId,oldLigne.version_id);

            const oldId: number = oldLigne.ligne_id
            newLigne.ligne_id = !_ligne.id ? oldLigne.ligne_id : _ligne.id
            //Verification de lexistance d'une paire d'id|version identique a une autre ligne
            const check: EntiteeLigne | null | undefined = await table?.findOne({
              where:{
                ligne_id:newLigne.ligne_id,
                version_id:newLigne.version_id
              }})
            //Si une paire identique existe, l'id sera remplacé par l'id suivant dans la table (Max+1)
            if(check && newLigne.ligne_id_interne != check.ligne_id_interne){
              newLigne.ligne_id = await getMax('ligne_id')
            }
            //Suppression de l'ancienne ligne
            //Necessaire pour la modification d'id
            const ligneASupp = await table?.findOne({
              where: {
                ligne_id_interne: _uid,
                ligne_id: oldId
              }
            })
            //Sauvegarde de la ligne modifié
            if(ligneASupp){
                await table?.remove(ligneASupp)
            }
            await table?.save(newLigne);
            console.log("La ligne à été modifié")
            return true
        }
        else {
            //console.error("La ligne existe déjà")
            return false
        }
    }catch(error){
        //console.error("Erreur lors de la modification de la ligne")
        return false
    }
}

async function recupererIdPersonnage(_newId: number|null|undefined,_oldId: number|null|undefined): Promise<number|null|undefined>{
    if(!_newId){
        return _oldId;
    }
    //Si le json contient un id egal a -1 pour le personnage, celui ci sera deréférencé
    else if(_newId == -1){
        return undefined;
    }
    //Si le json contient un id, celui ci est recherché dans la table personnage et assigné si trouvé
    else{
        const personnageTable: Repository<EntiteePersonnage>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteePersonnage)
        const personnageRef: EntiteePersonnage|null|undefined = await personnageTable?.findOne({where:{
            personnage_id:_newId}
        })
        return personnageRef?_newId:_oldId;
    }
}

async function recupererIdVersion(_newId: number|null|undefined,_oldId: number): Promise<number>{
    if(_newId){
        const versionTable: Repository<EntiteeVersion>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteeVersion);
        const versionRef: EntiteeVersion|null|undefined = await versionTable?.findOne({
            where:{version_id:_newId}
        });
        if(versionRef){
            return _newId;
        }
        //Sinon il ne changera pas
        else{
            return _oldId;
        }
    }else{
        return _oldId;
    }
}

export async function supprimerLigne(_idASupprimer: number): Promise<boolean>{
    const table: Repository<EntiteeLigne>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteeLigne)
    let check: EntiteeLigne|null|undefined = await table?.findOne({
        where:{
            ligne_id_interne:_idASupprimer
    }}) 
    
    if(check){
        await table?.remove(check)
        //console.log("La ligne a été supprimé")
        return true
    }
    else{
        //console.error("La ligne n'existe pas")
        return false
    }
}

export async function dupliquerLigne(_uid: number): Promise<boolean>{    
    const table: Repository<EntiteeLigne>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteeLigne)
    let check: EntiteeLigne|null|undefined = await table?.findOne({
        where: {
            ligne_id_interne: _uid
    }});
    if(check){
        const ligne: EntiteeLigne = new EntiteeLigne();
        ligne.ligne_timecode_Debut = check.ligne_timecode_Debut;
        ligne.ligne_timecode_Fin = check.ligne_timecode_Fin;
        ligne.ligne_z_index = check.ligne_z_index;
        ligne.ligne_texte = check.ligne_texte;
        ligne.ligne_couleur = check.ligne_couleur;
        ligne.ligne_couleur_hexa = check.ligne_couleur_hexa;
        ligne.version_id = check.version_id
        ligne.personnage_id = check.personnage_id

        ligne.ligne_id = await getMax('ligne_id');
        ligne.ligne_id_interne = await getMax('ligne_id_interne')

        await table?.save(ligne);
        //console.log("La ligne à été sauvegardée")
        return true
    }
    else {
        //console.error("La ligne existe déjà")
        return false
    }
}

async function getMax(_mnemonique: string): Promise<number> {
    const table: Repository<EntiteeLigne>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteeLigne);
    let maxId: number = 0
    const maxIdResult: {maxId: number}|undefined = await table?.createQueryBuilder("ligne")
        .select("MAX(ligne." + _mnemonique + ")", "maxId")
        .getRawOne();
    if(maxIdResult){
        maxId = maxIdResult.maxId;
    }

    if (!isNaN(maxId)) {
        return maxId + 1;
    } else {
        return 1;
    }
}