let canInput = true

const keyboard = {
    pressed: new Set(),
    longPressed: new Set(),
    pushed: new Set(),
    upped: new Set(),
}

const keyDown = (e) => {
    // event.preventDefault()

    if (!canInput) return

    if (!keyboard.pressed.has(e.code)) {
        keyboard.pushed.add(e.code)

        if (["KeyZ", "Enter", "Space"].includes(e.code)) keyboard.pushed.add("ok")
        if (["KeyX", "Escape", "Backspace"].includes(e.code)) keyboard.pushed.add("cancel")
    }

    keyboard.pressed.add(e.code)
    keyboard.longPressed.add(e.code)

    console.log(keyboard.longPressed)
}

const keyUp = (e) => {
    if (!canInput) return

    // keyboard.longPressed.delete(e.code)
    keyboard.pressed.delete(e.code)
    keyboard.upped.add(e.code)
}

document.addEventListener("keydown", (e) => {
    keyDown(e)
})

document.addEventListener("keyup", (e) => {
    keyUp(e)
})

const cvsStyle = getComputedStyle(container)

const onMouseMove = (e) => {
    if (!canInput) return

    console.log("test")

    const rect = e.target.getBoundingClientRect()

    const center = vec(rect.width / 2, rect.height / 2)

    const cvsWidth = +cvsStyle.width.slice(0, -2)
    const cvsHeight = +cvsStyle.height.slice(0, -2)

    const cvsCenter = vec(cvsWidth, cvsHeight).mlt(1 / 2)

    // console.log(width/cvsWidth)

    mouse.p = vec(e.clientX - rect.x, e.clientY - rect.y)
        .sub(center)
        .rot(-mouse.angle)
        .add(cvsCenter)
        .mlt(width / cvsWidth)

    mouse.moved = true
}

container.addEventListener("mousemove", onMouseMove, false)

const mouse = {
    clicking: false,
    rightClicking: false,
    middleClicking: false,
    clicked: false,
    rightClicked: false,
    middleClicked: false,
    p: vec(0, 0),
    moved: false,
    angle: 0,
}

container.addEventListener(
    "mousedown",
    (e) => {
        if (!canInput) return

        if (e.button == 0) {
            mouse.clicked = true
            mouse.clicking = true
        } else if (e.button == 1) {
            mouse.middleClicked = true
            mouse.middleClicking = true
        } else if (e.button == 2) {
            // mouse.rightClicked = true
            // mouse.rightClicking = true
        }

        console.log(mouse.p)
    },
    false,
)

const mouseUp = (e) => {
    if (!canInput) return

    if (e.button == 0) {
        mouse.clicking = false
    } else if (e.button == 1) {
        mouse.middleClicking = false
    } else if (e.button == 2) {
        mouse.rightClicking = false
    }
}

container.addEventListener("mouseup", mouseUp, false)
container.addEventListener("mouseleave", mouseUp, false)

container.addEventListener("wheel", (e) => {
    mouse.deltaX = e.deltaX
    mouse.deltaY = e.deltaY
})

container.addEventListener("contextmenu", (event) => {
    event.preventDefault()
    mouse.rightClicked = true
})

const focusState = {
    isFocused: true,
    justFocused: false,
    justBlurred: false,
}

window.addEventListener("blur", (e) => {
    console.log("よそ見するにゃ!")
    focusState.isFocused = false
    focusState.justBlurred = true
})

window.addEventListener("focus", (e) => {
    console.log("こっち見んにゃ!")
    focusState.isFocused = true
    focusState.justFocused = true
})

const updateInput = () => {
    keyboard.longPressed.clear()
    keyboard.pushed.clear()
    keyboard.upped.clear()

    mouse.deltaY = 0
    mouse.clicked = false
    mouse.rightClicked = false
    mouse.middleClicked = false
    mouse.moved = false

    focusState.justFocused = false
    focusState.justBlurred = false

    if (!canInput) {
        keyboard.pressed.clear()
        mouse.clicking = false
        mouse.rightClicked = false
        mouse.middleClicking = false
    }
}
