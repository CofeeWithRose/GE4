const config = {
    images: {
        default: "Resources/default.png",
        default3: "Resources/default3.png",
        errorTest2: "hjhhk.png",
    },
    /**
     * animation文件夹格中图片的命名方式为：[ player_run (1).jpg/png...]
     * url文件夹路径
     */
    animations: {
        player_run_anim: { url: 'Resources', type: 'jpg', frameNumber: 12 },
        player_jump_anim: { url: 'Resources', type: 'jpg', frameNumber: 0 },
    },
    audios: {

    },
}
export { config };