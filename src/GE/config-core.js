import { TimeService } from './Services/TimeService'
import { Camera2DService } from './Services/Camera2DService';
import { Resource } from './Services/Resource';
import { InputService} from './Services/InputService';
//这里面配置了组件会被调用的方法，它们会按顺序执行.
const config = {
    /**
     * 需要启动的service.将按顺序实例化.
     */
    services: [TimeService, Camera2DService, Resource, InputService],
    /**
     * 启动前的异步准备函数,在定义该函数时，需执行传入的回调，全部回调完成才会启动，例见Resource.
     */
    onServiceInitAsy: ['$initService'],//
    onStart: ['$awake', '$start'],//这个是在组件启动时会执行的函数
    onUpdate: ['$serviceUpdate', '$update', '$lateUpdate', '$preRend', '$rend','$rended'],//在帧循环时执行的
    onCallBack: ['$onHit', '$onHitted'],
    onEnd: ['$destory'],
}
export { config };

/**
 * 启动前： 
 * 1.实例化  GameObjet Compment.
 * 2.实例化service.
 *                resource根据config-resource加载资源.
 * 3.执行异步 $initService，全部完成回调后start 启动.
 * 
 * 启动： 
 * 
 * 1.$awake :
 *           将cameraObject载入ServiceInstance.
 * 2.$start:
 * 
 * 
 * ======================================================
 * 
 * 帧循环
 * 1.$serviceUpdate:
 *                  TimerService设置时间.
 *                  
 * 2.$update:
 *           
 * 
 */
