import { config } from "../config-resources";
const resource = {
    loader: undefined,
};
class Resource {
    constructor() {
        this._resources = new Map();
        this._loadedCout = 0;
        this._allCount = 0;
        resource.loader = this;
    }
    /**
     * {url:resource}
     */
    //To Fix 目前只实现load config 中 Image.
    $initService(callBack) {

        const imageKeys = Object.keys(config.images);
        for (let i = 0; i < imageKeys.length; i++) {
            this._loadImage(config.images[imageKeys[i]], this._onCompleted(callBack));
        }
        console.log(`Load Resource (${this._loadedCout}/${this._allCount})...`);
    }
    _onError(url, img, callBack) {
        return () => {
            this._loadedCout++;
            console.error(`fail loaded [${url}] (${this._loadedCout}/${this._allCount}) .... ,Please check [config-resorces.js] !`);
            if (this._loadedCout === this._allCount) {
                callBack();
            }
        }

    }
    _onLoad(url, img, callBack) {
        return () => {
            this._resources.set(url, img);
            img.onload = null;
            this._loadedCout++;
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
            img.src = url;
        }
    }
    get(url) {
        return this._resources.get(url);
    }
    _onCompleted(callBack) {
        return () => {
            console.log('Resource complete!')
            callBack();
        }
    }

}

export { Resource ,resource }