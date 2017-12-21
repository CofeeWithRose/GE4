class Vector3 {
    constructor(vector3) {
        const { x = 0, y = 0, z = 0 } = vector3 || {};
        this.x = x;
        this.y = y;
        this.z = z;
    }
    subtract(otherVector3, receiver) {

        receiver.x = this.x - otherVector3.x;
        receiver.y = this.y - otherVector3.y;
        receiver.z = this.z - otherVector3.z;

    }
    add(otherVector3, receiver) {

        receiver.x = this.x + otherVector3.x;
        receiver.y = this.y + otherVector3.y;
        receiver.z = this.z + otherVector3.z;

    }
    invert() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
    }
    static equals(vector3A, vector3B) {
        return vector3A.x === vector3B.x
            && vector3A.y === vector3B.y
            && vector3A.z === vector3B.z
    }
}
// const v=new Vector3({x:1,y:1,z:1});
// console.log(`test vector3 ${v.x}`);
export { Vector3 };