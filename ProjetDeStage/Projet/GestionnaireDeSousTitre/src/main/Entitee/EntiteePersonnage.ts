//@ts-nocheck
import {  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { EntiteeLigne } from './EntiteeLigne';
import { EntiteeCouleur} from './EntiteeCouleur.ts'
import dbConnection from '../Class/dbConnection';
import { json } from 'stream/consumers';

@Entity()
export class EntiteePersonnage {
    @PrimaryGeneratedColumn()
    personnage_id: number;

    @Column()
    personnage_nom: string;

    @Column()
    couleur_id:number;

    @ManyToOne(() => EntiteeCouleur,couleur => couleur.personnages,{onDelete:"CASCADE"})
    @JoinColumn({name:'couleur_id'})
    couleur: EntiteeCouleur;

    // @ManyToMany(() => EntiteeLigne)
    // @JoinTable({
    //     name: 'JOUER',
    //     joinColumn: {
    //         name: 'personnage_id',
    //         referencedColumnName: 'personnage_id', // Correction ici
    //     },
    //     inverseJoinColumns: [
    //         { name: 'ligne_id', referencedColumnName: 'ligne_id' },
    //         { name: 'version_id', referencedColumnName: 'version_id' },
    //     ],
    // })
    // lignes: EntiteeLigne[];
}
export async function creerPersonnage(_json: JSON){
    const table = dbConnection.dataSource.getRepository(EntiteePersonnage)
    let check = await table.find({where:{
        personnage_nom: _json.nom,
    }})
    if(check.length==0){
        const perso = new EntiteePersonnage();
        perso.personnage_nom=_json.nom;

        //Ajouter try catch sur la detection de foreignkey
        const couleur =  dbConnection.dataSource.getRepository(EntiteeCouleur)
        const couleurRef = await couleur.find({where:{couleur_id:_json.autre}})
        perso.couleur = couleurRef[0]
        ///////////////////////
        await table.save(perso)
        console.log("La ligne à été sauvegardé")
    }
    else{
        console.log("La ligne existe deja")
    }
}

export async function chargerPersonnage(){
    const table = dbConnection.dataSource.getRepository(EntiteePersonnage)
    return await table.find({ relations: ['couleur'] })
}

export async function modifierPersonnage(_idAModifier:number,_json:JSON){
    const table = dbConnection.dataSource.getRepository(EntiteePersonnage)
    let check = await table.findOne({where:{
        personnage_id:_idAModifier
    }})

    if(check!=undefined){

        if(_json.nom!=""){
            check.version_nom=_json.nom;
        }
        const couleur =  dbConnection.dataSource.getRepository(EntiteeCouleur)
        const couleurRef = await couleur.find({where:{couleur_id:_json.autre}})

        if(couleurRef.length>0){
            check.couleur=couleurRef[0]
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
    let check = await table.findOne({where:{personnage_id:_idASupprimer}}) 
    
    if(check!=undefined){
        await table.remove(check)
        console.log("La ligne a été supprimé")
    }
    else{
        console.log("La ligne n'existe pas")
    }
}
