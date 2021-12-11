const fs = require('fs');

const day = '11';

const input = fs.readFileSync(`${day}.txt`, 'utf-8');
const lines = input.split(/\n/);

const energy = [];

for (let i = 0; i < lines.length; i++) {
  energy[i] = [];
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    energy[i].push(parseInt(line[j]));
  }
}

const len = energy.length;

const flashed = [];

const resetFlashed = () => {
  for (let y = 0; y < len; y++) {
    flashed[y] = [];
    for (let x = 0; x < len; x++) {
      flashed[y].push(0);
    }
  }
}

const flash = () => {
  let count = 0;
  for (let y = 0; y < len; y++) {
    for (let x = 0; x < len; x++) {
      if (energy[y][x] > 9 && flashed[y][x] == 0) {
        // console.log('flashing', {y}, Math.max(0, y -1), Math.min(len, y + 2));
        // console.log('flashing', {x}, Math.max(0, x -1), Math.min(len, x + 2));
        // console.log();
        for (let yy = Math.max(0, y -1); yy < Math.min(len, y + 2); yy++) {
          for (let xx = Math.max(0, x -1); xx < Math.min(len, x + 2); xx++) {
            // console.log('ciklas', {yy, xx})
            if ((y != yy) || (x != xx)) {
              // console.log('++', {yy, xx});
              energy[yy][xx]++;
            } 
          }
        }
        flashed[y][x] = 1;
        count++;
      };
    }
  }
  return count;
}

const doStep = () => {
  resetFlashed();
  // Step 1
  for (let y = 0; y < len; y++) {
    for (let x = 0; x < len; x++) {
      energy[y][x]++;
    }
  }
  // Step 2
  let total = 0;
  let currentCount = 1;
  while (currentCount > 0) {
    currentCount = flash();
    total += currentCount;
  }
  // Step 3
  for (let y = 0; y < len; y++) {
    for (let x = 0; x < len; x++) {
      if (flashed[y][x] == 1) {
        energy[y][x] = 0;
      };
    }
  }

  return total;
}

console.log('init');
// console.log({ energy });
// console.log();

// doStep();
// console.log('after step');
// console.log({ energy });
// console.log();

let grandTotal = 0;
for (let i = 1; i <= 100; i++) {
  grandTotal += doStep();
  // console.log('after step');
  // console.log({ energy });
  // console.log();
}

console.log('Ats1:', {grandTotal});

for (let step = 1; step <= 1000; step++) {
  let sum = doStep();
  console.log({step, sum});
  if (sum == len * len) {
    console.log('Ats2: ', step);
    break;
  }
}

// 337: your answer is too low
// Right: 437: need to comment out FIRST PART, because it makes 100 steps.