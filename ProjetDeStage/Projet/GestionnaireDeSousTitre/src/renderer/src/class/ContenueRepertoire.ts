export class ContenueRepertoire{
    private static instance:ContenueRepertoire
    public dossiers: string[]
    public fichiers: string[]

    private constructor(){
        this.dossiers=[]
        this.fichiers=[]
    }
    static recupererInstance(){
        if(!ContenueRepertoire.instance){
            ContenueRepertoire.instance=new ContenueRepertoire();
        }
        return ContenueRepertoire.instance;
    }
    enregistrerInstance(_dossier:string[],_fichiers:string[]){
        if(ContenueRepertoire.instance){
            this.dossiers=_dossier;
            this.fichiers=_fichiers;
        }
    }
    recupererDossiers(){
        return this.dossiers;
    }
    recupererFichiers(){
        return this.fichiers;
    }
}