const scenePretitle = new (class {
    constructor() {}

    loop() {
        Irect(ctxMain, "#111", 0, 0, width, height, { line_width: 0 })

        Itext(ctxMain, "azure", "anzu", 120, width / 2, height / 2, "Presented by MCR", {
            text_align: "center",
            baseline: "middle",
        })

        if (mouse.clicked || keyboard.pushed.size > 0) {
            se_open.play()
            changeScene(sceneTitle, 2500)
        }
    }
})()
