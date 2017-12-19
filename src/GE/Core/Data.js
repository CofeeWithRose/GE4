class Vector3 {
    constructor({ x = 0, y = 0, z = 0 }) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    subtract(otherVector3) {
        return new Vector3({
            x: this.x -= otherVector3.x, 
            y: this.y -= otherVector3.y, 
            z: this.z -= otherVector3.z });
    }
    add(otherVector3) {
        return new Vector3({
       x: this.x += otherVector3.x,
        y:this.y += otherVector3.y,
        z:this.z += otherVector3.z});
    }
    invert() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
    }
}
export { Vector3 };