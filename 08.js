const fs = require('fs');

const day = '08d';

const input = fs.readFileSync(`${day}.txt`, 'utf-8');

const data = input.split(',').map(i => parseInt(i));

