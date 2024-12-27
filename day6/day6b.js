import fs from 'fs'

const inputFileName = 'input.txt'
const DIRECTIONS = {
  NORTH: 'NORTH',
  EAST: 'EAST',
  SOUTH: 'SOUTH',
  WEST: 'WEST',
}

const mapMatrix = fs.readFileSync(inputFileName, 'utf-8').trim().split('\n').map(line => line.split(''))
let guardStuck = 0

const checkIfGuardStuck = (map) => {
  let visitedCoordinates = []
  let guardDirection = DIRECTIONS.NORTH // initial direction facing north
  
  const checkForObstacles = (y, x, guardFacing) => {
    switch (guardFacing) {
  
    case DIRECTIONS.NORTH:
      if (map[y-1]?.[x] === '#') {
        guardDirection = DIRECTIONS.EAST
        checkForObstacles(y,x, guardDirection)
      }
      break
        
    case DIRECTIONS.EAST:
      if (map[y]?.[x+1] === '#') {
        guardDirection = DIRECTIONS.SOUTH
        checkForObstacles(y,x, guardDirection)
      }
      break
  
    case DIRECTIONS.SOUTH:
      if (map[y+1]?.[x] === '#') {
        guardDirection = DIRECTIONS.WEST
        checkForObstacles(y,x, guardDirection)
      }
      break
  
    case DIRECTIONS.WEST:
      if (map[y]?.[x-1] === '#') {
        guardDirection = DIRECTIONS.NORTH
        checkForObstacles(y,x, guardDirection)
      }
      break
    }
  }
  
  const moveGuard = (y, x, guardFacing) => {
    switch (guardFacing) {
    case DIRECTIONS.NORTH:
      if (map[y-1]?.[x] === undefined) {
        console.log('-------OUT OF MATRIX BOUNDS-------')
        visitedCoordinates.push(false)
      } else {
        visitedCoordinates.push([y-1, x, guardFacing])
      }
      break
      
    case DIRECTIONS.EAST:
      if (map[y]?.[x+1] === undefined) {
        console.log('-------OUT OF MATRIX BOUNDS-------')
        visitedCoordinates.push(false)
      } else {
        visitedCoordinates.push([y, x+1, guardFacing])
      }
      break
  
    case DIRECTIONS.SOUTH:
      if (map[y+1]?.[x] === undefined) {
        console.log('-------OUT OF MATRIX BOUNDS-------')
        visitedCoordinates.push(false)
      } else {
        visitedCoordinates.push([y+1, x, guardFacing])
      }
      break
  
    case DIRECTIONS.WEST:
      if (map[y]?.[x-1] === undefined) {
        console.log('-------OUT OF MATRIX BOUNDS-------')
        visitedCoordinates.push(false)
      } else {
        visitedCoordinates.push([y, x-1, guardFacing])
      }
      break
    }
  }
  
  const getGuardCoordinates = () => {
    for (let y=0; y < map.length; y++) {
      for (let x=0; x < map[y].length; x++) {
        if (map[y][x] === '^') {
          return [y,x, DIRECTIONS.NORTH]
        }
      }
    }
  }
  
  // get initial guard coordinates
  visitedCoordinates.push(getGuardCoordinates())
  
  while (visitedCoordinates[visitedCoordinates.length-1] !== false) {
    const y = visitedCoordinates[visitedCoordinates.length-1][0] 
    const x = visitedCoordinates[visitedCoordinates.length-1][1] 
    const guardLooking = visitedCoordinates[visitedCoordinates.length-1][2]

    if (visitedCoordinates.slice(0, -1).some(coordinates => {
      return JSON.stringify(coordinates) === JSON.stringify([y,x,guardLooking]) || JSON.stringify(visitedCoordinates[0]) === JSON.stringify([y,x,guardLooking])
    })) {
      return visitedCoordinates
    }
    checkForObstacles(y, x, guardDirection)
    moveGuard(y, x, guardDirection)
  }
  return visitedCoordinates
}

// get initial visited coordinates
const firstPatrolRoute = checkIfGuardStuck(mapMatrix) 

const visitedCoordinatesNoDuplicatesNoStart = Array.from(
  new Set(
    firstPatrolRoute.filter(coordinatesWithDirection => {
      if (coordinatesWithDirection !== false) {
        return (coordinatesWithDirection[0] === firstPatrolRoute[0][0] && coordinatesWithDirection[1] === firstPatrolRoute[0][1]) ? false : true
      } else {
        return false
      }
    }).map(arr => arr.slice(0, -1)).map(JSON.stringify)), JSON.parse)



for (let i=0; i < visitedCoordinatesNoDuplicatesNoStart.length; i++) {
  const y = visitedCoordinatesNoDuplicatesNoStart[i][0] 
  const x = visitedCoordinatesNoDuplicatesNoStart[i][1] 
  mapMatrix[y][x] = '#'
  const patrolRoute = checkIfGuardStuck(mapMatrix) 
  console.log(`...........Progress: ${(i/visitedCoordinatesNoDuplicatesNoStart.length.toFixed(2))}% ...........`)
  if (!patrolRoute.includes(false)) {
    guardStuck += 1
    console.log(`Guard is stuck!`)
    console.log(`guardStuck: ${guardStuck}`)
  }
  mapMatrix[y][x] = '.'
}

console.log(guardStuck) 

// horrible abomination, took 397m 48.785s