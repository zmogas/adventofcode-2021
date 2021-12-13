const fs = require('fs');

const day = '13';

const input = fs.readFileSync(`${day}.txt`, 'utf-8');

const lines = input.split(/\n/);

let dots = [];
const coords = [];
const folds = [];
let maxX = 0;
let maxY = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line == '') {
    //skip
  } else if (line.includes('fold along')) {
    const instructions = line.split(/fold along (x|y)=(\d+)/);
    folds.push({ side: instructions[1], size: parseInt(instructions[2]) });
  } else {
    const coord = line.split(',').map(i => parseInt(i));
    coords.push(coord);
    maxX = Math.max(maxX, coord[0]);
    maxY = Math.max(maxY, coord[1]);
  }
}

console.log({ coords, folds });

for (let y = 0; y <= maxY; y++) {
  dots[y] = [];
  for (let x = 0; x <= maxX; x++) {
    dots[y][x] = 0;
  }
}

for (let i = 0; i < coords.length; i++) {
  dots[coords[i][1]][coords[i][0]] = 1;
}

const printDots = () => {
  let line;
  for (let y = 0; y <= maxY; y++) {
    line = '';
    for (let x = 0; x <= maxX; x++) {
      line += dots[y][x];
    }
    console.log(line);
  }
  console.log();
}

const countDots = () => {
  let count = 0;
  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      if (dots[y][x] > 0) {
        count++;
      }
    }
  }
  return count;
}

console.log('start');
printDots();

for (let i = 0; i < folds.length; i++) {
  const newDots = [];
  const fold = folds[i];

  if (fold.side == 'y') {
    for (let y = 0; y < fold.size; y++) {
      newDots.push(dots[y]);
    }
    for (let y = fold.size + 1; y <= maxY; y++) {
      for (let x = 0; x <= maxX; x++) {
        newDots[maxY - y][x] += dots[y][x];
      }
    }
    maxY = fold.size - 1;
  } else {
    for (let y = 0; y <= maxY; y++) {
      newDots.push([]);
      for (let x = 0; x < fold.size; x++) {
        newDots[y][x] = dots[y][x];
      }
      for (let x = fold.size + 1; x <= maxX; x++) {
        newDots[y][maxX - x] += dots[y][x];
      }
    }
    maxX = fold.size -1;
  }
  dots = newDots;
  console.log('folded', fold);
  printDots();
  break;
}

console.log('Ats1:', countDots());

// 104    your answer is too low
