//@ts-nocheck
import { Entity, PrimaryGeneratedColumn, Column, OneToMany  } from 'typeorm';
import dbConnection from '../Class/dbConnection.ts';
import { json } from 'stream/consumers';

@Entity()
export class EntiteeCouleur{
    @PrimaryGeneratedColumn()
    couleur_id: number

    @Column()
    couleur_nom: string

}
export async function creerCouleur(_json: JSON){
    const table = dbConnection.dataSource.getRepository(EntiteeCouleur)
    let check = await table.find({where:{
        couleur_nom:_json.nom,
    }})
    if(check.length==0){
        const couleur = new EntiteeCouleur();
        if(_json.id!=-1){
            couleur.couleur_id=_json.id
        }
        couleur.couleur_nom=_json.nom;
        await table.save(couleur)
        console.log("La ligne à été sauvegardé")
    }
    else{
        console.log("La ligne existe deja")
    }
}
export async function chargerCouleur(){
    const table = dbConnection.dataSource.getRepository(EntiteeCouleur)
    return await table.find()
}

