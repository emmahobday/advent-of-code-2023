const {input} = require('./day4input.js');
console.time('day4');
//? refactoring note - could do a much nicer reduce here
const rows = input
  .split(/\r?\n/)
  .map(r => r.split(': ')[1].split(' | '))
  .map(r => r.map(c => c.split(' ').filter(r => r).map(n => parseInt(n, 10))))
  .map(r => {
    r[2] = {numCards: 1};
    return r;
  });
//? should also refactor to make each row an object with named properties rather than a weird mix of arrays and an object

const getScore = (numCorrect) => {
  let score = numCorrect > 0 ? 1 : 0;
  for (let i = 1; i < numCorrect; i++) {
    score = score * 2;
  }
  return score;
}

// let overallScore = 0; //! part 1
const originalNumCards = rows.reduce((acc, row) => acc + row[2].numCards, 0);

for (const [index, row] of rows.entries()) {
  const winningNumbers = row[0];
  const myNumbers = [... new Set(row[1])];

  let numMatches = 0;
  for (const num of myNumbers) {
    if (winningNumbers.includes(num)) {
      numMatches++;
    }
  }

  // const score = getScore(numMatches); //! part 1
  // overallScore += score; //! part 1

  for (let i = 1; i <= numMatches; i++) {
    rows[index + i][2].numCards += row[2].numCards;
  }
}

const finalNumCards = rows.reduce((acc, row) => acc + row[2].numCards, 0);


// console.log({overallScore}) //! part 1
console.log({finalNumCards})
console.timeEnd('day4');