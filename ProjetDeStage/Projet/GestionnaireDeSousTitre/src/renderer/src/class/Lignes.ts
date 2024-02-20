export default class Lignes {
    private id:number|undefined
    private versionId:number|undefined
    private personnageId:number|undefined
    private timeCodeDebut:string|undefined
    private timeCodeFin:string|undefined
    private zIndex:number|undefined
    private texte:string|undefined
    private couleur:string|undefined
    private couleurHexa:string|undefined
    
    constructor(
        _id:number|undefined = undefined, 
        _versionId:number|undefined = undefined, 
        _timeCodeDebut:string|undefined = undefined, 
        _timeCodeFin:string|undefined = undefined, 
        _zIndex:number|undefined = undefined, 
        _texte:string|undefined = undefined,
        _personnageId:number|undefined = undefined,
        _couleur:string|undefined = undefined,
        _couleurHexa:string|undefined = undefined){
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

    creationLigne(): void{
        window.electron.ipcRenderer.send('electron:creerLigne',this)
    }

    async chargerLigne(){

    }

    modificationLigne(_uid: number){
        window.electron.ipcRenderer.send('electron:modifierLigne',_uid,this)
    }

    duplicationLigne(_uid: number){
        window.electron.ipcRenderer.send('electron:dupliquerLigne', _uid);
    }

    suppressionLigne(_uid: number){
        window.electron.ipcRenderer.send('electron:supprimerSousTitre',_uid)
    }

    recupererId():number|undefined{
        return this.id
    }
    enregistrerId(_id:number|undefined):void{
        this.id = _id
    }
    recupererVersionId():number|undefined{
        return this.versionId
    }
    enregistrerVersionId(_versionId:number):void{
        this.versionId = _versionId
    }
    recupererPersonnageId():number|undefined{
        return this.personnageId
    }
    enregistrerPersonnageId(_personnageId:number):void{
        this.personnageId = _personnageId
    }
    recupererTimeCodedebut():string|undefined{
        return this.timeCodeDebut
    }
    enregistrerTimeCodeDebut(_timeCodeDebut:string):void{
        this.timeCodeDebut = _timeCodeDebut
    }
    recupererTimeCodeFin():string|undefined{
        return this.timeCodeFin
    }
    enregistrerTimeCodeFin(_timeCodeFin:string):void{
        this.timeCodeFin = _timeCodeFin
    }
    recupererZIndex():number|undefined{
        return this.zIndex
    }
    enregistrerZIndex(_zIndex:number):undefined{
        this.zIndex = _zIndex
    }
    recupererTexte():string|undefined{
        return this.texte
    }
    enregistrerTexte(_texte:string):undefined{
        this.texte = _texte
    }
    recupererCouleur():string|undefined{
        return this.couleur
    }
    enregistrerCouleur(_couleur:string):void{
        if(_couleur==undefined)
        this.couleur = _couleur
    }
    recupererCouleurHexa():string|undefined{
        return this.couleurHexa
    }
    enregistrerCouleurHexa(_couleurHexa:string):void{
        if(_couleurHexa==undefined)
        this.couleur = _couleurHexa
    }
}