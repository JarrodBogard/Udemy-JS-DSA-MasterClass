console.clear();

// Section 22: Binary Search Trees

// Lesson #160 Introduction to Trees

// A classic data structure taught in computer science classes around the world. They're also very commonly used all around the world. They are a bit of a step up from linked lists and a bit more complicated.

// A data structure that consists of nodes in a parent / child relationship. They consist of "branches" - one node can connect to one or more other nodes, or zero nodes.
//      - Think of an actual tree. We follow a branch and it splits at some point and then that branch can split, and they can keep splitting, and we end up with all of these different little branches off of this main original branch.
//      - Very different than a linked list in that each node can point to more than one node - can have references to multiple nodes.
//      - The "root" is the topmost node in a tree data structure.
//      - They can store any type of data just like linked lists.
//      - They can be very simple or very complex with either many branches or only a couple of branches.
//      - Trees are non-linear unlike linked lists - they can have many different pathways throughout their structure, whereas with a linked list there is only one pathway through.
//              - Think of a singly linked list as a very special case of a tree - if the tree has a single branch, but once it has more than a single branch it becomes non-linear and is no longer a linked list.
//      - In a tree a node can only point to a child. It's a parent child relationship. We can't have a child pointing to a parent. We can't have a node pointing to a sibling - that would be a graph. In a tree every node is moving away from the "root" node. All relationships are downward connections from the topmost "root" node.
//      - There can be only one entry point, or one "root", inside of a tree data structure.

// Tree Terminology:
// Root - The top node in a tree.
// Child -A node directly connected to another node when moving away from the Root.
// Parent - The converse notion of a child.
// Siblings -A group of nodes with the same parent.
// Leaf - A node with no children.
// Edge - The connection between one node and another.

// Lesson #161 Uses For Trees

// Examples:
// HTML DOM
// Network Routing
// Abstract Syntax Tree
// Artificial Intelligence
// Folders in Operating Systems
// Computer File Systems
// JSON

// Lesson #162 Intro to Binary Trees

// Binary search trees are a special type of binary tree, which is a special type of tree. They excel at searching sorted data stored in a particular way - which makes it easier to retrieve.
//      - Each node in a binary tree can have at most two children.
//      - Sorted in a particular way - kept in a specific type of order -> sortable and comparable data - (has a structured order???).
//      - Used to store comparable data - classically referring to numbers, but it could be strings or any other piece of data that has some way to order and compare items stored in the tree - e.g. greater than or less than.
//              - This is the special property - e.g. If we take any node on the tree, starting at the "root", every item(number) that is less than the node(root) is located(branched off) to the left of it and every item(number) that is greater than the node(root) is located(branched off) to the right - this could be repeated on each child node within the tree:
// 1) Every parent node has at most two children.
// 2) Every node to the left of a parent node is always less than the parent.
// 3) Every node to the right of a parent node is always greater than the parent.

// Different applications:
// Decision Trees (true / false)
// Database Indices
// Sorting Algorithms

// Summary:
// 1) Every parent node has at most two children.
// 2) Every node to the left of a parent node is always less than the parent.
// 3) Every node to the right of a parent node is always greater than the parent.
// That's what makes a binary search tree different from a binary tree. The data is kept in a particular order. For every node, every child node to the right is greater than the parent node, and every child node to the left is less than the parent node.

// 164. Searching A Binary Search Tree

// The purpose for this type of structure(BST) is that it makes it very easy and fast to look things up, and it makes it easy to find a position(place) for a node and insert it into the tree appropriately -> fast search and insertion:
// Time: O(log n) Best/Avg-case / O(n) Worst-case.
// Space: O(n) Best/Avg/Worst-case.
//              - The search method(action) of the binary search tree becomes very quick compared to looking for a node in an unsorted tree. The time complexity is logarithmic on average.

// Lesson #165 Our Tree Classes

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(val) {
    let newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    } // else {

    let currentNode = this.root;

    while (true) {
      if (currentNode.val === val) return null;
      if (val < currentNode.val) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return this;
        } // else currentNode = currentNode.left;
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return this;
        } // else currentNode = currentNode.right;
        currentNode = currentNode.right;
      }
    }
  }

  // recursive solution
  insertRecursively(val) {
    const node = new Node(val);
    if (!this.root) {
      this.root = node;
      return this;
    }

    const inserted = (val, current = this.root) => {
      if (val < current.val) {
        if (!current.left) {
          current.left = node;
          return this;
        }
        return inserted(val, current.left);
      } else {
        if (!current.right) {
          current.right = node;
          return this;
        }
        return inserted(val, current.right);
      }
    };

    return inserted(val);
  }

  find(val) {
    if (!this.root) return false;
    let currentNode = this.root;
    let found = false;
    while (currentNode && !found) {
      if (val < currentNode.val) {
        currentNode = currentNode.left;
      } else if (val > currentNode.val) {
        currentNode = currentNode.right;
      } else found = true;
    }
    console.log(found);
    if (!found) return undefined; // return false
    return currentNode;
  }

  contains(val) {
    if (!this.root) return false;
    let currentNode = this.root;
    let found = false;
    while (currentNode && !found) {
      if (currentNode.val > val) {
        currentNode = currentNode.left;
      } else if (currentNode.val < val) {
        currentNode = currentNode.right;
      } else {
        return true;
      }
    }
    return false;
  }

  bfs() {
    // Breadth-first Search
    if (!this.root) return undefined;
    let node = this.root, // could also start as null since value is assigned in while loop???
      queue = [],
      data = [];

    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      data.push(node.val); // using val prop for better console readability
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return data;
  }

  dfsPreOrder() {
    // Depth-first Search
    const data = [];
    // let currentNode = this.root // not required
    function traverse(node) {
      data.push(node.val); // using val prop for better console readability
      if (node.left) traverse(node.left); // consider short-circuit instead of conditional - node.left && traverse(node.left)
      if (node.right) traverse(node.right); // consider short-circuit instead of conditional - node.right && traverse(node.right)
    }
    traverse(this.root); // if using currentNode variable insert in place of this.root
    return data;
  }

  dfsPostOrder() {
    const data = [];
    // let currentNode = this.root // not required
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.val); // using val prop for better console readability
    }
    traverse(this.root); // if using currentNode variable insert in place of this.root
    return data;
  }

  dfsInOrder() {
    const data = [];
    // let currentNode = this.root // not required
    function traverse(node) {
      // if (node.left) traverse(node.left);
      node.left && traverse(node.left);
      data.push(node.val); // using val prop for better console readability
      // if (node.right) traverse(node.right);
      node.right && traverse(node.right);
    }
    traverse(this.root); // if using currentNode variable insert in place of this.root
    return data;
  }
}

const tree = new BinarySearchTree();
// tree.root = new Node(10);
// tree.root.right = new Node(15);
// tree.root.left = new Node(8);
// tree.root.left.right = new Node(9);
// tree.insert(9);
// tree.insert(4);
// tree.insertRecursively(4);
// tree.insertRecursively(12);
// tree.insertRecursively(15);
// tree.insertRecursively(7);
// tree.insertRecursively(2);
// tree.insertRecursively(11);
// tree.insert(12);
// tree.insert(18);
// tree.insert(25);
// tree.insert(1);
// tree.insert(17);
// tree.insert(3);
// tree.insert(7);
// tree.insert(50);
// tree.insert(21);
// console.log(tree.insert(10));
// console.log(tree.find(10));
// console.log(tree.find(1));
// console.log(tree.find(21));
// console.log(tree.find(22));
// console.log(tree.find(0));
// console.log(tree.contains(0));
// console.log(tree.contains(21));
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);
// console.log(tree.bfs());
console.log(tree.dfsPreOrder());
console.log(tree.dfsPostOrder());
console.log(tree.dfsInOrder());
// console.log(tree);

// Lesson #170 Big O of Binary Search Trees

// For a binary search tree, as the tree doubles - as the number of nodes doubles - we only increase the number of steps by one, O(log n).
//    - There are some binary search tree configurations that are very slow.

// Best-case/Average-case Time Complexity:
// Insertion - O(log n) - not guaranteed.
// Searching - O(log n) - not guaranteed.

// Worst-case Time Complexity:
// Insertion and Deletion - O(n).
//    - e.g. a one-sided binary search tree - similar to a singly linked list - where every child node value is greater than the parent node value. In which case, the number of steps required to insert or search the tree grows as the number of nodes grow, O(n).
//    - The solution to this problem would be to pick a different root from the middle of the tree and restructure the tree based on the new root node.

// Section 22: Tree Traversal

// Lesson #172 Intro To Tree Traversal

// Regardless of the type of tree, how do we traverse every node in a given tree one time?

// Two main approaches of traversing a tree:
// 1) Breadth-first Search - works across the tree, horizontally - traversing one level of nodes at a time - looking at all nodes on the same level before moving down to the next level.
//    - Looks at all sibling nodes from left to right before progressing to the next level of child nodes.
// 2) Depth-first Search - has 3 main orders of traversing the tree, vertically.
//        - 1) In-order
//        - 2) Pre-order
//        - 3) Post-order

// Lesson #175/176 Depth First PreOrder Intro

// Basic principle of all Depth-first search algorithms: Traverse nodes vertically, down to the end of the tree, before visiting sibling nodes. The differences in the different types of DFS algos occurs in the order of the 3 main steps below, which affects how values/nodes are recorded - the output.
//    - Traverse(work) down(vertically), rather than breadth-first(horizontally), until we hit the end of the tree at some point, (before visiting sibling nodes???).

// 3 main steps of tree traversal:
// 1) Traverse a node, and then 2) traverse the left side of that node, and then 3) traverse the right side of that node.
// These three steps, just by changing the order that we do them in, will change the output that is returned.
//    - Just by changing the order that we do those in will have a large, very drastic impact on the output order - the actual traversal order.

// In pre-order, we traverse and add the node(root) to the output array first, then traverse and add the entire left side of the node, and then finish with the entire right side of the node. This order of events applies to all nodes within the tree.

// Summary: Visit/add the node, then visit/add the left side, then visit/add the right side.

// Lesson #177/178 Depth First PostOrder Intro

// In post-order we add a node to the output array after we have traversed the entire left side of the node and the entire right side of the node. This order of events applies to all nodes within the tree.
//    - Everything(left/right in a binary tree) on the entire left branch of the root node is explored/traversed before adding any nodes to the output array.
//    - In other words, all the children nodes starting with the furthest/lowest, leftmost node(leaf) is added to the output array, before adding the parent nodes, and finally the root node.
// Summary: In post-order, the root node is the last thing that is added to the output array. For any node, we explore and add all children nodes before we actually add the root/parent node to the output array --> a node is not added to the output array until its left and right have been traversed. This means that the leafs on the left branch of the root node will be the first nodes added to the output array followed by their parents, moving back up until reaching the root node, then the same order of events for the right branch of the root node, followed lastly by the root node
//    - (For a binary tree, we traverse the entire branch of a given node, both the left side and the right side, and then we add the node to the output array???). (For any node, we traverse all children before adding the node to the output array???). (Traversal goes all the way down to the leftmost node on the leftmost branch, followed by the right side, for any given node???).

// Lesson #179/180 Depth First InOrder Intro

// (For InOrder, traverse the entire left side, and add the children nodes, then "visit"/add the node(root), and then traverse the entire right side and add those children nodes - all "visits"/adds are being sent to the output array.
// Summary: On every node we traverse all the children on the left, then we visit the node root, then we traverse all the children on the right - all left branch children nodes get added before the root node, and all the right branch children nodes get added after the root node???).

// For in-order, traverse the left side before adding the node, and then traverse the right side, for any given node.
// Summary: Starting with the entire branch to the left of the root node, for any given node, visit all children nodes on the left before adding the node to the output array, then add the root node. Follow the same order of events for the entire branch to the right of the root node.
//    - In other words, for any given node, traverse the entire left side, then add the node to the output array, then traverse the right side -> on every node, we traverse the left, then we add the node, then we traverse the right.

// Lesson #181 When to Use BFS and DFS

// The time complexities are the same for BFS and DFS, because every node is being visited/added one time to the output array (Time: O(n)), in both cases. However, the space complexities can vary depending on the shape/structure of the tree. With a very wide and full tree, with lots of nodes for each subsequent level, space complexity can be more demanding for BFS, because of all the nodes being added to the queue.
//    - DFS will use up less space in a tree that is wider than it is deeper
//    - BFS will use up less space in a tree that is deeper than it is wider.

// How to Choose the Appropriate DFS, as it relates to BSTs:

// 1) The in-order approach is commonly used in Binary Search Trees(BSTs) because the output returns the nodes from the tree in their underlying order from lowest to highest.

// 2) The pre-order approach could be useful if you're trying to clone/duplicate a BST tree, or you want to store it - basically flattening it out so you can store it in a file or in a database and then recreate it from that serialized structure.

// Summary: The bigger distinctions are between BFS vs. DFS, not between the DFS variations.

// Recap:
// 1) Trees are a non-linear data structures that contain a root node and child.
// 2) Binary trees can have values of any type, but at most two children for each parent.
// 3) Binary search trees are a more specific version of binary trees, where every child node to the left of a parent node is less than its value and every node to the right is greater than its value
// - Binary search trees have to fulfill a special condition, where they must form an ordered/sorted tree --> every node to the left of a parent is a less than its value, and every node to the right of a parent is greater - you can only have a binary search tree with pieces of data that are comparable to one another (one is greater than or one is less than the other).
// 4) We can search and traverse trees using BFS or DFS.
//    - there are three variants for DFS: 1)in-order, 2)post-order and 3)pre-order.
