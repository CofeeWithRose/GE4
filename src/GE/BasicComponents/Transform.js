import {AbstractComponent} from './AbstractComponent';
import {Camera} from './../Services/ServiceInstance';
import {Vector3} from './../Core/Data'
class Transform extends AbstractComponent{
    constructor(){
        super();
        //世界坐标.
        this.position = new Vector3();
        this.rotation = new Vector3();
        //该值需要camera维护.
        // this._screenPosition = new Vector3();
        this.scale = new Vector3();
    }
    getScreenPosition(){
       const mainTrans = Camera.main.getComponentByType(Transform)[0];
       return mainTrans.position.subtract(this.position);
    };
}
export {Transform};