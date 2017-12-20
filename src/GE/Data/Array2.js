/**
 *二维数组，按指定顺序添，按顺序快迭代. 
 */
class Arrays2 {
    constructor(length) {
        this._array = [];
    }

    _getCurrentArray(priorty) {
        return this._array[priorty] = this._array[priorty] || [];
    }
    /**
     * 按指定顺添加对象.
     * @param {*} obj 
     * @param {Number} priorty 
     */
    add(obj, priorty) {
        this._getCurrentArray(priorty).push(obj);
    };

    forEach(fun) {
        for (let i = 0; i < this._array.length; i++) {
            const current = this._array[i] || [];
            for (let j = -1; current[++j];) {
                fun(current[j]);
            }
        }
    }
}
export {Arrays2};