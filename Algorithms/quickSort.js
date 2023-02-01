console.clear();

// Section 16: Quick Sort

// Lesson #91 Introduction to Quick Sort

// Quicksort works on the same assumption that merge sort does. It's easiest to solve through recursion where the data(array) is repeatedly split up until we have sub arrays that are 0 - 1 element long, which means that they are individually sorted - an array with one item is sorted. The difference is it works by selecting a single element, which is called the pivot point and finding the index where the pivot point should end up in the sorted array - it can be any element anywhere in the array. Then, move all the numbers(data) that are less than that element(e.g. number) to the left of the pivot point and all the numbers(data) that are greater than that element(e.g. number) to the right of the pivot point - these numbers to the left and right are not individually sorted yet, but now we know that the pivot point element is sorted and in the correct spot. Then, repeat the process with a new pivot point until all the data(e.g. numbers) are sorted correctly - once the pivot point is positioned appropriately/correctly within the data structure(e.g. array), quick sort can be applied on either side of the pivot point(repeating the same process for the left and right side until the array is completely sorted).
//      - Arrays of 0 or 1 element are always sorted.
//      - Using recursion is the best implementation of quick sort.
//      - It does not matter which element is chose as the pivot point???
//      - The pivot point is sometimes referred to as the partition.
//      - All elements/values in the array smaller than the pivot value are to the left of the pivot and all elements/values larger than the pivot value are to the right of the pivot.

// Lesson #92 Pivot Helper Introduction

// 1) In order to implement quick sort, it's useful to first implement a function responsible for arranging elements in an array on either side of a pivot point(partition).
// 2) Given an array, this helper function should designate an element as the pivot point.
// 3) The function should then rearrange elements in the array so that all values less than the pivot are moved to the left of the pivot point, and all values greater than the pivot are moved to the right of the pivot point.
// 4) The order of elements on either side of the pivot(partition) do not matter.
// 5) The helper should do this in place, that is, it should not create a new array.
// 6) When complete, the helper function should return the index of the pivot.
//      - Picking a pivot is actually an important decision.
//              - The runtime of quicksort can change depending on which element is selected as the pivot point. Ideally, the median value in the data set should be selected as the initial pivot. However, that can be difficult if we don't know what the data itself is and how it's ordered - the pivot should be chosen so that it's roughly the median value in the data set being sorted, because we want an equal number of elements/values on either side of the pivot for it to be as efficient as possible.
//      - For simplicity, we'll always choose the pivot point to be the first element in the data set (we'll talk about consequences of this later).

// Lesson #93 Pivot Helper Implementation

function pivot(arr, start = 0, end = arr.length - 1) {
  let pivot = arr[start];
  let swapIndex = start;

  function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    // [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  for (let i = start + 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      swapIndex++;
      [arr[swapIndex], arr[i]] = [arr[i], arr[swapIndex]];
      //   swap(arr, swapIndex, i);
      //   let temp = arr[swapIndex];
      //   arr[swapIndex] = arr[i];
      //   arr[i] = temp;
    }
  }

  arr[start] = arr[swapIndex];
  arr[swapIndex] = pivot;
  //   swap(arr, start, swapIndex);
  //   [arr[start], arr[swapIndex]] = [arr[swapIndex], arr[start]];
  //   console.log(swapIndex);
  return swapIndex;
}
// pivot([4, 8, 2, 1, 5, 7, 6, 3]);
//////////////////////////////////////////////////////////////////
///////////////////// instructor version /////////////////////////
function pivot2(arr, start = 0, end = arr.length - 1) {
  function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  var pivot = arr[start];
  var swapIdx = start;

  for (var i = start + 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }
  swap(arr, start, swapIdx);
  return swapIdx;
}
// pivot2([4, 8, 2, 1, 5, 7, 6, 3]);
///////////////////////////////////////////////////////////
////////////////// updated version ////////////////////////
function pivotUpdated(arr, start = 0, end = arr.length - 1) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  // We are assuming the pivot is always the first element
  let pivot = arr[start];
  let swapIdx = start;

  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }

  // Swap the pivot from the start the swapPoint
  swap(arr, start, swapIdx);
  return swapIdx;
}

// pivotUpdated([4, 8, 2, 1, 5, 7, 6, 3]);
///////////////////////////////////////////////////////////

// Lesson #94 Quick Sort Implementation

const quickSort = function (arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = pivot(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  console.log(arr);
  return arr;
};

quickSort([100, -3, 2, 4, 6, 9, 1, 2, 5, 3, 23]);
//////////////////// instructor version ///////////////////////
function quickSort2(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = pivot(arr, left, right); //3
    //left
    quickSort(arr, left, pivotIndex - 1);
    //right
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}
// quickSort2([100, -3, 2, 4, 6, 9, 1, 2, 5, 3, 23]);

// [4,6,9,1,2,5,3]
// [3,2,1,4,6,9,5]
//        4
//  3,2,1    6,9,5
//      3      6
//  2,1      5  9
//    2
//  1
////////////////////////////////////////////////////////////////

// Lesson #95/96 Quick Sort Call Stack Walkthrough/Big O Complexity
// Time Complexity: (Best/Avg-case) - O(n log n) | (Best/Avg/Worst-case) - Space Complexity: O(log n)
//                     Worst-case - O(n^2)

// Summary: For time complexity on quick sort, the best/avg-case is O(n log n) just like merge sort, because there are O(log n) destructures/splits into subarrays with O(n) comparisons per destructure/split(subarray) when pivoting - once the pivot point is selected it is compared to each element in the array(subarray) a single time - when the pivot is found on each pivot function call that pivot point is compared to each element within the given array.
// The worst-case O(n^2) arises when the pivot point selected is the minimum element every time, or the pivot is the maximum element every time - when the array is already sorted and we have selected our pivot point as the first item(minimum) in the array or the last item(maximum) in the array and every subsequent function call continues to select the first(minimum) or last(maximum) item in the array.
//      - to work around this issue, pick a random pivot point or try and pick the middle element as the pivot point every time.
//              - if you're pivoting around the minimum or the maximum value repeatedly, that's going to be quadratic time - to avoid/reduce the chances of constantly picking the minimum or the maximum value as the pivot point, pick a random element or the median element in the data structure(array) instead of the first or last element every single time.
