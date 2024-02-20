import { DataSource } from 'typeorm';
import { EntiteePersonnage } from '../Entitee/EntiteePersonnage';
import { EntiteeVersion } from '../Entitee/EntiteeVersion';
import { EntiteeLangue } from '../Entitee/EntiteeLangue';
import { EntiteeLigne } from '../Entitee/EntiteeLigne';
import { EntiteeCouleur } from '../Entitee/EntiteeCouleur';

export default class dbConnection {

    private static dataSource: DataSource|undefined;
    static dbOn: boolean = false;

    private static async initialisationBaseDeDonnee(_url:string): Promise<void>{
        dbConnection.dataSource = new DataSource({
            type: 'sqlite',
            database: _url,
            synchronize: true,
            entities: [EntiteeLangue,EntiteePersonnage,EntiteeVersion,EntiteeLigne,EntiteeCouleur],
        });
        try {
            // Attendez que la connexion à la base de données soit établie
            await dbConnection.dataSource.initialize();

            // Activer les contraintes de clé étrangère
            await dbConnection.dataSource.query('PRAGMA foreign_keys = ON;');

            console.log('Base de données initialisée avec succès.');
            dbConnection.dbOn = true;
        } catch (error) {
            console.error("Erreur lors de l'initialisation de la base de données :", error);
            dbConnection.dbOn = false;
        }
    }
    static async recupererDataSource(_url: string = ""): Promise<DataSource|undefined>{
        if(dbConnection.dataSource && dbConnection.dbOn){
            return dbConnection.dataSource;
        }else{
            await dbConnection.initialisationBaseDeDonnee(_url);
            return dbConnection.dataSource;
        }
    }
    static async fermetureConnectionBaseDeDonnee():Promise<void>{
        try {
            await dbConnection.dataSource?.destroy();
            dbConnection.dbOn = false;
            dbConnection.dataSource = undefined;
            console.log('Connexion à la base de données fermée avec succès.');
        } catch (error) {
            console.error("Erreur lors de la fermeture de la connexion à la base de données :", error);
        }
    }

}
