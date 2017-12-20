import { renderConfig } from "../config-render";
import { Arrays2 } from "../Data/Array2";
import { Vector3 } from "../Data/Vector3";
import { Debugger } from "../Util/Debugger";
const Camera = {
    main: undefined,
    spirits: new Arrays2(),
};
class Camera2DService {
    constructor() {
        const elem = document.querySelector(`#${renderConfig.camera2dContentId}`);
        this.canvas = document.createElement('canvas');
        this.width = this.canvas.width = elem.clientWidth;
        this.height = this.canvas.height = elem.clientHeight;
        this.ctx = this.canvas.getContext('2d');

    }
    $rend() {
        // Debugger.log('rend...');
        Camera.spirits.forEach((spirit) => {
            Debugger.log('rend...');
            this.ctx.drawImage(spirit.canvas,
                spirit.screenPosition.x,
                spirit.screenPosition.y,
                spirit.size.x, 
                spirit.size.y);
        });
    }
}

class Spirit {
    constructor(screenPosition = new Vector3(), size = new Vector3()) {
        this.screenPosition = screenPosition;
        this.size = size;
        this.canvas = document.createElement('canvas');
        this.layer = size.z;
        this.canvas.width = size.x;
        this.canvas.height = size.y;
        Camera.spirits.add(this, layer);
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
}
export { Camera, Camera2DService, Spirit };