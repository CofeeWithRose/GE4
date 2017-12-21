import {CameraObj} from './GE/GameObjects/CameraObj'
import { RenderComp } from './GE/BasicComponents/RenderComp';
(()=>{
    
    for(let i = 0; i<200;i++){
        new CameraObj().addComponent(new RenderComp());
    }
    // ab.addComponent(new Comp());
    // const comp = ab.getComponents()[0];

    // ab.removeComponent(comp);
    // ab.destorySelf();
    // console.log();
})()

