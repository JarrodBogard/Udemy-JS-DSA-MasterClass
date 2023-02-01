console.clear();

// Lesson # 154 Intro to Queues

// A sister data structure to the stack. Similar to a stack in the sense that it's a data structure that you add data in and you remove data out, and those are really the only two operations - adding and removing. However, items are added and removed from this data structure differently than stacks. Instead of last in first out for a stack(LIFO), a queue follows the FIFO principle - first in, first out, e.g. think of waiting in a line at a store or fast food restaraunt - the first one in line receives priority over the others waiting in line -> the first piece of data in line is the first one out. Also, computer task processing (e.g. print queue for a printer that is printing multiple pages - prints in order of files received)
// Can be implemented with an array or using a class.
//      - more easily implemented using an array, but lighter weight and more efficient building a queue
// The only principle governing a queue is that the first thing added in is the first thing removed.
//      - add an item(enqueue), remove an item(dequeue)

// Lesson #155 Creating Queues Using Arrays

// Two ways of creating a queue using an array:
// 1) Use push/shift in tandem - not very efficient due to the re-indexing when using shift to remove an item from the beginning of the array.
// 2) Use unshift/pop in tandem - not very efficient due to the re-indexing when using unshift to add an item to the beginning of the array.

// Summary: Unlike stacks, where you could use push and pop and it would never need to re-index the entire array(collection of items), with queues there is no way around the inefficiency of re-indexing. It will need to re-index either when adding to the beginning or removing from the beginning of the array. It definitely makes sense to create your own queue class if you're really concerned about performance.

// Lesson #156 Writing Our Own Queue From Scratch

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(val) {
    let newNode = new Node(val);
    if (!this.first) {
      this.first = newNode;
      this.last = this.first;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    return ++this.size;
  }

  dequeue() {
    if (!this.first) return undefined;
    let oldFirst = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    oldFirst.next = null;
    this.size--;
    return oldFirst.val;
  }
}

let queue = new Queue();
console.log(queue.enqueue("First"));
console.log(queue.enqueue("Second"));
console.log(queue.enqueue("Third"));
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue);

// Lesson #157 BIG O of Queues

// Summary:
// Any time you need to keep track of the order of a collection of data and maintain that order so that the first item added to the collection is the first item removed, e.g. a print queue, use a queue.
// 1) Queues are a FIFO data structure, all elements are first in first out.
// 2) Queues are useful for processing tasks and are foundational for more complex data structures.
// 3) Insertion and Removal can be done in O(1).

// Insertion: O(1)
// Deletion: O(1)
// Search: O(n)
// Access: O(n)
