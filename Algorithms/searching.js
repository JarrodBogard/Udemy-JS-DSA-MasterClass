console.clear();

// Section 10: Searching Algorithms

// Lesson #57 Intro to Linear Search

// With sorted data there are better ways than linear search to iterate through data. However, with unsorted data the best way is linear search - looking through each element within the array or string in order to find the appropriate element.
//      - The simplest way to search for a value is to look at every element in the array and check if it's the value we want.
//              - JavaScript is doing that under the hood with methods like: indexOf, includes, find, findIndex.
//                      - These methods check every element, one at a time to check if the input matches an element in the array.

// Linear Search - visit one item at a time, starting at the beginning, moving forward, or we could start at the end and move backward - it doesn't matter. All that matters is that we're moving at a set interval, one item at a time, checking every single element in the array.

// Example:
// Time Complexity: O(n) | Space Complexity: O(1)

function linearSearch(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === val) return i;
  }
  return -1;
}

// console.log(linearSearch([34, 51, 1, 2, 3, 45, 56, 687], 100));
// console.log(linearSearch([34, 51, 1, 2, 3, 45, 56, 687], 45));

// Lesson #59 Linear Search BIG O
// Best case: O(1) Average case: O(n) Worst case: O(n)

// Lesson #60 Intro to Binary Search

// 1) It can be much, much faster than linear search
// 2) Rather than eliminating one element at a time like we did in linear search, in binary search, we can eliminate half of the remaining elements at any given point
// 3) However, binary search only works on sorted arrays, so the data has to be sorted from lowest to highest or highest to lowest, for numbers, and for strings they have to be in alphabetical order, etc - there has to be an order to it.
// The implementation is to divide and conquer - split up the array into two pieces, pick a pivot point in the middle usually, and check the left side and the right side and see, based off of what we're looking for, which half it will be in.

// Example:

function binarySearch(arr, val) {
  let left = 0;
  let right = arr.length - 1;
  let middle = Math.floor((left + right) / 2);
  //   let middle = Math.floor((arr.length - 1) / 2);

  while (left <= right) {
    if (arr[middle] === val) return middle;
    if (arr[middle] < val) left = middle + 1;
    else right = middle - 1;
    middle = Math.floor((left + right) / 2);
  }
  return -1;
}
// console.log(binarySearch([0, 1, 5, 10, 12, 15, 20, 25], 15));

////////// refactored version(instructor) /////////////////
function binarySearch2(arr, elem) {
  var start = 0;
  var end = arr.length - 1;
  var middle = Math.floor((start + end) / 2);
  while (arr[middle] !== elem && start <= end) {
    if (elem < arr[middle]) end = middle - 1;
    else start = middle + 1;
    middle = Math.floor((start + end) / 2);
  }
  return arr[middle] === elem ? middle : -1;
}

// console.log(binarySearch2([2, 5, 6, 9, 13, 15, 28, 30], 30));

// Lesson #63 Binary Search BIG O

// Best case: O(1) Average/Worst case: O(log n)

// Log base two of 32 elements - if n is 32, that means 2 * 2 * 2 * 2 * 2. Every time we double the size of n, we are simply adding one extra step.
//      - O(log n) is really good time complexity.
//      - O(log n) and O(1) are very similar in time complexity.

// Binary search is very fast O(log n), but only works on sorted arrays.

// Lesson #64 Naive String Search
/////////////////// instructor solution ///////////////////////
// Time Complexity: O(n^2) | Space Complexity: O(1)???
function naiveSearch(long, short) {
  if (long.length < short.length) return 0;
  let counter = 0;
  // loop conditional stops the loop once long length is shorter than the short length param
  for (let i = 0; i < long.length - short.length + 1; i++) {
    for (let j = 0; j < short.length; j++) {
      if (short[j] !== long[i + j]) break;
      if (j === short.length - 1) counter++;
    }
  }
  return counter;
}

console.log(naiveSearch("lorie loled", "lol"));
console.log(naiveSearch("lorie loledlolololllllol", "lol"));
console.log(naiveSearch("anananananananananakin", "anakin"));
console.log(naiveSearch("anagranagram", "anagram"));
console.log(naiveSearch("lolll", "pop"));
/////////////////////////////////////////////////////////////
//////////////////// peer solution //////////////////////////
// Time Complexity: O(n) | Space Complexity: O(1)???
function naiveStrSearch(str1, str2) {
  let count = 0;
  let index = 0;

  for (let i = 0; i < str1.length; i++) {
    if (str1[i] === str2[index]) {
      index++;

      if (index === str2.length) {
        count++;
        index = 0;
        i--;
      }
    } else {
      index = 0;
    }
  }

  return count;
}
// console.log(naiveStrSearch("lorie loled", "lol"));
// console.log(naiveStrSearch("lorie loledlolololllllol", "lol"));
// console.log(naiveStrSearch("anananananananananakin", "anakin"));
// console.log(naiveStrSearch("anagranagram", "anagram")); not sure how to debug for this edge case
////////////////////////////////////////////////////////////////////////////////////////////////////
