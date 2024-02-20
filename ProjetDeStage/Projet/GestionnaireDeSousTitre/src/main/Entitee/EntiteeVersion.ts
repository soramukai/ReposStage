import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Repository,OneToMany } from 'typeorm';
import {EntiteeLangue} from './EntiteeLangue'
import dbConnection from '../Class/dbConnection';
import { EntiteeLigne } from './EntiteeLigne';
import {JsonVersion} from '../Interface/InterfaceJson';

@Entity()
export class EntiteeVersion{
    @PrimaryGeneratedColumn()
    version_id: number

    @Column()
    version_nom: string

    @Column({nullable: false})
    langue_id: number

    @ManyToOne(() => EntiteeLangue,langue => langue.versions,{onDelete:"CASCADE",nullable:false})
    @JoinColumn({name:'langue_id'})
    langue: EntiteeLangue;

    @OneToMany(() => EntiteeLigne, ligne => ligne.version)
    lignes: EntiteeLigne[];

}

export async function creerVersion(_version: JsonVersion): Promise<boolean>{
    const table: Repository<EntiteeVersion>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteeVersion)
    let check: EntiteeVersion|null|undefined = await table?.findOne({
        where:{
            version_nom: _version.nom
    }});
    if(!check){
        const version: EntiteeVersion = new EntiteeVersion();
        version.langue_id = _version.langue_id
        version.version_nom = _version.nom;
        await table?.save(version)
        //console.log("La ligne à été sauvegardé")
        return true
    }
    else{
        //console.error("La ligne existe deja")
        return false
    }
}

export async function chargerVersion(): Promise<EntiteeVersion[]>{
    const table: Repository<EntiteeVersion>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteeVersion)
    return table? await table.find({ relations: ['langue'] }):[];
}

export async function chargerVersionDeLangue(_nomLangue: string): Promise<EntiteeVersion[]> {
    const tableVersion: Repository<EntiteeVersion>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteeVersion);
    const tableLangue: Repository<EntiteeLangue>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteeLangue);

    const langue: EntiteeLangue|null|undefined = await tableLangue?.findOne({ 
        where: { 
            langue_nom: _nomLangue 
    }});
    if (langue) {
        const versions: EntiteeVersion[]|undefined = await tableVersion?.find({ 
            where: { 
                langue_id: langue.langue_id },relations: ['langue']
        });
        return versions?versions:[];
    } else {
        return []; // Ou vous pouvez gérer différemment le cas où la langue n'est pas trouvée
    }
}

export async function modifierVersion(_idVersionAModifier:number,_json:JsonVersion): Promise<boolean>{
    const table: Repository<EntiteeVersion>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteeVersion)
    const check:EntiteeVersion|null|undefined = await table?.findOne({
        where:{
            version_id:_idVersionAModifier
    }})
    if(check){
        check.version_nom = _json.nom ? _json.nom : check.version_nom;
        check.langue_id = _json.langue_id ? _json.langue_id : check.langue_id;


        await table?.save(check)
        //console.log("La ligne à été modifié")
        return true
    }
    else{
        //console.error("La ligne n'existe pas")
        return false
    }
}

export async function supprimerVersion(_idASupprimer:number): Promise<boolean>{
    const table: Repository<EntiteeVersion>|undefined = (await dbConnection.recupererDataSource())?.getRepository(EntiteeVersion)
    const check: EntiteeVersion|null|undefined = await table?.findOne({where:{version_id:_idASupprimer}}) 
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