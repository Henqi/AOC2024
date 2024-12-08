import fs from 'fs'

const inputFileName = 'input.txt'
const leftColumn = []
const rightColumn = []
let similarityScore = 0

fs.readFileSync(inputFileName, 'utf-8').trim().split('\n')
  .map(input => {
    const commaSeparated = input.replaceAll('   ', ',')
    const leftValue = parseInt(commaSeparated.split(',')[0])
    const rightValue = parseInt(commaSeparated.split(',')[1])
    leftColumn.push(leftValue)
    rightColumn.push(rightValue)
  })

leftColumn.sort()
rightColumn.sort()
    
leftColumn.forEach((leftValue) => {
  const rightValueCount = rightColumn.filter(value => value == leftValue).length
  return similarityScore += leftValue * rightValueCount
})
    
console.log(similarityScore)