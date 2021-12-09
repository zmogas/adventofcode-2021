const fs = require('fs');

const day = '03';

const input = fs.readFileSync(`${day}.txt`, 'utf-8');

// console.log({ input });
const lines = input.split('\n');
// console.log(lines.length, {lines})

const len = lines[0].length;

let gamma = '';
let epsilon = '';

for (let i = 0; i < len; i++) {
  let zero = 0;
  let one = 0;
  for (let j = 0; j < lines.length; j++) {
    if (lines[j][i] == '0') {
      zero++;
    } else {
      one++;
    }
  }
  gamma += (zero > one) ? '0' : '1';
  epsilon += (zero < one) ? '0' : '1';
}
const gammaDec = parseInt(gamma, 2);

const epsilonDec = parseInt(epsilon, 2);

console.log({ gamma, epsilon });
console.log('Ats 1:', { gammaDec, epsilonDec }, gammaDec*epsilonDec)

let oxygenArr = lines;
let scrubberArr = lines;

for (let i = 0; i < len; i++) {
  if (oxygenArr.length > 1) {
    let zero = 0;
    let one = 0;
    for (let j = 0; j < oxygenArr.length; j++) {
      if (oxygenArr[j][i] == '0') {
        zero++;
      } else {
        one++;
      }
    }
  
    const oxygenNew = [];
    oxygenArr.map((line) => {
      // console.log({ i, line, one, zero })
      if (one >= zero) {
        if (line[i] == '1') {
          oxygenNew.push(line);
        }
      } else {
        if (line[i] == '0') {
          oxygenNew.push(line);
        }
      }
    });
    oxygenArr = oxygenNew;
  }

  if (scrubberArr.length > 1) {
    let zero = 0;
    let one = 0;
    for (let j = 0; j < scrubberArr.length; j++) {
      if (scrubberArr[j][i] == '0') {
        zero++;
      } else {
        one++;
      }
    }
  
    const scrubberNew = [];
    scrubberArr.map((line) => {
      if (one >= zero) {
        if (line[i] == '0') {
          scrubberNew.push(line);
        }
      } else {
        if (line[i] == '1') {
          scrubberNew.push(line);
        }
      }
    });
    scrubberArr = scrubberNew;
  }
}

console.log({ oxygenArr, scrubberArr })
const oxygen = parseInt(oxygenArr[0], 2);

const scrubber = parseInt(scrubberArr[0], 2);

console.log('Ats 2:', { oxygen, scrubber }, oxygen*scrubber)
