// Section 29: Dynamic Programming

// Lesson #240 Intro to Dynamic Programming

// What is dynamic programming?
// "A method for solving a complex problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions."
//      - It is an approach for solving some problems. Most problems cannot be solved with it. It only addresses a small subset of problems, but for the ones that can be solved with dynamic programming it can make a huge difference in their performance.
//      - It is an approach or a pattern for solving a problem where we take that problem and break it into smaller pieces, and then we reduce (duplication???) of those smaller pieces by storing them in some way.
//      - Using past knowledge to make solving a future problem easier.
//      - A method for solving a complex problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions.

// Lesson #241 Overlapping Subproblems
// It only works on problems with...
// 1)optimal substructure & 2)overlapping subproblems.

// Overlapping subproblems:
// A problem is said to have overlapping subproblems if it can be broken down into subproblems, which are reused several times - e.g. Fibonacci Sequence --> "Every number after the first two is the sum of the two preceding numbers"
//      - Overlapping means looking for repetition/repeating of some sub problem - sub problems that are repeated.
//      - MergeSort is an example of an algorithm with subproblems that DO NOT overlap(repeat) - sorting different pieces of data(values/inputs) every time, there is no way to reduce duplication since there are only unique values in general - different/unique data is sorted every time --> MergeSort would be associated with the divide and conquer pattern instead.
//      - If for some reason we had data with a ton of repetition, evenly spaced across an array, then we absolutely could use dynamic programming in a MergeSort, but that would be a very special/unique case.

// Summary: Look for duplication/repetition of subproblems.

// Lesson #242 Optimal Substructure

// Optimal Substructure:
// A problem is said to have optimal substructure if an optimal solution can be constructed from optimal solutions of its subproblems.
//      - e.g. Fibonacci Sequence, shortest path sequence (from one vertex to another) --> the shortest path from point a to point d will also contain the shortest path of point a to point b and point b to point c.
//      - (simple means no repeating of a vertex when referencing paths along a graph???)

// Lesson #243 Writing A Recursive Solution

// non-dynamic solution using recursion //
function fib(n) {
  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
}
console.log(fib(7));
// console.log(fib(10));

// Lesson #244 Time Complexity of Our Solution

// Time Complexity: O(2^n) - exponential
//      - worse than O(n^2) - quadratic

// Lesson #245 The Problem With Our Solution

// The problem with the recursive solution above is that we are repeating the same steps over and over for every subproblem on the "tree", even for identical subproblems with the same output, which is inefficient because if we solve the answer to an identical subproblem once then we don't need to solve it again.
//      - these are overlapping(repetitive) subproblems which can be better solved using dynamic programming.
//      - the repeating subproblems shouldn't be recalculated for every instance. It should only be calculated once for any given subproblem - the calculation should be stored and used when that subproblem repeats.

// Lesson #246 Enter Memoization

// Memoization:
// A type of dynamic programming. It involves storing the results of expensive function calls and returning the cached result when the same inputs occur again.
//      - Use either an array or object to store the repeating values.

// Summary:
// The idea behind memoization is using some data structure where we can store whatever result we found for a subproblem so that next time we don't have to repeat all of that work. We just look it up in our data structure.

function optFib(n, memo = []) {
  // memo = [undefined, 1, 1] and remove base case below
  if (memo[n] !== undefined) return memo[n];
  if (n <= 2) return 1;

  let res = optFib(n - 1, memo) + optFib(n - 2, memo);
  memo[n] = res;
  return res;
}
console.log(optFib(10));
console.log(optFib(50));
console.log(optFib(200));
// console.log(optFib(10000));

function optFibObj(n, savedFib = {}) {
  // base case
  if (n <= 0) {
    return 0;
  }
  if (n <= 2) {
    return 1;
  }

  // memoize
  if (savedFib[n - 1] === undefined) {
    savedFib[n - 1] = optFibObj(n - 1, savedFib);
  }

  // memoize
  if (savedFib[n - 2] === undefined) {
    savedFib[n - 2] = optFibObj(n - 2, savedFib);
  }

  return savedFib[n - 1] + savedFib[n - 2];
}
console.log(optFibObj(200));

// Lesson #247 Time Complexity of Memoized Solution

// Time Complexity: O(n) - linear
//      - Accessing our memo object to lookup stored values is constant time - O(1).

// Lesson #248 Tabulation: A Bottom Up Approach

// Memoization is a top-down approach to solving a problem dynamically.
// Tabulation is a bottom-up approach to solving a problem dynamically.
//      - Storing the solution/result of a previous subproblem calculation in a "table" (usually an array). Typically, done using iteration. Better space complexity can be achieved using tabulation - recursion can be tough on space complexity.

function tabFib(n) {
  if (n <= 2) return 1;
  let fibNums = [0, 1, 1]; // 0 or undefined for index 0
  for (let i = 3; i <= n; i++) {
    fibNums[i] = fibNums[i - 1] + fibNums[i - 2];
  }
  return fibNums[n];
}
console.log(tabFib(1000));
// console.log(tabFib(10000));

// Time Complexity: O(n) - linear

// Summary:
// If we try using the memoized recursive solution, once our input reaches a certain value it will return maximum call stack exceeded - call stack overflow - because of all the unresolved function calls sitting on the call stack - which means the recursive solution is very memory(space) intensive because it has to hold all of these function calls that haven't popped off the stack. However, the tabulation approach does not run into this issue since it is iterative - much less memory(space) intensive.

// Recap:
// 1) Dynamic Programming is the idea of breaking down a problem into smaller subproblems - it's hard.
// 2) Optimal substructure is required to use dynamic program and involves figuring out the correct expression to consistently solve subproblems.
// 3) Overlapping subproblems is the second essential part of dynamic programming.
// 4) Greedy Algorithms are a more aggressive and not always efficient way of solving algorithms.
// 5) Backtracking is quite useful when solving for restrictive conditions with unknown possibilities.
