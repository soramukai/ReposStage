import { protocol } from 'electron'
const path = require('path');

export default class protocolFichierLocal{
    static initialisation(){
        protocol.registerFileProtocol('fichier', (request, callback) => {
            const url = request.url.replace('fichier://', '');
            const filePath = path.normalize(decodeURIComponent(url));
            callback(filePath);
          });
    }
}