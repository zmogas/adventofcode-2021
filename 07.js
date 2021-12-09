const fs = require('fs');

const day = '07';

const input = fs.readFileSync(`${day}.txt`, 'utf-8');

const crabs = input.split(',').map(i => parseInt(i));

const min = Math.min(...crabs);
const max = Math.max(...crabs);
console.log('crabs', { crabs, min, max })

let fuelMin = -1;
let fuelMax = -1;
let posMin = -1;
let posMax = -1;

for (let i = min; i <= max; i++) {
  let total = 0;
  for (let j = 0; j < crabs.length; j++) {
    total += Math.abs(i - crabs[j]);
  }

  if (fuelMin < 0 || total < fuelMin) {
    posMin = i;
    fuelMin = total;
  }
  if (fuelMax < 0 || total > fuelMax) {
    posMax = i;
    fuelMax = total;
  }
}

console.log('Ats 1:', { posMin, fuelMin, posMax, fuelMax });

const range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);

function sum(array){
  return array.reduce((a,b) => a + b, 0);
};
// console.log(range(1,3))
// console.log(sum(range(1,3)))

fuelMin = -1;
fuelMax = -1;
posMin = -1;
posMax = -1;

for (let i = min; i <= max; i++) {
  if (i % 10 == 0) {
    console.log('In progress...', i);
  }
  let total = 0;
  for (let j = 0; j < crabs.length; j++) {
    let diff = Math.abs(i - crabs[j]);
    total += sum(range(1,diff));
  }

  if (fuelMin < 0 || total < fuelMin) {
    posMin = i;
    fuelMin = total;
  }
  if (fuelMax < 0 || total > fuelMax) {
    posMax = i;
    fuelMax = total;
  }
}

console.log('Ats 2:', { posMin, fuelMin, posMax, fuelMax });

// Bad: 356958
