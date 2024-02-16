export default class Repertoire {
    private static repertoire: Repertoire|undefined;
    private urlDuRepertoire: string
    private urlDeLaVideo: string
    private urlDeLaBaseDeDonnée: string
    public fichiers: string[]

    private constructor(_urlRepertoire: string, _urlVideo: string, _urlBaseDeDonnee: string){
        this.urlDuRepertoire = _urlRepertoire
        this.urlDeLaVideo = _urlVideo
        this.urlDeLaBaseDeDonnée = _urlBaseDeDonnee
        this.fichiers = []
    }

    public static recupererInstanceDuRepertoire(_urlRepertoire:string="", _urlVideo:string="", _urlBaseDeDonnee:string = ""):Repertoire{
        if (!Repertoire.repertoire) {
            Repertoire.repertoire = new Repertoire(_urlRepertoire, _urlVideo, _urlBaseDeDonnee);
        }
        return Repertoire.repertoire;
    }

    public modifierFichiers(_fichiers:string[]): void{
        if(Repertoire.repertoire){
            this.fichiers = _fichiers;
        }
    }
    public recupererFichiers(): string[]{
        return this.fichiers;
    }
    public recupererUrlRepertoire(): string{
        return this.urlDuRepertoire
    }
    public modifierUrlRepertoire(_urlRepertoire:string): void{
        this.urlDuRepertoire = _urlRepertoire
    }
    public recupererUrlVideo(): string{
        return this.urlDeLaVideo
    }
    public modifierUrlVideo(_urlVideo:string): void{
        this.urlDeLaVideo = _urlVideo
    }
    public recupererUrlBaseDeDonnee():string{
        return this.urlDeLaBaseDeDonnée
    }
    public modifierUrlBaseDeDonnee(_urlBaseDeDonnee:string): void{
        this.urlDeLaBaseDeDonnée = _urlBaseDeDonnee
    }
}