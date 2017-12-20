class Loger{
    constructor (){
        this.logger = new Worker('GE/Workers/Loger.js');
    };
    log(data){
        this.logger.postMessage(data);
    };
};

const Debugger = new Loger();
export {Debugger};