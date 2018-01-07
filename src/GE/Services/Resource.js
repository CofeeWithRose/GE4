import { config } from "../config-resources";
const resource = {
    loader: undefined,
};
//载入图片资源.
class Resource {
    constructor() {
        this._resources = new Map();
        this._loadedCout = 0;
        this._allCount = 0;
        this._EmptyImage = new Image();
        resource.loader = this;
    }
    /**
     * {url:resource}
     */
    //To Fix 目前只实现load config 中 Image 与anim audio尚未实现.
    $initService(callBack) {
        this._loadImageList(this._getImageListByCfg(), callBack);
        // this._loadInameList(imageList,callBack);
        console.log(`Load Resource (${this._loadedCout}/${this._allCount})...`);
    }
    /**
     * 解析config,加载配置中的image与animation中的图片获取url list.
     */
    _getImageListByCfg() {
        const list = this._getAnimationImageByCfg();
      debugger
        const imageKeys = Object.keys(config.images);
        for (let i = 0; i < imageKeys.length; i++) {
            list.push(config.images[imageKeys[i]]);
        }
        return list;
    };
    /**
     * 解析config中animation的资源
     */
    _getAnimationImageByCfg() {
        let list = [];
        const animations = config.animations;
        for (let key in animations) {
            const anim = animations[key];
            list = list.concat(this.getImagesByAnim(key, anim));

        }
        return list;

    };
    /**
     * 获取动画对象中的url list
     */
    getImagesByAnim(key, anim) {
        const list = [];
        for (let i = 1; i <= anim.frameNumber; i++) {
            let url = `${anim.url}/${key}/ (${i}).${anim.type}`;
            list.push(url);
            // console.log(url);
        }
        return list;
    }
    /**
     * 加载图片资源，list为 url,完成所有的加载后回调callback.
     */
    _loadImageList(list, callBack) {
        for (let i = 0; i < list.length; i++) {
            if (list[i]) {
                this._loadImage(list[i], this._onCompleted(callBack));
            }
        }

    };
    /**
     * 加载失败.
     */
    _onError(url, img, callBack) {
        return () => {
            this._resources.set(url, this._EmptyImage);
            img.onError = null;
            this._loadedCout++;
            console.error(`fail loaded [${url}] (${this._loadedCout}/${this._allCount}) .... ,Please check [config-resorces.js] !`);
            if (this._loadedCout === this._allCount) {
                callBack();
            }
        }

    }
    /**
     * 加载成功.
     */
    _onLoad(url, img, callBack) {
        return () => {
            this._resources.set(url, img);
            img.onload = null;
            this._loadedCout++;
            console.log(`loaded  [${url}] (${this._loadedCout}/${this._allCount}) .... `);
            if (this._loadedCout === this._allCount) {
                console.log(`loaded  [${url}] (${this._loadedCout}/${this._allCount}) .... `);
                callBack();
            }
        }
    }
    _loadImage(url, callBack) {
        let img = this._resources.get(url);
        if (!img) {
            img = new Image();
            this._allCount++;
            img.onload = this._onLoad(url, img, callBack);
            img.onerror = this._onError(url, img, callBack);
            img.src = url;//开始加载.
        }
    }
    get(url) {
        return this._resources.get(url);
    }
    _onCompleted(callBack) {
        return () => {
            console.log('Resource Completed!')
            callBack();
        }
    }

}

export { Resource, resource }