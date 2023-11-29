class Line{
    id
    timecodeDebut
    timecodeFin
    texte
    constructor(_line){
        this.id=""
        this.timecodeDebut=""
        this.timecodeFin=""
        this.texte=""
        this.formatedLine(_line)
    }
    formatedLine(_line){
        let line = _line.split('\n');
        this.id=line[0]
        let tc = line[1].split('-->')
        this.timecodeDebut = tc[0]
        this.timecodeFin = tc[1]
        this.texte = this.checkText(line)
    }
    checkText(_text){
        let result = _text[2];
        if(_text.length>3){
            for(let i =3;i<_text.length;i++){
                result+="\n"+_text[i]
            }
            return result
        }
        else{
            return result
        }
    }
}export {Line}