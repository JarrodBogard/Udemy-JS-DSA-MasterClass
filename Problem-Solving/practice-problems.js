console.clear();

// Practice Problems

// 1) Frequency Counter - Check if two inputs are the same.
// Time Complexity: O(n) | Space Complexity: O(n)
function sameFrequency(num1, num2) {
  num1 = String(num1);
  num2 = String(num2);

  //   if (num1.length !== num2.length) return false;

  const numbers = "0123456789";

  const obj = {};

  for (let val of num1) {
    // if(numbers.includes(val))
    obj[val] = (obj[val] || 0) + 1;
  }

  for (let val of num2) {
    if (!obj[val]) {
      return false;
    } else {
      obj[val] -= 1;
    }
  }
  return true;
}
// console.log(sameFrequency(182, 281)); // true
// console.log(sameFrequency(34, 14)); // false
// console.log(sameFrequency(3589578, 5879385)); // true
// console.log(sameFrequency(22, 222)); // false

// 2) Frequency Counter & Multiple Pointers - Check if a variable number of inputs have any duplicates.
// Are they sorted? Are they only positive, negative or both? Do we return a boolean after finding the first duplicate?

function areThereDuplicatesCounter(...inputs) {
  let obj = {};

  for (let val of inputs) {
    obj[val] = (obj[val] || 0) + 1;
  }

  for (let key in obj) {
    if (obj[key] > 1) return true;
  }

  return false;
}
// console.log(areThereDuplicatesCounter(1, 2, 3, 4, 5, 7, 8));
// console.log(areThereDuplicatesCounter(1, 2, 3, 4, 5, 7, 8, 10, 2, 4, 4, 4, 5, 0));
// console.log(areThereDuplicatesCounter(1, 2, 3, "a", 4, 7, "b", 8, 10, 5, 0, "c", "a"));

///////////////////////////// alternative solution ///////////////////////////////
function areThereDuplicatesCounter2(...args) {
  const charCount = {};
  for (let char of args) {
    if (!charCount[char]) {
      charCount[char] = 1;
    } else {
      return true;
    }
  }
  return false;
}

// console.log(areThereDuplicatesCounter2(1, 2, 3, 4, 5, 7, 8));
// console.log(areThereDuplicatesCounter2(1, 2, 3, 4, 5, 7, 8, 10, 2, 4, 4, 4, 5, 0));
// console.log(areThereDuplicatesCounter2(1, 2, 3, "a", 4, 7, "b", 8, 10, 5, 0, "c", "a"));
//////////////////////////////////////////////////////////////////////////////////

/////////////////////// multiple pointer solution ////////////////////////////////
const areThereDuplicatesPointers = (...inputs) => {
  let left = 0;
  //   let right = inputs.length - 1;
  let right = 1;
  let nums = [];
  let letters = [];

  for (let i = 0; i < inputs.length; i++) {
    if (typeof inputs[i] === "number") nums.push(inputs[i]);
    else letters.push(inputs[i]);
  }

  nums = nums.sort((a, b) => a - b);
  letters = letters.sort();

  console.log(nums, letters);

  if (nums.length && letters.length) {
    while (right < nums.length || right < letters.length) {
      if (nums[left] === nums[right] || letters[left] === letters[right])
        return true;
      else {
        left++;
        right++;
      }
    }
  } else if (nums.length) {
    while (right < nums.length) {
      if (nums[left] === nums[right]) return true;
      else {
        left++;
        right++;
      }
    }
  } else {
    while (right < letters.length) {
      if (letters[left] === letters[right]) return true;
      else {
        left++;
        right++;
      }
    }
  }
  return false;
};
console.log(areThereDuplicatesPointers(1, 2, 3, 4, 5, 7, 8, 4));
console.log(areThereDuplicatesPointers(1, 2, 3, 4, 5, 7, 2, 4, 4, 4, 5, 0));
console.log(areThereDuplicatesPointers(1, 3, "a", 4, 7, "b", 5, 0, "c", "a"));
console.log(areThereDuplicatesPointers("a", "c", "q", "t", "b", "r"));
///////////////////////////////////////////////////////////////////////////////
/*
// sameFrequency Solution
function sameFrequency(num1, num2){
  let strNum1 = num1.toString();
  let strNum2 = num2.toString();
  if(strNum1.length !== strNum2.length) return false;
  
  let countNum1 = {};
  let countNum2 = {};
  
  for(let i = 0; i < strNum1.length; i++){
    countNum1[strNum1[i]] = (countNum1[strNum1[i]] || 0) + 1
  }
  
  for(let j = 0; j < strNum1.length; j++){
    countNum2[strNum2[j]] = (countNum2[strNum2[j]] || 0) + 1
  }
  
  for(let key in countNum1){
    if(countNum1[key] !== countNum2[key]) return false;
  }
 
  return true;
}
// areThereDuplicates Solution (Frequency Counter)
function areThereDuplicates() {
  let collection = {}
  for(let val in arguments){
    collection[arguments[val]] = (collection[arguments[val]] || 0) + 1
  }
  for(let key in collection){
    if(collection[key] > 1) return true
  }
  return false;
}
// areThereDuplicates Solution (Multiple Pointers)
function areThereDuplicates(...args) {
  // Two pointers
  args.sort((a,b) => a > b);
  let start = 0;
  let next = 1;
  while(next < args.length){
    if(args[start] === args[next]){
        return true
    }
    start++
    next++
  }
  return false
}
// areThereDuplicates One Liner Solution
function areThereDuplicates() {
  return new Set(arguments).size !== arguments.length;
}
*/
