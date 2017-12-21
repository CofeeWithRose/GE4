import { renderConfig } from "../config-render";

const Input = {
    mousePosition: { x: 0, y: 0 },
    mouse0: false,
    mouse1: false,
    mouse2: false,
    up: {},
    down: {},
};
class InputService {

    constructor() {
        const ele = document.querySelector(`#${renderConfig.camera2dRenderId}`);
        console.log(ele);
        this._preventDefault();
        this._keyEventListen(ele);
        this._mouseEventListen(ele);
    }
    _preventDefault() {
        //除去浏览器默认右键.
        document.oncontextmenu = function (e) {
            e.preventDefault();
        };
    }
    _mouseEventListen(ele) {
        ele.addEventListener('mousedown', (e) => {
            //mouse0:左键，mouse1滚轮，mouse2:右键.
            const key = `mouse${e.button}`;
            if (!Input[key]) {
                Input.down[key] = true;
            };
            Input[key] = true;
        });
        ele.addEventListener('mouseup', (e) => {
            //mouse0:左键，mouse1滚轮，mouse2:右键.
            // console.log("mose up event...");
            const key = `mouse${e.button}`;
            Input[key] = false;
            Input.up[key] = true;
        });
        ele.addEventListener('mousemove',
            (e) => Input.mousePosition = { x: e.clientX, y: e.clientY });
    };

    _keyEventListen(ele) {
        ele.addEventListener('keydown', (e) => {
            if (!Input[e.key]) {
                Input.down[e.key] = true;
            };
            Input[e.key] = true;
        });
        ele.addEventListener('keyup', (e) => {
            Input[e.key] = false;
            Input.up[e.key] = true;
        })
    }
    $rended() {
        const d = Object.keys(Input.down);
        const u = Object.keys(Input.up);
        for (let i = d.length - 1; i >= 0; i--) {
            Input.down[d[i]] = false;
        }
        for (let i = u.length - 1; i >= 0; i--) {
            Input.up[u[i]] = false;
        }
    }
}
export { InputService, Input }