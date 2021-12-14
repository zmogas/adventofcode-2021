const fs = require('fs');

const day = '14';

const input = fs.readFileSync(`${day}.txt`, 'utf-8');

const lines = input.split(/\n/);

let template = lines[0];

const insPairs = [];

for (let i = 2; i < lines.length; i++) {
  const matches = lines[i].split(/(\D\D) -> (\D)/);
  insPairs.push({ pair: matches[1], ins: matches[2] });
}

console.log({ template, insPairs });

/*
const doStep = () => {
  const needInsert = [];
  for (let i = 0; i < template.length - 1; i++) {
    const chunk = template.substring(i, i + 2);
    const need = pairs.find((pair) => pair.pair == chunk);
    // console.log({ chunk, need });
    if (need) {
      needInsert.push({ pos: i + 1, char: need.ins })
    }
  }
  // console.log({ needInsert });

  let newTemplate = '';
  for (let i = 0; i < template.length; i++) {
    const ins = needInsert.find((need) => i == need.pos);
    // console.log({ ins });
    if (ins) {
      newTemplate += ins.char;
    }
    newTemplate += template[i];
  }

  template = newTemplate;
}

for (let step = 1; step < 41; step++) {
  doStep();
  console.log({ step, template });
}

let charMap = {}

for(let char of template) {
   if(charMap.hasOwnProperty(char)){
      charMap[char]++
   } else {
     charMap[char] = 1
   }
}

console.log({ charMap });

let min = 99999;
let max = 0;

for (let [key, val] of Object.entries(charMap)) {
  min = Math.min(min, val);
  max = Math.max(max, val);
}

console.log('Ats1:', max - min);
*/

let pairs = {};

for (let i = 0; i < template.length - 1; i++) {
  pairs[template.substring(i, i + 2)] =  1;
}

const step2 = () => {
  const willInsert = [];
  const willRemove = [];
  for (const [key, val] of Object.entries(pairs)) {
    // console.log({ key, val });
    const need = insPairs.find((pair) => pair.pair == key);
    if (need) {
      willInsert.push({ key: need.pair[0] + need.ins, val: val });
      willInsert.push({ key: need.ins + need.pair[1], val: val });
      willRemove.push(key);
    }
  }
  console.log({willInsert, willRemove});
  for (let i = 0; i < willRemove.length; i++) {
    pairs[willRemove[i]] = 0;
  }
  for (let i = 0; i < willInsert.length; i++) {
    // console.log(willInsert[i], pairs[willInsert[i].key])
    if (pairs[willInsert[i].key]) {
      pairs[willInsert[i].key] += willInsert[i].val;
    } else {
      pairs[willInsert[i].key] = willInsert[i].val;
    }
  }
}

for (let step = 1; step <= 40; step++) {
  step2();
  // console.log({ step, pairs });
}

const letters = {};

for (const [key, val] of Object.entries(pairs)) {
  if (letters[key[0]]) {
    letters[key[0]] += val;
  } else {
    letters[key[0]] = val;
  }
  // if (letters[key[1]]) {
  //   letters[key[1]] += val;
  // } else {
  //   letters[key[1]] = val;
  // }
}

let min = Object.entries(letters)[0][1];
let max = 0;

for (const [char, num] of Object.entries(letters)) {
  min = Math.min(min, num);
  max = Math.max(max, num);
}
console.log({ pairs, letters, min, max });
console.log('Ats2:', max - min);

// 2422444761282  your answer is too low.
// 2422444761283