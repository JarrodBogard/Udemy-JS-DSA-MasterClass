console.clear();

// Section 17: Radix Sort

// Lesson #98 Radix Sort: Introduction

// Up to this point all the sorting algorithms have been comparison sorts.
//      - Whether referencing bubble sort or something more advanced like quick sort, at the end of the day, beneath the surface, the base comparison that we're doing is between two items at any given point.
//      - Comparing two things - that's the most we ever compare at a given time.
//              - Deciding where elements/values in a data structure go based on less than or greater than comparisons between two given elements/values.

// Avg-case time complexity:
//      - Bubble/Selection/Insertion: O(n^2)
//      - Merge/Quick: O(n log n)

// Radix Sort: Is not a comparison sort. It's an integer sort that works because of a "special property". It allows us to sort numbers very fast versus having to do comparisons.

// 1) Radix sort is a special sorting algorithm that works on lists of numbers.
// 2) It never makes comparisons between elements.
// 3) It exploits the fact that information about the size of a number is encoded in the number of digits.
//      - More digits means a bigger number (binary/base 10 integers???).
//      - It's a special sorting algorithm that doesn't make comparisons and it works on numbers. It's typically used with binary numbers, any number can be expressed in binary. Also, you could take any strings or images if you wanted to and convert them to binary - so it's possible to sort other data, but the actual data we work with at the time that we're sorting needs to be numbers.

// Lesson #99 Radix Sort: Helper Methods

// (Use base 10 numbers for all functions and examples below)

// In order to implement radix sort, it's helpful to build a few helper functions first:

// 1) getDigit(num, place) - returns the digit in num at the given place value.
//      - the place(position) in the getDigit helper function is a zero-based index, similar to an array, but it moves from right to left instead of the standard left to right, and it finds/locates the integer value at a given place(position) in the num(integer) passed through the function as the first param.

function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

// 2) digitCount(num) - returns the number of digits in num
//      - Returns the number of digits in a given, single integer.
//      - Could perform this as a string by converting it to a string, and then find the length or instead use Math methods/functions.

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

//   3) mostDigits(nums) - Given an array of numbers, returns the number of digits of the largest number(s) in the list.
//      - uses the digitCount function as a callback to perform its functionality.

function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

mostDigits([23, 567, 89, 12234324, 90]);

// Lesson #101 Radix Sort: Implementation
////////////////////////// instructor version ///////////////////////////////
function radixSort(nums) {
  let maxDigitCount = mostDigits(nums);
  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < nums.length; i++) {
      let digit = getDigit(nums[i], k);
      digitBuckets[digit].push(nums[i]);
    }
    // nums = [].concat(...digitBuckets);
    nums = digitBuckets.flat();
  }
  console.log(nums);
  return nums;
}

radixSort([23, 345, 5467, 12, 2345, 9852]);

/////////////////////////////////////////////////////////////////////////////
//////////////////////// negative number version ////////////////////////////
function radixSortWithNegatives(nums) {
  let maxDigitCount = mostDigits(nums);
  for (let k = 0; k < maxDigitCount; k++) {
    let posDigitBuckets = Array.from({ length: 10 }, () => []);
    let negDigitBuckets = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < nums.length; i++) {
      let digit = getDigit(nums[i], k);
      if (nums[i] >= 0) {
        posDigitBuckets[digit].push(nums[i]);
      } else {
        negDigitBuckets[negDigitBuckets.length - 1 - digit].push(nums[i]);
      }
    }
    nums = [].concat(...negDigitBuckets, ...posDigitBuckets);
  }
  console.log(nums);
  return nums;
}
radixSortWithNegatives([-20, 23, 345, 5467, -57, 12, 2345, 9852, -10000]);
/////////////////////////////////////////////////////////////////////////////

// Lesson #102 Radix Sort: BIG O Complexity

// Time Complexity: (Best/Avg/Worst-case) - O(nk) | Space Complexity: (Best/Avg/Worst-case) - O(n + k)
//      - n is the number of integers being sorted, and k is the length of those integers, what's often called the word size, for a number - not really a word, but the number of digits making up an integer.
//              - if there are really long numbers(k), then that will significantly impact the time complexity.
//      - n - length of the array of integers -> the number of integers in the input array.
//      - k - number of digits in the integers(average)
//  - if you're dealing with all unique(distinct), randomly distributed data, then k becomes log n, which makes the overall time complexity O(n log n), because of the way that computers store numbers/data in memory.
