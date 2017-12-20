let globleId = 0;
class Util {
    constructor() {

    }
    static uuid() {
        return globleId++;
    };
    static getClass(object) {
        return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
    };
    static getClassName(obj) {
        return obj.constructor.name;
    }
}



export { Util };