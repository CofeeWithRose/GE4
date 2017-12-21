import { AbstractComponent } from "./AbstractComponent";
import { Camera } from "../Services/Camera2DService";
import { Input } from "../Services/InputService";

class Camera2dComp extends AbstractComponent{
    constructor(){
        super();
    }
    $awake(){
        if(!Camera.main){
            Camera.main =  this.gameObject;
        }
    };
}
export {Camera2dComp};