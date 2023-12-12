import {Line} from './Line.ts';
class Lines{
    video
    rawData
    computedData
    constructor(_rawData,_videoTitle,_lang){
        this.video=_videoTitle
        this.rawData=_rawData
        this.computedData=[]
        this.convertData(_videoTitle,_lang)
    }

    convertData(_videoTitle,_lang){
        for(let line of this.rawData){
            if(line.length>0){
                this.computedData.push(this.generateLine(line,_videoTitle,_lang))
            }
        }
    }
    generateLine(_line:string,_videoTitle:string,_lang:string){
        let line = new Line(_line,_videoTitle,_lang)
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