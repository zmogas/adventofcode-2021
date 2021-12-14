const fs = require('fs');

const day = '14';

const input = fs.readFileSync(`${day}.txt`, 'utf-8');

const lines = input.split(/\n/);

let template = lines[0];

const pairs = [];

for (let i = 2; i < lines.length; i++) {
  const matches = lines[i].split(/(\D\D) -> (\D)/);
  pairs.push({ pair: matches[1], ins: matches[2] });
}

console.log({ template, pairs });

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

for (let step = 1; step < 11; step++) {
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
