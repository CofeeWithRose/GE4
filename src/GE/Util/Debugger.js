const ERROR = 'error';
const DEBUG = 'debug';
class Loger {
    constructor() {
        this.logger = new Worker('GE/Workers/Loger.js');
    };
    log(message) {
        this.logger.postMessage({ message, type: DEBUG });
    };
    error(message) {
        this.logger.postMessage({ message, type: ERROR })
    }

};

const Debugger = new Loger();
export { Debugger };