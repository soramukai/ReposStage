//@ts-nocheck
import {  Entity, PrimaryGeneratedColumn, JoinTable, Column,ManyToMany, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import dbConnection from '../Class/dbConnection';
import { json } from 'stream/consumers';

@Entity()
export class EntiteePersonnage {
    @PrimaryGeneratedColumn()
    personnage_id: number;

    @Column()
    personnage_nom: string;

}
export async function creerPersonnage(_json: JSON){
    const table = dbConnection.dataSource.getRepository(EntiteePersonnage)
    let check = await table.find({where:{
        personnage_nom: _json.nom,
    }})
    if(check.length==0){
        const perso = new EntiteePersonnage();
        perso.personnage_nom=_json.nom;

        await table.save(perso)
        console.log("La ligne à été sauvegardé")
    }
    else{
        console.log("La ligne existe deja")
    }
}

export async function chargerPersonnage(){
    const table = dbConnection.dataSource.getRepository(EntiteePersonnage)
    return await table.find()
}

export async function modifierPersonnage(_idAModifier:number,_json:JSON){
    const table = dbConnection.dataSource.getRepository(EntiteePersonnage)
    let check = await table.findOne({where:{
        personnage_id:_idAModifier
    }})

    if(check!=undefined){
        if(_json.nom!=""){
            check.personnage_nom=_json.nom;
        }
        await table.save(check)
        console.log("La ligne à été modifié")
    }
    else{
        console.log("La ligne n'existe pas")
    }
}

export async function supprimerPersonnage(_idASupprimer:number){
    const table=dbConnection.dataSource.getRepository(EntiteePersonnage)
    let check = await table.findOne() 
    
    if(check!=undefined){
        await table.remove(check)
        console.log("La ligne a été supprimé")
    }
    else{
        console.log("La ligne n'existe pas")
    }
}
