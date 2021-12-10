const fs = require('fs');

const day = '10';

const input = fs.readFileSync(`${day}.txt`, 'utf-8');

const lines = input.split(/\n/);
// console.log({lines});

const checkLine = (line) => {
  const delimiters = [];
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (['(', '[', '{', '<'].includes(char)) {
      delimiters.push(char);
    } else {
      const opening = delimiters.pop();
      if (char == ')' && opening != '(') {
        return 3;
      }
      if (char == ']' && opening != '[') {
        return 57;
      }
      if (char == '}' && opening != '{') {
        return 1197;
      }
      if (char == '>' && opening != '<') {
        return 25137;
      }
      // console.log('Good', opening, char);
    }
  }
  // console.log({delimiters});
  return 0;
}

let score = 0;
for (let i = 0; i < lines.length; i++) {
  score += checkLine(lines[i]);
}

console.log('Ats 1:', score);
console.log();

const checkLine2 = (line) => {
  const delimiters = [];
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (['(', '[', '{', '<'].includes(char)) {
      delimiters.push(char);
    } else {
      const opening = delimiters.pop();
      if (char == ')' && opening != '(') {
        return 0;
      }
      if (char == ']' && opening != '[') {
        return 0;
      }
      if (char == '}' && opening != '{') {
        return 0;
      }
      if (char == '>' && opening != '<') {
        return 0;
      }
    }
  }

  let score = 0;
  let closing = '';
  while (delimiters.length > 0) {
    const char = delimiters.pop();
    closing += char;
    let add = 0;
    switch (char) {
      case '(': add = 1; break;
      case '[': add = 2; break;
      case '{': add = 3; break;
      case '<': add = 4; break;
    }
    score = score * 5 + add;
  }
  console.log(closing, score);
  return score;
}

const scores = [];
for (let i = 0; i < lines.length; i++) {
  const total = checkLine2(lines[i]);
  if (total > 0) {
    scores.push(total);
  }
}
console.log({scores});
const sorted = scores.sort((a, b) => a == b ? 0 : a > b ? -1 : 1);
console.log('sorted:', sorted, parseInt(sorted.length / 2))
const answer = sorted[ parseInt(sorted.length / 2) ]

console.log('Ats 2:', answer);

