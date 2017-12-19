import { AbstractInstance } from './../Core/AbstractInstance';
import { AbstractComponent } from './../BasicComponents/AbstractComponent';
import { Core } from './../Core/GE';
class AbstractGameObject extends AbstractInstance {
    constructor() {
        super();
        this._components ={};
        this._typeComponents = new Map();
    };
    addComponent(component) {
        if (component instanceof AbstractComponent) {
            Core.addComponent(this, component);
            this._components[component._id] =  component;
            let list = this._typeComponents.get(component.constructor);
            if (!list) {
                list = [];
                this._typeComponents.set(component.constructor, list);
            }
            list.push(component);
            component.loadComp(this);
            return component;
        }
    };
    getComponentsByType(constructor){
        return this._typeComponents.get(constructor);
    };
    getComponentById(id){
        return this._components[id];
    }
    removeComponent(component) {
        Core.destoryComponent(this, component);
        delete this._components[component._id];
        const list = this._typeComponents.get(component.constructor);
        const index = list.indexOf(component);
        if (-1 !== index) {
            list.splice(index, 1);
        }
    }
    getComponents() {
        return Object.values(this._components);
    }
    destorySelf(){
        Core.destoryGameObject(this);
    }

}
export { AbstractGameObject };