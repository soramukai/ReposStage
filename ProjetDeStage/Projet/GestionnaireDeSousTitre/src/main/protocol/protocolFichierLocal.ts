import { protocol } from 'electron';
import * as path from 'path';

export default class protocolFichierLocal {
    static initialisation(): void { // Méthode statique initialisation qui ne retourne rien (void)
        protocol.registerFileProtocol('fichier', (request, callback)=> {
            // Extrait l'URL de la demande et enlève le préfixe "fichier://"
            const url: string = request.url.replace('fichier://', '');
            // Normalise le chemin du fichier en supprimant les ".." et les symboles redondants
            const filePath: string = path.normalize(decodeURIComponent(url));
            // Appelle le callback avec le chemin du fichier normalisé
            callback(filePath);
        });
    }
}
