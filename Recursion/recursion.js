console.clear();

// Section 7: Recursion

// Lesson #41 Why Use Recursion?

// A process(function) that calls itself.
//      - must have an endpoint.

// Objects/functions that are typically written recursively:

// 1) JSON.parse/JSON.stringify are often implemented recursively depending on the JS engine(determined by which browser is being used) they are running on.

// 2) document.getElementById(querySelector/others???) and DOM traversal - the DOM is a tree-like structure which usually has many nested elements - recursion is very useful in these situations.

// 3) Object traversal - similar to traversing JSON

// 4) Our own data structures - when creating trees or graphs, for example, to traverse/search them, often the solutions involve recursion.

// Recursion is sometimes a cleaner alternative to iteration.

// Lesson #42 The Call Stack

// In almost all programming languages, there's some data structure behind the scenes that's managing function calls. When functions are invoked, they are often waiting on other functions to return. Functions don't just happen randomly. The data structure in charge of that in JavaScript is called the call stack. It's actually a data structure called a stack and when a function is invoked it's placed on the top of the call stack. Just like if we have a stack of papers on our desk, the first or newest one that we call is placed(pushed)/goes on top, and then when JavaScript sees the return keyword or when a function ends - there's no more code to run - the compiler will remove the top item from the stack. The idea of a stack, is that when an element(execution context) is removed it is removed from the top - the topmost element must be removed first, in order, from highest to lowest. Elements cannot be removed from underneath the top or from the bottom - whatever is on top is removed first.
//      - the idea behind the example below is that as functions are invoked, they're added to the top of the stack and then they are popped off one at a time from the top.
//      - when discussing recursion and writing recursive functions, we're going to be working with the call stack a lot.
//      - with recursive functions, they keep pushing new functions over and over onto the call stack - actually, the same function over and over, and it's/they're waiting to be called - the topmost first and then then the next all the way down to the bottom of the call stack, until the call stack is empty.

// Summary: the call stack is a stack data structure, which means that elements/functions/etc are added to the top and removed first from the top(LIFO), and functions, when they're invoked, are added to the structure.

function takeShower() {
  return "Showering!";
}

function eatBreakfast() {
  let meal = cookFood();
  return `Eating ${meal}`;
}

function cookFood() {
  let items = ["Oatmeal", "Eggs", "Protein Shake"];
  return items[Math.floor(Math.random() * items.length)];
}
function wakeUp() {
  takeShower();
  eatBreakfast();
  console.log("Ok ready to go to work!");
}

// wakeUp();

// Lesson #43 Our First Recursive Function

// Gameplan:
// 1) Invoke the same function with a different input until it reaches the base case.
//          - Invoking the same function over and over, having one function call itself, recursively, but there has to be a stopping point - that's the second step, which is called the base case.
// 2) The base case is where the recursion stops. There has to be an end of the line.
//          - The condition, which when met, ends the recursion - this is the most important concept to understand.
//          - similar to a while loop condition.

// the two essential parts of any recursive function:

// 1) The base case - end of the line(conditional) has to be there for the recursion to end.
//          - base case needs to return to stop the recursion from continuing.
// 2) Different input(s) - within the recursion you're going to call the same function over and over, but each time you want to call it with a different piece of data, you wouldn't want to use the same/exact data(inputs) each time - otherwise the function will never provide a useful return value(and base case will never be met???).

// Recursive Version
function recursiveCountDown(num) {
  if (num <= 0) {
    console.log("All done!");
    return;
  }
  console.log(num);
  num--;
  recursiveCountDown(num);
}
// recursiveCountDown(3);

// Iterative Version
function iterativeCountDown(num) {
  for (var i = num; i > 0; i--) {
    console.log(i);
  }
  console.log("All done!");
}
// iterativeCountDown(3);

// Lesson #44 Our Second Recursive Function

function sumRange(num) {
  if (num === 1) return 1;
  return num + sumRange(num - 1);
}
// sumRange(4);

// In sumRange, whatever is returned from the base case matters. It's added on to what the previous function call was waiting for, and then that's added on and it has this reverse cascade going back up to the first function call - bottom of the call stack.

// Lesson #45 Writing Factorial Iteratively

// Example: 4! = 4 * 3 * 2 * 1 = 24

function factorialIterative(num) {
  let total = 1;
  for (let i = num; i > 1; i--) {
    total *= i;
  }
  console.log(total);
  return total;
}
// factorialIterative(4);

// Lesson #46 Writing Factorial Recursively

function factorialRecursive(num) {
  if (num === 1) return 1;
  return num * factorialRecursive(num - 1);
}
// console.log(factorialRecursive(4));

// Lesson #47 Common Recursion Pitfalls

// 1) No base case or incorrect/flawed base case - the return causes the function to pop off the stack.
// 2) Forget to return or returning the wrong thing - returning the same input repeatedly vs. different inputs.
//          - Recursion is built on the principle/idea of returning. Wherein the call stack, with all of the function calls chained(primed) and waiting/depenedent on the next function call to send back a return value to the previous function call in the stack, which keeps going until we get to the original function call, e.g. factorialRecursive(4), at the bottom of the call stack.
//                  - The importance of returning in recursion cannot be understate. It is fundamental to recursion.
//                  - Stack Overflow is generally when an infinite loop is created and the call stack is overloaded with an excessive amount of function calls - usually associated with improperly implemented recursive calls/functions.

// Lesson #48 Helper Method Recursion

// An exlusively recursive design pattern.

// With helper method recursion, we have two functions. The outer function and then inside we have a recursive function. The recursive function calls itself - which is why it is called the helper function or helper method recursion.
//      - There is a main outer function that would be called by the developer - the outer function is called and passed any inputs, and then inside the code of the outer function there is another function defined and it calls itself recursively.
//              - This is commonly done when we need to compile something like an array or a list of data - not simply tabulating/multiplying/etc.

// In the example below, rather than having the results variable float around in the global state or stored in the recursive function, which would cause the variable to be overriden each time it is called, we use helper method recursion, which really just means defining a function around the recursive function and the global variable(results) holding the state, preventing the recursive function from overriding the variable state each time it is called.
//      - helper method recursion is just a pattern where we have an outer function that's not recursive, which calls an inner function which is recursive.

function collectOddValuesHelper(arr) {
  let result = [];

  function helper(helperInput) {
    if (helperInput.length === 0) {
      return;
    }

    if (helperInput[0] % 2 !== 0) {
      result.push(helperInput[0]);
    }

    helper(helperInput.slice(1));
  }

  helper(arr);

  console.log(result);
  return result;
}

// collectOddValuesHelper([1, 2, 3, 4, 5, 6, 7, 8, 9]);

// Lesson #49 Pure Recursion

// Pure recursion - meaning the function itself is totally self-contained and it's recursive. We don't have some external data structure like the external result array in the above example, and not using a nested function, helper method recursion. A single function performs all the necessary steps.

function collectOddValuesPure(arr) {
  let newArr = []; // an empty array every time the function is called recursively

  if (arr.length === 0) {
    return newArr;
  }

  if (arr[0] % 2 !== 0) {
    newArr.push(arr[0]);
  }

  newArr = newArr.concat(collectOddValuesPure(arr.slice(1)));
  console.log(newArr);
  return newArr;
}

collectOddValuesPure([1, 2, 3, 4, 5]);

// In this example, we concatenate all the arrays at the very end into one array and return that array.

// Pure Recursion Tips:
// When you're using arrays and you're trying to do a pure recursive solution without a helper method, 1) you can use methods like slice, spread operator, and concatenate that will make copies of arrays so you don't mutate them. This will allow you to also accumulate some sort of result. 2) Strings are immutable, so you'll need to use methods like slice or substring to make copies, and 3) with objects it's helpful to use Object.assign or the spread operator.
