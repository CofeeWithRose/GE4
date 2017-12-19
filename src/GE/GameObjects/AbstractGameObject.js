import { AbstractInstance } from './../Core/AbstractInstance';
import { AbstractComponent } from './../BasicComponents/AbstractComponent';
import { Core } from './../Core/GE';
class AbstractGameObject extends AbstractInstance {
    constructor() {
        super();
        this._components = new Map();
        this._typeComponents = new Map();
    };

    addComponent(component) {
        if (component instanceof AbstractComponent) {
            Core.addComponent(this, component);
            this._components.set(component._id, component);
            let list = this._typeComponents.get(component.constructor);
            if (!list) {
                list = [];
                this._typeComponents.set(component.constructor, list);
            }
            list.push(component);
            return component;
        }
    };
    getComponentsByType(constructor){
        return this._typeComponents.get(constructor);
    };

    removeComponent(component) {
        Core.destoryComponent(this, component);
        this._components.delete(component._id);
        const list = this._typeComponents.get(component.constructor);
        const index = list.indexOf(component);
        if (-1 !== index) {
            list.splice(index, 1);
        }
    }
    getComponents() {
        return this._components.values();
    }

}
export { AbstractGameObject };