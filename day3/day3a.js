import fs from 'fs'

const inputFileName = 'input.txt'

const memoryDump = fs.readFileSync(inputFileName, 'utf-8').trim().split('\n')

const pattern = new RegExp('(mul\\(\\d+,\\d+\\))', 'g')
const multiplicationStrings = memoryDump.flatMap(stringData => stringData.match(pattern)).filter(stringData => stringData);

const numbersToMultiply = multiplicationStrings.map(string => string.match(/\d+/g).map(Number))

const result = numbersToMultiply.map(values => values[0]*values[1]).reduce((accumulator, item) => {
    return accumulator + item
}, 0)

console.log(result)