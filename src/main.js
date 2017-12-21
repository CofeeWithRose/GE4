import { CameraObj } from './GE/GameObjects/CameraObj'
import { RenderComp } from './GE/BasicComponents/RenderComp';
import { TestComp } from './GE/BasicComponents/TestComp';
(() => {

    for (let i = 0; i < 1; i++) {
        var a = new CameraObj();
        a.addComponent(new RenderComp());
        a.addComponent(new TestComp());
    }
    // ab.addComponent(new Comp());
    // const comp = ab.getComponents()[0];

    // ab.removeComponent(comp);
    // ab.destorySelf();
    // console.log();
})()

