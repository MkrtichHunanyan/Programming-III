// մոդուլները պետք է էքսպորտ անել, եւ require որտեղ օգտագործում ես
module.exports = class Explotion_2{
    constructor(x,y){
        this.x = x
        this.y = y
        this.lifeTime = 0
    }
    suicide(){
        this.lifeTime++
        if(this.lifeTime > 2){
            for (let i in explotion2Arr) {
                if (this.x == explotion2Arr[i].x && this.y == explotion2Arr[i].y) {
                    matrix[this.y][this.x] = 0
                    explotion2Arr.splice(i, 1)
                }
            }
        }
    }
}