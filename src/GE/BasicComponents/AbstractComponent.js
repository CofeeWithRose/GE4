
import { AbstractInstance } from './../Core/AbstractInstance';
import { config } from '../config-core';

class AbstractComponent extends AbstractInstance {
    constructor() {
        super();
    }
    loadComp(gameObj){
        this.gameObject = gameObj;
    }
    getComponentsByType(type){
        return this.gameObject.getComponentsByType(type)||[];
    }
    getComponentByType(type){
        return this.getComponentsByType(type)[0];
    }
    getComponentById(){
        return this.gameObject.getComponentById();
    }
}
export { AbstractComponent };