console.clear();

// Section 20: Doubly Linked Lists

// Lesson #130 Doubly Linked Lists Introduction

// Almost identical to Singly Linked Lists, except every node has another pointer, to the previous node.
//      - More flexibility at the cost of more memory.

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    let newNode = new Node(val); // should let or const be used for instantiating the new node?
    // if(!this.tail) { alternate conditional???
    // if (!this.length) { // alternate conditional
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.tail) return undefined;
    let poppedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      //   let newTail = poppedNode.prev;
      //   newTail.next = null;
      //   this.tail = newTail;
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null; // if the length is 1 then prev and next properties should already be null
    }
    this.length--;
    return poppedNode;
  }

  shift() {
    if (!this.length) return undefined;
    let oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }

  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (!this.head || index < 0 || index >= this.length) return undefined;
    let current, counter;
    if (index < this.length / 2) {
      // "<" runs slightly faster than "<="
      current = this.head;
      counter = 0;
      while (counter !== index) {
        console.log("working from start");
        current = current.next;
        counter++;
      }
      //   return current;
    } else {
      current = this.tail;
      counter = this.length - 1;
      while (counter !== index) {
        console.log("working from end");
        current = current.prev;
        counter--;
      }
      //   return current;
    }
    return current;
  }

  /*
  //   using for loop
  get(index) {
    if (!this.head || index < 0 || index >= this.length) return undefined;
    if (index < this.length / 2) {
      let current = this.head;
      for (let i = 0; i < this.length; i++) {
        console.log("working from start");
        if (index === i) return current;
        current = current.next;
      }
    } else {
      let current = this.tail;
      for (let i = this.length - 1; i > 0; i--) {
        console.log("working from end");
        if (index === i) return current;
        current = current.prev;
      }
    }
  }
*/

  set(index, val) {
    let foundNode = this.get(index);
    if (foundNode) {
      // foundNode !== null -> is this better???
      foundNode.val = val;
      return true;
    }
    return false;
  }

  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);

    let newNode = new Node(val);
    let prevNode = this.get(index - 1);

    let nextNode = prevNode.next;

    prevNode.next = newNode;
    newNode.prev = prevNode;
    newNode.next = nextNode;
    nextNode.prev = newNode;

    // without having an extra variable to hold the nextNode
    // newNode.next = prevNode.next;
    // prevNode.next.prev = newNode;
    // prevNode.next = newNode;
    // newNode.prev = prevNode;

    this.length++;
    return true;
  }

  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    let removedNode = this.get(index);

    // alternative with extra variables for before and after nodes
    // let beforeNode = removedNode.prev
    // let afterNode = removedNode.next
    // beforeNode.next = afterNode
    // afterNode.prev = beforeNode

    removedNode.prev.next = removedNode.next;
    removedNode.next.prev = removedNode.prev;
    removedNode.prev = null;
    removedNode.next = null;
    this.length--;
    return removedNode;
  }

  print() {
    const arr = [];
    let current = this.head;
    for (let i = 0; i < this.length; i++) {
      arr.push(current.val);
      current = current.next;
    }
    console.log(arr);
  }
}

const list = new DoublyLinkedList();
// let firstNode = new Node(12);
// firstNode.next = new Node(15);
// firstNode.next.prev = firstNode;
list.push(100);
list.push(101);
list.push("Last item");

// list.pop();
// list.pop();
// console.log(list.pop());
// console.log(list.pop());
console.log(list.shift());
console.log(list.shift());
console.log(list.shift());
// console.log(list.shift());
list.unshift(20);
list.unshift(120);
list.unshift(220);
list.unshift(220);
list.unshift(320);
list.unshift(420);
list.unshift(520);
list.unshift(620);
list.unshift(720);
list.unshift(820);
list.unshift(920);
console.log(list.get(4));
console.log(list.get(5));
console.log(list.get(6));
console.log(list.get(7));
console.log(list.set(7, "Hi"));
console.log(list.set(0, "Herro"));
console.log(list.set(10, "Hello"));
console.log(list.set(11, "Howdy"));
console.log(list.set(-1, "Hey"));
console.log(list.insert(0, "What"));
console.log(list.insert(12, "Now"));
console.log(list.insert(-1, "Wait"));
console.log(list.insert(15, "See"));
console.log(list.insert(1, "Go"));
console.log(list.insert(13, "Gone"));
console.log(list.insert(7, "Going"));
console.log(list.remove(0));
console.log(list.remove(14));
console.log(list.remove(14));
console.log(list.remove(-1));
console.log(list.remove(7));
list.print();
console.log(list);

// Lesson #148 Comparing Singly and Doubly Linked Lists

// Insertion - O(1)
// Deletion/Removal - O(1)
// Searching - O(n);
//      - searching a doubly linked list is technically O(n/2) - because of how the get(search) method that is implemented above can work from the beginning or the end of the list depending on where the position of the node being searched for is located - but is simplified to O(n)
// Access - O(n)

// Summary:
// 1) Doubly Linked Lists are almost identical to Singly Linked Lists except there is an additional pointer to previous nodes.
//      - there are two connections(pointers) and that does make certain things much easier, e.g. browser history.
// 2) Better than Singly Linked Lists for finding nodes and can be done in half the time.
// 3) However, they do take up more memory considering the extra pointer.
// 4) Doubly linked lists are used to implement other data structures and certain types of caches.
