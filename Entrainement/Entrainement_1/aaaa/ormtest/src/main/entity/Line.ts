//@ts-nocheck
import { Entity, PrimaryGeneratedColumn, Column, DataSource } from 'typeorm';

@Entity()
export class Line {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    video: string

    @Column()
    ordre: number;

    @Column()
    timecode_debut: string;

    @Column()
    timecode_fin: string;

    @Column()
    texte: string;
}

const dataSource = new DataSource({
    type: 'sqlite',
    database: 'subtitle.db',
    synchronize: true,
    entities: [Line],
});

// Initialise la connexion à la base de données au démarrage de l'application
dataSource.initialize().catch(error => console.error("Erreur lors de l'initialisation de la base de données :", error));

export const saveData = async (_json: JSON) => {
    try {
        const repository = dataSource.getRepository(Line);

        const line = new Line();
        let jsonObj = JSON.parse(_json);
        line.ordre = jsonObj["ordre"];
        line.video = jsonObj["video"];
        line.timecode_debut = jsonObj["timecode_debut"];
        line.timecode_fin = jsonObj["timecode_fin"];
        line.texte = jsonObj["texte"]

        await repository.save(line);
        console.log("la ligne a été sauvegardé");
    } catch (error) {
        console.error("Erreur lors de la sauvegarde: ", error);
    }
};

export const updateData = async (_json: JSON,_id:number) => {
    try {
        const repository = dataSource.getRepository(Line); 
        let jsonConvert = JSON.parse(_json)
        const lineUpdate = await repository.findOne({where:{id:_id}});
        line.ordre = jsonObj["ordre"];
        line.video = jsonObj["video"];
        line.timecode_debut = jsonObj["timecode_debut"];
        line.timecode_fin = jsonObj["timecode_fin"];
        line.texte = jsonObj["texte"]

        await repository.save(itemUpdate);
        console.log("la ligne a été modifié");
    } catch (error) {
        console.error("Erreur lors de la modification: ", error);
    }
};


export const showData = async () => {
    try {
        const repository = dataSource.getRepository(Line);
        const table = await repository.find();

        console.table(table);
    } catch (err) {
        console.log("Erreur lors de l'affichage des données: ", err);
    }
};

export const loadData = async () => {
    try {
        const repository = dataSource.getRepository(Line);
        const table = await repository.find();

        const jsonTable = JSON.stringify(table);
        return jsonTable;
    } catch (err) {
        console.log("Erreur lors de l'envoie des données: ", err);
    }
};

export const loadOneData = async (_id:number) => {
    try {
        const repository = dataSource.getRepository(Line);
        const table = await repository.findOne({where:{id:_id}});
        const jsonTable = JSON.stringify(table);
        return jsonTable;
    } catch (err) {
        console.log("Erreur lors de l'envoie des données: ", err);
    }
};

export const deleteRow = async (_id: number) => { 
    try {
        const repository = dataSource.getRepository(Line);
        const itemToDelete = await repository.findOne({where:{id:_id}});
        if (itemToDelete) {
            await repository.remove(itemToDelete);
            console.log("la ligne a été éffacé");
            return true 
        } else {
            return false
        }
    } catch (error) {
        console.error("Erreur lors de la suppression: ", error);
        return false
    }
};

// Ferme la connexion à la base de données lorsque l'application se termine
process.on('exit', () => {
    dataSource.close().catch(error => console.error("Erreur lors de la fermeture de la connexion à la base de données :", error));
});
