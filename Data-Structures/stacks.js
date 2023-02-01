console.clear();

// Section 21: Stacks & Queues

// Lesson #150 Intro to Stacks

// Stacks are data collections - they are abstract data structrues.
//      - The main principle of stacks is the LIFO principle - last in, first out - the last element added to a stack is going to be the first one to be removed, e.g. a stack of plates or papers has to be handled one item at a time starting with the top item or the last item added to the stack - the last or topmost item is removed first.
//      - A collection of data where the first thing to be added is the last thing to be removed, while the last thing to be added is the first thing to be removed, e.g. call stack.
//      - One of the ways to implement a stack is by using a linked list.
//      - Useful for managing function invocations, undo/redo functionality in apps, and routing for browser history(history object) and inside certain front-end frameworks like React's history implementation.
//      - There's more than one way to implement a stack - it's an abstract concept.
//              - a stack is just a concept - it's basically a set of rules that says we need to store data in such a way that the first thing added in is the last thing removed, and the last thing added in is the first thing removed - it doesn't really define or care how it is done.

// Lesson #151 Creating a Stack with an Array

// Using push/pop methods on an array is effectively what a stack does - it adds items to the end and removes items starting with the last item added.
//      - Using push and pop in tandem on an array creates a stack.
//      - Using unshift/shift in tandem on an array also creates a stack.
//      - All that matters is that we have a way of adding data in and removing data such that it satisfies the last in first out principle(LIFO).
//      - In terms of Big O time complexity, push/pop is faster than unshift/shift because there is no re-indexing when we add or remove from the end, but there is when we add and remove from the beginning.

// Lesson #152 Writing Our Own Stack From Scratch

// When we add and remove from the beginning, it is O(1) in a singly linked list. In a doubly linked list it would also be O(1) to add and remove from the end.

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  push(val) {
    let newNode = new Node(val);
    if (!this.size) {
      this.first = newNode;
      this.last = this.first;
    } else {
      //   let temp = this.first;
      //   this.first = newNode;
      //   this.first.next = temp;

      newNode.next = this.first;
      this.first = newNode;
    }
    return ++this.size;
  }

  pop() {
    if (!this.first) return undefined;
    let oldNode = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return oldNode.val;
  }

  /*
//   alternate solution to removing last item added 
  pop() {
    if (!this.size) return undefined;
    let oldNode = this.first;
    if (this.size === 0) {
      this.first = null;
      this.last = null;
    } else {
      this.first = oldNode.next;
      oldNode.next = null;
    }
    this.size--;
    return oldNode.val;
  }
  */
}

let stack = new Stack();
console.log(stack.push(25));
console.log(stack.push(75));
console.log(stack.push(150));
console.log(stack.pop());
console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.pop());
console.log(stack);

// Lesson #153 BIG O of Stacks

// Summary: When writing a stack data structure make sure that pushing and popping are both constant time.
//      - A stack prioritizes insertion and removal/deletion.
// 1) Stacks are a LIFO data structure where the last value in is always the first one out.
// 2) Stacks are used to handle function invocations (the call stack), for operations like undo/redo, and for routing (remember pages you have visited and go back/forward) and much more!
// 3) They are not a built in data structure in JavaScript, but are relatively simple to implement
// 4) Insert and remove are both O(1)

// Insertion: O(1)
// Deletion: O(1)
// Search: O(n)
// Access: O(n)
