// # Factory
console.info('-----> Factory Pattern');

// Factory pattern provides generic interface for creating objects.
//  - [Addy Osmani "Javascript Design Patterns"](http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript)

var factory = {};

factory.Shirt = function (opts) {
    this.color = opts.color || 'white';
    this.size = opts.size || 'M';
};
factory.Trousers = function (opts) {
    this.color = opts.color || 'black';
    this.style = opts.style || 'classic';
};

// We inform factory with object type and it delegates object creation.
factory.create = function (type, opts) {
    return new factory[type](opts);
};

// ### Examples
var shirt = factory.create('Shirt', {color: 'pink', size: 'XL'});
console.log(shirt instanceof factory.Shirt); // true

// Javascript `Object` constructor is a built-in factory.
var o = new Object();
var n = new Object(1);
var s = new Object('s');
var b = new Object(true);
console.log(o instanceof Object); // true
console.log(n instanceof Number); // true
console.log(s instanceof String); // true
console.log(b instanceof Boolean); // true
