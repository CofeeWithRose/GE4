
import { AbstractInstance } from './../Core/AbstractInstance';
import { config } from '../config-core';

class AbstractComponent extends AbstractInstance {
    constructor() {
        super();
        // this._initComp();
    }
    //To Fix?
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
    // _initComp(){
    //     const keys = Object.keys(config);
    //     for(let i = -1;keys[++i];) {
    //         const list = config[keys[i]];
    //         for(let j = -1;list[++j];){
    //           this[list[j]] = this[list[j]] ||function(){
    //               console.log('Abstract '+ list[j]+'....');
    //           };
    //         }
    //     }
    // }
    // $awake() {
    //     console.log('base awake....')
    // }
    // $start() {
    //     console.log('base start...')
    // }
    // $beforeUpdate() {
    //     console.log('base beforeUpdate...')
    // }
    // $update() {
    //     console.log('base update...');
    //     // throw "Exception ...";
    // }
    // $lateUpdate() {
    //     console.log('base lateUpdate...')
    // }
    // $destory(){
    //     console.log('base destory...')
    // }
}
export { AbstractComponent };