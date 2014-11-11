console.log('-----> Constructor Patterns');

/**
 * Constructor creates specific type of object and prepares it for use.
 * http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#constructorpatternjavascript
 * http://www.samselikoff.com/blog/2013/11/14/some-Javascript-constructor-patterns/
 * https://medium.com/javascript-scene/the-two-pillars-of-javascript-ee6f3281e7f3
 */

/*
 * Constructor with prototype
 */
function Car (model, year) {
    // self-invoking constructor
    if (!(this instanceof Car)) {
        return new Car(model, year);
    }
    this.model = model;
    this.year = year;
}

// methods on prototype get shared across all instances
// (important if performance is crucial)
Car.prototype.toString = function () {
    return this.model + ' was produced in ' + this.year;
};

var civic = new Car('Honda Civic', 1972);
console.log(civic.toString());

// without self-invoking pattern missing `new` keyword would:
// in 'use strict' throw an error "Cannot set property 'model' of undefined"
// in other cases `this` would point to the global object
var camry = Car('Toyota Camry', 1982);
console.log(camry.toString());

/*
 * Constructor with closures
 */
function Plane (model, year) {
    var _model = model;
    var _year = year;

    var that = {};

    // redefined each of the new objects created
    that.toString = function () {
        return _model + ' was produced in ' + _year;
    };

    return that;
}

var boeing = Plane('Boeing 747', 1969);
console.log(boeing.toString());
