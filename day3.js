const {input} = require('./day3input.js');

console.time('day3');
let count = 0;
const rows = input
  .split(/\r?\n/);

const isSymbol = (char) => isNaN(char) && char !== '.';

const isPartOne = false;
// this is embarrassing code... but it works
if (isPartOne) {
  for (const [rowIndex, r] of rows.entries()) {
    const isTopRow = rowIndex === 0;
    const isBottomRow = rowIndex === rows.length - 1;
    let currentNumberIndices = [];
  
    const row = r.split('')
    for (const [charIndex, char] of row.entries()) {
      if (currentNumberIndices.includes(charIndex)) {
        continue;
      }
      if (currentNumberIndices.includes(charIndex - 1)) {
        currentNumberIndices = []
      }
      const isLeftCol = charIndex === 0;
      let isRightCol = charIndex === row.length - 1;
      if (!isNaN(char)) {
        currentNumberIndices.push(charIndex);
        for (let i = charIndex + 1; i < row.length; i++) {
          if (!isNaN(row[i])) {
            currentNumberIndices.push(i);
          } else {
            break;
          }
        }
      }
  
      let isAdjacentToSymbol = false;
      if (currentNumberIndices.length > 0) {
        isRightCol = currentNumberIndices[currentNumberIndices.length - 1] === row.length - 1;
        if (!isTopRow) {
          const rowAbove = rows[rowIndex - 1].split('');
          for (const i of currentNumberIndices) {
            if (isSymbol(rowAbove[i])) {
              isAdjacentToSymbol = true;
            }
          }
          if (!isLeftCol) {
            if (isSymbol(rowAbove[currentNumberIndices[0] - 1])) {
              isAdjacentToSymbol = true;
            }
          }
          if (!isRightCol) {
            if (isSymbol(rowAbove[currentNumberIndices[currentNumberIndices.length - 1] + 1])) {
              isAdjacentToSymbol = true;
            }
          }
        }
        if (!isLeftCol) {
          if (isSymbol(row[currentNumberIndices[0] - 1])) {
            isAdjacentToSymbol = true;
          }
        }
        if (!isRightCol) {
          if (isSymbol(row[currentNumberIndices[currentNumberIndices.length - 1] + 1])) {
            isAdjacentToSymbol = true;
          }
        }
        if (!isBottomRow) {
          const rowBelow = rows[rowIndex + 1].split('');
          for (const i of currentNumberIndices) {
            if (isSymbol(rowBelow[i])) {
              isAdjacentToSymbol = true;
            }
          }
          if (!isLeftCol) {
            if (isSymbol(rowBelow[currentNumberIndices[0] - 1])) {
              isAdjacentToSymbol = true;
            }
          }
          if (!isRightCol) {
            if (isSymbol(rowBelow[currentNumberIndices[currentNumberIndices.length - 1] + 1])) {
              isAdjacentToSymbol = true;
            }
          }
        }
  
        if (isAdjacentToSymbol) {
          const num = Number(currentNumberIndices.map(i => row[i]).join(''));
          if (num > 0) {
            count += num;
          }
        }
      }
      if (isRightCol) {
        currentNumberIndices = [];
      }
    }
  }
}

let partTwoCount = 0;

for (const [rowIndex, r] of rows.entries()) {
  const isTopRow = rowIndex === 0;
  const isBottomRow = rowIndex === rows.length - 1;
  let currentNumberIndices = [];

  const row = r.split('')
  for (const [charIndex, char] of row.entries()) {
    const isLeftCol = charIndex === 0;
    const isRightCol = charIndex === row.length - 1;
    if (char === '*') {
      const adjacentNumbers = [];
      if (!isTopRow) {
        const rowAbove = rows[rowIndex - 1].split('');
        const topLeftIndex = isLeftCol ? charIndex : charIndex - 1;
        const topRightIndex = isRightCol ? charIndex : charIndex + 1;
        let indexToStart = topLeftIndex;
        let indexToFinish = topRightIndex;
        if (!isNaN(rowAbove[topLeftIndex])) {
          for (let i = topLeftIndex; i >= 0; i--) {
            if (!isNaN(rowAbove[i])) {
              indexToStart = i;
            } else {
              break;
            }
            if (i === 0) {
              break;
            }
          }
        }
        if (!isNaN(rowAbove[topRightIndex])) {
          for (let i = topRightIndex; i < rowAbove.length; i++) {
            if (!isNaN(rowAbove[i])) {
              indexToFinish = i;
            } else {
              break;
            }
            if (i === rowAbove.length - 1) {
              break;
            }
          }
        }
        let chars = [];
        for (let i = indexToStart; i <= indexToFinish; i++) {
          if (!isNaN(rowAbove[i])) {
            chars.push(rowAbove[i]);
          } else {
            chars.push(' ');
          }
        }
        const numbers = chars.join('').split(' ').filter(c => c);
        numbers.forEach(n => adjacentNumbers.push(Number(n)));
      }

      if (!isBottomRow) {
        const rowBelow = rows[rowIndex + 1].split('');
        const bottomLeftIndex = isLeftCol ? charIndex : charIndex - 1;
        const bottomRightIndex = isRightCol ? charIndex : charIndex + 1;
        let indexToStart = bottomLeftIndex;
        let indexToFinish = bottomRightIndex;
        if (!isNaN(rowBelow[bottomLeftIndex])) {
          for (let i = bottomLeftIndex; i >= 0; i--) {
            if (!isNaN(rowBelow[i])) {
              indexToStart = i;
            } else {
              break;
            }
            if (i === 0) {
              break;
            }
          }
        }
        if (!isNaN(rowBelow[bottomRightIndex])) {
          for (let i = bottomRightIndex; i < rowBelow.length; i++) {
            if (!isNaN(rowBelow[i])) {
              indexToFinish = i;
            } else {
              break;
            }
            if (i === rowBelow.length - 1) {
              break;
            }
          }
        }
        let chars = [];
        for (let i = indexToStart; i <= indexToFinish; i++) {
          if (!isNaN(rowBelow[i])) {
            chars.push(rowBelow[i]);
          } else {
            chars.push(' ');
          }
        }
        const numbers = chars.join('').split(' ').filter(c => c);
        numbers.forEach(n => adjacentNumbers.push(Number(n)));
      }

      if (!isLeftCol) {
        const leftChar = row[charIndex - 1];
        if (!isNaN(leftChar)) {
          let startIndex = charIndex - 1;
          for (let j = charIndex - 1; j >= 0; j--) {
            if (!isNaN(row[j])) {
              startIndex = j;
            } else {
              break;
            }
            if (j === 0) {
              break;
            }
          }
          let chars = []
          for (let k = startIndex; k < charIndex; k++) {
            if (!isNaN(row[k])) {
              chars.push(row[k]);
            } else {
              chars.push(' ');
            }
          }
          const numbers = chars.join('').split(' ').filter(c => c);
          numbers.forEach(n => adjacentNumbers.push(Number(n)));
        }
      }

      if (!isRightCol) {
        const rightChar = row[charIndex + 1];
        if (!isNaN(rightChar)) {
          let endIndex = charIndex + 1;
          for (let j = charIndex + 1; j < row.length; j++) {
            if (!isNaN(row[j])) {
              endIndex = j;
            } else {
              break;
            }
            if (j === row.length - 1) {
              break;
            }
          }
          let chars = []
          for (let k = charIndex + 1; k <= endIndex; k++) {
            if (!isNaN(row[k])) {
              chars.push(row[k]);
            } else {
              chars.push(' ');
            }
          }
          const numbers = chars.join('').split(' ').filter(c => c);
          numbers.forEach(n => adjacentNumbers.push(Number(n)));
        }
      }

      if (adjacentNumbers.length > 1) {
        const total = adjacentNumbers.reduce((acc, n) => acc * n, 1);
        partTwoCount += total;
      }
    }
  }
}

console.log({partTwoCount})
console.timeEnd('day3')


