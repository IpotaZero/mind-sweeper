const changeScene = (scene, ms = 500) => {
    ctxSub.clearRect(0, 0, width, height)

    currentScene = sceneDark

    canInput = false

    const container = document.querySelector("#canvas-container")
    container.style.transition = `all ${ms / 1000}s`
    container.style.opacity = 0

    container.ontransitionend = async () => {
        container.ontransitionend = null
        ctxMain.clearRect(0, 0, width, height)

        await scene.start?.()

        container.style.transition = `all ${ms / 1000}s`
        container.style.opacity = 1
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

    const container = document.querySelector("#canvas-container")
    container.style.transition = `all ${ms / 1000}s`
    container.style.opacity = 0

    return new Promise((resolve) => {
        setTimeout(() => {
            container.style.opacity = 1
            canInput = true
            resolve()
        }, ms)
    })
}
