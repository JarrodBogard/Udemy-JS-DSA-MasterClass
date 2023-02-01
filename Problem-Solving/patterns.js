console.clear();

// Section 5: Problem Solving Patterns

// Lesson #26 Intro to Problem Solving Patterns

// Lesson #27 Frequency Counter Pattern

// Use an object or set to basically collect a bunch of values and their frequencies(rate of occurrence). This is useful in algorithms and challenges when you have multiple pieces of data, multiple inputs, and you need to compare them to see if they consist of similar values - e.g. if they are anagrams of one another, if a value is contained inside of another value, or any time you're comparing pieces of data with two or more inputs and the frequencies of certain things occurring.
//      - this approach is often O(n) compared to other approaches using arrays and strings that usually involve nested loops O(n^2).
//      - use objects/sets to collect values/frequencies of values.

// Problem: Determine if two string inputs are anagrams.

////////////// Naive Approach ///////////////////
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    let correctIndex = arr2.indexOf(arr1[i] ** 2);
    if (correctIndex === -1) {
      return false;
    }
    console.log(arr2);
    arr2.splice(correctIndex, 1);
  }
  return true;
}

// console.log(same([1, 2, 3, 2], [9, 1, 4, 4])); // O(n^2)
/////////////////////////////////////////////////
//////////// Refactored Approach ////////////////
function sameRefactored(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};
  for (let val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }
  console.log(frequencyCounter1);
  console.log(frequencyCounter2);
  for (let key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) {
      return false;
    }
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false;
    }
  }
  return true;
}

// console.log(sameRefactored([1, 2, 3, 2, 5], [9, 1, 4, 4, 11]));
/////////////////////////////////////////////////
// Remember that two separate(adjacent) loops, O(2n), is vastly superior compared to a pair of loops that are nested, O(n^2).
//      - e.g. with O(2n) - if n is 1000, this means 2 times 1000, which is 2000 iterations, but with O(n^2) if we have 1000 on the outer loop and then 1000 on the inner loop, we're looking at 1000 times 1000, which is a million compared to 2000.
// And remember that it's very easy and quick to access data inside of an object. It doesn't matter how many elements are in the object.

// Summary: The idea behind the frequency counter is usually to use an object, and you use that object to construct a profile. It's a way of breaking down the contents of some sort of linear structure, usually an array or a string. Then you're able to quickly compare that breakdown to how another object looks that was also constructed from a different string or an array input - in the example above we have two array inputs to compare.
//      - We have two arrays. We break them down into objects that sort of classify what's in those arrays, and then we can compare those objects and this allows us to improve our code significantly.

// Lesson #28/29 Frequency Counter: Anagram Challenge w/Solution

////////////////////////// instructor solution //////////////////////////
function validAnagram(first, second) {
  if (first.length !== second.length) {
    return false;
  }

  const lookup = {};

  for (let i = 0; i < first.length; i++) {
    let letter = first[i];
    // if letter exists, increment, otherwise set to 1
    lookup[letter] ? (lookup[letter] += 1) : (lookup[letter] = 1);
  }

  for (let i = 0; i < second.length; i++) {
    let letter = second[i];
    // can't find letter or letter is zero then it's not an anagram
    if (!lookup[letter]) {
      // this works because 0 equals falsey
      return false;
    } else {
      lookup[letter] -= 1;
    }
  }

  return true;
}
// {a: 3, n: 1, g: 1, r: 1, m: 1, }
// {a: 0, n: 0, g: 0, r: 0, m: 0, s:1}
// console.log(validAnagram("anagram", "nagaram"));
// console.log(validAnagram("anagrams", "nagaramm"));
/////////////////////////////////////////////////////////////////////////
////////////////////////////// my solution //////////////////////////////
function myAnagram(str1, str2) {
  if (str1 === "" && str2 === "") return true;
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  //   const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789"; // if including numbers

  const counter1 = {};
  const counter2 = {};

  for (let val of str1) {
    if ("0123456789".includes(val)) return false;
    val = val.toLowerCase();
    if (alphabet.includes(val)) {
      counter1[val] = (counter1[val] || 0) + 1;
    }
  }

  for (let val of str2) {
    if ("0123456789".includes(val)) return false;
    val = val.toLowerCase();
    if (alphabet.includes(val)) {
      counter2[val] = (counter2[val] || 0) + 1;
    }
  }

  //   console.log(counter1, counter2);

  for (let key in counter1) {
    if (!(key in counter2)) return false;

    if (counter2[key] !== counter1[key]) return false;
  }

  return true;
}

// console.log(myAnagram("icemannnn name ?", "cinema manne! n n "));
/////////////////////////////////////////////////////////////////////////
////////////// only work for single word with no spacing ////////////////
function validAnagram2(firstStr, secondStr) {
  let firstSum = 0;

  let secondSum = 0;

  for (const char of firstStr) {
    firstSum = firstSum + char.charCodeAt(0);
  }

  for (const char of secondStr) {
    secondSum = secondSum + char.charCodeAt(0);
  }

  if (firstSum === secondSum) {
    return true;
  }

  return false;
}
// console.log(validAnagram2("icemannnn name ?", "cinema manne! n n "));
/////////////////////////////////////////////////////////////////////////
function validAnagram3(str1, str2) {
  return (
    str1.split("").reduce((p, c) => p + c.charCodeAt(0), 0) ===
    str2.split("").reduce((p, c) => p + c.charCodeAt(0), 0)
  );
}
// console.log(validAnagram3("icemannnn name ?", "cinema manne! n n "));
/////////////////////////////////////////////////////////////////////////

// The above solutions are useful any time you have multiple pieces of data and you need to compare them. In particular, if you need to see if they consist of the same individual pieces.

// Lesson #30 Multiple Pointers Pattern

// Create pointers or values that correspond to an index or position and then move towards the beginning, towards the end, or towards each other in the middle based on a certain condition.
//      - very efficient for solving problems with minimal space complexity

// Problem: Determine if a sorted array of numbers contains a pair that sums to zero.

//////////////////// my solution /////////////////////
// Time Complexity: O(n^2) | Space Complexity: O(1)
const findZeroSumSorted = function (arr) {
  if (arr.length < 2) return undefined;
  if (arr.length === 2 && arr[0] + arr[1] === 0) return [arr[0], arr[1]];
  else if (arr.length === 2 && arr[0] + arr[1] !== 0) return undefined;

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === 0) return [arr[i], arr[j]];
    }
  }
  return undefined;
};

// console.log(findZeroSumSorted([-3, -2, -1, 0, 1, 2, 3]));
// console.log(findZeroSumSorted([-3, -2, -1, 0, 4, 7, 9]));
// console.log(findZeroSumSorted([-4, -3, -2, -1, 0, 1, 2, 5]));
// console.log(findZeroSumSorted([-3]));
//////////////////////////////////////////////////////
/////////////// refactored solution //////////////////
// Time Complexity: O(n) | Space Complexity: O(1)
const refactoredFindSumZeroSorted = (arr) => {
  let left = 0; // pointer
  let right = arr.length - 1; // pointer

  while (left < right) {
    if (arr[left] + arr[right] === 0) return [arr[left], arr[right]];
    else if (arr[left] + arr[right] > 0) right--;
    else left++;
  }
  return undefined;
};
// console.log(refactoredFindSumZeroSorted([-3, -2, -1, 0, 4, 7, 9]));
// console.log(refactoredFindSumZeroSorted([-4, -3, -2, -1, 0, 1, 2, 5]));
// console.log(refactoredFindSumZeroSorted([-3, -2, -1, 0, 1, 2, 3]));
// console.log(refactoredFindSumZeroSorted([-3]));
//////////////////////////////////////////////////////
/////////////// instuctor solution ///////////////////
function refactoredFindSumZeroSorted2(arr) {
  // Time Complexity: O(n) | Space Complexity: O(1)
  let left = 0; // pointer
  let right = arr.length - 1; // pointer
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) return [arr[left], arr[right]];
    else if (sum > 0) right--;
    else left++;
  }
  return undefined;
}
// console.log(refactoredFindSumZeroSorted2([-3, -2, -1, 0, 4, 7, 9]));
// console.log(refactoredFindSumZeroSorted2([-4, -3, -2, -1, 0, 1, 2, 5]));
// console.log(refactoredFindSumZeroSorted2([-3, -2, -1, 0, 1, 2, 3]));
// console.log(refactoredFindSumZeroSorted2([-3]));
//////////////////////////////////////////////////////

// Problem: Count the unique values in a sorted array(can contain negative values).
//////////////////// my solution ////////////////////////
// Time Complexity: O(n) | Space Complexity: O(1)
function uniqueValues(arr) {
  if (!arr.length) return 0;
  if (arr.length === 1) return 1;
  let counter = 1; // if we pass the above conditionals then we know we have atleast one unique value
  let i = 0;
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) counter++;
    i++;
  }
  //   return counter + 1; // doesn't make since logically to add one at the end of the counter
  return counter;
}
// console.log(uniqueValues([-4, -2, -2, 0, 1, 3, 3, 7, 10, 11, 11]));
// console.log(uniqueValues([0, 1, 2, 4, 7]));
// console.log(uniqueValues([0, 1, 1, 1, 1, 2, 4, 4, 4]));
// console.log(uniqueValues([0, 1]));
//////////////////////////////////////////////////////

/////////////// instuctor solution ///////////////////
// Time Complexity: O(n) | Space Complexity: O(1)
function countUniqueValues(arr) {
  if (arr.length === 0) return 0;
  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
    // console.log(i, j);
  }
  return i + 1;
}
// console.log(countUniqueValues([1, 2, 2, 5, 7, 7, 99]));
//////////////////////////////////////////////////////////
//////////////// alternative solution ////////////////////
// Time Complexity: O(n) | Space Complexity: O(n)
function countUniqueValues2(arr) {
  const uniqueVals = { count: 0 };

  for (let val of arr) {
    if (!(val in uniqueVals)) {
      uniqueVals[val] = 1;
      uniqueVals.count++;
    }
  }

  return uniqueVals.count;
  arr.length - num + 1;
}
// console.log(countUniqueValues2([1, 2, 2, 5, 7, 7, 99]));
//////////////////////////////////////////////////////////

//////////////// alternative solution ////////////////////
// Time Complexity: O(n) | Space Complexity: ???
function countUniqueValues3(arr) {
  return new Set(arr).size;
}
// console.log(countUniqueValues3([1, 2, 2, 5, 7, 7, 99]));

//////////////////////////////////////////////////////////

// Lesson #33 Sliding Window Pattern

// This pattern involves creating a window, which can either be an array or number, that tracks an input from one position to another. Great for keeping track of a subset of data inside of a larger set of data.
//      - Depending on a specified condition the window either increases or closes(and a new window is created).
//      - Very useful for keeping track of a subset of data in an array or string, etc.
//      - Useful when we have a set of data like an array or string, and we're looking for a subset of that data that is continuous in some way.
//      - Can make a window which can be a single variable, a sub array, or even another string, etc.
//              - The window is moved from the left, the beginning of the input element/array/string/etc, towards the end. Sometimes we might make a new window (if a condition is met???) - the window can also start at the middle or end, but generally starts at the beginning of the input on the left.
//

///////////////////// naive solution /////////////////////
// Time Complexity: O(n^2) | Space Complexity: O(1)
function maxSubarraySum(arr, num) {
  if (num > arr.length) {
    return null;
  }
  var max = -Infinity;
  for (let i = 0; i < arr.length - num + 1; i++) {
    // slides the window. (slider)
    temp = 0;
    for (let j = 0; j < num; j++) {
      temp += arr[i + j]; // adds three elements(numbers) together to get the sum of those numbers. (window)
    }
    if (temp > max) {
      max = temp;
    }
    console.log(temp, max);
  }
  return max;
}

// console.log(maxSubarraySum([2, 6, 9, 2, 1, 8, 5, 6, 3], 3));
//////////////////////////////////////////////////////////

// Started max var at negative infinity to account for an array that was all negative numbers - the biggest sum would still be negative. In this case, starting it at zero doesn't help - unless working with positive sums only.

// arr.length - num + 1 is looking at the last index that we can start the loop at before we extend beyond the array elements that exist within the input. We want our action statement to stop working when it hits the last element of the input(array, string, etc.).
//      - it represents the last index we can start our calulation within the action statement associated with the loop condition.

// The temp var stores the sum of the window through each iteration. A comparison between temp and max is made on each iteration to determine if the condition is met(is temp greater than max). If it is then max will equal the temp value, if not then max remains the same and the window is moved down by one index so that a new temp sum can be calculated and compared to max.

////////////////// refactored solution ///////////////////
// Time Complexity: O(n) | Space Complexity: O(1)
function maxSubarraySum2(arr, num) {
  let maxSum = 0;
  let tempSum = 0;
  if (arr.length < num) return null;
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}

// console.log(maxSubarraySum2([2, 6, 9, 2, 1, 8, 5, 6, 3], 3));
/////////////////////////////////////////////////////////

// Steps:
// 1) first loop will use the num parameter to calculate the maxSum. (establish window)
// 2) set tempSum to maxSum to hold the original maxSum calculated.
// 3) second loop will drop the first value added into the maxSum and add the next value in the array to produce a new maxSum, which tempSum will now hold. (sliding window - left to right)
// 4) compare the original/previous maxSum to the new maxSum stored in tempSum and set maxSum to whichever is greater.
// 5) after sliding down the entire array return the maxSum.
//    - alternative to using Math.max -> maxSum = tempSum > maxSum ? tempSum : maxSum;

// Lesson #34 Divide And Conquer Pattern

// This pattern involves dividing a data set into smaller chunks and then repeating a process with a subset of data.
//    - This pattern can tremendously reduce time complexity.

// Take a larger set of data, usually an array or string - could be a linked list or a tree - and rather than starting from the left and moving on all the way to the right searching for a value, start by dividing it into smaller pieces and then doing something to each smaller piece to determine where to go next.
//    - divide up a larger chunk of data into smaller chunks, and this, depending on the problem, can be a significant helper(but not always) - the classic example is binary search.
//    - used for more complicated algorithms.

// binary search - divide the array up by picking a middle point - the array must be sorted.

// (array.sort() is O(n log n)???)

/////////////// naive solution ///////////////
// Time Complexity: O(n) | Space Complexity: O(1)
function linearSearch(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      return i;
    }
  }
  return -1;
}
// console.log(linearSearch([-1, 1, 2, 7, 12, 15], 4));
// console.log(linearSearch([-1, 1, 2, 7, 12, 15], 7));
// console.log(linearSearch([-1, 1, 2, 7, 12, 15]));

/////////////////// refactored solution ////////////////////
// Time Complexity: O(log n) | Space Complexity: O(1)
const binarySearch = function (arr, val) {
  let min = 0;
  let max = arr.length - 1;

  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    let currentElement = arr[middle];

    if (currentElement < val) {
      min = middle + 1;
    } else if (currentElement > val) {
      max = middle - 1;
    } else {
      return middle;
    }
  }
  return -1;
};

// console.log(binarySearch([-2, 0, 1, 3, 4, 5, 8, 10], -2));
/////////////////////////////////////////////////////////////
