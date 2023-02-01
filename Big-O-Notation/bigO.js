console.clear();

// Section 2: Big O Notation

// Lesson #4 - Intro to Big O

// Big O Notation - is a system and a way of generalizing code and talking about it, and comparing code and its performance, to other pieces of code - a numeric representation of the performance of different code(algorithms).
//      - it's helpful to be able to understand how an algorithm(a piece of code) compares, how it performs, compared to others. It's also good for discussing trade offs between different approaches, because often it's not cut and dry. It's not that one solution is always great and the other one is always terrible. Sometimes one solution might be great at handling really large data sets(pieces of data). Another one might always be very consistent in the time that it takes, but it might take more time, etc. It is not always one solution is best for all situations.
//      - if you're trying to debug your code, it helps to understand things that are slowing it down, not just looking for errors, but efficiency and speed or memory usage.

// Lesson #5 - Timing Our Code

// slower solution
function addUpToSlow(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
} // a linear number of simple calculations (addition(+), assignment(=), addition/assignment with increase by one(++), comparison(<=)) - due to the loop, there are n additions, which means a linear amount of operations being performed - number of operations will be directly related to the size of n(input), as n increases in size, the number of operations increases proportionately. Roughly 5n + 2, which can be distilled down to O(n) Linear Time with O(1)Constant Space - this is because with Big O Notation it doesn't really matter. We are concerned only with a general trend. Big O is focused on a big picture overview. In this case, as n grows, the number of operations grow roughly in proportion with n.

var t1 = performance.now();
addUpToSlow(1000000000);
var t2 = performance.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`);

// faster solution
function addUpToFast(n) {
  return (n * (n + 1)) / 2;
} // 3 simple calculations regardless of the size of n(input) (multiplication(*), addition(+), division(/)). O(1) Constant Time, O(1) Constant Space.

var time1 = performance.now();
addUpToFast(1000000000);
var time2 = performance.now();
console.log(`Time Elapsed: ${(time2 - time1) / 1000} seconds.`);

// The Problem with Time - using timing methods like performance.now() to test speed of execution on algorithms.
// Different machines will record different times.
// The same machine will record different times.
// For fast algorithms, speed measurements may not be fast enough.

// Lesson #6 - Timing Our Code

// What does Big O Notation do to calculate performance?
// Count the number of simple operations that a computer has to perform, because that remains constant no matter who's computer is executing the code/program, e.g. if one algorithm has 5 operations to run and another has 7, it doesn't matter what the specifications of the computer are or what other code is running in the background or simultaneously. The times we get might be different, but the performance will always be determined by the number of operations, so we can use that rather than the exact times.
//      - Focus on the number of simple operations that the computer has to perform.

// Don't get too bogged down in the details of counting every minute operation, because all that matters is the general terms of things, a very light overview.

// Lesson #7 - Visualizing Time Complexities

// Check out the visualization app.

// Lesson #8 - Official Intro to Big O

// Big O allows us to talk formally about how the runtime of an algorithm grows as the inputs grow.
//      - a way of describing the relationship between the input to a function, as it grows, and how that changes the runtime of that function. The relationship between the input size and then the time(performance) relative to that input.
//      - don't care about the details, only the broad trends.
//      - concerned with the worst case scenario - the upper bound for runtime.

// We say that an algorithm is O(f(n)) if the number of simple operations the computer has to do is eventually less than a constant times f(n), as (n) increases.
//      - (f(n) = n) -> a function with an input of n and its output ==> the relationship between the input and the runtime.
// O(1) Constant Time - as n(input) grows it is not reflected in the runtime - it does not affect the runtime negatively in general terms.
// O(n) Linear Time - as n(input) grows the runtime(output???) grows in a one to one ratio with n - the number of operations is (eventually) bounded by a multiple of n. The runtime is proportionate to the input. As n grows the runtime grows relative to n.
//      - concerned only with the order of magnitude, O(10n) => O(n).
// O(n^2) - Quadratic Time - as n(input) grows the runtime grows to the square of that input, because we have an O(n) operation inside of another O(n) operation, O(n * n) => O(n^2). The runtime grows at the rate of n squared - runtime is proportionate to the rate of n squared. As n grows larger, the runtime grows even larger - it grows roughly n times n larger.

// Big O Notation Summary: It's just a generalized way for talking about how efficient an algorithm is. As an input(n) grows, how does that change or reflect in the runtime?

// Lesson #9 - Simplifying Big O Expressions

// Rules of Thumb for Big O Notation:
// 1) Constants don't matter - O(10n) => O(n), O(500) => O(1), O(100n^2) => O(n^2).
// 2) Smaller terms don't matter - O(n + 10) => O(n), O(1000n + 50) => O(n), O(n^2 + 5n + 8) => O(n^2)
// 3) Big O Shorthands:
//      1) Arithmetic operations are constant.
//      2) Variable assignments are constant.
//      3) Accessing elements in arrays(by index) or in objects(by key) are constant.
//      4) In a loop, the complexity is the length of the loop times the complexity of whatever happens inside the loop(operations, nested loops, etc.).

// Big O Notation is concerned with what happens to the runtime of an algorithm as n continues to grow towards infinity - worst-case scenario

// Lesson #10 - Space Complexity

// Time Complexity focuses on how the runtime of an algorithm increases as the size of n(input) increases.

// Space Complexity focuses on how much memory(space) allocation is required to run an algorithm.

// Auxilary Space Complexity - refers to the space required by the algorithm only, not including the space taken up by the inputs. The focus is on the space of the algorithm itself, because, in Big O Notation, it is assumed that the input (n) is going to grow so let's not care about, or focus on that space - let's focus on the repercussions that has inside the algorithm itself.
//      - as n(input) grows towards infinity the size of the input itself grows, so we can ignore that part - the space n(input) takes up - since that is always assumed within Big O Notation.
//      - unless otherwise noted, when we talk about space complexity, technically we're talking about auxiliary space complexity - focused on what is happening to space inside the algorithm.

// Rules of Thumb:
//      1) Most primitives, like boolean, numbers, undefined, and null are constant space.
//              - it doesn't matter what the size of the input is, if the number is 1 or 1000 it is still constant space, or if a boolean is true or false it takes up the same amount of space.
//      2) Strings require O(n) space.
//              - if n is the length of the string, and the input grows to 50 characters, the string takes up 50 times more space than a single character string.
//      3) Reference types like arrays and objects also require O(n) space.
//              - where n is the length of an array or the number of keys in an object - if an array is length 4 vs another array with length 2 then the first array takes up twice as much space, and same with the number of keys in an object compared to another object.

// Lecture #11 - Logs and Section Recap

// A logarithm is the inverse of exponential action. Just like division and multiplication are a pair, logarithms and exponents(exponentiation) are a pair.

// e.g. log2(8) = 3 => log 2 to what power = 8, answer: 3.
//          - log2(value) = exponent ==> 2exponent = value

// log === log2 - this isn't actually a mathematical operation on its own -> you can't just take the log of a number, you need to have a base.

// Rule of Thumb for Logs in Coding:
// The binary logarithm of a number roughly measures the number of times you can divide that number by two before you get a value that's less than or equal to one - i.e. log2(8) -> 8/2 = 4 -> 4/2 = 2 -> 2/2 = 1.

// O(log n) time complexity is a fast algorithm -> worse than constant but better than O(n).

// O(nlog n) time complexity is slower -> worse than O(n) but better than O(n^2).

// Where are logarithms found?
// 1) Certain searching algorithms have logarithmic time complexity.
// 2) Efficient sorting algorithms involve logarithms.
// 3) Recursion sometimes involves logarithmic space complexity.

// searching algorithms, efficient sorting, and recursion(space complexity)

// Summary on Big O Notation: It looks at high-level, big picture trends. As the size of an input grows, we want to know how the runtime changes or how the space complexity changes. Big O can give us a high-level understanding/overview of time or space complexity. It doesn't care about precision, just general trends. Time and space complexity as measured by Big O depends only on the algorithm, not on the hardware - basically measuring the number of operations that happen within the algorithm vs the type of hardware running the algorithm.

// Lesson #14 The BIG O of Objects

// Unordered, key/value pairs.
// when order is not required
// fast access/retreive(update)/insertion/removal - O(1) Constant Time
// slow search - O(n) - this relates to checking if a given piece of information is in a value somewhere - right side of the colon -> potentially have to check every single item -> might have to check every value of every property to find the item/value that is being searched for.

// since it is unordered, there is no beginning or end to the object, which means insertion does not have an append or prepend method, just an insert.

// Big O of Object Methods:
// Object.keys/values/entries - O(n) - must iterate through the object and then push the keys/values/entries elements into a new array, which grows with n(input).
// Object.hasOwnProperty - O(1) - simply returns boolean if a key exists on the object - is not searching keys for values -> this method is similar to accessing an object's property, which is also O(1).

// Lesson #15 - When are Arrays Slow?

// ordered lists, key/value pairs, where key === index

// Each item in an array has an index that corresponds to it starting with 0 for the very first item in an array.

// Arrays are not the only ordered data structure but they are the only one built into JS.

// Big O of Arrays:
// fast access O(1) - a direct shortcut to each element. If you have an index and it's a valid index, you can jump immediately to the data - it doesn't matter how long the array is or what index you are accessing.
// insertion/removal is dependent on location O(1)/O(n) - adding/removing to the end of an array using push/pop methods is O(1) - typically, but not taking into account copying and allocating new memory to an array that has no extra memory slots for the new item that is added to an array, which would change the time complexity to O(n). Adding/removing at the beginning or middle of an array using unshift/shift/splice requires re-indexing of the entire array after the addition or removal of the item, so that requires work(operation) for every element in the array and grows with n(inputs), which makes it O(n).
// searching is slow O(n) - potential optimizations to time complexity when data is sorted

// Lesson #16 - Big O of Array Methods

// Big O of Array Methods:

// push/pop - O(1)
// unshift/shift/concat/slice/splice - O(n) - concat can technically be O(n + m) and splice can be O(n/2), but these are just distilled down to O(n).
// higher-order methods/functions such as forEach/map/filter/reduce/etc. - O(n)
// sort - O(n * log n)

// Summary for Big O of Objects and Arrays:
// 1) Objects are fast at most actions/methods but are unordered.
// 2) Arrays are ordered - but slow unless adding/removing from the end or just accessing items/elements.
