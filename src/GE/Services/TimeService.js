
import { Constant } from '../Util/Constant';
import { Debugger } from '../Util/Debugger';
const Timer = {
    frameCount:0,
    fromStart:0,
    delta:0,
};
class TimeService{
    constructor(){
    }
    $awake(){
        Timer.frameCount = 0;
        this.start = Date.now()*Constant.ONE_PERCENT;
    };
    $serviceUpdate(){
        const now = Date.now()*Constant.ONE_PERCENT;
        Timer.frameCount++;
        const fromStart = now - this.start;
        Timer.delta = fromStart - Timer.fromStart;
        Timer.fromStart =  fromStart ;
        // console.log(`timerUpdate update.... : ${Timer.delta} ， ${Timer.frameCount} , ${Timer.fromStart}`);
        // Debugger.log(`timerUpdate update.... : ${Timer.delta} ， ${Timer.frameCount} , ${Timer.fromStart}`);
    }
}
export{TimeService,Timer};
