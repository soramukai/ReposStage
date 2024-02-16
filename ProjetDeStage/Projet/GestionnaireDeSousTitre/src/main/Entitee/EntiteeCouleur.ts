import { Entity, PrimaryGeneratedColumn, Column, Repository  } from 'typeorm';
import dbConnection from '../Class/dbConnection';
import {JsonPersonnageLangueCouleur} from '../Interface/InterfaceJson'

@Entity()
export class EntiteeCouleur{
    @PrimaryGeneratedColumn()
    couleur_id: number

    @Column()
    couleur_nom: string

}

export async function creerCouleur(_json: JsonPersonnageLangueCouleur):Promise<void>{
    const table: Repository<EntiteeCouleur>|undefined = dbConnection.dataSource?.getRepository(EntiteeCouleur)
    let check: EntiteeCouleur|null|undefined = await table?.findOne({where:{
        couleur_nom:_json.nom,
    }})
    if(!check){
        const couleur:EntiteeCouleur = new EntiteeCouleur();
        if(_json.id != -1){
            couleur.couleur_id = _json.id
        }
        couleur.couleur_nom = _json.nom;
        await table?.save(couleur)
        console.log("La ligne à été sauvegardé")
    }
    else{
        console.error("La ligne existe deja")
    }
}

export async function chargerCouleur():Promise<EntiteeCouleur[]>{
    const table: Repository<EntiteeCouleur>|undefined = dbConnection.dataSource?.getRepository(EntiteeCouleur)
    return table? await table.find():[]
}

