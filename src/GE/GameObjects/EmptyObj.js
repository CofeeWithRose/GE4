import {AbstractGameObject} from './AbstractGameObject';
import { Transform } from '../BasicComponents/Transform';
class EmptyObj extends AbstractGameObject{
    constructor(){
        super();
        this.addComponent(new Transform());
    }
}
export {EmptyObj};