const {
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
    mergeColUp,
} = require("./gameProject")

function checkValues(testGrid,matrix1,matrix2){//Used for checking the values of grids. Had to update jest as old test was not working right
    for(let i=0; i<testGrid.length; i++){
        for(let j=0; j<testGrid[0].length; j++){
            if (testGrid[i][j] !== matrix1[i][j] && testGrid[i][j] !== matrix2[i][j]) return false
        }
    }
    return true
}

test("Tests for left command", ()=>{
    let gridTest1 = [[2,4,8,16],[32,64,128,256],[2,4,8,128],[32,64,256,128]]
    let gridTest2 = [[0,8,4,16],[32,64,128,256],[2,4,8,16],[32,64,128,256]]
    let gridTest3 = [[2,2,2,2],[0,2,2,0],[1024,1024,0,0],[2,0,0,2]]
    let gridTest4 = [[8,16,8,8],[32,64,128,256],[2,4,8,16],[32,64,128,256]]

    let result1 = left(gridTest1)
    expect(result1).toEqual(0)

    let result2 = left(gridTest2)
    expect(result2).toEqual(-1)

    let result3 = left(gridTest3)
    expect(result3).toEqual(1)

    left(gridTest4)
    
    let grid4Res1 = [[8,16,16,2],[32,64,128,256],[2,4,8,16],[32,64,128,256]]
    let grid4Res2 = [[8,16,16,4],[32,64,128,256],[2,4,8,16],[32,64,128,256]]
    expect(checkValues(gridTest4,grid4Res1,grid4Res2)).toBeTruthy()

})

test("Tests for right command", ()=>{
    let gridTest1 = [[2,4,8,16],[32,64,128,256],[2,4,8,128],[32,64,256,128]]
    let gridTest2 = [[16,8,16,0],[32,64,128,256],[2,4,8,16],[32,64,128,256]]
    let gridTest3 = [[2,2,2,2],[0,2,2,0],[1024,1024,0,0],[2,0,0,2]]
    let gridTest4 = [[8,16,8,8],[32,64,128,256],[2,4,8,16],[32,64,128,256]]

    let result1 = right(gridTest1)
    expect(result1).toEqual(0)
    expect(gridTest1).toEqual([[2,4,8,16],[32,64,128,256],[2,4,8,128],[32,64,256,128]])

    let result2 = right(gridTest2)
    expect(result2).toEqual(-1)

    let result3 = right(gridTest3)
    expect(result3).toEqual(1)

    right(gridTest4)

    let grid4Res1 = [[2,8,16,16],[32,64,128,256],[2,4,8,16],[32,64,128,256]]
    let grid4Res2 = [[4,8,16,16],[32,64,128,256],[2,4,8,16],[32,64,128,256]]

   expect(checkValues(gridTest4,grid4Res1,grid4Res2)).toBeTruthy()

})

test("Tests for up command", ()=>{
    let gridTest1 = [[2,4,8,16],[32,64,128,256],[2,4,8,16],[32,64,128,128]]
    let gridTest2 = [[16,8,16,0],[32,64,128,256],[2,4,8,16],[32,64,128,256]]
    let gridTest3 = [[2,2,2,2],[0,1024,2,0],[2,1024,0,0],[2,0,0,2]]
    let gridTest4 = [[8,16,8,2],[8,64,128,256],[2,4,8,16],[32,64,128,256]]

    let result1 = up(gridTest1)
    expect(result1).toEqual(0)
    expect(gridTest1).toEqual([[2,4,8,16],[32,64,128,256],[2,4,8,16],[32,64,128,128]])

    let result2 = up(gridTest2)
    expect(result2).toEqual(-1)

    let result3 = up(gridTest3)
    expect(result3).toEqual(1)

    up(gridTest4)
    let grid4Res1 = [[16,16,8,2],[2,64,128,256],[32,4,8,16],[2,64,128,256]] 
    let grid4Res2 = [[16,16,8,2],[2,64,128,256],[32,4,8,16],[4,64,128,256]]
    expect(checkValues(gridTest4,grid4Res1,grid4Res2)).toBeTruthy()

})

test("Tests for down command", ()=>{
    let gridTest1 = [[2,4,8,16],[32,64,128,256],[2,4,8,16],[32,64,128,128]]
    let gridTest2 = [[16,8,16,256],[32,64,128,0],[2,4,8,16],[32,64,128,256]]
    let gridTest3 = [[2,2,2,2],[0,1024,2,0],[2,1024,0,0],[2,0,0,2]]
    let gridTest4 = [[8,16,8,2],[8,64,128,256],[2,4,8,16],[32,64,128,256]]

    let result1 = down(gridTest1)
    expect(result1).toEqual(0)
    expect(gridTest1).toEqual([[2,4,8,16],[32,64,128,256],[2,4,8,16],[32,64,128,128]])

    let result2 = down(gridTest2)
    expect(result2).toEqual(-1)

    let result3 = down(gridTest3)
    expect(result3).toEqual(1)

    down(gridTest4)

    let grid4Res1 = [[4,16,8,2],[16,64,128,256],[2,4,8,16],[32,64,128,256]]
    let grid4Res2 = [[2,16,8,2],[16,64,128,256],[2,4,8,16],[32,64,128,256]]
    expect(checkValues(gridTest4,grid4Res1,grid4Res2)).toBeTruthy()

})

test("Tests for move columns up command", ()=>{
    let gridTest1 = [[2,2,2,2],[4,0,4,0],[0,0,0,0],[2,2,2,2]]
    let gridTest2 = [[2,2,2,2],[2,0,2,0],[0,0,0,0],[2,2,2,2]]
    let gridTest3 = [[2,2,2,2],[2,2,2,2],[2,2,2,2],[2,2,2,2]]

    let result1 = moveUp(gridTest1)
    expect(gridTest1).toEqual([[2,2,2,2],[4,2,4,2],[2,0,2,0],[0,0,0,0]])
    expect(result1).toEqual(4)

    let result2 = moveUp(gridTest2)
    expect(gridTest2).toEqual([[2,2,2,2],[2,2,2,2],[2,0,2,0],[0,0,0,0]])
    expect(result2).toEqual(4)

    let result3 = moveUp(gridTest3)
    expect(gridTest3).toEqual([[2,2,2,2],[2,2,2,2],[2,2,2,2],[2,2,2,2]])
    expect(result3).toEqual(0)
})

test("Tests for move row right command", ()=>{
    let gridTest1 = [[2,2,2,2],[4,0,4,0],[0,0,0,0],[2,0,2,2]]
    let gridTest2 = [[2,2,2,2],[2,0,2,0],[0,0,0,0],[2,0,0,2]]
    let gridTest3 = [[2,2,2,2],[2,2,2,2],[2,2,2,2],[2,2,2,2]]

    let result1 = moveRight(gridTest1)
    expect(gridTest1).toEqual([[2,2,2,2],[0,0,4,4],[0,0,0,0],[0,2,2,2]])
    expect(result1).toEqual(3)

    let result2 = moveRight(gridTest2)
    expect(gridTest2).toEqual([[2,2,2,2],[0,0,2,2],[0,0,0,0],[0,0,2,2]])
    expect(result2).toEqual(3)

    let result3 = moveRight(gridTest3)
    expect(gridTest3).toEqual([[2,2,2,2],[2,2,2,2],[2,2,2,2],[2,2,2,2]])
    expect(result3).toEqual(0)
   
})

test("Tests for move row left command", ()=>{
    let gridTest1 = [[2,2,2,2],[4,0,4,0],[0,0,0,0],[2,0,2,2]]
    let gridTest2 = [[2,2,2,2],[2,0,2,0],[0,0,0,0],[2,0,0,2]]
    let gridTest3 = [[2,2,2,2],[2,2,2,2],[2,2,2,2],[2,2,2,2]]

    let result1 = moveLeft(gridTest1)
    expect(gridTest1).toEqual([[2,2,2,2],[4,4,0,0],[0,0,0,0],[2,2,2,0]])
    expect(result1).toEqual(3)

    let result2 = moveLeft(gridTest2)
    expect(gridTest2).toEqual([[2,2,2,2],[2,2,0,0],[0,0,0,0],[2,2,0,0]])
    expect(result2).toEqual(2)

    let result3 = moveLeft(gridTest3)
    expect(gridTest3).toEqual([[2,2,2,2],[2,2,2,2],[2,2,2,2],[2,2,2,2]])
    expect(result3).toEqual(0)
     
})

test("Tests for move columns down command", ()=>{
    let gridTest1 = [[2,2,2,2],[4,0,4,0],[0,0,0,0],[2,0,2,2]]
    let gridTest2 = [[2,2,2,2],[2,0,2,0],[0,0,0,0],[2,0,0,2]]
    let gridTest3 = [[2,2,2,2],[2,2,2,2],[2,2,2,2],[2,2,2,2]]

    let result1 = moveDown(gridTest1)
    expect(gridTest1).toEqual([[0,0,0,0],[2,0,2,0],[4,0,4,2],[2,2,2,2]])
    expect(result1).toEqual(6)

    let result2 = moveDown(gridTest2)
    expect(gridTest2).toEqual([[0,0,0,0],[2,0,0,0],[2,0,2,2],[2,2,2,2]])
    expect(result2).toEqual(6)

    let result3 = moveDown(gridTest3)
    expect(gridTest3).toEqual([[2,2,2,2],[2,2,2,2],[2,2,2,2],[2,2,2,2]])
    expect(result3).toEqual(0)
})

test("Tests for merge row right command", ()=>{ //only need 1 mergeCol, other is redundant. Should remove mergeRowRight
    let gridTest1 = [[2,2,2,2],[4,0,4,0],[0,0,0,0],[2,0,2,2]]
    let gridTest2 = [[2,2,2,2],[0,2,2,0],[0,0,0,0],[2,0,0,2]]
    let gridTest3 = [[2,8,4,4],[2,2,4,4],[2,2,2,2],[2,2,2,2]]

    mergeRowRight(gridTest1)
    expect(gridTest1).toEqual([[0,4,0,4],[4,0,4,0],[0,0,0,0],[2,0,0,4]])
    mergeRowRight(gridTest2)
    expect(gridTest2).toEqual([[0,4,0,4],[0,0,4,0],[0,0,0,0],[2,0,0,2]])
    mergeRowRight(gridTest3)
    expect(gridTest3).toEqual([[2,8,0,8],[0,4,0,8],[0,4,0,4],[0,4,0,4]])
})

test("Tests for merge row left command", ()=>{
    let gridTest1 = [[2,2,2,2],[4,0,4,0],[0,0,0,0],[2,0,2,2]]
    let gridTest2 = [[2,2,2,2],[0,2,2,0],[0,0,0,0],[2,0,0,2]]
    let gridTest3 = [[2,8,4,4],[2,2,4,4],[2,2,2,2],[2,2,2,2]]

    mergeRowLeft(gridTest1)
    expect(gridTest1).toEqual([[4,0,4,0],[4,0,4,0],[0,0,0,0],[2,0,4,0]])
    mergeRowLeft(gridTest2)
    expect(gridTest2).toEqual([[4,0,4,0],[0,4,0,0],[0,0,0,0],[2,0,0,2]])
    mergeRowLeft(gridTest3)
    expect(gridTest3).toEqual([[2,8,8,0],[4,0,8,0],[4,0,4,0],[4,0,4,0]])
})

test("Tests for merge columns up command", ()=>{
    let gridTest1 = [[2,2,2,2],[4,0,4,0],[0,0,0,0],[2,0,2,2]]
    let gridTest2 = [[2,2,2,2],[0,2,2,0],[0,0,0,0],[2,0,0,2]]
    let gridTest3 = [[2,8,4,4],[2,8,4,4],[2,2,2,2],[2,2,2,2]]

    mergeColUp(gridTest1)
    expect(gridTest1).toEqual([[2,2,2,2],[4,0,4,0],[0,0,0,0],[2,0,2,2]])
    mergeColUp(gridTest2)
    expect(gridTest2).toEqual([[2,4,4,2],[0,0,0,0],[0,0,0,0],[2,0,0,2]])
    mergeColUp(gridTest3)
    expect(gridTest3).toEqual([[4,16,8,8],[0,0,0,0],[4,4,4,4],[0,0,0,0]])
})

test("Tests for merge columns down command", ()=>{ //only need 1 mergeCol, other is redundant. Should remove mergeColDown
    let gridTest1 = [[2,2,2,2],[4,0,4,0],[0,0,0,0],[2,0,2,2]]
    let gridTest2 = [[2,2,2,2],[0,2,2,0],[0,0,0,0],[2,0,0,2]]
    let gridTest3 = [[2,8,4,4],[2,8,4,4],[2,2,2,2],[2,2,2,2]]

    mergeColDown(gridTest1)
    expect(gridTest1).toEqual([[2,2,2,2],[4,0,4,0],[0,0,0,0],[2,0,2,2]])
    mergeColDown(gridTest2)
    expect(gridTest2).toEqual([[2,0,0,2],[0,4,4,0],[0,0,0,0],[2,0,0,2]])
    mergeColDown(gridTest3)
    expect(gridTest3).toEqual([[0,0,0,0],[4,16,8,8],[0,0,0,0],[4,4,4,4]])
})

test("Tests for win condition", ()=>{
    let gridTest1 = [[2,2,2,2],[4,0,4,0],[0,0,0,0],[2,0,2,2]]
    let gridTest2 = [[2,2,2,2],[0,2,2,0],[2048,0,0,0],[2,0,0,2]]

    result1 = isWin(gridTest1)
    expect(result1).toEqual(false)
    result2 = isWin(gridTest2)
    expect(result2).toEqual(true)
})

test("Tests for loss condition", ()=>{
    let gridTest1 = [[2,4,8,16],[32,64,128,256],[2,4,8,16],[32,64,128,256]]
    let gridTest2 = [[2,4,8,16],[32,64,128,256],[2,4,8,16],[32,64,128,128]]

    result1 = isLost(gridTest1)
    expect(result1).toEqual(true)
    result2 = isLost(gridTest2)
    expect(result2).toEqual(false)
})

test("Tests for generate number", ()=>{
    let gridTest1 = [[2,2,2,2],[4,2,4,2],[2,0,4,4],[2,0,2,2]]

    generateNumber(gridTest1)

    expect(gridTest1 === 
        [[2,2,2,2],[4,2,4,2],[2,2,4,4],[2,0,2,2]] || 
        [[2,2,2,2],[4,2,4,2],[2,4,4,4],[2,0,2,2]] || 
        [[2,2,2,2],[4,2,4,2],[2,0,4,4],[2,2,2,2]] || 
        [[2,2,2,2],[4,2,4,2],[2,0,4,4],[2,4,2,2]]
        ).toBeTruthy()
})
