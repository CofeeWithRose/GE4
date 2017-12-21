
import { Constant } from '../Util/Constant';
import { Debugger } from '../Util/Debugger';
import { renderConfig } from '../config-render';
const Timer = {
    frameCount: 0,
    fromStart: 0,
    delta: 0.01,
};
class TimeService {
    constructor() {

    }
    $awake() {
        Timer.frameCount = 0;
        this.start = Date.now() * Constant.ONE_PERCENT;
        this._createFPS();

    };
    _createFPS() {
        if (renderConfig.showFPS) {
            this.fps = document.createElement('div');
            this.fps.id = renderConfig.FPSContentId;
            this.fps.style = `position:absolute;
        color:white;
        background-color:rgba(0,0,0,0.5);
        padding:0.3rem;
        border-radius:0.4rem;`;
            document.body.appendChild(this.fps);
            this._lastT = Date.now() * Constant.ONE_PERCENT;
            this._showFPS = (now) => {
                if ((now - this._lastT) >= 1) {
                    const fps = Timer.frameCount - this._lastCount || 0;
                    this.fps.innerHTML = `FPS: ${fps}`;
                    this._lastCount = Timer.frameCount;
                    this._lastT = now;
                }
            };
        } else {
            this._showFPS = () => { };
        }
    }
    $serviceUpdate() {
        const now = Date.now() * Constant.ONE_PERCENT;
        Timer.frameCount++;
        const fromStart = now - this.start;
        Timer.delta = fromStart - Timer.fromStart;
        Timer.fromStart = fromStart;
        this._showFPS(now)
        // console.log(`timerUpdate update.... : ${Timer.delta} ， ${Timer.frameCount} , ${Timer.fromStart}`);
        // Debugger.log(`timerUpdate update.... : ${Timer.delta} ， ${Timer.frameCount} , ${Timer.fromStart}`);
    }
}
export { TimeService, Timer };
