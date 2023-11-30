class Line{
    ordre
    video
    timecode_debut
    timecode_fin
    texte
    constructor(_line,_video){
        this.ordre=""
        this.video=_video
        this.timecode_debut=""
        this.timecode_fin=""
        this.texte=""
        this.formatedLine(_line)
    }
    formatedLine(_line){
        let line = _line.split('\n');
        this.ordre=line[0]
        let tc = line[1].split('-->')
        this.timecode_debut = tc[0]
        this.timecode_fin = tc[1]
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