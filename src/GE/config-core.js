import { TimeService } from './Services/TimeService'
 const config = {
    services:[TimeService],
    onStart: ['$awake','$start'],
    onUpdate: ['$serviceUpdate','$update','$lateUpdate','$preRend','$rend'],
    onCallBack:['$onHit','$onHitted'],
    onEnd: ['$destory'],
}
export {config};
/**
 * 启动： 
 * 1.实例化  GameObjet Compment.
 * 2.实例化service.
 * 3.$awake :
 *           将cameraObject载入ServiceInstance.
 * 4.$start:
 * 
 * 
 * 帧循环
 * 1.$serviceUpdate:
 *                  TimerService设置时间.
 *                  
 * 2.$update:
 *           
 * 
 */
