export default class Repertoire {
    private static repertoire: Repertoire | undefined;
    private urlDuRepertoire:string
    private urlDeLaVideo:string
    private urlDeLaBaseDeDonnée:string

    private constructor(_urlRepertoire:string,_urlVideo:string,_urlBaseDeDonnee:string){
        this.urlDuRepertoire=_urlRepertoire
        this.urlDeLaVideo=_urlVideo
        this.urlDeLaBaseDeDonnée=_urlBaseDeDonnee
    }
    recupererInstanceDuRepertoire(_urlRepertoire:string,_urlVideo:string,_urlBaseDeDonnee:string){
        if (!Repertoire.repertoire) {
            Repertoire.repertoire = new Repertoire(_urlRepertoire, _urlVideo, _urlBaseDeDonnee);
        }
        return Repertoire.repertoire;
    }
    recupererUrlRepertoire(){
        return this.urlDuRepertoire
    }
    enregistrerUrlRepertoire(_urlRepertoire:string){
        this.urlDuRepertoire=_urlRepertoire
    }
    recupererUrlVideo(){
        return this.urlDeLaVideo
    }
    enregistrerUrlVideo(_urlVideo:string){
        this.urlDeLaVideo=_urlVideo
    }
    recupererUrlBaseDeDonnee(){
        return this.urlDeLaBaseDeDonnée
    }
    enregistrerUrlBaseDeDonnee(_urlBaseDeDonnee:string){
        this.urlDeLaBaseDeDonnée=_urlBaseDeDonnee
    }
}