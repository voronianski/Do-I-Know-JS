// # Constructor
console.log('-----> Constructor Patterns');

// Constructor creates specific type of object and prepares it for use. Resources to read:
// - [Addy Osmani "Javascript Design Patterns"](http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#constructorpatternjavascript)
// - [Sam Selikoff "Some Javascript Constructor Patterns"](http://www.samselikoff.com/blog/2013/11/14/some-Javascript-constructor-patterns)
// - [Eric Elliot "The Two Pillars of Javascript"](http://medium.com/javascript-scene/the-two-pillars-of-javascript-ee6f3281e7f3)

// Constructor with prototype
// ---
function Car (model, year) {
    // Self-invoking constructor.
    if (!(this instanceof Car)) {
        return new Car(model, year);
    }
    this.model = model;
    this.year = year;
}

// Methods on prototype get shared across all created instances.
// It's important if performance is crucial.
Car.prototype.toString = function () {
    return this.model + ' was produced in ' + this.year;
};

// ### Examples

var civic = new Car('Honda Civic', 1972);
console.log(civic.toString());

// Without [_self-invoking pattern_](#section-5) missing `new` keyword would:
// - in `'use strict'` mode throw an error `"Cannot set property 'model' of undefined"`
// - in other cases `this` would point to the global object (e.g. `window`)
var camry = Car('Toyota Camry', 1982);
console.log(camry.toString());

// Constructor with closures
// ---
function Plane (model, year) {
    var _model = model;
    var _year = year;

    var that = {};

    // This method will be redefined when each of the new objects will be created.
    that.toString = function () {
        return _model + ' was produced in ' + _year;
    };

    return that;
}

// ### Example

// There is no need in `new` keyword.
var boeing = Plane('Boeing 747', 1969);
console.log(boeing.toString());
