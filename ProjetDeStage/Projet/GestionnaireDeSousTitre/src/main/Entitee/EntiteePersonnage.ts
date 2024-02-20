import {  Entity, PrimaryGeneratedColumn, Column, Repository, OneToMany } from 'typeorm';
import dbConnection from '../Class/dbConnection';
import { EntiteeLigne } from './EntiteeLigne';
import {JsonPersonnageLangueCouleur} from '../Interface/InterfaceJson';

@Entity()
export class EntiteePersonnage{
    @PrimaryGeneratedColumn()
    personnage_id: number;

    @Column()
    personnage_nom: string;

    @OneToMany(() => EntiteeLigne, ligne => ligne.personnage)
    lignes: EntiteeLigne[];
}

export async function creerPersonnage(_json: JsonPersonnageLangueCouleur): Promise<boolean>{
    const table: Repository<EntiteePersonnage>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteePersonnage)
    let check: EntiteePersonnage|null|undefined = await table?.findOne({
        where:{
            personnage_nom: _json.nom,
    }})
    if(!check){
        const perso: EntiteePersonnage = new EntiteePersonnage();
        perso.personnage_nom = _json.nom;

        await table?.save(perso)
        //console.log("La ligne à été sauvegardé")
        return true
    }
    else{
        //console.error("La ligne existe deja")
        return false
    }
}

export async function chargerPersonnage(): Promise<EntiteePersonnage[]>{
    const table: Repository<EntiteePersonnage>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteePersonnage)
    return table?await table.find():[]
}

export async function modifierPersonnage(_idAModifier:number,_json:JsonPersonnageLangueCouleur): Promise<boolean>{
    const table: Repository<EntiteePersonnage>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteePersonnage)
    let check: EntiteePersonnage|null|undefined = await table?.findOne({
        where:{
            personnage_id: _idAModifier
    }})

    if(check){
        if(_json.nom!=""){
            check.personnage_nom = _json.nom;
        }
        await table?.save(check)
        //console.log("La ligne à été modifié")
        return true
    }
    else{
        //console.error("La ligne n'existe pas")
        return false
    }
}

export async function supprimerPersonnage(_idASupprimer:number): Promise<boolean>{
    const table: Repository<EntiteePersonnage>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteePersonnage)
    let check: EntiteePersonnage|null|undefined = await table?.findOne({
        where:{
            personnage_id:_idASupprimer
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
