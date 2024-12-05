import fs from 'fs'

const inputFileName = 'input.txt' // should have more then 321 reports
const thresholdMax = 3
const thresholdMin = 1

const reports = fs.readFileSync(inputFileName, 'utf-8').trim().split('\n').map(value => value.split(' ')).map(report => report.map(Number))

function getSubarraysWithOneRemoved(arr) {
    return arr.map((_, i) => arr.filter((_, j) => i !== j));
}

const isSafeAndSortedAscending = (array) => {
    const subArrays = getSubarraysWithOneRemoved(array)
    subArrays.push(array)
    const result = subArrays.map(subArray => {
        return subArray.every((value, index) => {
            return ((index === 0 || (value > subArray[index-1] && thresholdMin <= Math.abs(value - subArray[index-1]) && Math.abs(value - subArray[index-1]) <= thresholdMax)))
        })
    })
    return result.some(value => value === true)
}

const isSafeAndSortedDescending = (array) => {
    const subArrays = getSubarraysWithOneRemoved(array)
    subArrays.push(array)
    const result = subArrays.map(subArray => {
        return subArray.every((value, index) => {
            return (index === 0 || (value < subArray[index-1] && thresholdMin <= Math.abs(value - subArray[index-1]) && Math.abs(value - subArray[index-1]) <= thresholdMax))
        })
    })
    return result.some(value => value === true)
}

const safeReports = reports.filter(report => isSafeAndSortedAscending(report) || isSafeAndSortedDescending(report)).length
console.log(safeReports)