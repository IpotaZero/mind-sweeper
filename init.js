const width = 1280
const height = 720

const cvsMain = document.querySelector("#main-canvas")
cvsMain.width = width
cvsMain.height = height

const ctxMain = cvsMain.getContext("2d")

const cvsSub = document.querySelector("#sub-canvas")
cvsSub.width = width
cvsSub.height = height

const ctxSub = cvsSub.getContext("2d")

const container = document.getElementById("canvas-container")

const rotateCanvas = (angle, ms = 2500) => {
    const promise = new Promise((resolve) => {
        container.ontransitionend = () => {
            resolve()
        }
    })

    canvasContainerTransitionManager.setTransform(`rotate(${angle}deg)`, ms)

    container.style.transform = mouse.angle = (Math.PI / 180) * angle

    return promise
}
