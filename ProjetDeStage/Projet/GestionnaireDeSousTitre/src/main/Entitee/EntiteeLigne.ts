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
        console.log("La ligne à été sauvegardée")
        return true
    }
    else {
        console.error("La ligne existe déjà")
        return false
    }
}

export async function chargerLigne():Promise<EntiteeLigne[]>{
    const table: Repository<EntiteeLigne>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteeLigne)
    return table? await table.find({ relations: ["version", "version.langue","personnage"]}):[]
}

export async function modifierLigne(_uid:number,_json:JsonLigne):Promise<boolean>{
    const table: Repository<EntiteeLigne>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteeLigne)
    const oldLigne: EntiteeLigne|null|undefined = await table?.findOne({
        where: {
            ligne_id_interne:_uid
    }})

    if(oldLigne){
        const newLigne: EntiteeLigne = new EntiteeLigne()
        newLigne.ligne_id_interne = _uid
        newLigne.ligne_timecode_Debut = !_json.timeCodeDebut?oldLigne.ligne_timecode_Debut : _json.timeCodeDebut
        newLigne.ligne_timecode_Fin = !_json.timeCodeFin ? oldLigne.ligne_timecode_Fin : _json.timeCodeFin
        newLigne.ligne_z_index = !_json.zIndex ? oldLigne.ligne_z_index : _json.zIndex
        newLigne.ligne_texte = !_json.texte ? oldLigne.ligne_texte : _json.texte
        if(!_json.personnageId){
            newLigne.personnage_id = oldLigne.personnage_id
        }
        else if(_json.personnageId == -1){
            newLigne.personnage_id = undefined
        }
        else{
            newLigne.personnage_id = _json.personnageId
        }
        newLigne.version_id = !_json.versionId? oldLigne.version_id : _json.versionId
        newLigne.ligne_couleur = !_json.couleur? oldLigne.ligne_couleur : _json.couleur
        newLigne.ligne_couleur_hexa = !_json.couleurHexa ? oldLigne.ligne_couleur_hexa : _json.couleurHexa
        const oldId: number = oldLigne.ligne_id
        newLigne.ligne_id = !_json.id ? oldLigne.ligne_id : _json.id

        const check: EntiteeLigne | null | undefined = await table?.findOne({
            where:{
                ligne_id:newLigne.ligne_id, 
                version_id:newLigne.version_id
        }})

        if(check && newLigne.ligne_id_interne != check.ligne_id_interne){
            newLigne.ligne_id = await getMax('ligne_id')
        }
        const ligneASupp = await table?.findOne({
            where: {
                ligne_id_interne: _uid,
                ligne_id: oldId
        }})

        if(ligneASupp){
            await table?.remove(ligneASupp)
        }

        await table?.save(newLigne);
        console.log("La ligne à été sauvegardée")
        return true
    }
    else {
        console.error("La ligne existe déjà")
        return false
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
        console.log("La ligne a été supprimé")
        return true
    }
    else{
        console.error("La ligne n'existe pas")
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
        console.log("La ligne à été sauvegardée")
        return true
    }
    else {
        console.error("La ligne existe déjà")
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
