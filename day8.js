const {input} = require('./day8input.js');
console.time('day8');

const rows = input
  .split(/\r?\n/)

console.log(rows)

const pattern = rows[0].split('')

const steps = rows
  .slice(2)
  .reduce((acc, row) => {
    const elements = row
      .split(' = ')
      .flatMap((str, i) => i === 0 
        ? str 
        : str.replace(/[\(\)&]+/g, '').split(', ')
      )
    acc[elements[0]] = elements.slice(1)
    return acc
  }, {})


console.log({pattern, steps})

let total = 0;
let searching = true;
let positions = Object.keys(steps).filter(loc => loc[loc.length - 1] === 'A')

let endPositions = Object.keys(steps).filter(loc => loc[loc.length - 1] === 'Z')

// let check = {}
// endPositions.forEach(loc => check[loc] = [])

// let checkTwo = {}
// for (const loc of Object.keys(steps)) {
//   checkTwo[loc] = []
// } 

while (searching) {
  for (const dir of pattern) {
    if (dir === 'L') {
      positions = positions.map(loc => steps[loc][0])
    } else {
      positions = positions.map(loc => steps[loc][1])
    }
    total += 1;
    // positions.forEach((loc, ind) => {
    //   checkTwo[loc].push(ind)
    //   if (loc[loc.length - 1] === 'Z') {
    //     check[loc].push(total)
    //   }
    // })
    // console.log({checkTwo})
    if (positions.every(loc => loc[loc.length - 1] === 'Z')) {
      searching = false;
      console.log({total})
      break;
    }
    if (endPositions.every(pos => check[pos].length > 3)) {
      console.log({check})
      searching = false;
      break;
    }
  }
}

const lcms = []

for (const pos of endPositions) {
  const data = check[pos];
  let interval = data[1] - data[0];
  if (data[1] + interval !== data[2]) {
    console.log('interval is wrong', {data, interval})
  }
  if (interval !== data[0]) {
    console.log('expected these to match', {interval, d:data[0]})
  }
  lcms.push(interval)
}

console.log({lcms})

//! stolen from the internet
const calculateLCM = (...arr) => {
  const gcd2 = (a, b) => {
     // Greatest common divisor of 2 integers
  if(!b) return b===0 ? a : NaN;
        return gcd2(b, a%b);
  };
  const lcm2 = (a, b) => {
     // Least common multiple of 2 integers
     return a * b / gcd2(a, b);
  }
  // Least common multiple of a list of integers
  let n = 1;
  for(let i = 0; i < arr.length; ++i){
    n = lcm2(arr[i], n);
  }
  return n;
};

console.log(calculateLCM(...lcms));

console.timeEnd('day8');
