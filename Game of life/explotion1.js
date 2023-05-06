let Explotion_2 = require("./explotion2")
// մոդուլները պետք է էքսպորտ անել, եւ require որտեղ օգտագործում ես
module.exports =  class Explotion_1 {
    constructor(x,y){
        this.x = x
        this.y = y
        this.lifeTime = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1],

            [this.x - 2, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }

    destroy(){
        for (let g in this.directions) {
            let x = this.directions[g][0]
            let y = this.directions[g][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == 3) {
                    for (let i in predatorArr) {
                        if (x == predatorArr[i].x && y == predatorArr[i].y) {
                            predatorArr.splice(i, 1)
                        }
                    }
                }
                if (matrix[y][x] == 2) {
                    for (let i in grassEaterArr) {
                        if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                            grassEaterArr.splice(i, 1)
                        }
                    }
                }
                if (matrix[y][x] == 4) {
                    for (let i in bombArr) {
                        if (x == bombArr[i].x && y == bombArr[i].y) {
                            bombArr.splice(i, 1)
                        }
                    }
                }
            }
            this.fill()
        }
    }

    fill(){
        for(let i in this.directions){
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if(matrix[y][x] != 4.1){
                    let exp_2 = new Explotion_2(x,y)
                    explotion2Arr.push(exp_2)
                    matrix[y][x] = 4.2
                }
            }
        }
        this.lifeTime++
        if(this.lifeTime > 2){
            for (let i in explotion1Arr) {
                if (this.x == explotion1Arr[i].x && this.y == explotion1Arr[i].y) {
                    matrix[this.y][this.x] = 0
                    explotion1Arr.splice(i, 1)
                }
            }
        }
    }
}