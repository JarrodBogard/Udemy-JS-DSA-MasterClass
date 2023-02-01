// Section 28: Dijkstra's Algorithm

// Lesson #233: Who was Dijkstra and what is his Algorithm?

// What is it?
// One of the most famous and widely used algorithms around. It finds the shortest path between two vertices on a graph. It answers the question, "What's the fastest way to get from point A to point B(from one point to another)?". Many tech companies build on top of Dijkstra's shortest path algo to build out their applications/programs - e.g. Google Maps/Apple Maps.

// Who was he?
// Edsger Dijkstra was a Dutch programmer, physicist, essayist, and all around smarty-pants. He helped to advance the field of computer science from an "art" to an academic discipline. Many of his discoveries and algorithms are still commonly used to this day.

// A quote on how he came up with his algorithm:
// What is the shortest way to travel from Rotterdam to Groningen, in general: from given city to given city. It is the algorithm for the shortest path, which I designed in about twenty minutes. One morning I was shopping in Amsterdam with my young fiancée, and tired, we sat down on the café terrace to drink a cup of coffee and I was just thinking about whether I could do this, and I then designed the algorithm for the shortest path. As I said, it was a twenty-minute invention. Eventually that algorithm became, to my great amazement, one of the cornerstones of my fame.
// — Edsger Dijkstra, in an interview with Philip L. Frana, Communications of the ACM, 2001[2]

// Why is it useful?
// 1) GPS - finding fastest route
// 2) Network Routing - finds open shortest path for data
// 3) Biology - used to model the spread of viruses among humans
// 4) Airline tickets - finding cheapest route to your destination
// Many other uses...

// Lesson #234 Writing a Weighted Graph (see class WeightedGraph below)

// Lesson #235 Walking through the Algorithm

// The approach:
// 1) Every time we look to visit a new node, we pick the node with the smallest known distance to visit first.
// 2) Once we’ve moved to the node we’re going to visit, we look at each of its neighbors.
// 3) For each neighboring node, we calculate the distance by summing the total edges that lead to the node we’re checking from the starting node.
// 4) If the new total distance to a node is less than the previous total, we store the new shorter distance for that node.

// Lesson #236 Introducing Our Simple Priority Queue (see class PriorityQueue below)

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(v1, v2, weight) {
    if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
      this.adjacencyList[v1].push({ vertex: v2, weight });
      this.adjacencyList[v2].push({ vertex: v1, weight });
    }
  }

  dijkstra(startingVertex, endingVertex) {
    const nodes = new OptPriorityQueue(); // faster PriorityQueue using binary heap, time complexity: O(log n)
    // const nodes = new PriorityQueue(); // slower PriorityQueue using sort method, time complexity: O(n * log n)
    const distances = {};
    const previous = {};
    let path = []; // return value at end of algo
    let smallest;

    // build initial state of nodes, distances, previous //
    for (let vertex in this.adjacencyList) {
      if (vertex === startingVertex) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    // as long as there is something to traverse //
    while (nodes.values.length) {
      smallest = nodes.dequeue(startingVertex).val;
      // if we find the answer //
      if (smallest === endingVertex) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }

      // should this be && instead of ||??? //
      if (smallest || distances[smallest] !== Infinity) {
        // find neighboring node //
        for (let neighbor in this.adjacencyList[smallest]) {
          let nextNeighbor = this.adjacencyList[smallest][neighbor];
          // calculate new distance to neighboring node //
          let candidateDistance = distances[smallest] + nextNeighbor.weight;
          // let nextNeighborVertex = nextNeighbor.vertex
          if (candidateDistance < distances[nextNeighbor.vertex]) {
            // updating new smallest distance to neighbor //
            distances[nextNeighbor.vertex] = candidateDistance;
            //   updating how we traversed the graph to get the new smallest distance to neighbor //
            previous[nextNeighbor.vertex] = smallest;
            //   enqueue into the priority queue with the new priority level //
            nodes.enqueue(nextNeighbor.vertex, candidateDistance);
          }
        }
      }
    }
    return path.concat(smallest).reverse();
  }
}

// Lesson #239 Upgrading the Priority Queue

class OptPriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    let newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  // because of sorting after each new input, the time complexity is O(n * log n) - (the sort itself is O(n * log n)???)
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

const weightedGraph = new WeightedGraph();
weightedGraph.addVertex("A");
weightedGraph.addVertex("B");
weightedGraph.addVertex("C");

weightedGraph.addEdge("A", "B", 9);
weightedGraph.addEdge("A", "C", 5);
weightedGraph.addEdge("B", "C", 7);
weightedGraph.addEdge("B", "Q", 7);
weightedGraph.addEdge("Q", "A", 7);

// console.log(weightedGraph.adjacencyList);

const priorityQueue = new PriorityQueue();
priorityQueue.enqueue("B", 3);
priorityQueue.enqueue("C", 5);
priorityQueue.enqueue("D", 2);
priorityQueue.enqueue("Q", 20);
priorityQueue.enqueue("P", 1.5);
// console.log(priorityQueue.dequeue());
// console.log(priorityQueue.dequeue());
// console.log(priorityQueue.values);

// Lesson #238 Implementing Dijkstra's Algorithm
const graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);

// console.log(graph.adjacencyList, "vertices list");

console.log(graph.dijkstra("A", "E"));
// ["A", "C", "D", "F", "E"]

console.log(graph.dijkstra("A", "F"));
// ['A', 'C', 'D', 'F']

console.log(graph.dijkstra("A", "D"));
// ['A', 'C', 'D']
