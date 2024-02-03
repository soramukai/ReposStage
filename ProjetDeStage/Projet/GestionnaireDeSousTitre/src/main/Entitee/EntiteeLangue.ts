//@ts-nocheck
import { Entity, PrimaryGeneratedColumn, Column  } from 'typeorm';
import dbConnection from '../Class/dbConnection.ts';
import { json } from 'stream/consumers';

@Entity()
export class EntiteeLangue{
    @PrimaryGeneratedColumn()
    langue_id: number

    @Column()
    langue_nom: string

}
export async function creerLangue(_json: JSON){
    const table = dbConnection.dataSource.getRepository(EntiteeLangue)
    let langue = await table.find({where:{
        langue_nom:_json.nom,
    }})
    if(langue.length==0){
        langue = new EntiteeLangue();
        if(_json.id!=-1){
            langue.langue_id=_json.id
        }
        langue.langue_nom=_json.nom;
        await table.save(langue)
        console.log("La ligne à été sauvegardé")
    }
    else{
        console.log("La ligne existe deja")
    }
}
export async function chargerLangue(){
    const table = dbConnection.dataSource.getRepository(EntiteeLangue)
    return await table.find()
}

export async function modifierLangue(_idAModifier:number,_json:JSON){

    console.log(_json.nom)
    const table = dbConnection.dataSource.getRepository(EntiteeLangue)
    let check = await table.findOne({where:{
        langue_id:_idAModifier,
    }})

    if(check!=undefined){
        check.langue_nom=_json.nom;

        await table.save(check)
        console.log("La ligne à été modifié")
    }
    else{
        console.log("La ligne n'existe pas")
    }
}

export async function supprimerLangue(_idASupprimer:number){
    const table=dbConnection.dataSource.getRepository(EntiteeLangue)
    let check = await table.findOne({where:{langue_id:_idASupprimer}}) 
    
    if(check!=undefined){
        await table.remove(check)
        console.log("La ligne a été supprimé")
    }
    else{
        console.log("La ligne n'existe pas")
    }
}
