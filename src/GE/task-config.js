import {AbstractService } from './Services/AbstractService'
 const config = {
    onStart: ['$awake','$start'],
    onUpdate: ['$beforeUpdate','$update','$lateUpdate'],
    onEnd: ['$destory'],
    services:[AbstractService],
}
export {config};