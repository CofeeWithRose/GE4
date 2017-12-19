import {Timer} from './ServiceInstance';
import {Constant,Debugger} from './../Core/Util';
class TimeService{
    constructor(){
        // Timer.timeFromStart = 0;
        // Timer.delta = 0;
        Timer.frameCount = 0;
        this.start = Date.now()*Constant.ONE_PERCENT;
    }
    $serviceUpdate(){
        const now = Date.now()*Constant.ONE_PERCENT;
        Timer.frameCount++;
        const fromStart = now - this.start;
        Timer.delta = fromStart - Timer.fromStart;
        Timer.fromStart =  fromStart ;
        // console.log(`timerUpdate update.... : ${Timer.delta} ， ${Timer.frameCount} , ${Timer.fromStart}`);
        Debugger.log(`timerUpdate update.... : ${Timer.delta} ， ${Timer.frameCount} , ${Timer.fromStart}`);
    }
}
export{TimeService};
