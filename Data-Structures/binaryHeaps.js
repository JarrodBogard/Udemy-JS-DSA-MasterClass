// Section 24: Binary Heaps

// Lesson #183: Intro to Binary Heaps

// Heaps are a type/category of tree. Everything that applies to trees, in general, applies to heaps, but their are some additional special considerations/rules. There are many types of heaps.

// Two Types of Binary Heaps:

// 1)Min Heap
//      - All the same rules for Max heap apply to Min Heap, but exactly the opposite(vice versa).
// 2)Max Heap
//      - 1) Each parent node has at most two child nodes.
//      - 2) The value of each parent node is always greater than its child nodes --> any number smaller on the left, any number smaller on the right, and this same principle applies all the way down the tree.
//      -3) The parent node is greater than the children, but there are no guarantees between sibling nodes - no implied ordering between siblings, which means that we are not able to compare if siblings are smaller or larger than one another. We only know that the parent node is larger.
//      -4) A binary heap is as compact as possible. All the children of each node are as full as they can be, and left children are filled out first.

// Why do we need to know this?

// 1) Binary Heaps are used to implement Priority Queues, which are very commonly used data structures.
//      - Basically, think of a queue where we can add items in and take them out. Priority queues keep track of items/tasks/etc to be done, in an order, where we can assign a priority to each item, and the item will move to the correct spot in the queue depending on its importance level.
// 2) They are also used quite a bit with graph traversal algorithms.

// Summary:
// These are very similar to a binary search tree, but with some different rules. Each node can have atmost two children, but unlike a BST there is no order to the left branch(child nodes) vs. the right branch(child nodes).
//      - In a MaxBinaryHeap, parent nodes are always larger than child nodes.
//              - all children are smaller than a parent in a max binary heap.
//      - In a MinBinaryHeap, parent nodes are always smaller than child nodes.
//              - all children are larger than a parent in a min binary heap.

// Lesson #184: Storing Heaps

// Finding the children of a parent node in an array:
// For any index(n) of an array...
// 1) The left child is stored at 2n + 1
// 2) The right child is at 2n + 2

// Finding the parent node of a child node in an array:
// For any child node at index(n)...
// 1) Its parent node is at index (n-1)/2 - Math.floor() to remove the decimal

// Lesson #185: Heap: Insert Intro

// The only property on a binary heap is an array that stores the values of the data being added to the heap.
//      - 1)Initially, a new data entry is added to the end of the values array, and then 2)"bubbles up" to its correct position within the heap - for a max binary heap.

// Lesson #186: Heap: Insert Solution - (see class below)

// Lesson #187: Heap: Extract Max Intro

// Removing Elements from a heap:

// The location we usually remove from in a binary heap is the root element(node), espcecially when used in a priority queue.
//      - In either max or min binary heaps, we remove the root node, but it means removing the maximum element(highest value) in a max binary heap, and removing the minimum element(lowest value) in a min binary heap.

// The procedure for deleting the root from the heap (effectively extracting the maximum element in a max heap or the minimum element in a min heap) and restoring the properties is called down-heap (also known as bubble-down, percolate-down, sift-down, trickle down, heapify-down, cascade-down, sink(ing) down, and extract-min/max).

// Lesson #188: Heap: Extract Max Solution (see class below)

// Lesson #189: Priority Queue Intro

// What is a Priority Queue?

// A data structure where each element has a priority. Elements with higher priorities are served before elements with lower priorities.
//      - We have a collection(list) of data and each node(element) has a priority associated with it. We want to retrieve(take out) a single piece of data(one at a time) based on its priority level within the structure it is being stored in - think of a hospital triage system. We then do work on the piece of data we took out of the list while our list waits for the next piece of data to be requested from it.

// Useful when you need to manage data or information of varying priority and have elements(data) that are being inserted into it out of order(in no specific order) - that are not inserted in their correct position within the list in terms of priority(based on their respective priority level), initially --> they are inserted out of order in terms of priority level and need to be reorganized, after insertion into the list, based on their respective priority level.
//      - Priority Queues should always serve the highest priority element(one at a time???).
//      - Priority queues are separate from heaps. They are just an abstract concept. You could implement a priority queue with an array, list, heap, etc.

// Summary:
// All that we care about is the top-level element in the priority queue, the minimum or the maximum element depending on the type of binary heap we are working with(min/max). Every time an element(piece of data) is added to the queue, it could change the order of the elements within the queue. Every time we remove an element(piece of data), we always remove from the top and replace that root element with the next highest priority element in the heap.
//      - a binary max/min heap works really well because insertion and removal have a time complexity of O(log n) compared to slower methods like an array or linked list that is unordered, which would be a time complexity of O(n).

// Big O of Binary Heap/Priority Queue:

// Binary heaps, and thus priority queues built using binary heaps, for both min and max heaps, are great for insertion and deletion(very fast) - Insertion/Deletion - Time: O(log n), Search - Time: O(n)

// Why fast for insertion and deletion?

// Each time we go down a step/level in a binary heap, or any binary tree structure for that matter, we have two times the number of nodes - so we have one node, then two, then four, then 16 and so on.
//      - We only have to compare the element one time per level of the heap/tree.
//              - e.g. For a heap with 16 elements there will be four comparisons. You can think of it as two to what power gives us 16 ==> 2^4 = 16
//              - i.e. every time we double the number of nodes - every new full, complete layer - we are only increasing the time that it takes by one more comparison.

// Unlike a binary search tree where we might have an incomplete level, everything is always filled out in a binary heap before we move on to the next level so there is no possibility for us to have an unbalanced heap. Because of that, worst case is still O(log n) for insertion and removal/deletion.

// Binary heaps are not really made to be searchable. If optimizing your search is a priority, then you probably want to use a binary search tree or other similar structure.
//      - Remember, when building/using a binary heap, there is no guaranteed order or even an implied order between siblings.

// Recap:
// A binary heap, is a type of heap, which is a type of tree.

// 1) Binary Heaps are very useful data structures for sorting, and implementing other data structures like priority queues.
// 2) Binary Heaps are either MaxBinaryHeaps or MinBinaryHeaps with parents either being smaller or larger than their children depending on which type of binary heap it is.
//      - Binary heaps, unlike binary search trees, fill out, or fill up, each level completely(entirely) before creating a new level of nodes.
// 3) With just a little bit of math, we can represent heaps using arrays - don't have to but makes it much easier to build out using arrays.

class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(val) {
    this.values.push(val);
    this.bubbleUp();

    // alernate solution ??? //
    // const values = this.values;
    // values.push(val);
    // let idx = values.length - 1;
    // let parentIdx = Math.floor((idx - 1) / 2);

    // // Bubbling up
    // while (values[idx] > values[parentIdx]) {
    //     [values[idx], values[parentIdx]] = [values[parentIdx], values[idx]];
    //     idx = parentIdx;
    //     parentIdx = Math.floor((idx - 1) / 2);
    // }

    // return this;
    ///////////////////////////
  }

  bubbleUp() {
    let childIndex = this.values.length - 1;
    const child = this.values[childIndex];

    while (childIndex > 0) {
      let parentIndex = Math.floor((childIndex - 1) / 2);
      let parent = this.values[parentIndex];

      if (child <= parent) break;
      this.values[parentIndex] = child;
      this.values[childIndex] = parent;
      childIndex = parentIndex;

      //   alternate solution ??? //
      //   if (child > parent) {
      //     this.values[parentIndex] = child;
      //     this.values[childIndex] = parent;
      //     childIndex = parentIndex;
      //   } else return;
      /////////////////////////////
    }

    // alternate while loop ??? //
    // while(this.values[childIndex] > this.values[parentIndex]){
    //     let temp = this.values[childIndex];
    //     this.values[childIndex] = this.values[parentIndex];
    //     this.values[parentIndex] = temp;
    //     childIndex = parentIndex;
    //     parentIndex = Math.floor((childIndex-1)/2);
    /////////////////////////////
  }

  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.bubbleDown();
    }
    return max;
  }

  bubbleDown() {
    let index = 0;
    const length = this.values.length;
    const newRoot = this.values[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;

      let leftChild;
      let rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex];
        if (leftChild > newRoot) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex];
        if (
          (swap === null && rightChild > newRoot) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIndex;
        }
      }
      if (swap === null) break;
      this.values[index] = this.values[swap];
      this.values[swap] = newRoot;
      index = swap;
    }
  }
}

let heap = new MaxBinaryHeap();
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
heap.insert(55);
heap.extractMax();
heap.extractMax();
heap.extractMax();
heap.extractMax();
heap.extractMax();
heap.extractMax();
heap.extractMax();
heap.insert(12);
heap.insert(55);
// console.log(heap.values);

// better solution ?? //
class BinaryHeapAlt {
  constructor() {
    this.heap = [];
  }
  insert(value) {
    let position = this.heap.push(value) - 1; // push returns the new length and we subtract one to get the last element
    let parent = Math.floor((position - 1) / 2);

    while (value > this.heap[parent]) {
      this.swap(parent, position);

      position = parent;
      parent = Math.floor((position - 1) / 2);
    }
    return this.heap;
  }
  extractMax() {
    if (!this.heap.length) return;

    this.swap(0, this.heap.length - 1);
    const oldNode = this.heap.pop();

    //trikle down
    let parent = 0,
      childLeft = 1,
      childRight = 2;
    //Math.max returns NaN if one of the arguments is undefined
    let max = Math.max(
      this.heap[childLeft],
      this.heap[childRight] || -Infinity
    );

    while (this.heap[parent] < max) {
      let child = this.heap[childLeft] === max ? childLeft : childRight;
      this.swap(parent, child);
      parent = child;

      childLeft = parent * 2 + 1;
      childRight = parent * 2 + 2;
      max = Math.max(this.heap[childLeft], this.heap[childRight] || -Infinity);
    }
    return oldNode;
  }
  swap(inx1, inx2) {
    [this.heap[inx1], this.heap[inx2]] = [this.heap[inx2], this.heap[inx1]];
  }
}
const heapAlt = new BinaryHeapAlt();
heapAlt.insert(41);
heapAlt.insert(39);
heapAlt.insert(33);
heapAlt.insert(18);
heapAlt.insert(27);
heapAlt.insert(12);
heapAlt.insert(55);
heapAlt.insert(44);
heapAlt.insert(40);
heapAlt.insert(9);
heapAlt.insert(10);
heapAlt.insert(45);
heapAlt.extractMax();
heapAlt.extractMax();
heapAlt.extractMax();
heapAlt.extractMax();
heapAlt.extractMax();
heapAlt.extractMax();
heapAlt.extractMax();
heapAlt.extractMax();
heapAlt.extractMax();
heapAlt.extractMax();
heapAlt.extractMax();
heapAlt.extractMax();
heapAlt.extractMax();
heapAlt.insert(10);
heapAlt.insert(45);
// console.log(heapAlt.heap);

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    let newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let childIndex = this.values.length - 1;
    const child = this.values[childIndex];

    while (childIndex > 0) {
      let parentIndex = Math.floor((childIndex - 1) / 2);
      let parent = this.values[parentIndex];

      if (child.priority >= parent.priority) break;
      this.values[parentIndex] = child;
      this.values[childIndex] = parent;
      childIndex = parentIndex;
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.bubbleDown();
    }
    return min;
  }

  bubbleDown() {
    let index = 0;
    const length = this.values.length;
    const newRoot = this.values[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;

      let leftChild;
      let rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex];
        if (leftChild.priority < newRoot.priority) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex];
        if (
          (swap === null && rightChild.priority < newRoot.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIndex;
        }
      }
      if (swap === null) break;
      this.values[index] = this.values[swap];
      this.values[swap] = newRoot;
      index = swap;
    }
  }
}

let queue = new PriorityQueue();

queue.enqueue("watch tv", 5);
queue.enqueue("sleep", 1);
queue.enqueue("nap", 4);
queue.enqueue("hydrate", 2);
queue.enqueue("eat", 3);
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue);
