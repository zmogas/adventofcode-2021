const fs = require('fs');

const day = '02';

const input = fs.readFileSync(`${day}.txt`, 'utf-8');

// console.log({ input });
const lines = input.split('\n');
// console.log(lines.length, {lines})

let x = 0;
let y = 0;
let aim = 0;
let depth = 0;

lines.map((line) => {
  const [command, units] = line.split(' ');
  if (command == 'forward') {
    x += parseInt(units);

    depth += aim * parseInt(units);
  }
  if (command == 'down') {
    y += parseInt(units);

    aim += parseInt(units);
  }
  if (command == 'up') {
    y -= parseInt(units);

    aim -= parseInt(units);
  }
});

console.log('ats 1:', {x, y}, x * y);
console.log('ats 2:', {x, depth, aim}, x * depth);

