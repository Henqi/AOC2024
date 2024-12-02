import fs from 'fs'

const inputFileName = 'input.txt'
const thresholdMax = 3
const thresholdMin = 1

const reports = fs.readFileSync(inputFileName, 'utf-8').trim().split('\n').map(value => value.split(' ')).map(report => report.map(Number))

const isSafeAndSortedAscending = (array) => {
    return array.every((value, index) => {
        return (index === 0 || (value > array[index-1] && thresholdMin <= Math.abs(value - array[index-1]) && Math.abs(value - array[index-1]) <= thresholdMax) )
    })
}

const isSafeAndSortedDescending = (array) => {
    return array.every((value, index) => {
        return (index === 0 || (value < array[index-1] && thresholdMin <= Math.abs(value - array[index-1]) && Math.abs(value - array[index-1]) <= thresholdMax) )
    })
}

const safeReports = reports.filter(report => isSafeAndSortedAscending(report) || isSafeAndSortedDescending(report)).length
console.log(safeReports)