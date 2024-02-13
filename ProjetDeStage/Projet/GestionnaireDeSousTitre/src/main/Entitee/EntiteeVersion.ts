//@ts-nocheck
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import {EntiteeLangue} from './EntiteeLangue.ts'
import dbConnection from '../Class/dbConnection.ts';

@Entity()
export class EntiteeVersion{
    @PrimaryGeneratedColumn()
    version_id: number

    @Column()
    version_nom: string

    @Column()
    langue_id: number

    @ManyToOne(() => EntiteeLangue,langue => langue.versions,{onDelete:"CASCADE"})
    @JoinColumn({name:'langue_id'})
    langue: EntiteeLangue;
}
export async function creerVersion(_version: JSON){

    console.log(_version)
    const table = dbConnection.dataSource.getRepository(EntiteeVersion)
    let check = await table.find({where:{
        version_nom: _version.nom,
    }})
    console.log(check)
    if(check.length==0){
        const version = new EntiteeVersion();
        version.version_nom=_version.nom;

        //Ajouter try catch sur la detection de foreignkey
        const langue =  dbConnection.dataSource.getRepository(EntiteeLangue)
        let langueRef = null
        langueRef = await langue.findOne({where:{langue_id:_version.langue_id}})
        version.langue = langueRef

        ///////////////////////
        await table.save(version)
        console.log("La ligne à été sauvegardé")
    }
    else{
        console.log("La ligne existe deja")
    }
}

export async function chargerVersion(){
    const table = dbConnection.dataSource.getRepository(EntiteeVersion)
    return await table.find({ relations: ['langue'] });
}

export async function chargerVersionDeLangue(_nomLangue: string):JSON {
    const tableVersion = dbConnection.dataSource.getRepository(EntiteeVersion);
    const tableLangue = dbConnection.dataSource.getRepository(EntiteeLangue);

    const langue = await tableLangue.findOne({ where: { langue_nom: _nomLangue } });
    if (langue) {
        const versions = await tableVersion.find({ where: { langue_id: langue.langue_id },relations: ['langue']});
        return versions;
    } else {
        return []; // Ou vous pouvez gérer différemment le cas où la langue n'est pas trouvée
    }
}

export async function modifierVersion(_idVersionAModifier:number,_json:JSON){
    console.log(_json.nom)
    console.log(_json.autre)
    const table = dbConnection.dataSource.getRepository(EntiteeVersion)
    let check = await table.findOne({where:{
        version_id:_idVersionAModifier,
    }})
    if(check!=undefined){
        if(_json.nom!=""){
            check.version_nom=_json.nom;
        }
        const langue =  dbConnection.dataSource.getRepository(EntiteeLangue)
        let langueRef = "" 
        langueRef = await langue.find({where:{langue_id:_json.langue_id}})



        if(langueRef.length>0){
            check.langue=langueRef[0]
        }
        console.log(check)
        await table.save(check)
        console.log("La ligne à été modifié")
    }
    else{
        console.log("La ligne n'existe pas")
    }
}

export async function supprimerVersion(_idASupprimer:number){
    const table=dbConnection.dataSource.getRepository(EntiteeVersion)
    let check = await table.findOne({where:{version_id:_idASupprimer}}) 
    
    if(check!=undefined){
        await table.remove(check)
        console.log("La ligne a été supprimé")
    }
    else{
        console.log("La ligne n'existe pas")
    }
}