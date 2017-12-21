import { AbstractComponent } from "./AbstractComponent";
import { Input } from "../Services/InputService";

class TestComp extends AbstractComponent{
    constructor(){
        super();
    }
    $update(){
        if(Input.down.mouse0){
            this.gameObject.destorySelf();
        }
    }
    $destory(){
        console.log('destory self...');
    }
}
export{TestComp}