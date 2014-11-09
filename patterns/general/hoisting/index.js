console.info('> JavaScript Hoisting');

var myvar = 'some value';
(function () {
    console.log(myvar); // undefined
    var myvar = 'another value'; // comment this to output 'some value' instead
    console.log(myvar); // 'another value'
})();

var myvar = 'some value';
(function () {
    var myvar; // declare variables at the top of a function
    console.log(myvar); // undefined
    myvar = 'another value'; // comment this to output 'some value' instead
    console.log(myvar); // 'another value'
})();
