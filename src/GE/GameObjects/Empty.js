import {AbstractGameObject} from './AbstractGameObject';
import { Transform } from '../BasicComponents/Transform';
class Empty extends AbstractGameObject{
    constructor(){
        super();
        this.addComponent(new Transform());
    }
}
export {Empty};