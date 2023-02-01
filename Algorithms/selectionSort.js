console.clear();

// Section 12: Selection Sort

// Lesson #74 Selection Sort: Introduction

// Similar to bubble sort, but instead of first placing large values into sorted position at the end, it places small values into position at the beginning - building the array, moving from the beginning to the end, but the actual sorted data is accumulating at the beginning instead of the end - reverse of bubble sort.

//////////////// legacy version /////////////////////
// Time Complexity: O(n^2) | Space Complexity: O(1)???
function selectionSort(arr) {
  // last item is already sorted and does not need to be iterated over hence arr.length - 1
  for (let i = 0; i < arr.length - 1; i++) {
    let lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowest]) lowest = j;
    }
    if (i !== lowest) {
      //   console.log(i, lowest);
      let temp = arr[i];
      arr[i] = arr[lowest];
      arr[lowest] = temp;
      //   [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
    }
  }
  console.log(arr);
  return arr;
}

selectionSort([0, 2, 34, 22, 10, 19, 17]);
//////////////////////////////////////////////////////
//////////// instructor version (ES6) ////////////////
// Time Complexity: O(n^2) | Space Complexity: O(1)???
function selectionSort2(arr) {
  const swap = (arr, idx1, idx2) =>
    ([arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]);

  for (let i = 0; i < arr.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[lowest] > arr[j]) {
        lowest = j;
      }
    }
    if (i !== lowest) swap(arr, i, lowest);
  }

  return arr;
}
// console.log(arr)
selectionSort2([0, 2, 34, 22, 10, 19, 17]);
///////////////////////////////////////////////////////
