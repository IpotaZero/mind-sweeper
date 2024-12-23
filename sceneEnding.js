const sceneEnding = new (class {
    constructor() {}
    loop() {
        Irect(ctxMain, "#111", 0, 0, width, height)

        Itext(ctxMain, "azure", "anzu", 48, width / 2, height / 2 - 24, "まいんどすいーぱー;おわり", {
            text_align: "center",
        })

        if (mouse.clicked || keyboard.pushed.size > 0) {
            se_open.play()
            changeScene(sceneTitle, 2500)
        }
    }
})()
