const sceneTitle = new (class {
    constructor() {
        this.command = new Icommand(
            ctxMain,
            "anzu",
            48,
            "azure",
            width / 2,
            430,
            new RegExDict({
                "": ["つづきから", "はじめから", "ぜんぶわすれる", "くれじっと"],
                "2": ["うん", "!やっぱやめる"],
                "3": "制作: MCR;企画: いぽた;BGM: うめぼし;SE: 効果音ラボ;イラスト: Stable Diffusion",
            }),
            {
                titles: new RegExDict({
                    "2": "ほんとに?",
                }),
                text_align: "center",
            },
        )

        this.frame = 0
    }

    async startBGM() {
        if (BGM != bgm_title) {
            await BGM.fade(0.01, 1)
            BGM.pause()
        }

        BGM = bgm_title
        await BGM.fetch()
        BGM.reset()
        await BGM.play()
        BGM.setVolume(0.3)
    }

    start() {
        const options = ["つづきから", "はじめから", "ぜんぶわすれる", "くれじっと"]

        if (localStorage.getItem("storyId") == "6") options.push("おまけ")

        this.command.options.dict[""] = options

        this.startBGM()
    }

    loop() {
        bg_title.draw(ctxMain)
        // Irect(ctxMain, "#111111", 0, 0, width, height, { line_width: 0 })

        ctxMain.save()

        ctxMain.shadowBlur = randomLikeFunction(this.frame / 48) * 10
        ctxMain.shadowColor = "#ffffff80"

        Itext(ctxMain, "azure", "anzu", 120, width / 2, height / 2 - 100, "まいんどすいーぱー", {
            text_align: "center",
            baseline: "middle",
            frame: this.frame / 4,
            letter_spacing: "-0.15em",
        })

        ctxMain.restore()

        this.command.run(this.frame++ / 5)

        if (this.command.is_match("0")) {
            storyId = localStorage.getItem("storyId") ?? 0
            changeScene(sceneNovel)
            this.command.reset()
        } else if (this.command.is_match("1")) {
            storyId = 0
            sceneNovel.background = mine_1
            sceneNovel.reset()

            changeScene(sceneNovel, 2000)
            this.command.reset()
        } else if (this.command.is_match("20")) {
            localStorage.clear()
            changeScene(sceneTitle, 1000)
            this.command.cancel(2)
        } else if (this.command.is_match("21")) {
            this.command.cancel(2)
        } else if (this.command.is_match("3")) {
            const { clicked } = Ibutton(ctxMain, "azure", "anzu", 48, 20, 20, 200, 50, "もどる", {
                text_align: "center",
                baseline: "top",
            })
            if (clicked) {
                this.command.cancel(2)
                se_cancel.play()
            }
        } else if (this.command.is_match("4")) {
            mine_273.draw(ctxMain)

            const { clicked } = Ibutton(ctxMain, "#111", "anzu", 48, 20, 20, 200, 50, "もどる", {
                text_align: "center",
                baseline: "top",
            })
            if (clicked) {
                this.command.cancel(2)
                se_cancel.play()
            }
        }
    }
})()

function randomLikeFunction(x) {
    // ランダムな周期と振幅を設定
    const frequency1 = 2 // 第一の周波数
    const frequency2 = 5 // 第二の周波数
    const amplitude1 = 2 // 第一の振幅
    const amplitude2 = 1 // 第二の振幅

    // 三角関数を使って滑らかにランダムな変動を生成
    return (
        amplitude1 * Math.sin(frequency1 * x) +
        amplitude2 * Math.cos(frequency2 * x) +
        amplitude2 * Math.cos(Math.sin(x) ** 2) +
        Math.sin(x / 10) * Math.random() * 0.5 // 少しノイズを加える
    )
}
