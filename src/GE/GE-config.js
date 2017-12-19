import { TimeService } from './Services/TimeService'
 const config = {
    debug:true,
    onStart: ['$awake','$start'],
    onUpdate: ['$serviceUpdate','$beforeUpdate','$update','$lateUpdate'],
    onEnd: ['$destory'],
    services:[TimeService],
}
export {config};