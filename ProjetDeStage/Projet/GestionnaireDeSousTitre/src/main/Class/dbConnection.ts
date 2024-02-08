import { DataSource } from 'typeorm';
import { EntiteePersonnage } from '../Entitee/EntiteePersonnage.ts';
import { EntiteeLangue } from '../Entitee/EntiteeLangue.ts';
import { EntiteeVersion } from '../Entitee/EntiteeVersion.ts';
import { EntiteeLigne } from '../Entitee/EntiteeLigne.ts';
import { EntiteeCouleur } from '../Entitee/EntiteeCouleur.js';

export default class dbConnection {

    static dataSource: DataSource;
    static dbOn:boolean = false;

    static async initialisationBaseDeDonnee(_path){
        try {
            console.log("passe par dbConnection.ts")
            dbConnection.dataSource = new DataSource({
                type: 'sqlite',
                database: _path,
                synchronize: true,
                entities: [EntiteePersonnage, EntiteeLangue, EntiteeVersion, EntiteeLigne,EntiteeCouleur],
            });

            // Attendez que la connexion à la base de données soit établie
            await dbConnection.dataSource.initialize();

            // Activer les contraintes de clé étrangère
            await dbConnection.dataSource.query('PRAGMA foreign_keys = ON;');

            console.log('Base de données initialisée avec succès.');
        } catch (error) {
            console.error("Erreur lors de l'initialisation de la base de données :", error);
        }
    }

    static async fermetureConnectionBaseDeDonnee() {
        try {
            await dbConnection.dataSource.destroy();
            console.log('Connexion à la base de données fermée avec succès.');
        } catch (error) {
            console.error("Erreur lors de la fermeture de la connexion à la base de données :", error);
        }
    }

}
