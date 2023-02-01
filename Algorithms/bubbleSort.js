console.clear();

// Section 11: Bubble Sort

// Lesson #67 Introduction to Sorting Algorithms

// Sorting - the process of rearranging the items in a collection (e.g. an array) so that the items are in some kind of order.

// Sorting is an incredibly common task, so it's good to know how it works.
//      - there are many different ways to sort things, and different techniques have their own advantages and disadvantages.

// Lesson #68 Built-In JavaScript Sorting

// Sort Method: Array.sort()

// 1) The built-in sort method accepts an optional comparator function.
// 2) You can use this comparator function to tell JS how you want it to sort the input data.
// 3) The comparator looks at pairs of elements (A and B) and determines their sort order based on the return value:
//          a) if it returns a negative number, A should come before B.
//          b) if it returns a positive number, A should come after B.
//          c) if it returns 0, A and B are the same as far as the sort method is concernced.

// Example:

function numberCompare(num1, num2) {
  return num1 - num2;
}

// console.log([6, 4, 15, 10].sort(numberCompare));
// console.log([6, 4, 15, 10].sort((a, b) => a - b));
// console.log([6, 4, 15, 10].sort((a, b) => b - a));

// Lesson #69 Bubble Sort: Overview

// the idea is that if we have an array and we're sorting from smallest to greatest, so in ascending numeric order, the larger values will bubble up to the top one at a time.

// swapping values in an array inside a sorting algorithm:

// ES5:
function swap(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

// ES6:

function updatedSwap(arr, index1, index2) {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
}

///////////////// unoptimized version //////////////////////
// could be written with both loops iterating from the beginning to the end of the array but would be inefficient
const bubbleSort = (arr) => {
  for (let i = arr.length; i > 0; i--) {
    console.log(i, arr[i]);
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        // [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};

console.log(bubbleSort([8, 1, 2, 3, 4, 5, 6, 7]));
///////////////////////////////////////////////////////////
////////////////// instructor version /////////////////////
function bubbleSort2(arr) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

// console.log(bubbleSort2([8, 1, 2, 3, 4, 5, 6, 7]));
///////////////////////////////////////////////////////////

//////////// Optimized BubbleSort with noSwaps ////////////
const bubbleSortOptimized = (arr) => {
  let noSwaps;
  for (let i = arr.length; i > 0; i--) {
    noSwaps = true;
    console.log(i, arr[i]);
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        noSwaps = false;
        // [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    if (noSwaps) break;
  }
  return arr;
};

console.log(bubbleSortOptimized([8, 1, 2, 3, 4, 5, 6, 7]));
////////////////////////////////////////////////////////////
