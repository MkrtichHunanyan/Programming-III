console.log("                 -=== Game of life v0.1 ===-");

var socket = io()
var side = 30


function setup() {
        // noStroke()
        createCanvas(25 * side, 25 * side)
}


function changeColor(matrix) {
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
}

socket.on("send matrix", changeColor)

var qanak;
function getFormValue(form) {
        qanak = form.inputbox.value;
}

function addChar(n, ob, arr) {
        if (qanak > 0) {
                for (let i = 0; i < qanak; i++) {
                        let x = Math.floor(Math.random() * 25)
                        let y = Math.floor(Math.random() * 25)
                        matrix[y][x] = n
                        let gr = new ob(x, y)
                        arr.push(gr)
                }
        } else {
                alert("[" + qanak + "]-@ chi krna exni qanak")
        }
}