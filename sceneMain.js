const sceneMain = new (class {
    constructor() {
        this.command = new Icommand(
            ctxMain,
            "anzu",
            48,
            "azure",
            width / 2,
            290,
            new RegExDict({
                "": ["!さいかい", "さいしょから", "タイトルにもどる"],
            }),
            {
                text_align: "center",
            },
        )

        this.gameOverCommand = new Icommand(
            ctxMain,
            "anzu",
            48,
            "azure",
            width / 2,
            290,
            new RegExDict({
                "": ["やりなおす", "タイトルにもどる"],
            }),
            {
                text_align: "center",
            },
        )

        this.mines = 9
        this.size = 9
    }

    start() {
        this.cvs = document.createElement("canvas")
        this.cvs.width = 600
        this.cvs.height = 600

        // Create a Minesweeper instance
        this.minesweeper = new Minesweeper(this.cvs, this.size, this.size, this.mines)

        ctxMain.drawImage(this.cvs, (1280 - 600) / 2, (720 - 600) / 2)

        this.mode = "mine"

        this.serif = ""

        this.timeCount = 0
    }

    loop() {
        this.draw()

        if (this.mode == "mine") {
            this.modeMine()
            if (keyboard.pushed.has("Escape")) this.mode = "pause"
        } else if (this.mode == "pen") {
            this.modePen()
            if (keyboard.pushed.has("Escape")) this.mode = "pause"
        } else if (this.mode == "pause") {
            this.modePause()
            if (keyboard.pushed.has("Escape")) this.mode = "mine"
        } else if (this.mode == "gameOver") {
            this.modeGameOver()
        }

        if (this.mode != "gameOver")
            if (Ibutton(ctxMain, "azure", "anzu", 45, 20, 20, 50, 50, "ll", { text_align: "center" }).clicked) {
                this.mode = this.mode == "pause" ? "mine" : "pause"
            }
    }

    draw() {
        ctxMain.clearRect(0, 0, width, height)
        ctxMain.drawImage(this.cvs, (1280 - 600) / 2, (720 - 600) / 2)

        Itext(ctxMain, "azure", "anzu", 48, 60, 100, `のこり: ${this.minesweeper.remainingMines}`)
        Itext(ctxMain, "azure", "anzu", 36, 60, 670, this.serif)

        if (this.minesweeper.trueRemainingMines == 0 && this.minesweeper.remainingMines == 0) {
            // console.log("clear")
            const clicked = Ibutton(ctxMain, "azure", "anzu", 48, 1010, 600, 200, 55, "すすむ", {
                text_align: "center",
                baseline: "top",
            }).clicked

            if (clicked) {
                storyId++
                changeScene(sceneNovel, 1000)
            }
        }

        Itext(ctxMain, "azure", "anzu", 48, 60, 600, `たいむ: ${Math.floor(this.timeCount++ / 60)}`)
    }

    modeMine() {
        const x = mouse.p.x - (1280 - 600) / 2
        const y = mouse.p.y - (720 - 600) / 2

        if (mouse.clicked) {
            if (0 <= x && x <= 600 && 0 <= y && y <= 600) {
                this.minesweeper.onZ()
                se_turn.play()
            }
        } else if (mouse.rightClicked) {
            if (0 <= x && x <= 600 && 0 <= y && y <= 600) {
                this.minesweeper.onX()
                se_flag.play()
            }
            const serif = serifs[storyId]
            this.serif = serif[Math.floor(serif.length * Math.random())]
        }

        if (mouse.moved) this.minesweeper.onHovered(x, y)

        if (keyboard.longPressed.has("ArrowRight")) {
            this.minesweeper.moveCursor(1, 0)
            se_select.play()
        } else if (keyboard.longPressed.has("ArrowLeft")) {
            this.minesweeper.moveCursor(-1, 0)
            se_select.play()
        } else if (keyboard.longPressed.has("ArrowUp")) {
            this.minesweeper.moveCursor(0, -1)
            se_select.play()
        } else if (keyboard.longPressed.has("ArrowDown")) {
            this.minesweeper.moveCursor(0, 1)
            se_select.play()
        } else if (keyboard.longPressed.has("KeyZ")) {
            this.minesweeper.onZ()
            se_turn.play()
        } else if (keyboard.longPressed.has("KeyX")) {
            this.minesweeper.onX()
            se_flag.play()
            const serif = serifs[storyId]
            this.serif = serif[Math.floor(serif.length * Math.random())]
        }

        if (this.minesweeper.gameOver) {
            rotateCanvas(4)

            this.mode = "gameOver"
            this.frame = 0
        }

        const { clicked } = Ibutton(ctxMain, "azure", "anzu", 48, 1010, 100, 200, 50, "ペン", {
            text_align: "center",
            baseline: "top",
        })

        if (clicked) {
            this.mode = "pen"
            se_pen.play()
        }
    }

    modePen() {
        if (mouse.clicking) {
            if (this.prePosition != null) {
                ctxSub.beginPath()
                ctxSub.moveTo(this.prePosition.x, this.prePosition.y)
                ctxSub.lineTo(mouse.p.x, mouse.p.y)
                ctxSub.lineWidth = 4
                ctxSub.strokeStyle = "azure"
                ctxSub.stroke()
            }

            this.prePosition = mouse.p
        } else {
            this.prePosition = null
        }

        ctxMain.clearRect(990, 80, 240, 290)

        const clicked_sw = Ibutton(ctxMain, "azure", "anzu", 48, 1010, 100, 200, 50, "スイーパ", {
            text_align: "center",
            baseline: "top",
        }).clicked

        const clicked_clear = Ibutton(ctxMain, "azure", "anzu", 48, 1010, 200, 200, 50, "けす", {
            text_align: "center",
            baseline: "top",
        }).clicked

        if (clicked_sw) {
            this.mode = "mine"
            this.prePosition = null
            se_pen.play()
        }

        if (clicked_clear) {
            se_erase.play()
            ctxSub.clearRect(0, 0, width, height)
        }
    }

    modePause() {
        Irect(ctxMain, "#111", (1280 - 800) / 2, (720 - 400) / 2, 800, 400, { line_width: 0 })
        Irect(ctxMain, "azure", (1280 - 800) / 2, (720 - 400) / 2, 800, 400, { line_width: 2 })

        Itext(ctxMain, "azure", "anzu", 80, width / 2, height / 2 - 150, "ぽーず", {
            text_align: "center",
        })

        this.command.run()

        if (this.command.is_match("0")) {
            this.mode = "mine"
            this.command.reset()
        } else if (this.command.is_match("1")) {
            changeScene(sceneMain)
            this.command.reset()
        } else if (this.command.is_match("2")) {
            changeScene(sceneTitle)
            this.command.reset()
        }
    }

    modeGameOver() {
        if (this.frame++ < 150) return

        Irect(ctxMain, "#111", (1280 - 800) / 2, (720 - 400) / 2, 800, 400, { line_width: 0 })
        Irect(ctxMain, "azure", (1280 - 800) / 2, (720 - 400) / 2, 800, 400, { line_width: 2 })

        Itext(ctxMain, "azure", "anzu", 80, width / 2, height / 2 - 150, "げーむおーばー", {
            text_align: "center",
        })

        this.gameOverCommand.run()

        if (this.gameOverCommand.is_match("0")) {
            cvsSub.style.transform = ""
            cvsMain.style.transform = ""
            mouse.angle = 0

            changeScene(sceneMain)
            this.gameOverCommand.reset()
        } else if (this.gameOverCommand.is_match("1")) {
            cvsSub.style.transform = ""
            cvsMain.style.transform = ""
            mouse.angle = 0

            changeScene(sceneTitle, 2000)
            this.gameOverCommand.reset()
        }
    }
})()

const serifs = [["高校の自己紹介", "ガラスをひっかく音", "なんで?"], [""], [""], [""], [""], [""]]
