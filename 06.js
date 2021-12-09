const fs = require('fs');

const day = '06d';

const input = fs.readFileSync(`${day}.txt`, 'utf-8');

const fish = input.split(',').map(i => parseInt(i));

let days = 18;

for (let d = 1; d <= days; d++) {
  for (let i = 0; i < fish.length; i++) {
    fish[i] -= 1;
    if (fish[i] < 0) {
      fish[i] = 6;
      fish.push(9);
    }
  }

  console.log(d, 'days', fish.length, fish);
}

const fish2 = input.split(',').map(i => parseInt(i));

let total2 = fish2.length;

let created = 0;

for (let j = 0; j < fish2.length; j++) {
  let x = fish2[j] - days;
  console.log(x, -1 * x / 7);
  created += parseInt(-1 * x / 7);
}

const total = (days, newFish) => {
  let newDays = days - 2;
  if (newDays < 0) {
    return 0;
  }
  let newCreated = parseInt(newDays / 7) * newFish;
  return newCreated + total(newDays, newCreated);
}

const rec = total(days, created);
console.log({ days, total2, created, rec });
