import { Flow } from './Flow';
import { config as taskConfig } from '../config-core';
import { Resource } from '../Services/Resource';
class GE {
    constructor() {
        this._serviceInitFlow = new Flow(taskConfig.onServiceInitAsy);
        this._startFlow = new Flow(taskConfig.onStart);
        this._updateFlow = new Flow(taskConfig.onUpdate);
        this._endFlow = new Flow(taskConfig.onEnd);
        this._isStop = false;
        this._init();
    }

    _init() {
        console.log("_init ...");
        this._update = this._update.bind(this);
        this.start = this.start.bind(this);
        this.setUp = this.setUp.bind(this);
    };
    //根据配置实例化service.
    _loadService() {
        const services = taskConfig.services;
        const serviceObject = Symbol();
        for (let i = -1; services[++i];) {
            const service = new services[i]();
            this.addComponent(serviceObject, service);
            this._serviceInitFlow.addCompTask(serviceObject, service);
        }
    };

    _updateTemp() {

    };

    _update() {
        requestAnimationFrame(this._update);
        if (0 !== this._startFlow.taskNumber) {
            this._startFlow.runTask();
            this._startFlow.clearTask();
        }
        this._updateFlow.runTask();
        const t = Date.now();
    };

    _initServices() {
        this._loadService();
        let excutedNumber = 0;
        let totalNum = this._serviceInitFlow.taskNumber;
        if (0 === totalNum) {
            this.start();
        } else {
        
            this._serviceInitFlow.runTask(() => {
                excutedNumber++;
                if (excutedNumber === totalNum) {
                    this._serviceInitFlow = null;
                    this.start();
                }
            })
        }

    };
    setUp() {
        console.log('set up......');
        this._initServices();
    }
    start() {
        console.log('core start...');
        this._startFlow.runTask();

        this._startFlow.clearTask();
        if (this._isStop) {
            this._isStop = !this._isStop;
            this._update = this._updateTemp;
        }
        this._update();

    }
    pause() {
        this._isStop = true;
        this._updateTemp = this._update;
        this._update = () => { };
    }
    stop() {
        this._endFlow.runTask();
    }
    addComponent(gameObject, compment) {
        // debugger
        this._startFlow.addCompTask(gameObject, compment);
        this._updateFlow.addCompTask(gameObject, compment);
        this._endFlow.addCompTask(gameObject, compment);
    };
    //To Fixed 若立在update中立即删除任务，导致update队列某些队列跳过执行.
    destoryComponent(gameObject, compment) {
        this._startFlow.delCompTask(gameObject, compment);
        this._updateFlow.delCompTask(gameObject, compment);
        this._endFlow.runComptask(gameObject, compment);
        this._endFlow.delCompTask(gameObject, compment);
    }
    //To Fixed 若立在update中立即删除任务，导致update队列某些队列跳过执行.
    destoryGameObject(gameObject) {
        this._startFlow.delObjTask(gameObject);
        this._updateFlow.delObjTask(gameObject);
        this._endFlow.runObjectTask(gameObject);
        this._endFlow.delObjTask(gameObject);
    }
}
const Core = new GE();
setTimeout(Core.setUp);
export { Core };