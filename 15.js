const fs = require('fs');

const day = '15d';

const input = fs.readFileSync(`${day}.txt`, 'utf-8');
const lines = input.split(/\n/);

const chiton = [];

for (let y = 0; y < lines.length; y++) {
  const chit = lines[y].split('').map(c => parseInt(c));
  chiton.push(chit);
}

const max = chiton.length - 1;

console.log({ chiton, max });

const paths = [];

const valxy = (x, y, step) => {
  const xx = parseInt(step[0]);
  const yy = parseInt(step[1]);
  if (x + xx > max || y + yy > max) {
    return 99;
  }
  console.log(y + yy, x + xx, chiton[y + yy][x + xx])
  return chiton[y + yy][x + xx];
}

const search = (x, y, visited, sum) => {
  const place = `${x}-${y}`;
  if (visited.includes(place)) {
    // console.log(place, 'already visited');
    return;
  }
  const newSum = sum + chiton[y][x];
  const newVisited = [...visited, place];
  if (x == max && y == max) {
    // console.log('Path:', newSum);
    paths.push(newSum);
    return;
  }
  if (x % 5 == 0 && y % 5 == 0) {
    console.log({x, y, sum});
  }

  // calculate next 3 steps, take lowest result. String is xyxyxy, where says how many steps to add
  const steps = [
    '102030',
    '102021',
    '101121',
    '101112',
    '011121',
    '011112',
    '010212',
    '010203'
  ];
  const values = [];
  for (let i = 0; i < steps.length; i++) {
    console.log(steps[i].substring(0, 2), steps[i].substring(2, 4), steps[i].substring(4, 6))
    const val = valxy(x, y, steps[i].substring(0, 2))
      + valxy(x, y, steps[i].substring(2, 4))
      + valxy(x, y, steps[i].substring(4, 6));
    console.log({ val });
  }
  // if (x < max && y < max) {
  //   const diff = chiton[y + 1][x] - chiton[y][x + 1];
  //   if (diff > 0) {
  //     search(x + 1, y, newVisited, newSum);
  //   } else {
  //     search(x, y + 1, newVisited, newSum);
  //   }
  // }
  // else if (x < max) {
  //   search(x + 1, y, newVisited, newSum);
  // }
  // else if (y < max) {
  //   search(x, y + 1, newVisited, newSum);
  // }
  // if (x > 0) {
  //   search(x - 1, y, newVisited, newSum);
  // }
  // if (y > 0) {
  //   search(x, y - 1, newVisited, newSum);
  // }
}

const visited = ['0-0'];
search(0, 1, visited, 0);
search(1, 0, visited, 0);

const sorted = paths.sort((a, b) => a == b ? 0 : a < b ? -1 : 1);
console.log({ paths });

console.log('Ats1:', sorted[0]);
/*
#
# Fatal error in , line 0
# Fatal JavaScript invalid size error 169220804
#
#
#
#FailureMessage Object: 0x7ffdbad6a290
 1: 0xb6d311  [node]
 2: 0x1bf5a04 V8_Fatal(char const*, ...) [node]
 3: 0xe74128  [node]
 4: 0x1021ce2  [node]
 5: 0x1022626  [node]
 6: 0x11e32b3 v8::internal::Runtime_GrowArrayElements(int, unsigned long*, v8::internal::Isolate*) [node]
 7: 0x15e7819  [node]
Trace/breakpoint trap (core dumped)

real    34m35,632s
user    34m45,924s
sys     0m9,748s
*/


// 776   your answer is too high
//