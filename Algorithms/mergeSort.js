console.clear();

// Section 15: Merge Sort

// Lesson #83 Intro to the "Crazier" Sorts

// 1) Merge Sort
// 2) Quick Sort
// 3) Radix Sort

// These sorting algorithms are faster, more efficient and more complex than the bubble/insertion/selection algorithms.
//      - Generally, improve time complexity from O(n^2) to O(n log n) with some increase in space complexity.

// Lesson #84 Merge Sort: Introduction

// Merge sort is a combination of three things: splitting up, sorting and merging - all three things take place.
//      - It exploits the fact that arrays of 0 or 1 elements are always sorted.
//      - It works by destructuring an array into smaller and smaller arrays until there are multiple arrays made up of 0 or 1 element, and then building up a newly sorted array from those smaller arrays.
//      - e.g. take an eight element array and split it up until we end up with eight single element arrays and then we merge them back together.
//              -  Merging two sorted arrays is easy relative to merging two unsorted arrays.

// Lesson #85 Merging Arrays Intro

// Time Complexity: O(n + m) | Space Complexity: O(n + m)
//      - O(n + m) means that we're iterating over each item in each input array once - the different letters represent the different input arrays and the final time complexity will be the work required to iterate over every element in each of the input arrays.

// Lesson #86 Merging Arrays: Implementation

//////////////////////////// instructor version ///////////////////////////
const merge = (arr1, arr2) => {
  const resArr = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      resArr.push(arr1[i]);
      i++;
    } else {
      resArr.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    resArr.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    resArr.push(arr2[j]);
    j++;
  }

  return resArr;
};

// console.log(merge([-4, -1, 0, 4, 7, 9, 17, 200], [1, 2, 3, 5, 6, 14, 18, 20]));
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// alternative version ////////////////////////////////
function mergeAlt(arr1, arr2) {
  let i = 0;
  let j = 0;
  let res = [];
  while (i < arr1.length || j < arr2.length) {
    if (arr1[i] <= arr2[j] || j >= arr2.length) {
      res.push(arr1[i]);
      i++;
    } else if (arr1[i] > arr2[j] || i >= arr1.length) {
      res.push(arr2[j]);
      j++;
    }
  }
  return res;
}
// console.log(mergeAlt([-4, -1, 0, 4, 7, 17, 200], [1, 2, 3, 5, 6, 14, 18, 20]));
/////////////////////////////////////////////////////////////////////////////////
//////////////////////////// alternative version ////////////////////////////////
function mergeAlt2(arr1, arr2) {
  let i = 0,
    j = 0,
    newArr = [];
  while (i < arr1.length && j < arr2.length) {
    arr1[i] < arr2[j]
      ? (newArr.push(arr1[i]), ++i)
      : (newArr.push(arr2[j]), ++j);
  }
  i === arr1.length && j < arr2.length
    ? newArr.push(...arr2.slice(j))
    : newArr.push(...arr1.slice(i));
  return newArr;
}
// console.log(mergeAlt2([-4, -1, 0, 4, 7, 17, 200], [1, 2, 3, 5, 6, 14, 18, 20]));
/////////////////////////////////////////////////////////////////////////////////

// Lesson #88 Writing Merge Sort Part 2
//////////////////////// recursive version //////////////////////////
// Time Complexity: O(n log n) | Space Complexity: O(n)
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
// console.log(mergeSort([10, 24, 76, 73, -1, 4, 0, 2, 1, 20, 90, 80]));
////////////////////////////////////////////////////////////////////
// Note: The alternative versions below are not recursive and are slower complexity - and may not abide by the rules of merge sort when merging smaller arrays together.
//////////////// alternative(slower) version ///////////////////////
// Time Complexity: O(n^2) | Space Complexity: O(n) ???
function mergeSort2(arr) {
  let result = arr.map((x) => [x]);

  // [[x],[x],[x],[x]] -> [[x,x],[x,x]] -> [[x,x,x,x]]
  while (result.length > 1) {
    const newResult = [];
    for (let i = 0; i < result.length; i += 2) {
      // merge this array and next item if it exists (or empty array if not)
      const newMergedSubarray = merge(result[i], result[i + 1] || []);
      newResult.push(newMergedSubarray);
    }
    result = newResult;
  }
  // in case we were passed an empty array
  console.log(result[0]); // the sorted array is nested in the result array
  return result[0] || [];
}
// console.log(mergeSort2([10, 24, 76, 73, -1, 4, 0, 2, 1, 20, 90, 80]));
////////////////////////////////////////////////////////////////////
//////////////// alternative(slower) version ///////////////////////
// Time Complexity: O(n^2) | Space Complexity: O(n) ???
function mergeSort3(arr) {
  let results = [];
  let big = arr.map((x) => [x]);
  for (let i = 0; i < big.length - 1; i++) {
    //if statement comes into play only the first time
    if (results.length < 1) {
      results = merge(big[i], big[i + 1]);
    }
    //else statement runs every time except first time
    else results = merge(results, big[i + 1]);
  }
  return results;
}
console.log(mergeSort3([10, 24, 76, 73, -1, 4, 0, 2, 1, 20, 90, 80]));
////////////////////////////////////////////////////////////////////

// Summary: Merge Sort (Best/Avg/Worst-case) Time Complexity: O(n log n) | Space Complexity: O(n)

// Destructuring/splitting any given array into its base elements - no more than a single element per array - is logarithmic in time complexity O(log n) - log (base 2) of n.
//      - merge sort destructures an array of n elements into smaller arrays with 0 - 1 elements per array. The number of steps required to perform this destructuring/splitting is logarithmic in time complexity - log (base 2) of n - this is because we are halving the original array, and continue to halve the subsequent arrays, until they are <= 1 element per array.
//              - 2 to what power gives us n - e.g if 8 elements in an array what power of 2 returns 8 --> 3.
//                      - As n grows the length of the array, the number of times we have to split it up grows at the rate of log (base 2) of n --> O(log n)

//      - each time that we destructure/split the array into smaller arrays, we have O(n) comparisons when we're doing the merge(the actual merging of the smaller arrays into a new sorted array) - O(n) comparisons per destructure/split.
//              - as the length of n grows the merging algorithm itself, not the merge sort, has time complexity of O(n) - e.g. if we have 1000 items in the array, there's roughly 1000 comparisons that need to be made.

// Conclusion: O(log n) is the number of destructure/splits as n grows, then each time we split we have of O(n) comparisons to actually perform the merging of the split arrays into a new sorted array - in total we end up with O(n log n).
//      - merge sort space complexity grows as n grows - the larger the input array, the larger the output array -> O(n)
