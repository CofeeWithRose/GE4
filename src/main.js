import {AbstractGameObject as Ab, AbstractGameObject} from './GE/GameObjects/AbstractGameObject';
import {AbstractComponent as Comp} from './GE/BasicComponents/AbstractComponent'
import {Util} from './GE/Core/Util';
(()=>{
    let ab = new Ab();
    ab.addComponent(new Comp());
    const comp = ab.getComponentsByType(Comp)[0];
    ab.getComponents();
    ab.removeComponent(comp);
    // console.log();
})()

