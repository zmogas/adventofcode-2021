const fs = require('fs');

const day = '12';

const input = fs.readFileSync(`${day}.txt`, 'utf-8');
const lines = input.split(/\n/);

// console.log({ lines });

const paths = [];

for (let i = 0; i < lines.length; i++) {
  const [from, to] = lines[i].split('-');
  // const lowercase = to[0].toLowerCase() == to[0];
  paths.push({ from, to });
  // console.log({ from, to });
}

console.log({ path: paths });

const countSmallCaves = (usedPaths, to) => {
  if (!usedPaths.includes(to)) {
    return false;
  }
  const lowerPaths = usedPaths.filter((path) => path[0].toLowerCase() == path[0]);
  const duplicateFound = lowerPaths.filter((item, index) => lowerPaths.indexOf(item) !== index);
  // console.log('countSmallCaves', { lowerPaths, duplicateFound });
  return duplicateFound.length > 0;
}

const search = (current, usedPaths, level) => {
  // console.log();
  let count = 0;
  // let nextPaths = paths.filter((path) => path.from == current);
  let maps = paths.map((path) => {
    if (path.from == current && path.to != 'start') {
      return { to: path.to, lowercase: path.to[0].toLowerCase() == path.to[0] };
    } else if (path.to == current && path.from != 'start') {
      return { to: path.from, lowercase: path.from[0].toLowerCase() == path.from[0] }
    } else {
      //
    }
  }).filter(Boolean);
  // console.log('********', { nextPaths, maps });
  // usedPaths.push(current);
  // console.log('search', { level, current, usedPaths, maps })

  for (let i = 0; i < maps.length; i++) {
    const next = maps[i];
    // console.log(i, next);
    if (next.to == 'end') {
      // console.log('++++++++++end~~', [...usedPaths, current, 'end']);
      count++;
    } else if (
      next.lowercase && countSmallCaves(usedPaths, next.to) 
      || next.lowercase && countSmallCaves([...usedPaths, current], next.to) 
      || current[0].toLowerCase() == current[0] && countSmallCaves(usedPaths, current)
    ) {
      // skip, small cave and already visited
      // console.log('-----skip', { next });
    } else {
      // console.log('go deeper', { next });
      count += search(next.to, [...usedPaths, current], level + 1);
    }
  }
  // console.log(current, 'return', count);
  return count;
}

const total = search('start', [], 1);

console.log('Ats2:', total);

// Check 219473;  your answer is too high
// Check 109739   your answer is too high.
// Check 91292    That's the right answer!
