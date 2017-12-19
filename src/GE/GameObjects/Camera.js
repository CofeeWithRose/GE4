import { Empty } from "./Empty";
import { Camera } from "../Services/ServiceInstance";
class Camera extends Empty {
    constructor() {
        super();
        if (!Camera.main) {
            Camera.main = this;
        }
    };

}
export { Camera };