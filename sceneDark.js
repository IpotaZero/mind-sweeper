const changeScene = (scene, ms = 500) => {
    ctxSub.clearRect(0, 0, width, height)

    currentScene = sceneDark

    canInput = false

    canvasContainerTransitionManager.setOpacity(`0`, ms)

    container.ontransitionend = async () => {
        container.ontransitionend = null
        ctxMain.clearRect(0, 0, width, height)

        await scene.start?.()

        canvasContainerTransitionManager.setOpacity(`1`, ms)

        currentScene = scene
        canInput = true
    }
}

const sceneDark = new (class {
    constructor() {}
    start() {
        this.frame = 0
    }
    loop() {}
})()

const darken = (ms) => {
    canInput = false

    canvasContainerTransitionManager.setOpacity(`0`, ms)

    return new Promise((resolve) => {
        container.ontransitionend = () => {
            canvasContainerTransitionManager.setOpacity(`1`, ms)
            canInput = true
            resolve()
        }
    })
}
