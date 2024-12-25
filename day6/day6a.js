import fs from 'fs'

const inputFileName = 'input.txt'

const DIRECTIONS = {
  NORTH: 'NORTH',
  EAST: 'EAST',
  SOUTH: 'SOUTH',
  WEST: 'WEST',
}

let visitedCoordinates = []
let guardDirection = DIRECTIONS.NORTH // initial direction north facing

const mapMatrix = fs.readFileSync(inputFileName, 'utf-8').trim().split('\n').map(line => line.split(''))

const checkForObstacles = (y, x, guardFacing) => {
  switch (guardFacing) {

  case DIRECTIONS.NORTH:
    if (mapMatrix[y-1]?.[x] === '#') {
      guardDirection = DIRECTIONS.EAST
    }
    break
      
  case DIRECTIONS.EAST:
    if (mapMatrix[y]?.[x+1] === '#') {
      guardDirection = DIRECTIONS.SOUTH
    }
    break

  case DIRECTIONS.SOUTH:
    if (mapMatrix[y+1]?.[x] === '#') {
      guardDirection = DIRECTIONS.WEST
    }
    break

  case DIRECTIONS.WEST:
    if (mapMatrix[y]?.[x-1] === '#') {
      guardDirection = DIRECTIONS.NORTH
    }
    break
  }
}

const moveGuard = (y, x, guardFacing) => {
  switch (guardFacing) {
  case DIRECTIONS.NORTH:
    console.log('going NORTH!')
    if (mapMatrix[y-1]?.[x] === undefined) {
      console.log('-------OUT OF MATRIX BOUNDS-------')
      visitedCoordinates.push(false)
    } else {
      visitedCoordinates.push([y-1, x])
    }
    break
    
  case DIRECTIONS.EAST:
    console.log('going EAST!')
    if (mapMatrix[y]?.[x+1] === undefined) {
      console.log('-------OUT OF MATRIX BOUNDS-------')
      visitedCoordinates.push(false)
    } else {
      visitedCoordinates.push([y, x+1])
    }
    break

  case DIRECTIONS.SOUTH:
    console.log('going SOUTH!')
    if (mapMatrix[y+1]?.[x] === undefined) {
      console.log('-------OUT OF MATRIX BOUNDS-------')
      visitedCoordinates.push(false)
    } else {
      visitedCoordinates.push([y+1, x])
    }
    break

  case DIRECTIONS.WEST:
    console.log('going WEST!')
    if (mapMatrix[y]?.[x+1] === undefined) {
      console.log('-------OUT OF MATRIX BOUNDS-------')
      visitedCoordinates.push(false)
    } else {
      visitedCoordinates.push([y, x-1])
    }
    break
  }
}

const getGuardCoordinates = () => {
  for (let y=0; y < mapMatrix.length; y++) {
    for (let x=0; x < mapMatrix[y].length; x++) {
      if (mapMatrix[y][x] === '^') {
        return [y,x]
      }
    }
  }
}

// get initial guard coordinates
visitedCoordinates.push(getGuardCoordinates())

while (visitedCoordinates[visitedCoordinates.length-1] !== false) {
  let y = visitedCoordinates[visitedCoordinates.length-1][0] 
  let x = visitedCoordinates[visitedCoordinates.length-1][1] 
  checkForObstacles(y, x, guardDirection)
  moveGuard(y, x, guardDirection)
}

const resultSet = Array.from(new Set(visitedCoordinates.filter(coordinates => coordinates !== false).map(coordinates => JSON.stringify(coordinates))))
console.log(resultSet.length)