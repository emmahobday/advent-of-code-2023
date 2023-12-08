const {input} = require('./day7input.js');
console.time('day7');

const rows = input
  .split(/\r?\n/)
  .map(row => row.split(' ').map((el, i) => i === 0 ? el.split('') : Number(el)));


const cardTypes = ['J','2','3','4','5','6','7','8','9','T','Q','K','A'];

const getType = (cardCount) => {
  const cardCountValues = Object.values(cardCount);
  if (cardCountValues.includes(5)) {
    return 7;
  }
  if (cardCountValues.includes(4)) {
    return 6;
  }
  if (cardCountValues.includes(3) && cardCountValues.includes(2)) {
    return 5;
  }
  if (cardCountValues.includes(3)) {
    return 4;
  }
  if (cardCountValues.includes(2) && cardCountValues.filter(v => v === 2).length === 2) {
    return 3;
  }
  if (cardCountValues.includes(2)) {
    return 2;
  }
  return 1; 
}

const compareByChar = (a, b) => {
  for (let i = 0; i < a.length; i++) {
    if (cardTypes.indexOf(a[i]) < cardTypes.indexOf(b[i])) {
      return -1;
    }
    if (cardTypes.indexOf(a[i]) > cardTypes.indexOf(b[i])) {
      return 1;
    }
    continue;
  }
}

const getHighestCard = (hand) => {
  let highestCard = cardTypes[0];
  hand.forEach(card => {
    if (cardTypes.indexOf(card) > cardTypes.indexOf(highestCard)) {
      highestCard = card;
    }
  })
  return highestCard;
}

const replaceJokers = (hand, cardCounts) => {
  const hasJokers = !!cardCounts['J'];
  if (!hasJokers) {
    return cardCounts;
  }
  const cardCountValues = Object.values(cardCounts);
  if (cardCountValues.includes(5)) {
    return {A: 5}; // case of 5 jokers
  }
  if (cardCountValues.includes(4)) {
    const highestCard = getHighestCard(hand);
    return {[highestCard]: 5};
  }
  if (cardCountValues.includes(3) && cardCountValues.includes(2)) {
    const highestCard = getHighestCard(hand);
    return {[highestCard]: 5};
  }
  if (cardCountValues.includes(3)) {
    if (cardCounts['J'] === 3) {
      const highestCard = getHighestCard(hand);
      const updatedCounts = {...cardCounts};
      updatedCounts[highestCard] = 4;
      delete updatedCounts['J'];
      return updatedCounts;
    } else {
      const updatedCounts = {...cardCounts};
      hand.forEach(card => {
        if (cardCounts[card] === 3) {
          updatedCounts[card] = 4;
        }
      })
      delete updatedCounts['J'];
      return updatedCounts;
    }
  }
  if (cardCountValues.includes(2) && cardCountValues.filter(v => v === 2).length === 2) {
    if (cardCounts['J'] === 2) {
      const updatedCounts = {...cardCounts};
      hand.forEach(card => {
        if (cardCounts[card] === 2 && card !== 'J') {
          updatedCounts[card] = 4;
        }
      })
      delete updatedCounts['J'];
      return updatedCounts;
    } else {
      const updatedCounts = {...cardCounts};
      const highestCard = getHighestCard(hand);
      hand.forEach(card => {
        if (card === highestCard) {
          updatedCounts[card] = 3;
        }
      })
      delete updatedCounts['J'];
      return updatedCounts;
    }
  }
  if (cardCountValues.includes(2)) {
    if (cardCounts['J'] === 2) {
      const updatedCounts = {...cardCounts};
      const highestCard = getHighestCard(hand);
      hand.forEach(card => {
        if (card === highestCard) {
          updatedCounts[card] = 3;
        }
      })
      delete updatedCounts['J'];
      return updatedCounts;
    } else {
      const updatedCounts = {...cardCounts};
      hand.forEach(card => {
        if (cardCounts[card] === 2) {
          updatedCounts[card] = 3;
        }
      })
      delete updatedCounts['J'];
      return updatedCounts;
    }
  }
  const updatedCounts = {...cardCounts};
  const highestCard = getHighestCard(hand);
  hand.forEach(card => {
    if (card === highestCard) {
      updatedCounts[card] = 2;
    }
  })
  delete updatedCounts['J'];
  return updatedCounts;

}

const getCardCounts = (hand) => {
  const cardCounts = {};
  hand.forEach(card => {
    cardCounts[card] = cardCounts[card] ? cardCounts[card] + 1 : 1;
  })
  
  return cardCounts;
}

const getWinner = (a, b) => {
  const aCardCounts = getCardCounts(a[0]);
  const bCardCounts = getCardCounts(b[0]);
  const updatedACount = replaceJokers(a[0], aCardCounts);
  const updatedBCount = replaceJokers(b[0], bCardCounts);
  const aType = getType(updatedACount);
  const bType = getType(updatedBCount);
  if (aType === bType) {
    return compareByChar(a[0], b[0]);
  }
  return aType - bType;
}

const orderedHands = rows.sort((a, b) => getWinner(a, b)) // lowest to highest

let score = 0;

orderedHands.forEach((hand, i) => {
  score += hand[1] * (i + 1);
})

console.log({score})

console.timeEnd('day7');