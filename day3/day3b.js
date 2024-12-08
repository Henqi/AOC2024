import fs from 'fs'

const inputFileName = 'input.txt'
let filterOn = true

const memoryDump = fs.readFileSync(inputFileName, 'utf-8').trim().split('\n')

const pattern = new RegExp('(mul\\(\\d+,\\d+\\))|(don\'t)|(do)', 'g')
const instructions = memoryDump.flatMap(stringData => stringData.match(pattern)).filter(stringData => stringData);

const instructionsAsNumber = instructions.map(string => {
  if (string.match(/\d+/g)) {
    return filterOn ? string.match(/\d+/g).map(Number) : null
  } 
  if (string === 'do') {
    filterOn = true
  }
  if (string === 'don\'t') {
    filterOn = false
  }
})

const result = instructionsAsNumber.filter(Boolean).map(values => values[0]*values[1]).reduce((accumulator, item) => {
  return accumulator + item
}, 0)

console.log(result)