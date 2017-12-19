import { TimeService } from './../Services/TimeService'
 const config = {
    services:[TimeService],
    onStart: ['$awake','$start'],
    onUpdate: ['$serviceUpdate','$beforeUpdate','$update','$lateUpdate'],
    onEnd: ['$destory'],
    
}
export {config};