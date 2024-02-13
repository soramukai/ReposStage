//@ts-nocheck
import dbConnection from '../Class/dbConnection.ts';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EntiteeCouleur } from './EntiteeCouleur';
import { EntiteeVersion } from './EntiteeVersion';
import { EntiteePersonnage } from './EntiteePersonnage';

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
    personnage_id: number|undefined;

    @ManyToOne(() => EntiteeVersion, version => version.lignes,{onDelete:"CASCADE"})
    @JoinColumn({ name: 'version_id' })
    version: EntiteeVersion;

    @ManyToOne(() => EntiteePersonnage, personnage => personnage.lignes,{onDelete:"CASCADE"})
    @JoinColumn({ name: 'personnage_id' })
    personnage: EntiteePersonnage;
}

export async function creerLigne(_json: JSON){

    const table = dbConnection.dataSource.getRepository(EntiteeLigne)
    if(_json.id==undefined||_json.id==''){
        _json.id=-1
    }
    let check = await table.find({where: {
        ligne_id: _json["id"],
        version_id: _json["versionId"]
    }})

    if(check.length==0){
        const ligne = new EntiteeLigne();
        if(_json.id==-1){
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

        const version = dbConnection.dataSource.getRepository(EntiteeVersion)
        const versionRef = await version.find({ where: { version_id: _json.versionId } })

        const personnage = dbConnection.dataSource.getRepository(EntiteePersonnage)
        const personnageRef = await personnage.find({ where: { personnage_id: _json.personnageId } })
        ligne.version = versionRef[0];
        ligne.personnage = personnageRef[0];

        ligne.ligne_id_interne = await getMax('ligne_id_interne')
        await table.save(ligne);
        console.log("La ligne à été sauvegardée")
    }
    else {
        console.error("La ligne existe déjà")
    }
}

export async function chargerLigne(){
    const table = dbConnection.dataSource.getRepository(EntiteeLigne)
    return await table.find({ relations: ["version", "version.langue","personnage"]})
}

export async function modifierLigne(_uid:number,_json:JSON) {
    const table = dbConnection.dataSource.getRepository(EntiteeLigne)

    const oldLigne = await table.findOne({where: {
        ligne_id_interne:_uid
    }})

    if(oldLigne){
        const newLigne = new EntiteeLigne()
        newLigne.ligne_id_interne = _uid
        newLigne.ligne_timecode_Debut = _json.timeCodeDebut==''?oldLigne.ligne_timecode_Debut:_json.timeCodeDebut
        newLigne.ligne_timecode_Fin = _json.timeCodeFin==''?oldLigne.ligne_timecode_Fin:_json.timeCodeFin
        newLigne.ligne_z_index = _json.zIndex==''?oldLigne.ligne_z_index:_json.zIndex
        newLigne.ligne_texte = _json.texte==''?oldLigne.ligne_texte:_json.texte
        if(_json.personnageId==''){
            newLigne.personnage_id=oldLigne.personnage_id
        }
        else if(_json.personnageId=='Aucun'){
            newLigne.personnage_id=undefined
        }
        else{
            newLigne.personnage_id=_json.personnageId
        }
        newLigne.version_id = _json.versionId==''?oldLigne.version_id:_json.versionId
        newLigne.ligne_couleur = _json.couleur==''?oldLigne.ligne_couleur:_json.couleur
        newLigne.ligne_couleur_hexa = _json.couleurHexa==''?oldLigne.ligne_couleur_hexa:_json.couleurHexa
        const oldId = oldLigne.ligne_id
        newLigne.ligne_id = (_json.id==''||_json.id==undefined)?oldLigne.ligne_id:_json.id

        const check = await table.findOne({where:{
            ligne_id:newLigne.ligne_id, 
            version_id:newLigne.version_id}})


        if(check && newLigne.ligne_id_interne!=check.ligne_id_interne){
            newLigne.ligne_id= await getMax('ligne_id')
        }
        const ligneASupp = await table.findOne({where: {
            ligne_id_interne:_uid,
            ligne_id:oldId
        }})

        const version = await dbConnection.dataSource.getRepository(EntiteeVersion)
        const versionRef = await version.find({ where: { version_id: newLigne.version_id } })
        newLigne.version = await versionRef[0];

        if(newLigne.personnage_id!=undefined){
            const personnage =await dbConnection.dataSource.getRepository(EntiteePersonnage)
            const personnageRef = await personnage.find({ where: { personnage_id: newLigne.personnage_id } })
            newLigne.personnage = await personnageRef[0];
        }

        if(ligneASupp){
            await table.remove(ligneASupp)
        }

        await table.save(newLigne);
        console.log("La ligne à été sauvegardée")

    }
    else {
        console.error("La ligne existe déjà")
    }
}

export async function supprimerLigne(_idASupprimer){
    const table=dbConnection.dataSource.getRepository(EntiteeLigne)
    let check = await table.findOne({where:{ligne_id_interne:_idASupprimer}}) 
    
    if(check!=undefined){
        await table.remove(check)
        console.log("La ligne a été supprimé")
    }
    else{
        console.error("La ligne n'existe pas")
    }
}

export async function dupliquerLigne(_uid){
    const table = dbConnection.dataSource.getRepository(EntiteeLigne)

    let check = await table.find({where: {
        ligne_id_interne: _uid
    }})

    if(check.length>0){
        check=check[0]
        const ligne = new EntiteeLigne();
        ligne.ligne_id = await getMax('ligne_id')
        ligne.ligne_timecode_Debut = check.ligne_timecode_Debut;
        ligne.ligne_timecode_Fin = check.ligne_timecode_Fin;
        ligne.ligne_z_index = check.ligne_z_index;
        ligne.ligne_texte = check.ligne_texte;
        ligne.ligne_couleur = check.ligne_couleur;
        ligne.ligne_couleur_hexa = check.ligne_couleur_hexa;

        const version = dbConnection.dataSource.getRepository(EntiteeVersion)
        const versionRef = await version.find({ where: { version_id: check.version_id } })

        const personnage = dbConnection.dataSource.getRepository(EntiteePersonnage)
        const personnageRef = await personnage.find({ where: { personnage_id: check.personnage_id } })

        ligne.version = versionRef[0];
        ligne.personnage = personnageRef[0]

        ligne.ligne_id_interne = await getMax('ligne_id_interne')
        await table.save(ligne);
        console.log("La ligne à été sauvegardée")
    }
    else {
        console.error("La ligne existe déjà")
    }
}

async function getMax(_entre: string): Promise<number> {
    const table = dbConnection.dataSource.getRepository(EntiteeLigne);
    const maxIdResult = await table.createQueryBuilder("ligne")
        .select("MAX(ligne." + _entre + ")", "maxId")
        .getRawOne();

    const maxIdString: string = maxIdResult.maxId;
    const maxId: number = parseInt(maxIdString);

    if (!isNaN(maxId)) {
        return maxId + 1;
    } else {
        // Si la valeur maximale est NaN (par exemple, si aucune entrée n'est trouvée), retourner 1
        return 1;
    }
}
