import {AbstractGameObject as Ab} from './GE/GameObjects/AbstractGameObject';
import {AbstractComponent as Comp} from './GE/BasicComponents/AbstractComponent'
import {Util} from './GE/Core/Util';
(()=>{
    let ab = new Ab();
    ab.addComponent(new Comp());
    // const comp = ab.getComponents()[0];

    // ab.removeComponent(comp);
    // ab.destorySelf();
    // console.log();
})()

