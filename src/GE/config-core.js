import { TimeService } from './Services/TimeService'
import { Camera2DService } from './Services/Camera2DService';
import { Resource } from './Services/Resource';
const config = {
    /**
     * 需要启动的service.
     */
    services: [TimeService, Camera2DService, Resource],
    /**
     * 启动前的异步准备函数,在定义该函数时，需执行传入的回调，全部回调完成才会启动，例见Resource.
     */
    onServiceInitAsy: ['$initService'],
    onStart: ['$awake', '$start'],
    onUpdate: ['$serviceUpdate', '$update', '$lateUpdate', '$preRend', '$rend'],
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
