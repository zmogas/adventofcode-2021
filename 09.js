const fs = require('fs');

const day = '09d';

const input = fs.readFileSync(`${day}.txt`, 'utf-8');

// const data = input.split(',').map(i => parseInt(i));
const map = input.split(/\n/);

let risk = 0;

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    const current = parseInt(map[i][j]);
    if (
      (i == 0 || current < parseInt(map[i-1][j]))
      && (i == map.length - 1 || current < parseInt(map[i+1][j]))
      && (j == 0 || current < parseInt(map[i][j-1]))
      && (j == map[i].length - 1 || current < parseInt(map[i][j+1]))
    ) {
      // console.log('Found', i, j, current);
      risk += 1 + current;
    }
  }
}

console.log('Ats1:', risk);

const maxI = map.length;
const maxJ = map[0].length;
console.log({maxI, maxJ});

let usedCoords = [];
// type Direction = 'left' | 'right' | 'down' | 'up';
const getBasinSize = (i, j, prev, direction) => {
  if (i < 0 || j < 0 || i >= maxI || j >= maxJ) {
    // console.log('overflow', {i, j});
    return 0;
  }
  const coords = `${i}-${j}`;
  if (usedCoords.indexOf(coords) != -1) {
    console.log('already used', coords);
    return 0;
  }
  const current = parseInt(map[i][j]);
  if (current == 9 || current != prev + 1) {
    // console.log('not sequence', {i, j, prev, current});
    return 0;
  }

  // console.log('calc(+1)', {i, j, direction, prev, current});
  const addIfNotUsed = ((usedCoords.indexOf(coords) != -1) ? 0 : 1);
  usedCoords.push(coords);

  return addIfNotUsed
    + (getBasinSize(i, j-1, current, 'left'))
    + (getBasinSize(i, j+1, current, 'right'))
    + (getBasinSize(i-1, j, current, 'up'))
    + (getBasinSize(i+1, j, current, 'down'));
    // + (direction == 'right' ? 0 : getBasinSize(i, j-1, current, 'left'))
    // + (direction == 'left' ? 0 : getBasinSize(i, j+1, current, 'right'))
    // + (direction == 'down' ? 0 : getBasinSize(i-1, j, current, 'up'))
    // + (direction == 'up' ? 0 : getBasinSize(i+1, j, current, 'down'));
}

const getBasin2 = (i, j) => {
  const count = 1;
  let c = 1;
  let found = false;
  while (i-c>0 || j-c>0 || i+c<maxI-1 || j+c<maxJ) {
    found = false;
    if (i-c>0) {
      //
    }
    if (!found) {
      break;
    }
    c++;
  }
  return count;
}

const basins = [];

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    const current = parseInt(map[i][j]);
    if (
      (i == 0 || current < parseInt(map[i-1][j]))
      && (i == map.length - 1 || current < parseInt(map[i+1][j]))
      && (j == 0 || current < parseInt(map[i][j-1]))
      && (j == map[i].length - 1 || current < parseInt(map[i][j+1]))
    ) {
      console.log();
      console.log('Found', i, j, current);
      // usedCoords = [];
      basins.push(getBasin2(i, j));
    }
  }
}

console.log({basins});

const sorted = basins.sort((a, b) => a == b ? 0 : a > b ? -1 : 1);
console.log({sorted})
const ats2 = sorted[0] * sorted[1] * sorted[2];

console.log('ats2:', ats2);

// 734096 your answer is too low
// 187939980 your answer is too high