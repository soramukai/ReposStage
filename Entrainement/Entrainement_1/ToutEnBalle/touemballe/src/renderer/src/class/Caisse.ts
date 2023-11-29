import {Utils} from "./Utils";
class Caisse{
    private name:string;
    private speed:number;
    private valid:Boolean;
    constructor(_name:string,_speed:number){
        this.name = _name;
        this.speed = _speed;
        this.valid = Utils.generateRandomBoolean(100,90);
    }
    getName(){
        return this.name;
    }
    getSpeed(){
        return this.speed;
    }
    getValid(){
        return this.valid;
    }
    getClone(){
        return new Caisse(this.name,this.speed);
    }
}
export {Caisse}