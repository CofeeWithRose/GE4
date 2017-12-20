import { AbstractComponent } from "./AbstractComponent";
import { Spirit } from "../Services/Camera2DService";
import { Transform } from "./Transform";
import { Resource } from "../Services/Resource";

class RenderComp extends AbstractComponent{
    constructor(){
        super();
    }
    $awake(){
        this.image = Resource.get(`Resources/default.png`);
        this.trans = this.getComponentByType(Transform);
        this.spirit = new Spirit(,)
    }
}