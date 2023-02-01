console.clear();

// Section 19: Singly Linked Lists

// Lesson #109 Intro to Singly Linked Lists

// What is a singly linked list?

// It's a data structure. It stores whatever sort of data you want, strings, numbers, etc(any type of data), and it's ordered. It's a list of data, just like an array, but there's a big distinction in an array - each item added to an array is mapped(indexed) with a number(starting at 0 for each new array) to allow quick and easy access to any single element in the array. A linked list, on the other hand, just consists of a bunch of elements with no indices, that are just pointing to the next element in the list - e.g. It's sort of like a bunch of train cars connected where one car connects to the next one, and that one connects to the next one, and so on.
//      - There is no index that we use to access data/elements in a singly linked list. We have to start at the first item in the list and then move to the second one, and then the third, and so on.
//      - Each element is a node. Each list consists of a bunch of nodes - a node stores, a piece of data, like a string or a number, but it also references the next node with a pointer, or if it's at the very end and there isn't a next node, it references null.
//      - There are three properties we keep track of in a singly linked list.
//              - 1) The head, which is the beginning.
//              - 2) The tail, which is the end - we don't keep track of every single item in the middle, only the beginning and end.
//              - 3) The length of the linked list, to make things easier.
// Linked lists consist of nodes, each node has a value and a pointer to another node, or if it's the last item in the list it points to null.

// Comparing Linked Lists to Arrays:
// Linked Lists :
//  - Do not have indices.
//  - Connected via nodes with a next pointer.
//  - Random access is not allowed!

// Arrays:
//  - Indexed in order.
//  - Insertion and deletion can be expensive!
//  - Can quickly be accessed at a specific index!

// Lesson #110 Starter Code and Push Intro

// - A linked list is just a collection of nodes.

// First build a node class:
// - piece of data - val.
// reference(pointer) to the next node - next.

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// Rudimentary Example of Node Implementation:

// var first = new Node("Hi");
// first.next = new Node("there,");
// first.next.next = new Node(" how");
// first.next.next.next = new Node("are");
// first.next.next.next.next = new Node("you?");
// console.log(first);

// We don't initialize(instantiate) a linked list with any arguments(data), so the constructor method on the Singly Linked List class does not have any parameters.

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // add a node to the end of a list
  push(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    // console.log(this);
    return this;
  }

  // remove a node from the end of a list
  pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    // if (this.head === this.tail) { this conditional was suggested but is not working???
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  // remove a node from the beginning of a list
  shift() {
    if (!this.head) return undefined;
    let oldHead = this.head;

    this.head = oldHead.next;
    oldHead.next = null; // is this line necessary, do we really need to remove this pointer???
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return oldHead;
  }

  // add a node to the beginning of a list
  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      // must be an else statement otherwise we end up with an infinite loop on the next property if we unshift to an empty list
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  // find a node at a specified position
  get(index) {
    if (index < 0 || index >= this.length) return undefined;
    let counter = 0;
    let current = this.head;
    // while (counter < index) { alternative solution for while loop
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    return current;
  }

  /* 
  alternate solution with a for loop
  get(index) {
    if (index < 0 || index >= this.length) return null;

    var currNode = this.head;

    for (let i = 0; i < index; i++) {
      currNode = currNode.next;
    }

    return currNode;
  }
*/

  // update a node at a specified position
  set(index, val) {
    let foundNode = this.get(index);
    if (foundNode) {
      foundNode.val = val;
      console.log(foundNode);
      return true;
    }
    return false;
  }

  /*
  alternate solution
  set(index, val) {
    let foundNode = this.get(index);
    if (!foundNode) return false;
    else foundNode.val = val;
    console.log(foundNode);
    return true;
  }
*/

  // add a new node anywhere in the list
  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return !!this.push(val);
    if (index === 0) return !!this.unshift(val);
    let newNode = new Node(val);
    let prevNode = this.get(index - 1);
    // let prevPointer = prevNode.next; // temp var to hold the prevNode pointer
    // prevNode.next = newNode;
    // newNode.next = prevPointer;
    newNode.next = prevNode.next; // avoids using a temp var to hold the prevNode pointer
    prevNode.next = newNode; // avoids using a temp var to hold the prevNode pointer
    this.length++;
    return true;
  }

  /* 
  alternate solution
  insert(index, val) {
    if (index === 0) return !!this.unshift(val); // !! will coerce return into boolean value

    if (index === this.length) return !!this.push(val); // !! will coerce return into boolean value

    let prevNode = this.get(index - 1);

    if (prevNode) {
      let newNode = new Node(val);
      let prevNext = prevNode.next;
      prevNode.next = newNode;
      newNode.next = prevNext;
      this.length++;
      return true;
    }

    return false;
  }
*/
  // remove a node
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    let prevNode = this.get(index - 1);
    let removedNode = prevNode.next;
    prevNode.next = removedNode.next;
    removedNode.next = null;
    this.length--;
    return removedNode;
  }

  // reverse a list
  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let prevNode = null;
    let nextNode;

    for (let i = 0; i < this.length; i++) {
      nextNode = node.next;
      node.next = prevNode;
      prevNode = node;
      node = nextNode;
    }
    return this;
  }

  /*
  alternate recursive solution 
  recursive solution
  reverse() {
    if (!this.length) return undefined;
    const reverseRecursive = function (node, prev) {
      if (node.next) reverseRecursive(node.next, node);
      node.next = prev;
    };
    reverseRecursive(this.head);
    [this.head, this.tail] = [this.tail, this.head];
    this.tail.next = null;
    return this;
  }
*/

  // lookup a node
  search(val) {
    if (!this.head) return undefined;
    let counter = 0;
    let current = this.head;
    while (counter < this.length) {
      if (val === current.val) {
        console.log("Node: " + current.val);
        console.log("Position: " + counter);
        return current;
      } else {
        current = current.next;
        counter++;
      }
    }
    console.log("undefined");
    return undefined;
  }

  print() {
    const arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    console.log(arr);
  }
}

const list = new SinglyLinkedList();
// list.push("Hello");
// list.push("Goodbye");
// list.push("Seeya");
// list.pop();
// list.pop();
// list.pop();
// list.shift();
// list.shift();
// list.shift();
// list.unshift("Seeya");
// list.unshift("Goodbye");
// list.unshift("Hello");
// list.unshift("Hi");
// list.get(0);
// list.get(1);
// list.get(2);
// list.get(3);
// console.log(list.get(4));
// console.log(list.set(2, "Sorry"));
// console.log(list.set(3, "Peace"));
// console.log(list.set(7, "Later"));
// console.log(list.insert(0, "Howdy"));
// console.log(list.insert(5, "Nice"));
// console.log(list.insert(7, "Nice"));
// console.log(list.insert(-1, "Nice"));
// console.log(list.insert(3, "Really"));
// console.log(list.insert(4, "Not"));
// console.log(list.remove(3));
// console.log(list.remove(0));
// console.log(list.remove(4));
// console.log(list.remove(2));
// console.log(list.remove(0));
// console.log(list.remove(0));
// console.log(list.remove(0));
// console.log(list.remove(0));
// console.log(list.remove(100));
// list.search("Seeya");
// list.search("Goodbye");
// list.search("Hello");
// list.search("Hi");
// console.log(list.reverse());
list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);
list.reverse();
list.print();
console.log(list);

// Lesson #128. Singly Linked List: BIG O Complexity

// Insertion: O(1) for push and unshift vs. Arrays with O(1) push and O(n) unshift - Linked List is faster than array on average for insertion operations.

// Deletion/Removal: O(1) for shift and O(n) for pop/splice vs. Arrays with O(1) pop and O(n) shift/splice - Linked Lists can remove from the beginning faster and Arrays can remove from the end faster.

// Searching: Traversal for Linked List is O(n) vs. Arrays iterating through array elements O(n) - tied on time complexity for Linked Lists and Arrays looking/searching for a value.

// Access: Lookup for Linked List is O(n) vs. Arrays lookup O(1) - Linked List is slower in time complexity at looking up a given node position(index) in the list than an Array is at the same operation of looking up a specified index(position) in the array - arrays have random access to their indexed elements, which makes the time complexity O(1).

// Summary: Singly Linked Lists excel at insertion and deletion compared to arrays.
//    - if you need data represented in an ordered list with fast insertion and deletion times, and random access is not a priority, Linked Lists would likely be the better data structure over Arrays.

// 1) Singly Linked Lists are an excellent alternative to arrays when insertion and deletion at the beginning are frequently required.
// 2) Arrays contain a built in index whereas Linked Lists do not.
//        - nodes are connected to one another with a .next property(reference/pointer). There is no number or indexed position. We can't access things easily using an index like an array.
// 3) The idea of a list data structure that consists of nodes is the foundation for other data structures like Stacks and Queues.
