import { Caisse } from "./Caisse";
import {Etat} from "./EnumEtat"

class Production{
    
    private model:Caisse;
    private goalProd:number;
    private productBox:Array<Caisse>;
    private etat:string;
    private prodName:string;

    constructor(_caisse:Caisse,_goalProd:number,_proName:string){
        this.model = _caisse;
        this.goalProd = _goalProd;
        this.productBox = [];
        this.etat = Etat.Pause;
        this.prodName = _proName;
    }
    getGoalProd(){
        return this.goalProd;
    }
    getProdName(){
        return this.prodName;
    }
    getInvalidPercent(){
        let counter:number = 0;
        this.productBox.forEach((box)=>{
            if(!box.getValid()){
                counter++;
            }
        })
        return (counter*100/this.productBox.length).toFixed(2)!;
    }
    getInvalidHourPercent()
    {
        if (this.productBox.length > this.model.getSpeed())
        {
            let counter:number = 0;
            for (let i = this.productBox.length-this.model.getSpeed();i<this.productBox.length; i++)
            {
                if (!this.productBox[i].getValid())
                {
                    counter++;
                }
            }
            return (counter * 100 /this.productBox.length - this.model.getSpeed()).toFixed(2)!;
        }
        else
        {
            return this.getInvalidPercent(); 
        }
    }
    resetProd(){
        this.productBox=[];
    }
    startProd(){
        this.etat=Etat.Actif;
    }
    addBox(){
        let caisse = this.model.getClone();
        this.productBox.push(caisse);
    }
    breakProd(){
        this.etat = Etat.Pause;
    }
    stopProd(){
        this.etat = Etat.Stop;
    }
    getState(){
        return this.etat;
    }
    getProductBoxCount(){
        return this.productBox.length;
    }
}
export {Production}