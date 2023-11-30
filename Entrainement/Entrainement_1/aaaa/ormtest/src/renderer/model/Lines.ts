import {Line} from './Line.ts';
class Lines{
    video
    rawData
    computedData
    constructor(_rawData,_videoTitle){
        this.video=_videoTitle
        this.rawData=_rawData
        this.computedData=[]
        this.convertData(_videoTitle)
    }

    convertData(_videoTitle){
        for(let line of this.rawData){
            if(line.length>0){
                this.computedData.push(this.generateLine(line,_videoTitle))
            }
        }
    }
    generateLine(_line,_videoTitle){
        let line = new Line(_line,_videoTitle)
        return line
    }
    getLines(){
        return this.computedData
    }
    dbSave(){
        this.computedData.forEach(line => {
            let jsonObject = JSON.stringify(line)
            window.electron.ipcRenderer.send('subtitle:SaveData',jsonObject);
        });
    }
}export {Lines}