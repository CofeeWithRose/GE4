import { AbstractComponent } from "./AbstractComponent";
import { Input } from "../Services/InputService";

class TestComp extends AbstractComponent{
    constructor(){
        super();
    }
    //这个组件是用来测试. 这个方法也会每一帧都被调用.

    $update(){
        if(Input.down.mouse0){//这里就可以访问到Input属性的值
            this.gameObject.destorySelf();//鼠标左键点下，销毁对象
        }
    }
}
export{TestComp}
