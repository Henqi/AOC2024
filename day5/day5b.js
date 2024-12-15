import fs from 'fs'

// const inputFileName = 'input.txt'
const inputFileName = 'example.txt'
let correctUpdates = []
let wrongUpdates = []

const rulesAndUpdates = fs.readFileSync(inputFileName, 'utf-8').trim().split('\n')

const rules = rulesAndUpdates.slice(0, [rulesAndUpdates.indexOf('')]).map(rule => rule.split('|').map(Number))
const updates = rulesAndUpdates.slice([rulesAndUpdates.indexOf('')+1]).map(update => update.split(',').map(Number))

function fixUpdateOrder(array, rules) {
  // Parse rules into a directed graph
  const graph = new Map();
  const inDegree = new Map();

  // Process rules to build graph and in-degree map
  rules.forEach(rule => {
    const a = rule[0]
    const b = rule[1]

    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);

    graph.get(a).push(b);

    // Update in-degree
    inDegree.set(b, (inDegree.get(b) || 0) + 1);
    inDegree.set(a, inDegree.get(a) || 0);
  });

  // Perform topological sort (Kahn's Algorithm)
  const queue = [];
  for (const [node, degree] of inDegree) {
    if (degree === 0) queue.push(node);
  }

  const sorted = [];
  while (queue.length > 0) {
    const current = queue.shift();
    sorted.push(current);

    for (const neighbor of graph.get(current) || []) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) queue.push(neighbor);
    }
  }

  // Check for cycles (not all nodes processed)
  if (sorted.length !== graph.size) {
    throw new Error("Rules contain a cycle, so no valid ordering exists.");
  }

  // Rearrange the original array based on the sorted order
  const sortedSet = new Set(sorted);
  return array
    .filter(num => sortedSet.has(num)) // Keep only numbers in the sorted graph
    .sort((a, b) => sorted.indexOf(a) - sorted.indexOf(b)); // Sort by topological order
}

const checkIfCorrectOrder = (update) => {
  for (let i in rules) {
    const ruleFirstIndex = update.indexOf(rules[i][0])
    const ruleSecondIndex = update.indexOf(rules[i][1])

    if (ruleFirstIndex === -1 || ruleSecondIndex === -1) {
      continue 
    }
    if (!(ruleFirstIndex < ruleSecondIndex)) {
      return false
    }
  }
  return true
}

for (const [index, update] of updates.entries()) {
  if (checkIfCorrectOrder(update)) {
    correctUpdates.push(update)
  } else {
    wrongUpdates.push(update)
  }
}

const wrongUpdatesFixed = wrongUpdates.map(update => fixUpdateOrder(update, rules))
const middlePageNumberSum = wrongUpdatesFixed.map(update => update[Math.floor(update.length / 2)]).reduce((accumulator, value) => accumulator + value)

console.log(middlePageNumberSum)
