let currentScene = scenePretitle
currentScene.start?.()

const texture = new Iimage("images/pencil.jpg", 0, 0, width, height, {
    composite_operation: "overlay",
    alpha: 1,
})

let BGM = bgm_title

let frame = 0

let now = Date.now()

const mainloop = async () => {
    const pre = Date.now()

    cvsSub.style.cursor = ""
    ctxMain.shadowBlur = 0

    currentScene.loop()

    if (currentScene != sceneDark) texture.draw(ctxMain, { alpha: 0.1 })

    // Itext(ctxMain, "#111", "Poiret One", 48, 0, height, Math.floor(1000 / (pre - now)), {
    //     baseline: "bottom",
    // })
    now = pre

    // Iarc(ctxMain, "azure", mouse.p.x, mouse.p.y, 6)
    // Iarc(ctxMain, "azure", width/2, height/2, 6)

    updateInput()
}

Promise.all([
    new Promise((resolve) => {
        window.onload = () => {
            resolve()
        }
    }),
    loadFont("anzu", "APJapanesefontT.ttf"),
    // loadFont("Poiret One", "https://fonts.gstatic.com/s/poiretone/v16/UqyVK80NJXN4zfRgbdfbo55cVw.woff2"),
]).then(() => {
    setInterval(mainloop, 1000 / 60)
})
