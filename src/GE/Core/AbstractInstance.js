import { Util } from "../Util/Util";
class AbstractInstance {
    constructor() {
        this._id = Util.uuid();
        // this = new Proxy(this,{
        //     get(target, key, receiver){
        //         console.log(target.id);
        //         return Reflect.get(target, key, receiver);
        //     },
        //     set(target, key, value, receiver){
        //         return Reflect.get(target, key, value,receiver);
        //     }
        // });
    }
}
export {AbstractInstance};