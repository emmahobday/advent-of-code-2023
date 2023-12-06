const {input} = require('./day2input.js');

console.time('day2');
const rows = input
  .split(/\r?\n/)
  .reduce((acc, row) => {
    const [game, rounds] = row.split(': ');
    const results = rounds.split('; ').map(r => {
      const counts = {};
      r.split(', ').forEach(score => {
        const [count, colour] = score.split(' ');
        counts[colour] = Number(count);
      
      })
      return counts;
    });

    acc[game] = results;
    return acc;
  }, {});

const games = Object.keys(rows);

//! PART ONE
// const maxRed = 12;
// const maxGreen = 13;
// const maxBlue = 14;

//! PART ONE
// let totalIds = 0;
//? PART TWO
let totalPowers = 0;

games.forEach(game => {
  const results = rows[game];

  //! PART ONE
  // let invalid = false;
  // for (const result of results) {
  //   const red = result.red || 0;
  //   const green = result.green || 0;
  //   const blue = result.blue || 0;
  //   if (red > maxRed || green > maxGreen || blue > maxBlue) {
  //     invalid = true;
  //     break;
  //   }
  // }
  // if (!invalid) {
  //   const gameId = game.split(' ')[1];
  //   totalIds += parseInt(gameId);
  // }

  //? PART TWO
  let maxRed = 1;
  let maxGreen = 1;
  let maxBlue = 1;
  for (const result of results) {
    if (result.blue > maxBlue) {
      maxBlue = result.blue;
    }
    if (result.green > maxGreen) {
      maxGreen = result.green;
    }
    if (result.red > maxRed) {
      maxRed = result.red;
    }
  }
  totalPowers += (maxRed * maxGreen * maxBlue);
})

//! PART ONE
// console.log({totalIds})
//? PART TWO
console.log({totalPowers})
console.timeEnd('day2');