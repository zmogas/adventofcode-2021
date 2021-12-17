const fs = require('fs');

const day = '15';

const input = fs.readFileSync(`${day}.txt`, 'utf-8');
const lines = input.split(/\n/);

const chiton = [];

for (let y = 0; y < lines.length; y++) {
  const chit = lines[y].split('').map(c => parseInt(c));
  chiton.push(chit);
}

let max = chiton.length - 1;

console.log({ chiton, max });

const multiply = 5;
// i desine
for (let i = 2; i <= multiply; i++) {
  for (let y = 0; y <= max; y++) {
    for (let x = 0; x <= max; x++) {
      let newVal = chiton[y][x] + i - 1;
      if (newVal > 9) {
        newVal = newVal % 9;
      }
      chiton[y].push(newVal);
    }
  }
}

// zemyn
for (let i = 2; i <= multiply; i++) {
  for (let y = 0; y <= max; y++) {
    chiton.push([]);
    const yy = chiton.length - 1;
    for (let x = 0; x < chiton[y].length; x++) {
      let newVal = chiton[y][x] + i - 1;
      if (newVal > 9) {
        newVal = newVal % 9;
      }
      chiton[yy].push(newVal);
    }
  }
}

max = (max + 1) * multiply - 1;
console.log({max});
for (let y = 0; y < chiton.length; y++) {
  let line = '';
  for (let x = 0; x < chiton[y].length; x++) {
    line += chiton[y][x];
  }
  console.log(line);
}

let graph = {};

// max = 60;

for (let y = 0; y <= max; y++) {
  for (let x = 0; x <= max; x++) {
    const name = `${x}-${y}`;
    graph[name] = {};
    // Kairen
    if (x > 0) {
      graph[name][`${x-1}-${y}`] = chiton[y][x-1];
    }
    // Desinen
    if (x < max) {
      graph[name][`${x+1}-${y}`] = chiton[y][x+1];
    }
    // Aukstyn
    if (y > 0) {
      graph[name][`${x}-${y-1}`] = chiton[y-1][x];
    }
    // Zemyn
    if (y < max) {
      graph[name][`${x}-${y+1}`] = chiton[y+1][x];
    }
  }
}

// console.log(graph);

let shortestDistanceNode = (distances, visited) => {
  // create a default value for shortest
  let shortest = null;

  // for each node in the distances object
  for (let node in distances) {
    // if no node has been assigned to shortest yet
    // or if the current node's distance is smaller than the current shortest
    let currentIsShortest =
      shortest === null || distances[node] < distances[shortest];

    // and if the current node is in the unvisited set
    if (currentIsShortest && !visited.includes(node)) {
      // update shortest to be the current node
      shortest = node;
    }
  }
  return shortest;
};

let findShortestPath = (graph, startNode, endNode) => {

  // track distances from the start node using a hash object
  let distances = {};
  distances[endNode] = "Infinity";
  distances = Object.assign(distances, graph[startNode]);
  // track paths using a hash object
  let parents = {
    endNode: null
  };
  for (let child in graph[startNode]) {
    parents[child] = startNode;
  }

  // collect visited nodes
  let visited = [];
  // find the nearest node
  let node = shortestDistanceNode(distances, visited);

  // for that node:
  while (node) {
    // find its distance from the start node & its child nodes
    let distance = distances[node];
    let children = graph[node];

    // for each of those child nodes:
    for (let child in children) {

      // make sure each child node is not the start node
      if (String(child) === String(startNode)) {
        continue;
      } else {
        // save the distance from the start node to the child node
        let newdistance = distance + children[child];
        // if there's no recorded distance from the start node to the child node in the distances object
        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
        if (!distances[child] || distances[child] > newdistance) {
          // save the distance to the object
          distances[child] = newdistance;
          // record the path
          parents[child] = node;
        }
      }
    }
    // move the current node to the visited set
    visited.push(node);
    // move to the nearest neighbor node
    node = shortestDistanceNode(distances, visited);
    if (visited.length % 1000 == 0) {
      console.log('Visited count', visited.length, 'next:', node);
    }
  }

  // using the stored paths from start node to end node
  // record the shortest path
  let shortestPath = [endNode];
  let parent = parents[endNode];
  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  shortestPath.reverse();

  //this is the shortest path
  let results = {
    distance: distances[endNode],
    path: shortestPath,
  };
  // return the shortest path & the end node's distance from the start node
  return results;
};

let end = `${max}-${max}`;
console.log(findShortestPath(graph, "0-0", end));
