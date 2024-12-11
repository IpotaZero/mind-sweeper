const story = [
    async function* () {
        sceneNovel.background = mine_1

        yield "「ふんふふんふふーん、ふんふふんふふーん」"
        yield "「ゲシュタルトかな? プラモデルかな?」"
        yield "まいんちゃん、楽しそうですね"
        yield "まいんちゃんはいつもふわふわした女の子"
        yield "今日も意味不明なことを喚いています"
        yield "「あ、あああ」"
        yield "おや、どうしたのでしょう"
        yield "「わあああああああ!!!!」"
        yield "「死ね!死ね!死ね!死ね!」"
        yield "どうやら嫌なことを思い出してしまったようです"
        yield "心の地雷を取り除いて嫌な記憶を忘れさせてあげましょう"
        sceneMain.mines = 9
        sceneMain.size = 9
        changeScene(sceneMain, 1000)
    },
    async function* () {
        localStorage.setItem("storyId", storyId)

        yield "「あれ、なんだっけ」"
        yield "無事に忘れさせられましたね"
        yield "このように心の地雷を取り除くのがあなたの仕事です"
        yield "頑張っていきましょうね"
        await darken(500)
        sceneNovel.background = mine_4
        yield "「まいんちゃんは天才なので、勉強ができます」"
        yield "何言ってるんでしょうね"
        yield "「.......」"
        yield "「中学生の頃、」"
        yield "まいんちゃんが何かを語り始めました"
        yield "「勉強ができない人間を見下して、馬鹿にしていました」"
        yield "「.......」"
        yield "「なんで、そんな」"
        yield "「許して」"
        yield "はあ、またあなたの出番のようです"
        sceneMain.mines = 13
        sceneMain.size = 11
        changeScene(sceneMain)
    },
    async function* () {
        localStorage.setItem("storyId", storyId)

        sceneNovel.background = mine_5
        yield "「」"
        yield "「セリフを忘れたわけじゃないよ」"
        yield "「ただ、世界に発信するに足るものか、考えていたんだ」"
        yield "まいんちゃんの表層的哲学ごっこだ"
        yield "「『数学は大学に入ると哲学になる』と言ったのは誰でしたか?」"
        yield "「私です」"
        yield "「死ねよ」"
        yield "さて、忘れさせてあげましょう"
        sceneMain.mines = 19
        sceneMain.size = 13
        changeScene(sceneMain)
    },
    async function* () {
        localStorage.setItem("storyId", storyId)

        sceneNovel.background = mine_5
        yield "「小学校の修学旅行、どこに行ったか、覚えてるかな?」"
        yield "「私はもう忘れてしまいました」"
        yield "「思い出は、削れて無くなっていくのです」"
        yield "「忘れたいことは忘れられないくせに」"
        yield "まいんちゃんがポエムを詠み始めましたよ"
        yield "誰にも届かないのにね"
        await rotateCanvas(12, 4000)
        yield "誰にも届かないのにね"
        sceneMain.mines = 25
        sceneMain.size = 15
        changeScene(sceneMain)
    },
    async function* () {
        rotateCanvas(0, 0)
        localStorage.setItem("storyId", storyId)

        sceneNovel.background = mine_78
        yield "「1番忘れたいことは、もはや思い出すことが苦痛ではなくなりました」"
        yield "「2番目の忘れたいことは、私の性格になりました」"
        yield "「3番目に忘れたいことは、」"
        yield "「今でも殺意を抱かせます」"
        yield "おお、こわいこわい"
        sceneMain.mines = 25
        sceneMain.size = 15
        changeScene(sceneMain)
    },
    async function* () {
        localStorage.setItem("storyId", storyId)

        sceneNovel.background = mine_107
        yield "「宝石は研磨されて美しくなるそうです」"
        yield "「私の人生は綺麗になれましたか?」"
        yield "「ふわふわ」"
        yield "「しあわせ」"
        yield "「いいね」"
        changeScene(sceneEnding, 1000)
    },
]

let storyId = 0

const sceneNovel = new (class {
    constructor() {}

    async reset() {
        this.story = story[0]()
        await this.getNextText()
    }

    async start() {
        this.story = story[storyId]()
        await this.getNextText()
    }

    loop() {
        Irect(ctxMain, "#111", 0, 0, width, height, { line_width: 0 })

        this.background.draw(ctxMain)

        Irect(ctxMain, "#111111c0", 0, 500, width, height - 500, { line_width: 0 })

        Itext(ctxMain, "azure", "anzu", 48, 20, 520, this.text + (this.frame % 60 > 30 ? "▼" : ""), {
            letter_spacing: "-3px",
            frame: this.frame++ / 3,
            max_width: width - 40,
        })

        if (keyboard.pushed.has("ok") || mouse.clicked) {
            if (this.text.length > this.frame / 3) {
                this.frame = this.text.length * 3
                return
            }

            this.getNextText()
        }
    }

    async getNextText() {
        this.gen = await this.story.next()
        this.text = this.gen.value
        this.frame = 0
    }
})()
