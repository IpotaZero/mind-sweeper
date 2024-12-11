const width = 1280
const height = 720

// const cvsContainer = document.querySelector("#canvas-container")

const cvsMain = document.querySelector("#main-canvas")
cvsMain.width = width
cvsMain.height = height

const ctxMain = cvsMain.getContext("2d")

const cvsSub = document.querySelector("#sub-canvas")
cvsSub.width = width
cvsSub.height = height

const ctxSub = cvsSub.getContext("2d")

const rotateCanvas = (angle, ms = 2500) => {
    cvsSub.style.transform = `rotate(${angle}deg)`
    cvsMain.style.transform = `rotate(${angle}deg)`
    mouse.angle = (Math.PI / 180) * angle

    cvsSub.style.transition = `all ${ms / 1000}s`
    cvsMain.style.transition = `all ${ms / 1000}s`

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}
