import fs from 'fs'

const inputFileName = 'input.txt'
const magicWord = 'MAS'
let XMASCounter = 0

const letterMatrix = fs.readFileSync(inputFileName, 'utf-8').trim().split('\n').map(line => line.split(''))
  
const checkNorthEast = (x, y) => {
  for (let i=0; i < magicWord.length; i++) {
    if (!(letterMatrix[y-i]?.[x+i] === magicWord[i])) {
      return false
    }
  }
  return true
}

const checkSouthEast = (x, y) => {
  for (let i=0; i < magicWord.length; i++) {
    if (!(letterMatrix[y+i]?.[x+i] === magicWord[i])) {
      return false
    }
  }
  return true
}

const checkSouthWest = (x, y) => {
  for (let i=0; i < magicWord.length; i++) {
    if (!(letterMatrix[y+i]?.[x-i] === magicWord[i])) {
      return false
    }
  }
  return true
}

const checkNorthWest = (x, y) => {
  for (let i=0; i < magicWord.length; i++) {
    if (!(letterMatrix[y-i]?.[x-i] === magicWord[i])) {
      return false
    }
  }
  return true
}

for (let y=0; y < letterMatrix.length; y++) {
  for (let x=0; x < letterMatrix[y].length; x++) {
    // use [x, y] as center of X-MAS
    if (checkNorthEast(x-1, y+1) && (checkSouthEast(x-1, y-1) || checkNorthWest(x+1, y+1))) {
      console.log(`Found X-MAS: NE! y: ${y} / x: ${x}`)
      XMASCounter += 1
    } else if (checkSouthEast(x-1, y-1) && (checkSouthWest(x+1, y-1) || checkNorthEast(x-1, y+1))) {
      console.log(`Found X-MAS: SE! y: ${y} / x: ${x}`)
      XMASCounter += 1
    } else if (checkSouthWest(x+1, y-1) && (checkSouthEast(x-1, y-1) || checkNorthWest(x+1, y+1))) {
      console.log(`Found X-MAS: SW! y: ${y} / x: ${x}`)
      XMASCounter += 1
    } else if (checkNorthWest(x+1, y+1) && (checkSouthWest(x+1, y-1) || checkNorthEast(x-1, y+1))) {
      console.log(`Found X-MAS: NW! y: ${y} / x: ${x}`)
      XMASCounter += 1
    }
  }
}

console.log(XMASCounter)