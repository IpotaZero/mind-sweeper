const mine_1 = new Iimage("images/mine1.png", 0, 0, width, height)
const mine_4 = new Iimage("images/mine4.png", 0, 0, width, height)
const mine_5 = new Iimage("images/mine5.png", 0, 0, width, height)
const mine_273 = new Iimage("images/mine273.png", 0, 0, width, height)
const mine_107 = new Iimage("images/mine107.png", 0, 0, width, height)
const mine_76 = new Iimage("images/mine76.png", 0, 0, width, height)
const mine_75 = new Iimage("images/mine75.png", 0, 0, width, height)
const mine_78 = new Iimage("images/mine78.png", 0, 0, width, height)
const backpack = new Iimage("images/backpack.png", 0, 0, width, height)
const pillow = new Iimage("images/pillow.png", 0, 0, width, height)

const bg_title = new Iimage("images/title.png", 0, 0, width, height)

const se_select = new Iaudio("sounds/カーソル移動12.mp3")
const se_ok = new Iaudio("sounds/決定ボタンを押す44.mp3")
const se_cancel = new Iaudio("sounds/決定ボタンを押す50.mp3")
const se_open = new Iaudio("sounds/レバーを倒す.mp3")

const bgm_title = new IBGM("sounds/title.wav")
const bgm_mine = new IBGM("sounds/mine.wav")

Icommand.se_select = se_select
Icommand.se_cancel = se_cancel
Icommand.se_ok = se_ok
