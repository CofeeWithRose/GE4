const config = {
    onStart: ['$awake','$start'],
    onUpdate: ['$beforeUpdate','$update','$lateUpdate'],
    onEnd: ['$destory']
}
export {config};