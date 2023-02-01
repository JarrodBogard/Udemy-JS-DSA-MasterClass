// Section 26: Graphs

// Lesson #207: Intro to Graphs

// What are graphs?
// A graph data structure consists of a finite (and possibly mutable) set of vertices or nodes or points, together with a set of unordered pairs(connections) of these vertices for an undirected graph or a set of ordered pairs(connections) for a directed graph.
//      - Basically, a collection of nodes with connections between those nodes.
//      - A tree is a type of a graph, but unlike a tree, graphs in general have no parent node, or starting(root) node, there is no entry point. They are all just nodes without levels of hierarchy, that can be connected in different ways and those connections can mean different things.
//      - A tree is an undirected graph in which any two vertices(nodes) are connected by exactly one path(edge).
//              - There is only one path from a given node to another.

// Lesson #208: Uses for Graphs

// Different uses for graphs:
// 1) Social Networks - targeted advertising, suggestions/recommendations
//      - e.g. "you might also like..."
// 2) Location / Mapping
// 3) Routing Algorithms
// 4) Visual Hierarchy
// 5) File System Optimizations
// 6) Everywhere

// Leson #209: Types of Graphs

// Undirected graph - There is no direction associated with an edge. (two-way connection between any given nodes???)
//      - e.g. facebook connections between friends(basic user accounts).

// Directed graph - There is polarity(direction) associated with an edge. There is a direction assigned to the edge. It can be either bi-directional or one-way between any given vertices(nodes).
//      - e.g. Instagram and Twitter follows. (default follow functionality)

// Unweighted graph - The edges have no associated value(magnitude) on them. (no info about the connection(edge))

// Weighted graph - The edges have an associated value(magnitude) on them. (info about the connection(edge))
//      - e.g. Google maps (directions and distances between points)
//      - When traversing or when computing the shortest path between two vertices, for example, we would use these values.

// Lesson #210 Storing Graphs: Adjacency Matrix

// A two-dimensional structure, usually implemented with nested arrays, but not always. Basically, it stores information in rows and columns - for graphs, we could represent the connections(edges) between nodes(vertices) using a matrix.

// Lesson #211: Storing Graphs: Adjacency List

// Can use an array or hash table, depending on the type of data, to store the edges of a given node(vertex) in a nested array.

// Lesson #212: Adjacency Matrix Vs. Adjacency List - BIG O

// |V| - number of vertices
// |E| - number of edges

// OPERATION	    ADJACENCY LIST	ADJACENCY MATRIX
// Add Vertex	         O(1)	        ​O(|V^2|)
// Add Edge	             O(1)	          O(1)
// Remove Vertex     O(|V| + |E|)	    ​O(|V^2|)
// Remove Edge	        O(|E|)	          O(1)
// Query	         O(|V| + |E|)	      O(1)
// Storage	         O(|V| + |E|)	    ​O(|V^2|)

// Adjacency List (edge-focused???)
// 1) Can take up less space (in sparse graphs) - stores only the edges for each new vertex added.
// 2) Faster to iterate over all edges.
// 3) Can be slower to lookup specific edge.

// Adjacency Matrix (vertex-focused???)
// 1) Takes up more space (in sparse graphs) - has to create an entire row and column for every new vertex added.
// 2) Slower to iterate over all edges.
// 3) Faster to lookup specific edge.
// 4) Easier implementation.

// Most data in the real-world tends to lend itself to sparser and/or larger graphs - Adjacency list is the better option.

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(v1, v2) {
    // in a directed graph the param order would matter but in undirected graphs it does not.
    this.adjacencyList[v1] && this.adjacencyList[v1].push(v2); // using both statements makes this an undirected graph.
    this.adjacencyList[v2] && this.adjacencyList[v2].push(v1); // using only one of these statements makes it a directed graph.
  }

  removeEdge(v1, v2) {
    if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
      this.adjacencyList[v1] = this.adjacencyList[v1].filter((v) => v !== v2);
      this.adjacencyList[v2] = this.adjacencyList[v2].filter((v) => v !== v1);
    }
  }

  removeVertex(vertex) {
    if (this.adjacencyList[vertex]) {
      while (this.adjacencyList[vertex].length) {
        const adjacentVertex = this.adjacencyList[vertex].pop();
        console.log(adjacentVertex);
        this.removeEdge(vertex, adjacentVertex);
      }
      delete this.adjacencyList[vertex];
    }
  }

  removeVertexLoop(vertex) {
    if (this.adjacencyList[vertex]) {
      for (let edge of this.adjacencyList[vertex]) {
        this.removeVertex(vertex, edge);
      }
      delete this.adjacencyList[vertex];
    }
  }

  dfsRecursive(startingVertex) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;
    if (!adjacencyList[startingVertex]) return null;

    (function dfs(vertex) {
      visited[vertex] = true;
      result.push(vertex);
      adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) dfs(neighbor);
      });
    })(startingVertex);
    console.log(visited);
    return result;
  }

  dfsIterative(startingVertex) {
    if (!this.adjacencyList[startingVertex]) return null;
    const stack = [startingVertex];
    const visited = {};
    const result = [];
    let vertex;

    visited[startingVertex] = true;

    while (stack.length) {
      console.log(stack);
      vertex = stack.pop();
      result.push(vertex);
      this.adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }
    console.log(visited);
    return result;
  }

  dfsIterativeAlt(startingVertex) {
    if (!this.adjacencyList[startingVertex]) return null;
    const stack = [startingVertex];
    const visited = {};
    const result = [];
    let vertex;

    while (stack.length) {
      console.log(stack);
      vertex = stack.pop();
      if (!visited[vertex]) {
        visited[vertex] = true;
        result.push(vertex);
        this.adjacencyList[vertex].forEach((neighbor) => stack.push(neighbor));
      }
    }
    console.log(visited);
    return result;
  }

  bfsIterative(startingVertex) {
    if (!this.adjacencyList[startingVertex]) return null;

    let queue = [startingVertex];
    let visited = {};
    let result = [];
    let vertex;

    visited[startingVertex] = true;

    while (queue.length) {
      vertex = queue.shift();
      result.push(vertex);
      this.adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    console.log(visited);
    return result;
  }

  bfsIterativeAlt(startingVertex) {
    if (!this.adjacencyList[startingVertex]) return null;

    let queue = [startingVertex];
    let visited = {};
    let result = [];
    let vertex;

    while (queue.length) {
      vertex = queue.shift();
      if (!visited[vertex]) {
        visited[vertex] = true;
        result.push(vertex);
        // this.adjacencyList[vertex].forEach((neighbor) => queue.push(neighbor));
        this.adjacencyList[vertex]
          .slice()
          .reverse()
          .forEach((neighbor) => queue.push(neighbor));
      }
    }
    console.log(visited);
    return result;
  }

  bfsRecursive(startingVertex) {
    // is this truly recursive
    const queue = [startingVertex];
    const visited = {};
    const results = [];
    let vertex;
    let helper;

    visited[startingVertex] = true;

    (helper = () => {
      if (queue.length) {
        vertex = queue.shift();
        results.push(vertex);
        this.adjacencyList[vertex].forEach((n) => {
          if (!visited[n]) {
            visited[n] = true;
            queue.push(n);
          }
        });
        helper();
      }
    })();

    return results;
  }
}

// const graph = new Graph();
// graph.addVertex("Dallas");
// graph.addVertex("Tokyo");
// graph.addVertex("Aspen");
// graph.addVertex("Los Angeles");
// graph.addVertex("Hong Kong");
// graph.addEdge("Dallas", "Tokyo");
// graph.addEdge("Dallas", "Aspen");
// graph.addEdge("Dallas", "Hong Kong");
// graph.addEdge("Los Angeles", "Hong Kong");
// graph.addEdge("Los Angeles", "Aspen");
// graph.addEdge("Tokyo", "Hong Kong");
// graph.removeVertex("Hong Kong");
// graph.removeVertexLoop("Los Angeles");
// graph.removeEdge("Dallas", "Aspen");
// graph.removeEdge("Dallas", "Tokyo");
// graph.AdjacencyList["Dallas"].push("Greenville Avenue");
// graph.addVertex("Dallas"); // can't override due to conditional in addVertex method.
// console.log(graph);

// Section 27: Graph Traversal

// Lesson #222: Intro to Graph Traversal

// Graph Traversal Uses:
// 1) Peer to peer networking
// 2) Web crawlers
// 3) Finding "closest" matches/recommendations
// 4) Shortest path problems:
//      - GPS Navigation
//      - Solving mazes
//      - AI (shortest path to win the game)

// Lesson #223: Depth First Graph Traversal

// The general idea behind depth and breadth first approaches to traversal is what's important to focus on here. When we say depth first for a binary search tree, or any tree for that matter, it means that we're focusing/prioritizing traversing(searching) children of a given node before we visit its siblings, or put differently, we deepen the traversal before we widen it. This means that it doesn't really matter whether we're traversing left or right first, just that we are picking a side to traverse and going down the entire branch of the graph or tree before we "backtrack".
//      - In a graph - specifically when looking at a graph - it can be difficult to distinguish/understand what depth means versus what breadth means, because of the layout of the graph structure and the relationships between the vertices and the edges, whereas, when using a depth first approach on a tree, there is a clear path/direction down the tree starting from the root node.

// Summary:
// In graph traversal, the depth first approach just means following the unsearched neighbors(vertices) and continuing to follow unsearched neighbors(vertices) before "backtracking" to previously searched neighbors(vertices) to find any remaining unsearched neighbors(vertices) - the terms search and traversal are being used interchangeably here.
//      - Just think of it as we traverse a node, and then we traverse one of its neighbor's, and then we traverse one of its neighbor's, and so on...until all the neighbors for all the nodes have been traversed and there are no more vertices to traverse in the graph.

// Lesson #228 Breadth First Graph Traversal

// Breadth first traversal involves visiting/traversing all neighbors at a given depth before moving down to the next level(height) of vertices (at a lower depth???).
//      - height equates to levels of depth for vertices, on a graph. The neighbors directly associated(connected) with the source vertex are level 1, and the neighbors(vertices) of the source vertex neighbor's are level 2, and so on...
//      - the height is determined by how many "steps" away a given vertex is from the source/starting vertex.

// Summary:
// Prioritizing traversal of all neighbor's of a given vertex before stepping down to traverse the next level of vertices - i.e. before visiting/traversing neighbor's neighbors.
//      - all vertices at a given height are visited/traversed before moving out/down to the next height of vertices.

const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "E");
graph.addEdge("D", "F");
graph.addEdge("E", "F");

console.log(graph.dfsRecursive("A"));
console.log(graph.dfsRecursive("D"));
console.log(graph.dfsRecursive("Q"));
console.log(graph.dfsIterative("A"));
console.log(graph.dfsIterativeAlt("A"));
console.log(graph.bfsIterative("A"));
console.log(graph.bfsIterativeAlt("A"));
console.log(graph.bfsRecursive("A"));
console.log(graph);
