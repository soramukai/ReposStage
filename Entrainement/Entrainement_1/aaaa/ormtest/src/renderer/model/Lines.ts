import {Line} from './Line.ts';
class Lines{
    rawData
    computedData
    constructor(_rawData){
        this.rawData=_rawData
        this.computedData=[]
        this.convertData()
    }

    convertData(){
        for(let line of this.rawData){
            if(line.length>0){
                this.computedData.push(this.generateLine(line))
            }
        }
    }
    generateLine(_line){
        let line = new Line(_line)
        return line
    }
    getLines(){
        return this.computedData
    }
}export {Lines}