const {input} = require('./day1input.js');
console.time('day1');

const rows = input.split(/\r?\n/);
const rowVals = [];

const nums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const strToDigit = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
}

const strToDigitRev = {
  'eno': 1,
  'owt': 2,
  'eerht': 3,
  'ruof': 4,
  'evif': 5,
  'xis': 6,
  'neves': 7,
  'thgie': 8,
  'enin': 9,
}

const reverseString = (str) => str.split('').reverse().join('');

const findAndReplaceNum = (strng, position) => {
  let indexToReplace = null;
  let numToReplace = null;
  let foundDigit = false;

  const numbers = position === 'first' ? nums : nums.map(num => reverseString(num));
  const str = position === 'first' ? strng : reverseString(strng);

  str.split('').forEach((char, index) => {

    // once we've found the first number, we can stop looking
    if (!numToReplace && !foundDigit) {

      // if we find a digit, we can stop looking
      if (!isNaN(char)) {
        foundDigit = true;
      }

      // iterate through numbers array
      for (let i = 0; i < numbers.length; i++) {
        const num = numbers[i];

        // if the current char matches the first char of the current number, we can start checking for a match
        if (char === num[0]) {
          // iterate through the rest of the chars in the number to look for a full match
          for (let j = 0; j < num.length; j++) {
            if (str[index + j] !== num[j]) {
              // break if something doesn't match in that number
              break;
            }
            // if we've reached the end of the number and everything matches, we've found the number to replace
            if (j === num.length - 1) {
                indexToReplace = index;
                numToReplace = num;
            }
          }
        }
      }
    }
  })

  if (indexToReplace !== null) {
    const newStr = str.slice(0, indexToReplace) + (position === 'first' ? strToDigit[numToReplace] : strToDigitRev[numToReplace]) + str.slice(indexToReplace + numToReplace.length);
    return position === 'first' ? newStr : reverseString(newStr);
  }
  return position === 'first' ? str : reverseString(str);
};

for (const row of rows) {
  let updatedRow = row;
  updatedRow = findAndReplaceNum(row, 'first');
  updatedRow = findAndReplaceNum(updatedRow, 'last');
  const rowNums = updatedRow.split('').filter(char => !isNaN(char));
  if (rowNums.length > 0) {
    const val = rowNums[0] + rowNums[rowNums.length - 1]
    rowVals.push(Number(val))
  }
}

const total = rowVals.reduce((acc, el) => acc + el);
console.log({total})
console.timeEnd('day1');

