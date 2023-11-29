class Utils{
    static generateRandomBoolean(_max,_percent) {
        return Math.random() * _max < _percent;
    }
}
export {Utils}
