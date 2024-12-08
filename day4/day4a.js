import fs from 'fs'

const inputFileName = 'input.txt'
const magicWord = 'XMAS'
let XMASCounter = 0

const letterMatrix = fs.readFileSync(inputFileName, 'utf-8').trim().split('\n').map(line => line.split(''))

const checkNorth = (x, y) => {
    for (let i=0; i < magicWord.length; i++) {
        if (!(letterMatrix[x]?.[y+i] === magicWord[i])) {
            return false
        }
    }
    XMASCounter += 1
}
    
const checkNorthEast = (x, y) => {
    for (let i=0; i < magicWord.length; i++) {
        if (!(letterMatrix[x+i]?.[y+i] === magicWord[i])) {
            return false
        }
    }
    XMASCounter += 1
}

const checkEast = (x, y) => {
    for (let i=0; i < magicWord.length; i++) {
        if (!(letterMatrix[x+i]?.[y] === magicWord[i])) {
            return false
        }
    }
    XMASCounter += 1
}

const checkSouthEast = (x, y) => {
    for (let i=0; i < magicWord.length; i++) {
        if (!(letterMatrix[x+i]?.[y-i] === magicWord[i])) {
            return false
        }
    }
    XMASCounter += 1
}

const checkSouth = (x, y) => {
    for (let i=0; i < magicWord.length; i++) {
        if (!(letterMatrix[x]?.[y-i] === magicWord[i])) {
            return false
        }
    }
    XMASCounter += 1
}

const checkSouthWest = (x, y) => {
    for (let i=0; i < magicWord.length; i++) {
        if (!(letterMatrix[x-i]?.[y-i] === magicWord[i])) {
            return false
        }
    }
    XMASCounter += 1
}

const checkWest = (x, y) => {
    for (let i=0; i < magicWord.length; i++) {
        if (!(letterMatrix[x-i]?.[y] === magicWord[i])) {
            return false
        }
    }
    XMASCounter += 1
}

const checkNorthWest = (x, y) => {
    for (let i=0; i < magicWord.length; i++) {
        if (!(letterMatrix[x-i]?.[y+i] === magicWord[i])) {
            return false
        }
    }
    XMASCounter += 1
}

for (let y=0; y < letterMatrix.length; y++) {
    for (let x=0; x < letterMatrix[y].length; x++) {
        checkNorth(x, y)
        checkNorthEast(x, y)
        checkEast(x, y)
        checkSouthEast(x, y)
        checkSouth(x, y)
        checkSouthWest(x, y)
        checkWest(x, y)
        checkNorthWest(x, y)
    }
}

console.log(XMASCounter)