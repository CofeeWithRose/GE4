import { Empty } from "./Empty";
import { Camera2dComp } from "../BasicComponents/Camera2dComp";


class CameraObj extends Empty {
    constructor() {
        super();
        this.addComponent(new Camera2dComp());
    };
}
export { CameraObj };