console.info('-----> Factory Pattern');

/**
 * Factory pattern provides generic interface for creating objects.
 * We inform factory with object type and it delegates object creation.
 * http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript
 */

var factory = {};

factory.Shirt = function (opts) {
    this.color = opts.color || 'white';
    this.size = opts.size || 'M';
};
factory.Trousers = function (opts) {
    this.color = opts.color || 'black';
    this.style = opts.style || 'classic';
};

factory.create = function (type, opts) {
    return new factory[type](opts);
};

var shirt = factory.create('Shirt', {color: 'pink', size: 'XL'});
console.log(shirt instanceof factory.Shirt); // true

// Object is a built-in factory
var o = new Object();
var n = new Object(1);
var s = new Object('s');
var b = new Object(true);
console.log(o instanceof Object);
console.log(n instanceof Number);
console.log(s instanceof String);
console.log(b instanceof Boolean);
