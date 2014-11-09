console.info('-----> JavaScript Hoisting');

/*
 * Variables (and function) declarations are hoisted at the top within its current scope.
 * Regardless of where a variable is declared or initialized in code, it will be, behind the scenes, hoisted to the top.
 */

// anti-pattern
var myvar = 'some value';
(function () {
    console.log(myvar); // undefined
    var myvar = 'another value'; // comment this to output 'some value' for both instead
    console.log(myvar); // 'another value'
})();

var myvar = 'some value';
(function () {
    var myvar; // always declare variables at the top of a function
    console.log(myvar); // undefined
    myvar = 'another value'; // comment this to output 'undefined' for both instead
    console.log(myvar); // 'another value'
})();
