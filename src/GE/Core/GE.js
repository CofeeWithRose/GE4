import { Flow } from './Flow';
import { config as taskConfig } from './../task-config';
class GE {
    constructor() {
        this._startFlow = new Flow(taskConfig.onStart);
        this._updateFlow = new Flow(taskConfig.onUpdate);
        this._endFlow = new Flow(taskConfig.onEnd);
        this._isStop = false;
        this._init();
    }

    _init() {
        console.log("_init ...");
        this._initService();
        this._update = this._update.bind(this);
        this.start = this.start.bind(this);
    };
    _initService() {
        const services = taskConfig.services;
        const serviceObject = Symbol();
        for (let i = -1; services[++i];) {
           this.addComponent(serviceObject,new services[i]);
        }
    };

    _updateTemp() {

    };
    _update() {
        console.time("update")
        requestAnimationFrame(this._update);
        if (0 !== this._startFlow.taskNumber) {
            this._startFlow.runTask();
            this._startFlow.clearTask();
        }
        this._updateFlow.runTask();
        const i = console.timeEnd("update");
    };

    start() {
        this._startFlow.runTask();
        // console.log('core started...');
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
    destoryComponent(gameObject, compment) {
        this._startFlow.delCompTask(gameObject, compment);
        this._updateFlow.delCompTask(gameObject, compment);
        this._endFlow.runComptask(gameObject, compment);
        this._endFlow.delCompTask(gameObject, compment);

    }
    destoryGameObject(gameObject) {

        this._startFlow.delObjTask(gameObject);
        this._updateFlow.delObjTask(gameObject);
        this._endFlow.runObjectTask(gameObject);
        this._endFlow.delObjTask(gameObject);

    }

    _addTaskToFlowAsConfig(configList, flow, gameObject, compment) {
        let gameObjectTask = this._taskMap.get(flow);

        if (!gameObjectTask) {
            gameObjectTask = new Map();
            this._taskMap.set(flow, gameObjectTask);
        }

        let compmentTask = gameObjectTask.get(compment);
        if (!compmentTask) {
            compmentTask = [];
            gameObjectTask.set(compment, compmentTask);
        }

        for (let i = -1; configList[++i];) {
            const task = compment[configList[i]];
            if (task) {
                const taskPosition = flow.addTask(task.bind(compment), i);
                compmentTask.push(taskPosition);
            }

        }

    };
    _delCompTask(flow, gameObject, compment) {
        const objTask = this._taskMap.get(flow).get(gameObject);
        const taskList = objTask.get(compment);
        for (let i = -1; taskList[++i];) {
            flow.deleteTask(taskList[i]);
        }
        objTask.delete(compment);
    }
    _delObjTask(flow, gameObject) {
        const flowTask = this._taskMap.get(flow);
        const values = flowTask.get(gameObject).values();
        for (let i = -1; values[++i];) {
            const taskList = values[i];
            for (let j = -1; taskList[++j];) {
                flow.deleteTask(taskList[j]);
            }
        }
        flowTask.delete(gameObject);
    }
}
const Core = new GE();
setTimeout(Core.start);

export { Core, GameObject };