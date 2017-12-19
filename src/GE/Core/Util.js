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
class Loger{
    constructor (){
        this.logger = new Worker('GE/Workers/Loger.js');
    };
    log(data){
        this.logger.postMessage(data);
    };
};

const Debugger = new Loger();

const Constant = {
    TASK_LISTS: Symbol(),
    ONE_PERCENT: 0.001,
}
export { Util, Constant ,Debugger};