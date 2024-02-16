import { Entity, PrimaryGeneratedColumn, Column, Repository, OneToMany } from 'typeorm';
import dbConnection from '../Class/dbConnection';
import { EntiteeVersion } from './EntiteeVersion';
import {JsonPersonnageLangueCouleur} from '../Interface/InterfaceJson';

@Entity()
export class EntiteeLangue{
    @PrimaryGeneratedColumn()
    langue_id: number

    @Column()
    langue_nom: string

    @OneToMany(() => EntiteeVersion, version => version.langue)
    versions: EntiteeVersion[];

}

export async function creerLangue(_json: JsonPersonnageLangueCouleur):Promise<void>{
    const table: Repository<EntiteeLangue>|undefined = dbConnection.dataSource?.getRepository(EntiteeLangue)
    let check: EntiteeLangue|null|undefined = await table?.findOne({
            where : {
                langue_nom : _json.nom
    }})
    if(!check){
        let langue:EntiteeLangue = new EntiteeLangue();
        if(_json.id != -1){
            langue.langue_id = _json.id
        }
        langue.langue_nom = _json.nom;
        await table?.save(langue)
        console.log("La ligne à été sauvegardé")
    }
    else{
        console.error("La ligne existe deja")
    }
}

export async function chargerLangue():Promise<EntiteeLangue[]>{
    const table: Repository<EntiteeLangue>|undefined = dbConnection.dataSource?.getRepository(EntiteeLangue)
    return table?await table.find():[]
}

export async function modifierLangue(_idAModifier:number,_json:JsonPersonnageLangueCouleur):Promise<void>{

    const table: Repository<EntiteeLangue>|undefined = dbConnection.dataSource?.getRepository(EntiteeLangue)
    let check: EntiteeLangue|null|undefined = await table?.findOne({
        where:{
            langue_id:_idAModifier,
    }})

    if(check){
        check.langue_nom = _json.nom;

        await table?.save(check)
        console.log("La ligne à été modifié")
    }
    else{
        console.error("La ligne n'existe pas")
    }
}

export async function supprimerLangue(_idASupprimer:number):Promise<void>{
    const table: Repository<EntiteeLangue>|undefined = dbConnection.dataSource?.getRepository(EntiteeLangue)
    let check: EntiteeLangue|null|undefined = await table?.findOne({
        where:{
            langue_id:_idASupprimer
    }}) 
    
    if(check){
        await table?.remove(check)
        console.log("La ligne a été supprimé")
    }
    else{
        console.error("La ligne n'existe pas")
    }
}
