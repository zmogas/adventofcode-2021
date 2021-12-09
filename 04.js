const fs = require('fs');
const { exit } = require('process');

const day = '04';

const input = fs.readFileSync(`${day}.txt`, 'utf-8');

const lines = input.split('\n');

const winners = [];

const numbers = [];
lines[0].split(',').map((num) => numbers.push(parseInt(num)));
console.log({numbers});

const boards = [];

let i = 2;
while (i < lines.length) {
  const board = [];
  for (let j = 0; j < 5; j++) {
    const line = lines[i + j].trim().split(/\s+/);
    const nums = [];
    for (let k = 0; k < line.length; k++) {
      nums.push(parseInt(line[k]));
    }
    board.push(nums);
  }
  console.log({ board });
  boards.push(board);
  i = i + 6;
}

const boardWon = (board) => {
  // console.log('boardWon', board);
  for (let i = 0; i < board.length; i++) {
    let countX = 0;
    let countY = 0;
    for (let j = 0; j < board[i].length; j++) {
      // console.log('bw', i, j, board[i][j], board[j][i])
      if (parseInt(board[i][j]) < 0) {
        countX++;
      }
      if (parseInt(board[j][i]) < 0) {
        countY++;
      }
    }
    if (countX == board[i].length || countY == board[i].length) {
      return true;
    }
  }
  return false;
}

let won = false;
for (let i = 0; i < numbers.length; i++) {
  for (let j = 0; j < boards.length; j++) {
    for (let x = 0; x < boards[j].length; x++) {
      for (let y = 0; y < boards[j][x].length; y++) {
        if (!winners.includes(j) && boards[j][x][y] == numbers[i]) {
          boards[j][x][y] = -1 * boards[j][x][y] - 1000;
        }
      }
    }
  }
  // console.log(i, numbers[i], boards.length);
  for (let j = 0; j < boards.length; j++) {
    // console.log('check', j, winners.includes(j) ? 'skip' : 'tikrinsiu')
    if (!winners.includes(j) && boardWon(boards[j])) {
      console.log('Board won', j);
      winners.push(j);
      // won = true;
      let score = 0;
      for (let x = 0; x < boards[j].length; x++) {
        for (let y = 0; y < boards[j][x].length; y++) {
          if (boards[j][x][y] >= 0) {
            score += boards[j][x][y];
          }
        }
      }
  
      console.log('Winning number', numbers[i], score, 'ats 1', numbers[i] * score)
      // break;
    }
  }

  if (won) {
    break;
  }
}

// console.log('Ats 1:')