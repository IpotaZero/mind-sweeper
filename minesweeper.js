class Minesweeper {
    constructor(canvas, rows, cols, mineCount) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.rows = rows
        this.cols = cols
        this.mineCount = mineCount
        this.remainingMines = mineCount // 残り地雷数
        this.trueRemainingMines = mineCount // 残り地雷数

        this.grid = []
        this.revealed = []
        this.flagged = []
        this.gameOver = false

        this.firstClick = true // 最初のクリックかどうかを判定するフラグ

        this.cursor = [0, 0]

        this.initGame()
    }

    initGame() {
        this.grid = this.generateSolvableGrid(0, 0)
        this.revealed = Array.from({ length: this.rows }, () => Array(this.cols).fill(false))
        this.flagged = Array.from({ length: this.rows }, () => Array(this.cols).fill(false))
        this.gameOver = false
        this.drawGrid()
    }

    // 解けるグリッドを生成
    generateSolvableGrid(excludeRow, excludeCol) {
        let grid, isSolvable
        let tryCount = 0

        do {
            tryCount++
            grid = this.generateGrid(excludeRow, excludeCol)
            isSolvable = true
            // isSolvable = this.checkSolvable(grid, excludeRow, excludeCol)
        } while (!isSolvable && tryCount < 1000)

        if (tryCount == 1000) console.log("shippai!")

        return grid
    }

    checkSolvable(grid, startRow, startCol) {
        const rows = grid.length
        const cols = grid[0].length

        // 各セルが訪問済みかどうかを追跡する配列
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false))

        // DFS を実行してすべてのセルを調査
        const dfs = (row, col) => {
            if (row < 0 || row >= rows || col < 0 || col >= cols) return // 範囲外
            if (visited[row][col] || grid[row][col] === -1) return // 既訪問 or 地雷

            visited[row][col] = true

            // 隣接セルが0なら周囲もすべて調べる
            if (grid[row][col] !== 0) return

            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr !== 0 || dc !== 0) dfs(row + dr, col + dc)
                }
            }
        }

        // 初手を開始地点として DFS を実行
        dfs(startRow, startCol)

        // 解ける盤面かどうかを確認
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                // 地雷ではないセルがすべて訪問済みなら解ける盤面
                if (grid[r][c] !== -1 && !visited[r][c]) {
                    return false
                }
            }
        }

        return true // 全ての地雷以外のセルを訪問済み
    }

    generateGrid(excludeRow, excludeCol) {
        console.log(excludeRow, excludeCol)
        const grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0))
        let minesPlaced = 0
        let tryCount = 0

        tryCount++

        while (minesPlaced < this.mineCount && tryCount < 100) {
            tryCount++

            const r = Math.floor(Math.random() * this.rows)
            const c = Math.floor(Math.random() * this.cols)

            // 初手の周りにはおかない
            if (Math.abs(excludeRow - r) <= 1 && Math.abs(excludeCol - c) <= 1) {
                continue
            }

            // 既に地雷でなければ配置
            if (grid[r][c] != -1) {
                grid[r][c] = -1 // -1 represents a mine
                this.incrementNeighbors(grid, r, c)
                minesPlaced++
            }
        }

        // console.log(excludeRow, excludeCol, grid[excludeRow][excludeCol])

        if (tryCount == 100) {
            console.log("shippai!")
        }

        return grid
    }

    // 周りの地雷数を増やす
    incrementNeighbors(grid, row, col) {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                const r = row + dr
                const c = col + dc

                const inRange = r >= 0 && r < this.rows && c >= 0 && c < this.cols
                if (inRange && grid[r][c] !== -1) {
                    grid[r][c]++
                }
            }
        }
    }

    drawGrid() {
        const { ctx, rows, cols, revealed, flagged, grid } = this

        const cellSize = this.canvas.width / rows

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        ctx.lineWidth = 2

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = c * cellSize
                const y = r * cellSize

                ctx.fillStyle = revealed[r][c] ? "#111" : "#333"
                ctx.fillRect(x, y, cellSize, cellSize)

                ctx.strokeStyle = "#666"
                ctx.strokeRect(x, y, cellSize, cellSize)

                if (revealed[r][c]) {
                    if (grid[r][c] === -1) {
                        ctx.fillStyle = "red"
                        ctx.beginPath()
                        ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 4, 0, Math.PI * 2)
                        ctx.fill()
                    } else if (grid[r][c] > 0) {
                        ctx.fillStyle = "azure"
                        ctx.font = "32px Arial"
                        ctx.textAlign = "center"
                        ctx.textBaseline = "middle"
                        ctx.fillText(grid[r][c], x + cellSize / 2, y + cellSize / 2)
                    }
                } else if (flagged[r][c]) {
                    ctx.fillStyle = "gold"
                    ctx.font = "32px Arial"
                    ctx.textAlign = "center"
                    ctx.textBaseline = "middle"
                    ctx.fillText("F", x + cellSize / 2, y + cellSize / 2)
                }
            }
        }

        const z = this.cursor[0] * cellSize
        const w = this.cursor[1] * cellSize

        this.ctx.lineWidth = 4
        this.ctx.strokeStyle = "#aaa"
        this.ctx.strokeRect(z, w, cellSize, cellSize)
    }

    revealCell(row, col) {
        if (
            row < 0 ||
            row >= this.rows ||
            col < 0 ||
            col >= this.cols ||
            this.revealed[row][col] ||
            this.flagged[row][col]
        ) {
            return
        }

        this.revealed[row][col] = true

        if (this.grid[row][col] === -1) {
            this.gameOver = true
            // alert("Game Over!")
            return
        }

        if (this.grid[row][col] === 0) {
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    this.revealCell(row + dr, col + dc)
                }
            }
        }
    }

    toggleFlag(row, col) {
        if (!this.revealed[row][col]) {
            this.flagged[row][col] = !this.flagged[row][col]
            this.remainingMines += this.flagged[row][col] ? -1 : 1 // 残り地雷数を更新

            // 本当に地雷なら
            if (this.grid[row][col] == -1) this.trueRemainingMines += this.flagged[row][col] ? -1 : 1 // 残り地雷数を更新
        }
    }

    onHovered(x, y) {
        const c = Math.floor(x / (this.canvas.width / this.rows))
        const r = Math.floor(y / (this.canvas.height / this.cols))
        this.drawGrid()

        this.cursor = [c, r]
    }

    moveCursor(x, y) {
        this.cursor = [(this.cursor[0] + x + this.cols) % this.cols, (this.cursor[1] + y + this.rows) % this.rows]
        this.drawGrid()
    }

    onZ() {
        if (this.gameOver) return

        if (this.firstClick) {
            this.grid = this.generateSolvableGrid(this.cursor[1], this.cursor[0])
            this.firstClick = false
        }

        this.revealCell(this.cursor[1], this.cursor[0])
        this.drawGrid()
    }

    onX() {
        if (this.gameOver) return

        this.toggleFlag(this.cursor[1], this.cursor[0])
        this.drawGrid()
    }
}
