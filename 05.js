const fs = require('fs');

const day = '05';

const input = fs.readFileSync(`${day}.txt`, 'utf-8');

const lines = input.split('\n');

const vents = [];

let max = 0;
for (let i = 0; i < lines.length; i++) {
  const [_, x1, y1, x2, y2] = lines[i].split(/(\d+),(\d+) -> (\d+),(\d+)/);
  vents.push({ 
    x1: parseInt(x1), 
    y1: parseInt(y1), 
    x2: parseInt(x2), 
    y2: parseInt(y2) 
  });
  max = Math.max(max, x1, y1, x2, y2);
}

// console.log(max, vents);

const matrix = [];

for (let x = 0; x <= max; x++) {
  matrix[x] = [];
  for (let y = 0; y <= max; y++) {
    matrix[x][y] = 0;
  }
}

for (let i = 0; i < vents.length; i++) {
  const v = vents[i];
  if (v.y1 == v.y2) {
    for (let j = Math.min(v.x1, v.x2); j <= Math.max(v.x1, v.x2); j++) {
      matrix[j][v.y1] += 1;
    }
  }
  else if (v.x1 == v.x2) {
    for (let j = Math.min(v.y1, v.y2); j <= Math.max(v.y1, v.y2); j++) {
      matrix[v.x1][j] += 1;
    }
  } else {
    const xsign = v.x1 < v.x2 ?  1 : -1;
    const ysign = v.y1 < v.y2 ?  1 : -1;
    // console.log(v, Math.abs(v.x1 - v.x2), xsign, ysign)
    for (let j = 0; j <= Math.abs(v.x1 - v.x2); j++) {
      // console.log(j, v.x1, v.x1 + j * xsign, v.y1 + j * ysign)
      matrix[v.x1 + j * xsign][v.y1 + j * ysign] += 1;
    }
  }
}

// console.log(matrix);
let count = 0;
for (let y = 0; y <= max; y++) {
  let line = '';
  for (let x = 0; x <= max; x++) {
    if (matrix[x][y] >= 2) {
      count++;
    }
    line = line + (matrix[x][y] == 0 ? '.' : matrix[x][y]);
  }
  console.log(line);
}

// console.log('ats1:', count);
console.log('ats2:', count);