import {AbstractComponent} from './AbstractComponent';
import {Camera} from './../Services/ServiceInstance';
import { Vector3 } from '../Data/Vector3';
class Transform extends AbstractComponent{
    constructor(){
        super();
        this.position = new Vector3();
        this.rotation = new Vector3();
        this.scale = new Vector3();
    }
    getScreenPosition(){
       const mainTrans = Camera.main.getComponentByType(Transform)[0];
       return mainTrans.position.subtract(this.position);
    };
}
export {Transform};