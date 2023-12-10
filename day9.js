const {input} = require('./day9input.js');
console.time('day9');

const rows = input
  .split(/\r?\n/).map(row => row.split(' ').map(Number));

const getNextLevel = (row) => {
  const diff = row.map((num, i) => i === row.length - 1 ? null : row[i + 1] - num)
  diff.pop()
  return diff
}

let added = 0;
let added2 = 0;

//! PART ONE
for (const row of rows) {
  let level = 0;
  let levelValues = [];
  let current = row;

  while (!current.every(num => num === 0)) {
    current = getNextLevel(current)
    levelValues.push(current)
    level++
  }
  const updated = [];
  levelValues.reverse().forEach((arr, i) => {
    if (i === 0) {
      arr.push(0)
      updated.push(arr)
    } else {
      arr.push(arr[arr.length - 1] + updated[i - 1][arr.length - 1])
      updated.push(arr)
    }
  })
  added += row[row.length - 1] + updated[updated.length - 1][row.length - 1]
}

//! PART TWO
for (const row of rows) {
  let level = 0;
  let levelValues = [];
  let current = row;

  while (!current.every(num => num === 0)) {
    current = getNextLevel(current)
    levelValues.push(current)
    level++
  }
  const updated = [];
  levelValues.reverse().forEach((arr, i) => {
    if (i === 0) {
      arr.unshift(0)
      updated.push(arr)
    } else {
      arr.unshift(arr[0] - updated[i - 1][0])
      updated.push(arr)
    }
  })
  added2 += row[0] - updated[updated.length - 1][0]
}

console.log('Part 1:', added)
console.log('Part 2:', added2)
console.timeEnd('day9');
