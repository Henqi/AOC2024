import fs from 'fs'

const inputFileName = 'input.txt'
const leftColumn = []
const rightColumn = []
const distanceValues = []

fs.readFileSync(inputFileName, 'utf-8').trim().split('\n')
  .map(input => {
    const commaSeparated = input.replaceAll('   ', ',')
    const leftValue = commaSeparated.split(',')[0]
    const rightValue = commaSeparated.split(',')[1]
    leftColumn.push(leftValue)
    rightColumn.push(rightValue)
  })

leftColumn.sort()
rightColumn.sort()
    
leftColumn.forEach((leftValue, index) => {
  const rightValue = rightColumn[index]
  distanceValues.push(Math.abs(leftValue - rightValue))
})

const sumOfDistances = distanceValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    
console.log(sumOfDistances)
