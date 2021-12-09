const fs = require('fs');

const day = '08';

const input = fs.readFileSync(`${day}.txt`, 'utf-8');

const data = input.split(/\n/);//.map(i => parseInt(i));

const digits = [];
const four = [];

for (let i = 0; i < data.length; i++) {
  const info = data[i].split(' | ');
  digits.push(info[0]);
  four.push(info[1]);
}

console.log({ data, digits, four })

let count = 0;

for (let i = 0; i < four.length; i++) {
  const info = four[i].split(' ');
  for (let j = 0; j < info.length; j++) {
    const len = info[j].length;
    if (len == 2 || len == 3 || len == 4 || len == 7) {
      count++;
    }
  }
}

console.log('ats1:', count);

const left = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab';
const right = 'cdfeb fcadb cdfeb cdbaf';

const leftArr = left.split(' ');
const rightArr = right.split(' ');
console.log({ leftArr, rightArr });

const diff = (one, two) => {
  const a = [...one];
  let res = '';
  for (let i = 0; i < a.length; i++) {
    if (!two.includes(a[i])) {
      res += a[i];
    }
  }
  return res;
}

const decode = (info) => {
  let decoder = {};
  const infoArr = info.split(' ');
  const one = infoArr.find((data) => data.length == 2);
  const seven = infoArr.find((data) => data.length == 3);
  const four = infoArr.find((data) => data.length == 4);
  const eight = infoArr.find((data) => data.length == 7);
  
  const zeroSixNine = infoArr.filter((data) => data.length == 6);
  // const twoThreeFive = infoArr.filter((data) => data.length == 5);

  const six = zeroSixNine.find((data) => !data.includes(one[0]) || !data.includes(one[1]));
  const fourMinusOne = diff(four, one);
  // console.log({ fourMinusOne });
  const zero = zeroSixNine.find((data) => data != six && (!data.includes(fourMinusOne[0]) || !data.includes(fourMinusOne[1])));
  const nine = zeroSixNine.find((data) => data != six && data != zero);
  // console.log({one, seven, four, eight});
  // console.log({zeroSixNine, twoThreeFive});
  // console.log({ zero, six, nine });

  decoder.a = diff(seven, one);
  decoder.d = diff(eight, zero);
  decoder.e = diff(eight, nine);
  decoder.c = diff(eight, six);
  decoder.f = diff(seven, decoder.a + decoder.c);
  decoder.g = diff(eight, four + decoder.a + decoder.e);
  decoder.b = diff(four, one + decoder.d);
  return decoder;
}

const decodeArr = decode(left);
console.log({ decodeArr });

const matches = (guess, number) => {
  if (guess.length != number.length) {
    return false;
  }
  for (let i = 0; i < guess.length; i++) {
    if (!number.includes(guess[i])) {
      return false;
    }
  }
  return true;
}

const getNumber = (info, d) => {
  let res = 0;
  const infoArr = info.split(' ');
  const nums = [
    d.a + d.b + d.c + d.e + d.f + d.g,
    d.c + d.f,
    d.a + d.c + d.d + d.e + d.g,
    d.a + d.c + d.d + d.f + d.g, //3
    d.b + d.d + d.c + d.f,
    d.a + d.b + d.d + d.f + d.g, //5
    d.a + d.b + d.d + d.e + d.f + d.g, //6
    d.a + d.c + d.f,
    d.a + d.b + d.c + d.d + d.e + d.f + d.g, //8
    d.a + d.b + d.c + d.d + d.f + d.g //9
  ];
  for (let i = 0; i < infoArr.length; i++) {
    res = res * 10 + nums.findIndex((num) => matches(infoArr[i], num));
  }
  return res;
}

const num = getNumber(right, decodeArr);
console.log({ num });

let sum = 0;

for (let i = 0; i < digits.length; i++) {
  const decoder = decode(digits[i]);
  const number = getNumber(four[i], decoder);
  console.log(i, number);
  sum += number;
}

console.log('ats2:', sum);
