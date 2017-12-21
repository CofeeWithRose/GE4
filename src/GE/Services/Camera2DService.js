import { renderConfig } from "../config-render";
import { Arrays2 } from "../Data/Array2";
import { Vector3 } from "../Data/Vector3";
import { Debugger } from "../Util/Debugger";
import { resource } from "./Resource";
import { config } from "../config-resources";
const Camera = {
    main: undefined,
    spirits: new Arrays2(),
};
class Camera2DService {
    constructor() {
        const elem = document.querySelector(`#${renderConfig.camera2dContentId}`);
        const canvas = document.createElement('canvas');
        this.offCanvas = document.createElement('canvas');

        this.width = canvas.width = this.offCanvas.width = elem.clientWidth;
        this.height = canvas.height = this.offCanvas.height = elem.clientHeight;
        this.ctx = canvas.getContext('2d');
        this.offCtx = this.offCanvas.getContext('2d');
        elem.id = renderConfig.camera2dRenderId;
        elem.appendChild(canvas);
    }
    $rend() {
        this._rendOffLine();
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.drawImage(this.offCanvas, 0, 0, this.width, this.height);
    }
    //离线canvas缓存减少回流次数，chrome下在3次绘图时有显著提升.
    _rendOffLine() {
        this.offCtx.clearRect(0, 0, this.width, this.height);
        Camera.spirits.forEach((spirit) => {
            // Debugger.log(`rend spirit...`);
            this.offCtx.drawImage(spirit.canvas,
                spirit.screenPosition.x,
                spirit.screenPosition.y,
                spirit.size.x,
                spirit.size.y);
        });
    }
};

class Spirit {
    constructor(screenPosition = new Vector3(), size = new Vector3()) {
        this.screenPosition = screenPosition;
        this.size = size;
        this.canvas = document.createElement('canvas');
        this.layer = size.z;
        this.canvas.width = size.x;
        this.canvas.height = size.y;
        Camera.spirits.add(this, size.z);
    }
    // setSize(size){
    //     if(size){
    //         if(this.size.z !== size.z){
    //             Camera.spirits.changePriorty(this,size.z);
    //         }
    //         if(this.size.x)
    //         this.size = size;
    //     }
    // }
};
export { Camera, Camera2DService, Spirit };