const sceneEnding = new (class {
    constructor() {}
    loop() {
        Irect(ctxMain, "#111", 0, 0, width, height)

        Itext(ctxMain, "azure", "anzu", 48, width / 2, height / 2, "まいんどすいーぱー;おわり")
    }
})()
