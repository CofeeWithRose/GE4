import { renderConfig } from "../config-render";
import { Arrays2 } from "../Data/Array2";
import { Vector3 } from "../Data/Vector3";
import { Debugger } from "../Util/Debugger";
import { resource } from "./Resource";
import { config } from "../config-resources";
import { AbstractInstance } from "../Core/AbstractInstance";
//camera service需要的可访问对象.
class CameraInstance extends AbstractInstance {
    constructor() {
        super();
        this.main = null;
        this.spirits = new Arrays2();
    }
    /**
     * 改变渲染顺序.
     * @param {Spirit} spirit 
     * @param {Number} layer 
     */
    changeLayer(spirit, layer) {
        this.spirits.changePriorty(spirit, layer);
    }
    addSpirit(spirit = new Spirit(), layer = 0) {
        this.spirits.add(spirit, layer);
    }
    delSpirit(spirit){
        this.spirits.delete(spirit);
    }
}
//camera service需要的可访问对象.
const Camera = new CameraInstance();

class Camera2DService extends AbstractInstance {
    constructor() {
        super();
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
/**
 * 用于渲染2D图片的对象.
 */
class Spirit {
    /**
     * 
     * @param {Vector3} screenPosition 
     * @param {Vector3} size 
     * @param {Number} layer 
     */
    constructor(screenPosition = new Vector3(), size = new Vector3(), layer = 0) {
        this.canvas = document.createElement('canvas');
        this.screenPosition = screenPosition;
        this.size = size;
        this.layer = layer;
        this.canvas.width = size.x;
        this.canvas.height = size.y;
    };
    /**
     * 改变层级.
     * @param {Number} layer
     */
    changeLayer(layer) {
        Camera.changeLayer(this, layer);
    };
};
export { Camera, Camera2DService, Spirit };