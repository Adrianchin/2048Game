const express = require('express');
const app = express();

app.listen(PORT = 3000, ()=> {
    console.log(`app is running on ${PORT}`)
})

app.get("/newGame", (req, res) => {//Creates new game (endpoint)
    create2048()
    res.send(showGrid(grid))
})

app.get("/up", (req, res) => {//shift up (endpoint)
    let result = up(grid)
    res.send(moveResult(result))
})
app.get("/down", (req, res) => {//shift down (endpoint)
    let result = down(grid)
    res.send(moveResult(result))
})
app.get("/right", (req, res) => {//shift right (endpoint)
    let result = right(grid)
    res.send(moveResult(result))
})
app.get("/left", (req, res) => {//shift left (endpoint)
    let result = left(grid)
    res.send(moveResult(result))
})

var grid//global var

function create2048(){//Creates new board
    grid = new Array(4).fill().map(()=>Array(4).fill(0))
    generateNumber(grid)//Creates new value
    generateNumber(grid)//Creates new value
}
create2048()//Creates new game automatically on server start


function moveResult(result){//Sends result of your move for browser
    if(result === 1) return (showGrid(grid, "YOU WIN"))
    else if(result === -1) return (showGrid(grid, "YOU LOST"))
    else if(result === 0) return (showGrid(grid, "MOVE NOT POSSIBLE"))
    else return showGrid(grid)
}

function showGrid(grid, note = null){//Shows grid in browser
    let message = //Note is for if you have a play that cant be done, loss, etc.
    `<p> ${(note) ? note : ""} <p> 
    <br>
    <p>[${grid[0]}]<p>
    <br>
    <p>[${grid[1]}]<p>
    <br>
    <p>[${grid[2]}]<p>
    <br>
    <p>[${grid[3]}]<p>
    `
    return message
}

/*
function create2048(){//Creates new board
    grid = new Array(4).fill().map(()=>Array(4).fill(0))
    generateNumber(grid)//Creates new value
    generateNumber(grid)//Creates new value
}
*/
function up(grid){//Push up command
    if(moveUp(grid)){//Only works if up counts a movement (ie. no moves, we dont check win/loss condition, prevents early loss)
        mergeColUp(grid)//Merge values
        moveUp(grid)//move again to update merge values
        if(isWin(grid)){//Win test condition
            return 1//Return 1 for win
        }
        generateNumber(grid) //Generate number, before is so we can ensure grid is full now

        if(isLost(grid)){//Loss condition - Only returns if NO moves possible
            return -1//Return -1 for loss
        }
    }
    else return 0//Return 0 for no moves to be done 
}
function down(grid){//Move down command
    if(moveDown(grid)){
        mergeColDown(grid)
        moveDown(grid)
        if(isWin(grid)){
            return 1
        }
        generateNumber(grid)

        if(isLost(grid)){
            return -1
        }
    }
    else return 0
}
function left(grid){//Move left command
    if(moveLeft(grid)){
        mergeRowLeft(grid)
        moveLeft(grid)
        if(isWin(grid)){
            return 1
        }
        generateNumber(grid)

        if(isLost(grid)){
            return -1
        }
    }
    else return 0
}
function right(grid){//Right command
    if(moveRight(grid)){
        mergeRowRight(grid)
        moveRight(grid)
        if(isWin(grid)){
            return 1
        }
        generateNumber(grid)

        if(isLost(grid)){
            return -1
        }
    }
    else return 0
}

function generateNumber(grid){//Generate new random numbers
    let randomNumber = Math.random()
    let number
    if(randomNumber >= 0.9){//10% value of 4
        number = 4
    }else{//90% value of 2
        number = 2
    }
    let row = Math.round(Math.random()*3)//Number between 0 and 3
    let col = Math.round(Math.random()*3)//Number between 0 and 3
    if(grid[col][row] === 0){//Checks if open spot
        grid[col][row] = number
    }
    else generateNumber(grid)//Recurrsive if full, maybe make this better with a hash map of current values?
}

function isWin(grid){//Checks for if you won, really I could place this in the merge commands and cut down code and O(n^2)
    for(let i=0; i<grid.length; i++){
        for(let j=0; j<grid[0].length; j++){
            if(grid[i][j] === 2048){
                console.log("YOU WIN")
                return true
            }
        }
    }
    return false
}

function isLost(grid){//Checks for if you lost, I think there might be a cleaner recussive call but I wanted to keep this simple, could improve O(n^2)
    for(let i=0; i<grid.length; i++){
        for(let j=0; j<grid[0].length; j++){
            if(grid[i][j] === 0 || (i<grid.length-1 && grid[i][j] === grid[i+1][j]) || (j<grid[0].length-1 && grid[i][j] === grid[i][j+1]))return false
        }
    }
    return true
}

function moveRight(grid){//Move right (move only)
    let moves = 0
    for(let i=0; i<grid.length; i++){//each row top to bottom
        let counter = grid[i].length-1 //always restarts to 3
        for(let j=grid[i].length-1; j>=0; j--){//each column right to left
            if(grid[i][j] !== 0 && j !== counter){
                grid[i][counter] = grid[i][j]
                grid[i][j] = 0
                counter--
                moves++
            }
            else if(grid[i][j] !== 0) counter--
        }
    }
    return moves
}

function moveLeft(grid){//Move left (move only)
    let moves = 0
    for(let i=0; i<grid.length; i++){//each row top to bottom
        let counter = 0 //always restarts to 0
        for(let j=0; j<grid[i].length; j++){//each column left to right
            if(grid[i][j] !== 0 && j !== counter){
                grid[i][counter] = grid[i][j]
                grid[i][j] = 0
                counter++
                moves++
            }
            else if(grid[i][j] !== 0) counter++
        }
    }
    return moves
}

function moveUp(grid){//Move up (move only)
    let moves = 0
    for(let j=0; j<grid[0].length; j++){//each col left to right
        let counter = 0 //always restarts to 0
        for(let i=0; i<grid.length; i++){//each row top to bot
            if(grid[i][j] !== 0 && i !== counter){
                grid[counter][j] = grid[i][j]
                grid[i][j] = 0
                counter++
                moves++
            }
            else if(grid[i][j] !== 0) counter++
        }
    }
    return moves
}

function moveDown(grid){//Move down (move only)
    let moves = 0
    for(let j=0; j<grid[0].length; j++){//each col left to right
        let counter = grid.length-1 //always restarts to 0
        for(let i=grid.length-1; i>=0; i--){//each row top to bot
            if(grid[i][j] !== 0 && i !== counter){
                grid[counter][j] = grid[i][j]
                grid[i][j] = 0
                counter--
                moves++
            }
            else if(grid[i][j] !== 0) counter--
        }
    }
    return moves
}


function mergeRowRight(grid){//merge right (merge only)
    for(let i=0; i<grid.length; i++){//each row top to bottom
        for(let j=grid[i].length-2; j>=0; j--){//each column right to left
            if(grid[i][j] == grid[i][j+1]){
                grid[i][j+1] = 2*grid[i][j+1]
                grid[i][j] = 0
            }
        }
    }
}

function mergeRowLeft(grid){//merge left (merge only)
    for(let i=0; i<grid.length; i++){//each row top to bottom
        for(let j=1; j<grid[i].length; j++){//each column right to left
            if(grid[i][j] == grid[i][j-1]){
                grid[i][j-1] = 2*grid[i][j-1]
                grid[i][j] = 0
            }
        }
    }
}

function mergeColDown(grid){//merge down (merge only)
    for(let j=0; j<grid[0].length; j++){//each column left to right
        for(let i=grid.length-2; i>=0; i--){//each row bottom up
            if(grid[i][j] === grid[i+1][j]){
                grid[i+1][j] = 2*grid[i+1][j]
                grid[i][j] = 0
            }
        }
    }
}

function mergeColUp(grid){//merge up (merge only)
    for(let j=0; j<grid[0].length; j++){//each column left to right
        for(let i=1; i<grid.length; i++){//each row bottom up
            if(grid[i][j] === grid[i-1][j]){
                grid[i-1][j] = 2*grid[i-1][j]
                grid[i][j] = 0
            }
        }
    }
}

module.exports = {//Export for testing
    up,
    down,
    right,
    left,
    generateNumber,
    isWin,
    isLost,
    moveRight,
    moveLeft,
    moveUp,
    moveDown,
    mergeRowRight,
    mergeRowLeft,
    mergeColDown,
    mergeColUp
}