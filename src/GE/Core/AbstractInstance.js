import { Util } from "../Util/Util";
class AbstractInstance {
    constructor() {
        this._id = Util.uuid();
    }
}
export {AbstractInstance};