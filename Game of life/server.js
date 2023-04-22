var express = require("express")
var app = express()

var server = require('http').Server(app)
var io = require('socket.io')(server)
var fs = require('fs')

app.use(express.static("."))

app.get('/', function (req, res) {
    res.redirect("index.html")
})

server.listen(3000, function () {
    console.log("Server is run...");
})

function matrixGenerator(matrixSize, grass, grassEater, predator, bomb, water, poisionedGrass) {
    var matrix = []
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
matrix = matrixGenerator(25, 0, 0, 0, 0, 0, 0)
io.sockets.emit("send matrix", matrix)

grassArr = []
grassEaterArr = []
predatorArr = []
bombArr = []
explotion1Arr = []
explotion2Arr = []
waterArr = []
pdGrassArr = []

Grass = require("./grass")
GrassEater = require("./grassEater")
PoisionedGrass = require("./poisonedGrass")
Predator = require("./predator")
Water = require("./water")
Bomb = require("./bomb")

function createObject() {
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
    io.sockets.emit("send matrix", matrix)
}

function game() {
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
    io.sockets.emit("send matrix", matrix)
}

setInterval(game,300)

io.on('connection',function () {
    createObject()
})