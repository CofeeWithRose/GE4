import { CameraObj } from './GE/GameObjects/CameraObj'
import { RenderComp } from './GE/BasicComponents/RenderComp';
import { TestComp } from './GE/BasicComponents/TestComp';
import { config } from './GE/config-resources';
(() => {

    for (let i = 0; i < 1; i++) {
        //在场景中的一个对象.
        var gameObject = new CameraObj();
        /**
         * RenderComp 对象的组件，以实现对象的功能，继承自Abstract Component 这个就是它的工作流程。
         * gameObject.addComponent() 参数为  AbstractComponent为对象添加功能.
         * 
         * RenderComp: 该功能为对象渲染出图像.
         * */
        gameObject.addComponent(new RenderComp(0,config.images.t2));
        gameObject.addComponent(new TestComp());
    }
    // ab.addComponent(new Comp());
    // const comp = ab.getComponents()[0];

    // ab.removeComponent(comp);
    // ab.destorySelf();
    // console.log();
})()

// 还有一个叫service的概念

// Component与gameObject绑定，但并不能满足所有的需要。

// service在游戏中是单例.看这里