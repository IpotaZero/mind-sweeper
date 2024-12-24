const canvasContainerTransitionManager = {
    element: document.getElementById("canvas-container"),
    transition: {
        opacity: 0,
        transform: 0,
    },
    setTransition() {
        this.element.style.transition = `
            opacity ${this.transition.opacity}ms,
            transform ${this.transition.transform}ms
        `
    },
    setOpacity(value, ms) {
        this.element.style.opacity = value
        this.transition.opacity = ms
        this.setTransition()
    },
    setTransform(value, ms) {
        this.element.style.transform = value
        this.transition.transform = ms
        this.setTransition()
    },
}
