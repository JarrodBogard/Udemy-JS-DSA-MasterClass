console.clear();

// Section 18: Data Structures Introduction

// Lesson #103: Which Data Structure Is The Best?

// What all data structures have in common is that they are collections of values, they contain the relationships among those values, and the functionality(functions) or operations that can be applied to the data(values???).
//      - e.g. An array can hold many values(store values). It also contains the relationships between those values - the order in the case of an array via indexed positions of values. It comes with all sorts of built-in methods and functionality - ways of interacting with them - like adding(push, unshift, splice), removing(shift, pop, splice), but also sorting, reversing, etc.

// why are there so many data structures?

// It comes down to the fact that different data structures excel at different things. Some are very specialized, but some are rather general/commonly used like arrays or objects in JS, which is why those come for free - we don't have to implement those on our own - but if we're trying to work with a specialized tree or graph, you usually don't get that for free in a programming language, and you must implement it yourself - that doesn't mean they're not useful, it just means that they are very useful in special cases.

// Lesson #104 ES2015 Class Syntax Overview

// What is a class?

// A class is like a blueprint for creating objects with predefined properties and methods.
//      - We can define a pattern/blueprint/class for a type of data structure we want to use for an object, and then we can instantiate (multiple objects/many individual data structures???) using that class(blueprint) (to build out the objects???).
//      - Similar to arrays in JavaScript, although it's not quite the same. We have a pattern for an array and arrays come with a bunch of methods and functionality that they can perform built-in, but we have to first instantiate a new array and then we can get access to all of the methods and functionality . It's not technically a class, but you can think of it as sort of a blueprint, and then we can instantiate objects - arrays in this case - based off of that blueprint(pattern/prototype).
// JavaScript doesn't technically have classes.
//      - Classes introduced in 2015 are primarily syntactical sugar over JavaScript's existing prototype-based inheritance.
//      - The class syntax does not introduce a new object-oriented inheritance model to JavaScript.
//              - JavaScript has never actually been an object-oriented language. Instead, it takes advantage of what's called prototype-based inheritance or prototypal inheritance.
//              - The new class keyword simply uses syntactical sugar to allow developers to more easliy access/work with/use prototype-based inheritance or prototypal inheritance in JS.
//                      - The class syntax was introduced but it's not changing how things work behind the scenes. It's just an easier way to work with and define class-like structures.
// - Technically, this is not true object-oriented programming(OOP)

// Lesson #105 Data Structures: The Class Keyword

// Example:

class Student {
  constructor(firstName, lastName, year) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.grade = year;
  }
}

let firstStudent = new Student("Colt", "Steele", 1);
let secondStudent = new Student("Blue", "Steele", 2);

// 1) The class keyword creates a constant, so you cannot redefine it.
// 2) The method to create new objects must be called constructor.
//      - it's a special method that will be used to instantiate new instances.
//      - When we instantiate a new object using the "new" keyword the constructor method is going to be executed behind the scenes.

// 3) Use the "new" keyword to instantiate objects from a class.
//      - Pass in the appropiate arguments as they are listed in the constructor params of the class(blueprint/pattern) being used.
//              - The constructor method takes those arguments and uses the "this" keyword to assign the newly instantiated object's properties to their respective values.
//                      - When inside the constructor method or another instance(class???) method, "this" refers to the individual/specific instance of the class.

// Lesson #106 Data Structures: Adding Instance Methods

// Instance methods are methods that basically provide functionality that pertains to a single instance of an object that we have instantiated using the associated/respective class, our case - e.g. on a singly/doubly linked list, we will define many instance methods on those particular instances.
//      - Instance methods are relevant to individual instances.
//      - e.g. When working with an array, if I make a new array and then use the push method on that new array, that will perform the functionality of the push method on that individual instance of the newly created array object - an array is a pattern and we can define individual array objects based off that pattern, and then use different instance methods like push/etc on a particular array object to add/etc data/elements to that specific array object/instance.

class StudentUpdated {
  constructor(firstName, lastName, year) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.grade = year;
    this.tardies = 0;
    this.scores = [];
  }
  fullName() {
    return `Your full name is ${this.firstName} ${this.lastName}`;
  }
  markLate() {
    this.tardies += 1;
    if (this.tardies >= 3) {
      return "YOU ARE EXPELLED!!!!";
    }
    return `${this.firstName} ${this.lastName} has been late ${this.tardies} times`;
  }
  addScore(score) {
    this.scores.push(score);
    return this.scores;
  }
  calculateAverage() {
    let sum = this.scores.reduce(function (a, b) {
      return a + b;
    });
    return sum / this.scores.length;
  }
  static enrollStudents() {
    return "ENROLLING STUDENTS!";
  }
}

let thirdStudent = new StudentUpdated("Steve", "Steele", 3);
let fourthStudent = new StudentUpdated("Phil", "Steele", 4);

thirdStudent.markLate();
fourthStudent.addScore(98);
fourthStudent.addScore(76);
console.log(thirdStudent, fourthStudent);
console.log(fourthStudent.calculateAverage());

// Lesson #107 Data Structures: Adding Class Methods

// Class methods === Static methods

// A class method has the "static" keyword in front of the method.
//      - This allows us to define methods or functionality that is pertinent to classes, but not necessarily to individual instances of a class. This is not that common.
//      - Static methods are called without instantiating their class and cannot be called through a class instance. They're often used to create utility functions for an application.
//              - It's not related to a single/individual instance where we are using data from that instance. It's just part of the class in general and adds some overall functionality or utility function that we want.

console.log(StudentUpdated.enrollStudents());

// Class/Static Method Example:

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2)); // 7.0710678118654755

// Remember: Inside of all the instance methods or the constructor, the "this" keyword refers to the object(instance) created from the particular class being used - refers to the actual instance.

// Summary:
// 1) Classes are blueprints that when created make objects known as instances.
// 2) Class instances are created/instantiated with the "new" keyword.
// 3) The constructor function is a special function that gets run when the class is instantiated via the "new" keyword.
// 4) Instance methods can be added to classes similar to methods in objects.
// 5) Class methods can be added using the "static" keyword.
