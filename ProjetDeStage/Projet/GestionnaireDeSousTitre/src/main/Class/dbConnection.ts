import { DataSource } from 'typeorm';
import { EntiteePersonnage } from '../Entitee/EntiteePersonnage';
import { EntiteeVersion } from '../Entitee/EntiteeVersion';
import { EntiteeLangue } from '../Entitee/EntiteeLangue';
import { EntiteeLigne } from '../Entitee/EntiteeLigne';
import { EntiteeCouleur } from '../Entitee/EntiteeCouleur';

export default class dbConnection {

    static dataSource: DataSource|null;
    static dbOn: boolean = false;

    static async initialisationBaseDeDonnee(_path:string): Promise<void>{
        if(!dbConnection.dataSource){
            dbConnection.dataSource = new DataSource({
                type: 'sqlite',
                database: _path,
                synchronize: true,
                entities: [EntiteeLangue,EntiteePersonnage,EntiteeVersion,EntiteeLigne,EntiteeCouleur],
            });
        }
        try {
            // Attendez que la connexion à la base de données soit établie
            await dbConnection.dataSource.initialize();

            // Activer les contraintes de clé étrangère
            await dbConnection.dataSource.query('PRAGMA foreign_keys = ON;');

            console.log('Base de données initialisée avec succès.');
        } catch (error) {
            console.error("Erreur lors de l'initialisation de la base de données :", error);
        }
    }

    static async fermetureConnectionBaseDeDonnee():Promise<void>{
        try {
            await dbConnection.dataSource?.destroy();
            console.log('Connexion à la base de données fermée avec succès.');
        } catch (error) {
            console.error("Erreur lors de la fermeture de la connexion à la base de données :", error);
        }
    }

}
