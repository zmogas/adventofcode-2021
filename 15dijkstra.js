const fs = require('fs');

const day = '15d';

const input = fs.readFileSync(`${day}.txt`, 'utf-8');
const lines = input.split(/\n/);

const chiton = [];

for (let y = 0; y < lines.length; y++) {
  const chit = lines[y].split('').map(c => parseInt(c));
  chiton.push(chit);
}

let max = chiton.length - 1;

console.log({ chiton, max });

const nodes = [];
let adjacency = {};
const collection = [];

const addNode = (node) => {
  nodes.push(node);
  adjacency[node] = [];
};

const addEdge = (node1, node2, weight) => {
  adjacency[node1].push({ node: node2, weight });
  // adjacency[node2].push({ node: node1, weight });
};

const isEmpty = () => collection.length == 0;

const enqueue = (element) => {
  if (isEmpty()) {
    collection.push(element);
  } else {
    let added = false;
    for (let i = 1; i <= collection.length; i++) {
      if (element[1] < collection[i-1][1]) {
        collection.splice(i-1, 0, element);
        added = true;
        break;
      }
    }
    if (!addEdge) {
      collection.push(element);
    }
  }
};

const dequeue = () => {
  let value = collection.shift();
  return value;
};

// addNode('0-0');
// addNode('0-1');
// addEdge('0-0', '0-1', chiton[1][0]);
// addNode('1-0');
// addEdge('0-0', '1-0', chiton[0][1]);
// return;
// max = 4;

for (let y = 0; y <= max; y++) {
  for (let x = 0; x <= max; x++) {
    addNode(`${x}-${y}`);
    if (y > 0) {
      addEdge(`${x}-${y-1}`, `${x}-${y}`, chiton[y][x]);
      addEdge(`${x}-${y}`, `${x}-${y-1}`, chiton[y-1][x]);
    }
    if (x > 0) {
      addEdge(`${x-1}-${y}`, `${x}-${y}`, chiton[y][x]);
      addEdge(`${x}-${y}`, `${x-1}-${y}`, chiton[y][x-1]);
    }
  }
}

console.log(nodes, adjacency);

const startNode = '0-0';

let times = {};
let backtrace = {};

times[startNode] = 0;
nodes.forEach(node => {
  if (node != startNode) {
    times[node] = Infinity;
  }
});

enqueue([startNode, 0]);
// enqueue(['0-3', 5]);
// enqueue(['2-3', 5]);

while (!isEmpty()) {
  let shortestStep = dequeue();
  let currentNode = shortestStep[0];
  // console.log({shortestStep});

  adjacency[currentNode].forEach(neighbor => {
    // console.log({neighbor});
    let time = times[currentNode] + neighbor.weight;

    if (time < times[neighbor.node] || times[neighbor.node] == Infinity) {
      times[neighbor.node] = time;
      backtrace[neighbor.node] = currentNode;
      enqueue([neighbor.node, time]);
    }
  });
}

console.log(times);

// enqueue(['0-3', 5]);
// // enqueue(['2-3', 999]);

// while (!isEmpty()) {
//   let shortestStep = dequeue();
//   let currentNode = shortestStep[0];
//   // console.log({shortestStep});

//   adjacency[currentNode].forEach(neighbor => {
//     // console.log({neighbor});
//     let time = times[currentNode] + neighbor.weight;

//     if (time < times[neighbor.node] || times[neighbor.node] == Infinity) {
//       times[neighbor.node] = time;
//       backtrace[neighbor.node] = currentNode;
//       enqueue([neighbor.node, time]);
//     }
//   });
// }

// console.log(times);

// console.log(backtrace);
console.log();
console.log('Time table');
for (let y = 0; y <= max; y++) {
  let line = '';
  for (let x = 0; x <= max; x++) {
    let t = times[`${x}-${y}`];
    if (t < Infinity) {
      line += (t + '')[0];
    } else {
      line += '.';
    }
  }
  console.log(line);
}
