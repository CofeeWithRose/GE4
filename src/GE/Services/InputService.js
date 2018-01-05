import { renderConfig } from "../config-render";

const Input = {
    mousePosition: { x: 0, y: 0 },
    mouse0: false,
    mouse1: false,
    mouse2: false,
    up: {},
    down: {},
};
//它不会被我们手动创建，在main文件中是不能直接接触到InputService。
// 需要的service应该写入config-core中
//因为service不能被main访问.只能通过一个对象来通信，
//这里InputService会在运行时改变Input对象的属性，全局唯一。
class InputService {

    constructor() {
        const ele = document.querySelector(`#${renderConfig.camera2dRenderId}`);
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
    //这人里面将鼠键事件的状态写入Input中
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
//import与export一一对应.