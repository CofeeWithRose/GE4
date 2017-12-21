import { Camera2dComp } from "../BasicComponents/Camera2dComp";
import { EmptyObj } from './EmptyObj';

class CameraObj extends EmptyObj {
    constructor() {
        super();
        this.addComponent(new Camera2dComp());
    };
}
export { CameraObj };