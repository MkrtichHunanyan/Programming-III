let LivingCreature = require("./LivingCreature")

module.exports = class Water extends LivingCreature{
    constructor(x,y){
        super(x, y)
        this.lifeTime = 0
}

    fill(){
        if(this.lifeTime <= 30){
            for(let i in this.directions){
                let x = this.directions[i][0]
                let y = this.directions[i][1]
                if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                    if(matrix[y][x] == 0){
                        let gr = new Grass(x,y)
                        grassArr.push(gr)
                    }
                }
            }
            this.lifeTime++
        }
        else{
            matrix[this.y][this.x] = 0
            for (let i in waterArr) {
                if (this.x == waterArr[i].x && this.y == waterArr[i].y) {
                    waterArr.splice(i, 1)
                }
            }
        }
    }
}
