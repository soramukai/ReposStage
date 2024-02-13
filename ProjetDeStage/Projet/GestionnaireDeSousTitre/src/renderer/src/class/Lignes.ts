export default class Lignes {
    private id:number|undefined
    private versionId:number
    private personnageId:number|undefined
    private timeCodeDebut:string
    private timeCodeFin:string
    private zIndex:number
    private texte:string
    private couleur:string
    private couleurHexa:string
    
    constructor(_id:number|undefined, _versionId:number, _timeCodeDebut:string, _timeCodeFin:string, _zIndex:number, _texte:string,_personnageId:number|undefined,_couleur:string,_couleurHexa:string){
        this.id =_id
        this.versionId = _versionId
        this.timeCodeDebut = _timeCodeDebut
        this.timeCodeFin = _timeCodeFin
        this.zIndex = _zIndex
        this.texte = _texte
        this.personnageId = _personnageId
        this.couleur = _couleur
        this.couleurHexa = _couleurHexa
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
    recupererCouleur(){
        return this.couleur
    }
    enregistrerCouleur(_couleur:string){
        if(_couleur==undefined)
        this.couleur = _couleur
    }
    recupererCouleurHexa(){
        return this.couleurHexa
    }
    enregistrerCouleurHexa(_couleurHexa:string){
        if(_couleurHexa==undefined)
        this.couleur = _couleurHexa
    }

}