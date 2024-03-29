let LivingCreature = require("./LivingCreature")

module.exports = class PoisionedGrass extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.multiply = 0
        this.directions = [
            // [this.x - 1, this.y - 1],
            // [this.x, this.y - 1],
            // [this.x + 1, this.y - 1],
            // [this.x - 1, this.y],
            // [this.x + 1, this.y],
            // [this.x - 1, this.y + 1],
            // [this.x, this.y + 1],
            // [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char) {
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }

    mul() {
        this.multiply++
        let emptyCell = this.chooseCell(1)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell && this.multiply >= 7) {
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 6

            let poisGrass = new PoisionedGrass(newX, newY)
            pdGrassArr.push(poisGrass)
            this.multiply = 0
        }

    }
}