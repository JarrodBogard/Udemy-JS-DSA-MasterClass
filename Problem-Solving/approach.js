console.clear();

// Section 4: Problem Solving Approach

// Lesson #18 Introduction to Problem Solving

// What is an algorithm?

// A process or set of steps to accomplish a certain task.

// How to improve at problem solving?

// 1) Devise a plan for solving problems.
// 2) Master common problem solving patterns.

// Problem Solving Breakdown:
// 1) Understand the Problem.
// 2) Explore Concrete Examples.
// 3) Break It Down.
// 4) Solve/Simplify.
// 5) Look Back and Refactor.

// Lesson #19 Step 1: Understand The Problem

// Questions:
// 1) Can I restate the problem in my own words? Do I understand the question.
// 2) What are the inputs that go into the problem?
// 3) What are the outputs that should come from the solution to the problem? What should my answer return to the inquirer?
// 4) Can the outputs be determined from the inputs? In other words, do I have enough information to solve the problem?(I may not be able to answer this question until I start trying to solve the problem. That's fine; it's still worth considering the question at this early stage.)
// 5) How should I label - keep track of - the important pieces of data that are a part of the problem? Terminology.

// Lesson #20 Step 2: Concrete Examples

// Coming up with examples can help you understand the problem better.
// Examples also provide sanity checks that your eventual solution works how it should. e.g. User Stories, Unit Tests

// Steps:
// 1) Start with Simple Examples - examples with the easiest use cases.
// 2) Progress to More Complex Examples.
// 3) Explore Examples with Empty Inputs - edge cases.
// 4) Explore Examples with Invalid Inputs - edge cases.

// Example:
// Write a function which takes in a string and returns counts of each character in the string.

//////////////////// Simple Examples //////////////////
// charCount("aaaa"); // {a: 4}
// charCount("hello"); // {h: 1, e: 1, l: 2, o: 1}

// Should it return only the letters that are in the string? What about the letters that aren't? {a: 4, b: 0, c: 0, d: 0, etc}
////////////////////////////////////////////////////////

///////////////// More Complex Examples //////////////////
// charCount("my phone number is 18273827")

// What about spaces, numbers, special characters, or are lower and uppercase characters stored in separate locations/keys/spaces, etc.? Should the function ignore casing?

// These examples are really just another form of understanding the problem better before we tackle it.
//////////////////////////////////////////////////////////

///// Examples with Empty or Invalid Inputs - edge cases /////

// charCount("")
// charCount(0)
// charCount({})

// What do we want to return? Do we want to return an empty object at the end? Do we want to return null or false or undefined or maybe an error?
///////////////////////////////////////////////////////////////

// Lesson #21 Step 3: Break It Down

// Write out the steps for solving the problem(writing the function). It doesn't have to be full pseudocode. It doesn't have to be valid syntax. Use comments as a guide for the steps to take, especially in an interview setting - this is really important.
//      - What a lot of interviewers are looking for is for you to communicate what you're doing. You don't want to just start typing right away or start writing code on a whiteboard silently with your brow furrowed, angrily writing code. It's much better to say, "All right, here's the steps I'm going to try and take."

// 1) Explicitly write out the steps that you need to take.
//      - This forces you to think about the code you'll write before you write it, and helps you catch any lingering conceptual issues or misunderstandings before you dive in and have to worry about details (e.g language syntax) as well.

// Example:

// function charCount(str) {
// do something

//   return an object with keys that are lowercase alphanumeric characters in the string.
// }

function charCount(str) {
  //   make object to return at end
  const alphabet = "abcdefghijklmnopqrstuvwxyz"; // - alternative to regex
  const obj = {};
  //   make string lowercase
  str = str.toLowerCase();
  //   loop over string, for each character...
  //        - if the char is a number/letter AND is a key in the object, add 1 to count(value)
  //        - if the char is a number/letter AND not in the object, add it to the object and set count(value) to 1.
  //        - if char is something else (space, period, etc.) don't do anything
  for (let i = 0; i < str.length; i++) {
    // console.log(str[i]);
    // /^[A-Z]+$/i
    // /^[A-Za-z]+$/
    // if (str[i].match(/^[A-Za-z]+$/))
    if (alphabet.includes(str[i]))
      obj[str[i]] ? obj[str[i]]++ : (obj[str[i]] = 1);
  }
  // return object at end
  //   console.log(obj);
  return obj;
}
charCount("Hello Everyone i am here 8374832473*&*&(*))( Thanks for the help");

// Lesson #22 Step 4: Solve Or Simplify

// Solve the problem if you can, and if you can't, solve a simpler problem.
//      - that means trying to ignore the part that is giving you a really hard time in order to focus on everything else.
//          - if you do get stuck on something but you know where to start, or you know a place to start, you should just go for it once you've done the first three steps - 1) understood the problem, 2) done concrete examples, and 3) broken it down into steps.

// Simplify Approach:
// 1) Find the core difficulty in what you're trying to do, the thing that is tripping you up that you're panicking about. 2) Temporarily ignore that difficulty, 3) write a simplified solution, and then 4) incorporate that difficulty back in if you can.

function charCount2(str) {
  // set a variable to the characters we are searching for in the string in the loop below
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789"; // - alternative to regex
  //   make object to return at end
  const obj = {};
  //   loop over string, for each character...
  for (let i = 0; i < str.length; i++) {
    // make characters lowercase
    let char = str[i].toLowerCase();
    // if char is something else (space, period, etc.) don't do anything
    if (alphabet.includes(char)) {
      if (obj[char] > 0) {
        // if the char is a number/letter AND is a key in the object, add 1 to count(value)
        obj[char]++;
      } else {
        // if the char is a number/letter AND not in the object, add it to the object and set count(value) to 1.
        obj[char] = 1;
      }
    }
  }
  // return object at end
  return obj;
}
charCount2("Hello Everyone i am here 8374832473*&*&(*))( Thanks for the help");

// Lesson #23 Step 5: Look Back and Refactor

// Refactoring Questions:
// 1) Can you check the result?
// 2) Can you derive the result differently?
// 3) Can you understand it at a glance?
// 4) Can you use the solution/method for some other problem?
// 5) Can you improve the performance of your solution?
// 6) Can you think of other ways to refactor?
// 7) How have other people solved this problem?

// Example:
///////////////////////////// Before Refactor ////////////////////////////////////
// function charCount3(str) {
//   const obj = {};
//   for (let i = 0; i < str.length; i++) {
//     let char = str[i].toLowerCase();
//     if (/[a-z0-9]/.test(char)) {
//       if (obj[char] > 0) {
//         obj[char]++;
//       } else {
//         obj[char] = 1;
//       }
//     }
//   }
//   console.log(obj);
//   return obj;
// }
// charCount3("Hello Everyone i am here 8374832473*&*&(*))( Thanks for the help");
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////// After Refactor //////////////////////////////////////
function charCount3(str) {
  const obj = {};
  for (let char of str) {
    // if (/[a-z0-9]/.test(char)) {
    // tell the interviewer you are not sure how efficient this regex actually is.
    if (isAlphaNumeric(char)) {
      char = char.toLowerCase(); // this may or may not be faster depending on the type of input string
      obj[char] = ++obj[char] || 1;
    }
  }
  console.log(obj);
  return obj;
}
charCount3("Hello Everyone i am here 8374832473*&*&(*))( Thanks for the help");
///////////////////////////////////////////////////////////////////////////////////

// Questions/Concerns to raise to the interviewer:

// In JavaScript, with regular expressions, the performance can vary depending on what you're doing and depending on the browser that you're in. In particular, Chrome had some issues with regular expressions a while back. Don't try and avoid regex because they can be very useful. But for something like this example above it is a very simple usage of a regular expression. Often people will use them to find patterns like credit card patterns, phone numbers, addresses, or much more complicated things like matching a URL pattern, which would be a huge pain otherwise. But just checking if something is a letter or a number, there could be a better way to do that. So I would say that out loud to the interviewer.

// The simplest(fastest???) operation you could do is simple Boolean comparisons.

function isAlphaNumeric(char) {
  const code = char.charCodeAt(0);
  if (
    !(code > 47 && code < 58) && // numeric(0-9)
    !(code > 64 && code < 91) && // upper alpha(A-Z)
    !(code > 96 && code < 123) // lower alpha(a-z)
  ) {
    return false;
  }
  return true;
}
