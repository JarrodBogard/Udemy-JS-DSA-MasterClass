// Section 25: Hash Tables

// Lesson #194: Intro to Hash Tables - Hash maps(Object literals in JS)

// What is a hash table?

// 1) Hash tables are used to store key-value pairs.
// 2) They are like arrays, but the keys are not ordered - elements of arrays are implicitly ordered by using their associated index, which are numeric values starting with zero(zero-indexed).
//      - (Also, keys used in hash tables can be almost any data type??? Only strings???).
// 3) Unlike arrays, hash tables are fast for all of the following operations: searching(lookup), insertion and deletion/removal.

// Nearly every programming language has some sort of hash table data structure and because of their speed, hash tables are very commonly used in programming.

// Names of hash tables for different programming languages:

// Python - Dictionaries
// JS - Objects and Maps*
//      - * Objects have some restrictions, but are basically hash tables.
// Java, Go, & Scala - Maps
// Ruby - Hashes

// Hash tables allow for human-readable keys to store values, instead of numbered indices like arrays:
//   key   ||   value
// "orangered": #ff4500
// "pink": #ff69b4
// "cyan": #00ffff

// Lesson #195: More About Hash Tables

// In order to look up values by key, we need a way to convert keys into valid array indices. A function that performs this task is called a hash function.

// e.g. If I pass in the string "pink", the hash function needs to give me some number back that is associated with a slot in memory(e.g. like an array that has numbered indices). And, every time I pass in "pink" it should give me the same number back. If the hash function used happened to return the number zero from the input of "pink", then the key "pink" is stored with its value, a hex number in this case, of #ff69b4, at the zero index slot in memory.
//      -  it's important we always get the same number back for each key entry, because if not then we won't know where each key is stored in memory.

// Lesson #196: Intro to Hash Functions

// The definition of a basic hash function is a function that takes data of an arbitrary/variable size, whether it's 1000 characters or 1,000,000 characters, and it's going to map that data input to an output of a fixed size.
//      - hash functions are one-way functions, which means we can't decipher the output back to the input. We can only figure out the associated input by running an input through the hash function again and comparing the outputs - if they match then that is the associated input, and if not then it is not the associated input.

// What makes a good hash function?
// 1) Fast (i.e. constant time - O(1)).
// 2) Doesn't cluster outputs at specific indices, but distributes uniformly.
// 3) Deterministic (same input yields same output).

// Lesson #197: Writing Our First Hash Function

// non-optimized //
function hash(key, arrayLength) {
  let total = 0;
  for (let char of key) {
    let value = char.charCodeAt(0) - 96;
    total = (total + value) % arrayLength;
  }
  return total;
}
// console.log(hash("pink", 10));
// console.log(hash("orangered", 10));
// console.log(hash("cyan", 10));

// optimized //
function hashOptimized(key, arrayLength) {
  let total = 0;
  let prime = 31;
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    let char = key[i];
    let value = char.charCodeAt(0) - 96;
    total = (total * prime + value) % arrayLength;
  }
  return total;
}
// console.log(hashOptimized("hello", 13));
// console.log(hashOptimized("goodbye", 13));
// console.log(hashOptimized("hi", 13));
// console.log(hashOptimized("cyan", 13));

// Why use prime numbers in hashing algorithms?

// 1) The prime number in the hash is helpful in spreading out the keys more uniformly.
// 2) It's also helpful if the array that you're putting values into has a prime length.

// Lesson #199 Handling Collisions

// Even with a large array and a great hash function, collisions are inevitable. There are many strategies for dealing with collisions, but we'll focus on two:

// 1) Separate Chaining
// 2) Linear Probing

// With separate chaining, at each index in our array we store values using a more sophisticated(nested) data structure (e.g. an array or a linked list). This allows us to store multiple key-value pairs at the same index. Allows us to have more data than the length of the table.

// With linear probing, when we find a collision, we search through the array to find the next empty slot. Unlike separate chaining, this allows us to store a single key-value at each index. However, we can run out of slots to store data, unlike separate chaining where we can have data in a nested data structure, at any given index. We can only store one key/value pair at each position in the table. Options to address this include implementing separate chaining once the table is full, removing elements from the table, increasing the size of the table, etc.

// Lesson #200 Hash Table Set and Get

class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    let prime = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * prime + value) % this.keyMap.length;
    }
    return total;
  }

  set(key, value) {
    let noDuplicates = true;
    let index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }

    // added functionality for updating values in key/value pairs //
    if (this.keyMap[index].length > 0) {
      // is this necessary???
      for (let i = 0; i < this.keyMap[index].length; i++) {
        let prevKey = this.keyMap[index][i][0];
        if (prevKey === key) {
          this.keyMap[index][i][1] = value;
          noDuplicates = false;
        }
      }
    }
    if (noDuplicates) this.keyMap[index].push([key, value]);
  }

  get(key) {
    let index = this._hash(key);

    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) return this.keyMap[index][i][1];
      }

      return undefined;
    }

    // alternate solution //
    // if (this.keyMap[index] && this.keyMap[index].length === 1)
    //   return this.keyMap[index][0];
    // else if (this.keyMap[index] && this.keyMap[index].length > 1) {
    //   for (let i = 0; i < this.keyMap[index].length; i++) {
    //     if (this.keyMap[index][i][0] === key) return this.keyMap[index][i][1];
    //   }
    // } else return undefined;
  }

  remove(key) {
    let index = this._hash(key);
    let deleteIndex;
    // console.log(deleteIndex);

    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) deleteIndex = i;
      }

      return deleteIndex !== undefined
        ? this.keyMap[index].splice(deleteIndex, 1)
        : undefined;
    }
  }

  // alternate solution
  //   keys() {
  //     return this.keyMap.flat().map(([key]) => key);
  //   }

  keys() {
    let array = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!array.includes(this.keyMap[i][j][0])) {
            // removes duplicate keys
            array.push(this.keyMap[i][j][0]);
          }
        }
      }
    }
    return array;
  }

  values() {
    let array = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!array.includes(this.keyMap[i][j][1])) {
            // removes duplicate values
            array.push(this.keyMap[i][j][1]);
          }
        }
      }
    }
    return array;
  }

  //   alternate solutions below //

  //   values() {
  //     let array = [];
  //     for (let i = 0; i < this.keyMap.length; i++) {
  //       if (this.keyMap[i] && this.keyMap[i].length === 1)
  //         array.push(this.keyMap[i][0][1]);
  //       else if (this.keyMap[i] && this.keyMap[i].length > 1) {
  //         for (let j = 0; j < this.keyMap[i].length; j++) {
  //           array.push(this.keyMap[i][j][1]);
  //         }
  //       }
  //     }
  //     return array;
  //   }

  //   values() {
  //     return [...new Set(this.keyMap.flat().map(([, value]) => value))];
  //   }
}

let table = new HashTable(17);
// table.set("hello world", "goodbye");
// table.set("dogs", "are cool");
// table.set("cats", "are fine");
// table.set("i love", "pizza");
// table.set("hi", "bye");
// table.set("french", "fries");
table.set("maroon", "#800000");
table.set("yellow", "#FFFF00");
table.set("olive", "#808000");
table.set("salmon", "#FA8072");
table.set("lightcoral", "#F08080");
table.set("mediumvioletred", "#C71585");
table.set("plum", "#DDA0DD");
table.set("purple", "#DDA0DD");
table.set("violet", "#DDA0DD");
table.set("violet", "#stuff"); // fix this
table.set("yellow", "#hey"); // fix this
table.set("maroon", "#whats up"); // fix this
table.set("maroon", "#noooo"); // fix this
console.log(table.remove("maroon")); // fix this
// console.log(table.get("maroon"));
// console.log(table.get("yellow"));
// console.log(table.get("yello"));
// console.log(table.get("plum"));
console.log(table.values());
console.log(table.keys());
console.log(table);

// table.keys().forEach((key) => console.log(table.get(key)));

// Lesson #205: Hash Table Big O Complexity

// Time Complexity:
// Best/Avg-case:
// Insertion: O(1)
// Deletion: O(1)
// Access: O(1)
// Searching: keys - O(1), values - O(n)

// Worst-case: (all key/value pairs are stored in a single slot in memory - result of bad hash function)
// Insertion: O(n)
// Deletion: O(n)
// Access: O(n)
// Searching: O(n)

// This comes down to 1)how good your hash function is - how fast the hash function itself operates - and 2)how evenly it distributes data(elements) within the hash table - minimizes the number of collisions.

// Recap:
// 1) Hash tables are collections of key-value pairs.
// 2) Hash tables can find values quickly given a key.
// 3) Hash tables can add new key-values quickly.
// 4) Hash tables store data in a large array, and work by hashing the keys.
// 5) A good hash should be fast, distribute keys uniformly, and be deterministic.
// 6) Separate chaining and linear probing are two strategies used to deal with two keys that hash to the same index
// 7) When in doubt, use a hash table.
