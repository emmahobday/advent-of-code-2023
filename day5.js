const {input} = require('./day5input.js');
console.time('day5');

const data = {};

const rows = input
  .split(/\r?\n\n/)
  .map(row => row.split(":"))

rows.forEach(row => {
  const [key, values] = row;
  if (key === 'seeds') {
    data[key] = values.split(/\s+/).filter(v => v).map(Number);
  } else {
    data[key] = values.split(/\r?\n/).filter(v => v).map(row => row.split(/\s+/).map(Number));
  }
})


const getNextId = (id, map) => {
  let nextId = id;
  for (const data of map) {
    if (id >= data[1] && id <= data[1] + data[2]) {
      const diff = Math.abs(data[1] - id);
      nextId = data[0] + diff;
      break;
    }
  }
  return nextId;
}

let minLocationId = null;

const calculateLocation = (seed) => {
  const soilId = getNextId(seed, data['seed-to-soil map']);
  const fertilizerId = getNextId(soilId, data['soil-to-fertilizer map']);
  const waterId = getNextId(fertilizerId, data['fertilizer-to-water map']);
  const lightId = getNextId(waterId, data['water-to-light map']);
  const temperatureId = getNextId(lightId, data['light-to-temperature map']);
  const humidityId = getNextId(temperatureId, data['temperature-to-humidity map']);
  const locationId = getNextId(humidityId, data['humidity-to-location map']);
  if (!minLocationId || locationId < minLocationId) {
    minLocationId = locationId;
  }
}

const getNextIdsBackwards = (id, map) => {
  const nextIds = []
  for (const data of map) {
    if (id >= data[0] && id <= data[0] + data[2]) {
      const diff = Math.abs(data[0] - id);
      nextIds.push(data[1] + diff);
    }
  }
  if (nextIds.length === 0) {
    nextIds.push(id);
  }
  return nextIds;
}

const isSeedInDataRange = (seedId) => {
  for (const [index, seed] of data.seeds.entries()) {
    if (index % 2 === 1) {
      continue;
    }
    const range = data.seeds[index + 1];
    if (seedId >= seed && seedId <= seed + range) {
      return true;
    }
  }
  return false;
}

const processPartOne = (d) => {
  for (const seed of d.seeds) {
    calculateLocation(seed);
  }
  console.log(minLocationId);
}

const processPartTwo = (d) => {
  let smallestLocation = null;
  let locationId = 0;
  while (!smallestLocation) {
    const humidityIds = getNextIdsBackwards(locationId, d['humidity-to-location map']);
    for (const humidityId of humidityIds) {
      const temperatureIds = getNextIdsBackwards(humidityId, d['temperature-to-humidity map']);
      for (const temperatureId of temperatureIds) {
        const lightIds = getNextIdsBackwards(temperatureId, d['light-to-temperature map']);
        for (const lightId of lightIds) {
          const waterIds = getNextIdsBackwards(lightId, d['water-to-light map']);
          for (const waterId of waterIds) {
            const fertilizerIds = getNextIdsBackwards(waterId, d['fertilizer-to-water map']);
            for (const fertilizerId of fertilizerIds) {
              const soilIds = getNextIdsBackwards(fertilizerId, d['soil-to-fertilizer map']);
              for (const soilId of soilIds) {
                const seedIds = getNextIdsBackwards(soilId, d['seed-to-soil map']);
                for (const seedId of seedIds) {
                  if (isSeedInDataRange(seedId)) {
                    console.log({seedId, locationId})
                    smallestLocation = locationId;
                  }
                }
              }
            }
          }
        }
      }
    }
    locationId++;
  }
}
processPartOne(data);
processPartTwo(data);

console.timeEnd('day5');