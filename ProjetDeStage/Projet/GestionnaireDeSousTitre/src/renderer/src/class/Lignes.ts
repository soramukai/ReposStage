export default class Lignes {
    private static ligne:Lignes|undefined
    private id:number
    private versionId:number
    private personnageId:number
    private timeCodeDebut:string
    private timeCodeFin:string
    private zIndex:number
    private texte:string
    
    private constructor(_id:number, _versionId:number, _personnageId:number, _timeCodeDebut:string, _timeCodeFin:string, _zIndex:number, _texte:string){
        this.id =_id
        this.versionId = _versionId
        this.personnageId = _personnageId
        this.timeCodeDebut = _timeCodeDebut
        this.timeCodeFin = _timeCodeFin
        this.zIndex = _zIndex
        this.texte = _texte
    }
    recupererLigne(_id:number, _versionId:number, _personnageId:number, _timeCodeDebut:string, _timeCodeFin:string, _zIndex:number, _texte:string){
        if(!Lignes.ligne){
            Lignes.ligne = new Lignes(_id, _versionId, _personnageId, _timeCodeDebut, _timeCodeFin, _zIndex, _texte)
        }
        return Lignes.ligne;
    }
    recupererId(){
        return this.id
    }
    enregistrerId(_id:number){
        this.id = _id
    }
    recupererVersionId(){
        return this.versionId
    }
    enregistrerVersionId(_versionId:number){
        this.versionId = _versionId
    }
    recupererPersonnageId(){
        return this.personnageId
    }
    enregistrerPersonnageId(_personnageId:number){
        this.personnageId = _personnageId
    }
    recupererTimeCodedebut(){
        return this.timeCodeDebut
    }
    enregistrerTimeCodeDebut(_timeCodeDebut:string){
        this.timeCodeDebut = _timeCodeDebut
    }
    recupererTimeCodeFin(){
        return this.timeCodeFin
    }
    enregistrerTimeCodeFin(_timeCodeFin:string){
        this.timeCodeFin = _timeCodeFin
    }
    recupererZIndex(){
        return this.zIndex
    }
    enregistrerZIndex(_zIndex:number){
        this.zIndex = _zIndex
    }
    recupererTexte(){
        return this.texte
    }
    enregistrerTexte(_texte:string){
        this.texte = _texte
    }

}