import fs from 'fs'

const inputFileName = 'input.txt'
let correctUpdates = []
let wrongUpdates = []

const rulesAndUpdates = fs.readFileSync(inputFileName, 'utf-8').trim().split('\n')

const rules = rulesAndUpdates.slice(0, [rulesAndUpdates.indexOf('')]).map(rule => rule.split('|').map(Number))
const updates = rulesAndUpdates.slice([rulesAndUpdates.indexOf('')+1]).map(update => update.split(',').map(Number))

const checkIfCorrectOrder = (update) => {
  for (let i in rules) {
    if (update.indexOf(rules[i][0]) === -1 || update.indexOf(rules[i][1]) === -1) {
      continue 
    }
    if (!(update.indexOf(rules[i][0]) < update.indexOf(rules[i][1]))) {
      return false
    }
  }
  return true
}

for (let i in updates) {
  if (checkIfCorrectOrder(updates[i])) {
    correctUpdates.push(updates[i])
  } else {
    wrongUpdates.push(updates[i])
  }
}

const middlePageNumberSum = correctUpdates.map(update => update[Math.floor(update.length / 2)]).reduce((accumulator, value) => accumulator + value)
console.log(middlePageNumberSum)