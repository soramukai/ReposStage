//@ts-nocheck
import { Entity, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { EntiteeVersion } from './EntiteeVersion';
import { EntiteePersonnage } from './EntiteePersonnage';
import { EntiteeCouleur } from './EntiteeCouleur';
import dbConnection from '../Class/dbConnection.ts';

@Entity()
export class EntiteeLigne{
    @PrimaryColumn()
    ligne_id: number

    @Column()
    ligne_timecode_Debut: string

    @Column()
    ligne_timecode_Fin: string

    @Column()
    ligne_z_index: number

    @Column()
    ligne_texte: string

    @Column()
    version_id:number;

    @Column({ nullable: true })
    couleur_id:number;

    // @Column({ nullable: true })
    // personnage_id:number;

    @ManyToOne(() => EntiteeCouleur,couleur => couleur.lignes,{onDelete:"CASCADE"},{ nullable: true })
    @JoinColumn({name:'couleur_id'})
    couleur: EntiteeCouleur;

    @ManyToOne(() => EntiteeVersion,version=>version.lignes)
    @JoinColumn({ name: 'version_id' })
    version: EntiteeVersion;

    @ManyToMany(() => EntiteePersonnage, personnage => personnage.lignes,{ nullable: true })
    @JoinTable({
        name: 'JOUER',
        joinColumns: [
            { name: 'ligne_id', referencedColumnName: 'ligne_id' },
            { name: 'version_id', referencedColumnName: 'version_id' }
        ],
        inverseJoinColumns: [
            { name: 'personnage_id', referencedColumnName: 'personnage_id' }
        ],
    })
    personnages: EntiteePersonnage[];

}

export async function creerLigne(_json: JSON){

    const table = dbConnection.dataSource.getRepository(EntiteeLigne)
    let check = await table.find({where:{
        ligne_id: _json["id"],
        version_id:_json["versionId"]
    }})

    if(check.length==0){
        const ligne = new EntiteeLigne();
        ligne.ligne_id = _json.id;
        ligne.ligne_timecode_Debut = _json.timecodeDebut;
        ligne.ligne_timecode_Fin = _json.timecodeFin;
        ligne.ligne_z_index = _json.zIndex;
        ligne.ligne_texte = _json.texte;

        const couleur =  dbConnection.dataSource.getRepository(EntiteeCouleur)
        const couleurRef = await couleur.find({where:{couleur_id:_json.autre}})
        ligne.couleur = couleurRef[0]

        const version = dbConnection.dataSource.getRepository(EntiteeVersion)
        const versionRef = await version.find({ where: { version_id: _json.versionId } })

        ligne.version = versionRef[0];

        await table.save(ligne);
        //console.log("La ligne à été sauvegardée")
    }
    else {
        //console.log("La ligne existe déjà")
    }
}


export async function chargerLigne(){
    const table = dbConnection.dataSource.getRepository(EntiteeLigne)
    return await table.find({ relations: ["version", "version.langue","couleur"]})
}