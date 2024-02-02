//@ts-nocheck
import { Entity, PrimaryGeneratedColumn, Column, DataSource } from 'typeorm';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    qte: number; 

    @Column()
    urlImage: string;
}

const dataSource = new DataSource({
    type: 'sqlite',
    database: 'inventaire.db',
    synchronize: true,
    entities: [Item],
});

// Initialise la connexion à la base de données au démarrage de l'application
dataSource.initialize().catch(error => console.error("Erreur lors de l'initialisation de la base de données :", error));

export const saveData = async (_json: JSON) => {
    try {
        const repository = dataSource.getRepository(Item);


        console.table(repository)

        const item = new Item();
        let jsonObj = JSON.parse(_json);

        item.name = jsonObj["nom"];
        item.description = jsonObj["desc"];
        item.qte = jsonObj["qte"];
        item.urlImage = jsonObj["urlImage"];

        await repository.save(item);
        console.log("l'item a été sauvegardé");
    } catch (error) {
        console.error("Erreur lors de la sauvegarde: ", error);
    }
};

export const updateData = async (_json: JSON,_id:number) => {
    try {
        const repository = dataSource.getRepository(Item); 
        let jsonConvert = JSON.parse(_json)
        const itemUpdate = await repository.findOne({where:{id:_id}});
        itemUpdate.name= jsonConvert["nom"]
        itemUpdate.qte= jsonConvert["qte"]
        itemUpdate.description= jsonConvert["desc"]
        itemUpdate.urlImage= jsonConvert["urlImage"] 

        await repository.save(itemUpdate);
        console.log("l'item a été modifié");
    } catch (error) {
        console.error("Erreur lors de la modification: ", error);
    }
};


export const showData = async () => {
    try {
        const repository = dataSource.getRepository(Item);
        const table = await repository.find();

        console.table(table);
    } catch (err) {
        console.log("Erreur lors de l'affichage des données: ", err);
    }
};

export const loadData = async () => {
    try {
        const repository = dataSource.getRepository(Item);
        const table = await repository.find();

        const jsonTable = JSON.stringify(table);
        return jsonTable;
    } catch (err) {
        console.log("Erreur lors de l'envoie des données: ", err);
    }
};

export const loadOneData = async (_id) => {
    try {
        const repository = dataSource.getRepository(Item);
        const table = await repository.findOne({where:{id:_id}});
        const jsonTable = JSON.stringify(table);
        return jsonTable;
    } catch (err) {
        console.log("Erreur lors de l'envoie des données: ", err);
    }
};

export const deleteRow = async (_id: number) => { 
    try {
        const repository = dataSource.getRepository(Item);
        const itemToDelete = await repository.findOne({where:{id:_id}});
        if (itemToDelete) {
            await repository.remove(itemToDelete);
            console.log("l'item a été éffacé");
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
    dataSource.destroy().catch(error => console.error("Erreur lors de la fermeture de la connexion à la base de données :", error));
});
