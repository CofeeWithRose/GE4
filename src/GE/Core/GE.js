import { Flow } from './Flow';
import { config as taskConfig } from '../config-core';
import { Resource } from '../Services/Resource';

// const config = {
//     /**
//      * 需要启动的service.将按顺序实例化.
//      */
//     services: [TimeService, Camera2DService, Resource, InputService],
//是它
class GE {
    //加载配置.
    constructor() {
        this._serviceInitFlow = new Flow(taskConfig.onServiceInitAsy);
        this._startFlow = new Flow(taskConfig.onStart);
        this._updateFlow = new Flow(taskConfig.onUpdate);//根据配置载入帧循环的方法.
        this._endFlow = new Flow(taskConfig.onEnd);
        this._isStop = false;
        this._init();
    }
    //构造器中调用
    _init() {
        console.log("_init ...");
        this._update = this._update.bind(this);
        this.start = this.start.bind(this);
        this.setUp = this.setUp.bind(this);
    };
    //根据配置实例化service.
    _loadService() {
        const services = taskConfig.services;//[TimeService, Camera2DService, Resource, InputService]
        const serviceObject = Symbol();
        for (let i = -1; services[++i];) {
            const service = new services[i]();//这里会将配置的service实例化
            this.addComponent(serviceObject, service);
            this._serviceInitFlow.addCompTask(serviceObject, service);
        }
    };

    _updateTemp() {

    };

 
    _initServices() {
        this._loadService();//创建service单例.
        let excutedNumber = 0;
        let totalNum = this._serviceInitFlow.taskNumber;
        if (0 === totalNum) {
            this.start();
        } else {
            //初始化异步流程，资源加载完毕后 ，执行start流程
            this._serviceInitFlow.runTask(() => {
                excutedNumber++;
                if (excutedNumber === totalNum) {
                    this._serviceInitFlow = null;
                    this.start();
                }
            })
        }

    };
    //入口.
    setUp() {
        console.log('set up......');
        this._initServices();//
    }
    //执行start流程,完成后启动帧循环流程.
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
    //帧循环.
    _update() {
        requestAnimationFrame(this._update);//递归调用
        if (0 !== this._startFlow.taskNumber) {
            this._startFlow.runTask();
            this._startFlow.clearTask();
        }
        this._updateFlow.runTask();//帧循环
        const t = Date.now();
    };
    pause() {
        this._isStop = true;
        this._updateTemp = this._update;
        this._update = () => { };
    }
    stop() {
        this._endFlow.runTask();
    }
    //按照配置向流程中添加任务.
    addComponent(gameObject, compment) {
        // debugger
        this._startFlow.addCompTask(gameObject, compment);//根据配置将组件的函数加载入任务流中.
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