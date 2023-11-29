import {EnumCategorie} from "./EnumCategorie";
class Item{
    private nom:string;
    private quantite:number;
    private description:string;
    private categorie:Array<typeof EnumCategorie>;
    private imageUrl:string;

    constructor(_nom:string,_quantite:number,_description:string,_categorie:Array<typeof EnumCategorie>,_imageUrl:string="none.png"){
        this.nom= _nom;
        this.quantite = _quantite;
        this.description = _description;
        this.categorie = _categorie;
        this.imageUrl = _imageUrl;
    }

    getNom(){
        return this.nom;
    }
    getQuantite(){
        return this.quantite;
    }
    getDescription(){
        return this.description;
    }
    getCategorie(){
        return this.categorie;
    }
    getImageUrl(){
        return this.imageUrl;
    }
    matchCategorie(_categorie:typeof EnumCategorie){
        this.categorie.forEach((cat)=>{
            if(_categorie==cat){
                return this;
            }
        });
    }
}
export {Item}