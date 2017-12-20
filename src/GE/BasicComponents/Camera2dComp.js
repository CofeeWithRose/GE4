import { AbstractComponent } from "./AbstractComponent";
import {Camera as camera} from './../Services/ServiceInstance'
class Camera2dComp extends AbstractComponent{
    constructor(){
        super();
    }
    $awake(){
        if(!camera.main){
            camera.main =  this.gameObject;
        }
    };
}
export {Camera2dComp};