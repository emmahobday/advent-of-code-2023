const {input} = require('./day6input.js');
console.time('day6');

const calculateWaysToWin = (timeInMs, record) => {
  let wins = 0;
  for (let timeSpentHoldingButton = 0; timeSpentHoldingButton < timeInMs; timeSpentHoldingButton++) {
    const timeSpentMoving = timeInMs - timeSpentHoldingButton;
    const speed = timeSpentHoldingButton;
    const distance = speed * timeSpentMoving;
    if (distance > record) {
      wins++
    }
  }
  return wins;
}

//! PART ONE
const [times, records] = input
  .split(/\r?\n/)
  .map(row => row.split(/\s+/).map(Number).slice(1))
let partOne = [];
for (const [i, time] of times.entries()) {
  const record = records[i];
  partOne.push(calculateWaysToWin(time, record));
}
console.log('Part 1', partOne.reduce((a, b) => a * b, 1))

//! PART TWO
const [time, record] = input
  .split(/\r?\n/)
  .map(str => str.split('').filter(char => !isNaN(char) && char !== ' ').join('')).map(Number);
let partTwo = calculateWaysToWin(time, record);
console.log('Part 2', partTwo);
console.timeEnd('day6');
