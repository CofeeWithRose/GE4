import {TimeService } from './Services/TimeService'
 const config = {
    onStart: ['$awake','$start'],
    onUpdate: ['$serviceUpdate','$beforeUpdate','$update','$lateUpdate'],
    onEnd: ['$destory'],
    services:[TimeService],
}
export {config};