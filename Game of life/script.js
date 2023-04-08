console.log("                 -=== Game of life v0.1 ===-");
function matrixGenerator(matrixSize, grass, grassEater, predator, bomb, water, poisionedGrass) {
        var matrix = []
        ////  matrix սարքելու հատված
        for (let i = 0; i < matrixSize; i++) {
                matrix.push([])
                for (let j = 0; j < matrixSize; j++) {
                        matrix[i].push(0)
                }
        }

        //1 Grass

        for (let i = 0; i < grass; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 1
        }

        //2 Grass Eater

        for (let i = 0; i < grassEater; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 2
        }
        //3 Predator

        for (let i = 0; i < predator; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 3
        }

        //4 Bomb

        for (let i = 0; i < bomb; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 4
        }

        //5 water

        for (let i = 0; i < water; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 5
        }

        //6 poisionedGrass

        for (let i = 0; i < poisionedGrass; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 6
        }
        return matrix
}

let a = 25
let matrix = matrixGenerator(a, 0, 0, 0, 0, 0, 0)
let side = 30
///օբյեկտներ պահելու զանգվածներ
var grassArr = []
var grassEaterArr = []
var predatorArr = []
var bombArr = []
var explotion1Arr = []
var explotion2Arr = []
var waterArr = []
var pdGrassArr = []


function setup() {
        //noStroke()
        frameRate(15)
        createCanvas(matrix[0].length * side, matrix.length * side)
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)
                                grassArr.push(grass)
                        }
                        else if (matrix[y][x] == 2) {
                                let grEat = new GrassEater(x, y)
                                grassEaterArr.push(grEat)
                        }
                        else if (matrix[y][x] == 3) {
                                let pre = new Predator(x, y)
                                predatorArr.push(pre)
                        }
                        else if (matrix[y][x] == 4) {
                                let b = new Bomb(x, y)
                                bombArr.push(b)
                        }
                        else if (matrix[y][x] == 5) {
                                let w = new Water(x, y)
                                waterArr.push(w)
                        }
                        else if (matrix[y][x] == 6) {
                                let pg = new PoisionedGrass(x, y)
                                pdGrassArr.push(pg)
                        }

                }
        }

}


function draw() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                fill("green")
                        }
                        else if (matrix[y][x] == 2) {
                                fill("blue")
                        }
                        else if (matrix[y][x] == 3) {
                                fill("red")
                        }
                        else if (matrix[y][x] == 4) {
                                fill("black")
                        }
                        else if (matrix[y][x] == 4.1) {
                                fill("orange")
                        }
                        else if (matrix[y][x] == 4.2) {
                                fill("yellow")
                        }
                        else if (matrix[y][x] == 5) {
                                fill("#00c4ff")
                        }
                        else if (matrix[y][x] == 6) {
                                fill("#2a6131")
                        }
                        else {
                                fill("#563b10")
                        }
                        rect(x * side, y * side, side, side)

                }
        }

        for (let i in grassArr) {
                grassArr[i].mul()
        }
        for (let i in grassEaterArr) {
                grassEaterArr[i].eat()
        }
        for (let i in predatorArr) {
                predatorArr[i].eat()
        }
        for (let i in bombArr) {
                bombArr[i].skan()
        }
        for (let i in explotion1Arr) {
                explotion1Arr[i].destroy()
        }
        for (let i in explotion2Arr) {
                explotion2Arr[i].suicide()
        }
        for (let i in waterArr) {
                waterArr[i].fill()
        }
        for (let i in pdGrassArr) {
                pdGrassArr[i].mul()
        }
}

var qanak;
function getFormValue(form) {
        qanak = form.inputbox.value;
}

function addChar(n,ob,arr) {
        if(qanak>0){
                for(let i = 0; i < qanak;i++){
                        let x = Math.floor(Math.random() * a)
                        let y = Math.floor(Math.random() * a)
                        matrix[y][x] = n
                        let gr = new ob(x,y)
                        arr.push(gr)
                }
        }else{
                alert("["+qanak+"]-@ chi krna exni qanak")
        }
}