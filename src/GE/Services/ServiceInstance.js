// const readOnlyHandle = {
//     set(target, key, value, receiver) {
//         throw `Write Exception The ${key} is readOnly`;
//     },
//     get(target, key, receiver) {
//         return Reflect.get(target, key, receiver);
//     }
// }
// const ServiceFactory = (obj, handle) => handle ? new Proxy(obj, handle) : obj;
// this = new Proxy(this,{
//     get(target, key, receiver){
//         console.log(target.id);
//         return Reflect.get(target, key, receiver);
//     },
//     set(target, key, value, receiver){
//         return Reflect.get(target, key, value,receiver);
//     }
// });

const Timer = {
    frameCount:0,
    fromStart:0,
    delta:0,
};

const Input = {


}
export { Timer, Input };