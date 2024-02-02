//@ts-nocheck
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import {EntiteeLangue} from './EntiteeLangue.ts'
import dbConnection from '../Class/dbConnection.ts';
import { json } from 'stream/consumers';

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

    const table = dbConnection.dataSource.getRepository(EntiteeVersion)
    let check = await table.find({where:{
        version_nom: _version.nom,
    }})
    if(check.length==0){
        const version = new EntiteeVersion();
        version.version_nom=_version.nom;

        //Ajouter try catch sur la detection de foreignkey
        const langue =  dbConnection.dataSource.getRepository(EntiteeLangue)
        const langueRef = await langue.find({where:{langue_id:_version.langue}})
        version.langue = langueRef[0]
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
        const langueRef = await langue.find({where:{langue_id:_json.autre}})
        console.log(json)
        console.log(langueRef)

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