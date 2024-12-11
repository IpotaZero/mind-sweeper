const changeScene = (scene, ms = 500) => {
    ctxSub.clearRect(0, 0, width, height)

    currentScene = sceneDark

    canInput = false

    const container = document.querySelector("#canvas-container")
    container.style.transition = `all ${ms / 1000}s`
    container.style.opacity = 0

    setTimeout(() => {
        currentScene = scene
        currentScene.start?.()
        container.style.opacity = 1
        canInput = true
    }, ms)
}

const sceneDark = new (class {
    constructor() {}
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
