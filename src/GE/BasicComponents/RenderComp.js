import { AbstractComponent } from "./AbstractComponent";
import { Spirit } from "../Services/Camera2DService";
import { Transform } from "./Transform";
import { resource } from "../Services/Resource";
import { Constant } from "../Util/Constant";
import { config } from "../config-resources";
import { Vector3 } from "../Data/Vector3";

class RenderComp extends AbstractComponent {
    constructor(rendOrder) {
        super();
        this.layer = rendOrder || 0;
        /**
        * 标记image,rotation，scale是否改动,此时需重绘.
        */
        this._isChange = true;
        this.listenHandle = {
            set(target, key, value, receiver) {
                this._isChange = true();
                console.log('Changed...');
                return Reflect.get(target, key, value, receiver);
            }
        }
    }
    $start() {
        this.image = resource.loader.get(config.images.default);
        this.trans = this.getComponentByType(Transform);
        this._listen();
        this.size = new Vector3({ x: this.image.width, y: this.image.height, z: this.layer });
        this.spirit = new Spirit(this.trans.sPosition, this.size);
        this.ctx = this.spirit.canvas.getContext('2d');
        this.$preRend();
    }

    _listen() {
        //监听变动后重绘.
        // this.image = new Proxy(this.image, this.listenHandle);
        this.trans.rotation = new Proxy(this.trans.rotation, this.listenHandle);
        this.trans.scale = new Proxy(this.trans.scale, this.listenHandle);
    }
    $preRend() {
        if (this._isChange) {
            this._draw();
            this._isChange = false;
        }
    }
    _draw() {
        // console.log(`draw... ${this.image}`)
        // debugger
        const attr = {
            w: this.size.x,
            h: this.size.y,
            cx: this.trans.scale.x,
            cy: this.trans.scale.y,
            x: 0.5 * this.size.x,
            y: 0.5 * this.size.y,
            r: this.trans.rotation.z,
        }

        this.ctx.clearRect(0, 0, attr.w, attr.h);
        //canvas.width=canvas.width;
        this.ctx.save();
        this.ctx.translate(attr.x, attr.y);
        this.ctx.rotate(attr.r * Math.PI * 0.01);
        this.ctx.scale(attr.cx, attr.cy);
        this.ctx.drawImage(this.image, -attr.x, -attr.y, attr.w, attr.h);
        this.ctx.restore();
        
       
        // const img = resource.loader.get(config.images.default);
        // this.ctx.drawImage(img, 0, 0, 100, 100);
    }

}
export { RenderComp };