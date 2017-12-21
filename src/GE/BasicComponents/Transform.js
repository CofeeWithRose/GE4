import {AbstractComponent} from './AbstractComponent';
import { Vector3 } from '../Data/Vector3';
import { Camera } from '../Services/Camera2DService';

class Transform extends AbstractComponent{
    constructor(){
        super();
        this.position = new Vector3();
        this.rotation = new Vector3();
        this.scale = new Vector3({x:1,y:1});
        this.sPosition = new Vector3();
    }
    $start(){
        // console.log(Camera.main.getComponentByType);
        this.caP = Camera.main.getComponentByType(Transform).position;
    }
    $update(){
        this.caP.subtract(this.position,this.sPosition);
    }
}
export {Transform};