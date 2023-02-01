console.clear();

// Section 13: Insertion Sort

// Lesson #78 Insertion Sort: Introduction

// Builds up the sort by gradually creating a larger left half/portion which is always sorted - gradually build up the sorted portion of the array by inserting one item at a time in the correct place.
//      - instead of finding the largest or smallest element on each pass(iteration), it takes each element and places it where it should go in the sorted portion of the array - taking an element one at a time and inserting it in the correct spot.
//      - useful for what's called an online algorithm(continuous/running algorithm), which is an algorithm that can work as data is coming in, as it receives new data - it doesn't have to have the entire array at once -> e.g. live data being added by users.

////////////// instructor version //////////////////////
// Time Complexity: O(n^2) | Space Complexity: O(1)???
function insertionSort(arr) {
  for (var i = 1; i < arr.length; i++) {
    var currentVal = arr[i];
    for (var j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = currentVal;
  }
  return arr;
}

console.log(insertionSort([2, 1, 9, 76, 4]));
/////////////////////////////////////////////////////////
////////////// version with let variable ////////////////
// Time Complexity: O(n^2) | Space Complexity: O(1)???
function insertionSort2(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentVal = arr[i];
    let j; // j needs to be defined outside the inner loop so that we can assign currentVal at the end inside outer loop
    for (j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = currentVal;
  }
  return arr;
}

console.log(insertionSort2([2, 1, 9, 76, 4]));
/////////////////////////////////////////////////////////
////////////////// better version ///////////////////////
// Time Complexity: O(n^2) | Space Complexity: O(1)???
function insertionSortUpdated(arr) {
  for (let i = 1; i < arr.length; i++) {
    // let temp = arr[i];
    for (let j = i; j >= 0; j--) {
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
        // arr[j] = arr[j - 1];
        // arr[j - 1] = temp;
      } else break;
    }
  }
  return arr;
}
console.log(insertionSortUpdated([2, 1, 9, 76, 4, -3, 0, 40]));
////////////////////////////////////////////////////////////////

// Lesson #81 Comparing Bubble, Selection, and Insertion Sort

// Worst-case: (completely random data)
// Time Complexity: O(n^2) | Space Complexity: O(1) - Bubble/Insertion/Selection Sort
//    Quadratic            |     Constant

// Best-case: (nearly sorted data)
// Time Complexity: O(n) | Space Complexity: O(1) - Bubble/Insertion Sort
//      Linear           |       Constant
// Time Complexity: O(n^2) | Space Complexity: O(1) - Selection Sort
//    Quadratic            |     Constant
