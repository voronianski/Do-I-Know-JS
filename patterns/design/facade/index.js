// # Facade
console.info('-----> Facade Pattern');

// Facade pattern simplifies interface and provides abstractions of internal methods to the public use.
// - [Addy Osmani "Javascript Design Patterns"](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#facadepatternjavascript)


var mobileEvent = {
    // Facade knows which internals are responsible for request
    // and delegates user's request to appropriate internals (subsystems).
    stop: function (e) {
        e.preventDefault();
        e.stopPropagation();
    }
};

var module = (function (global, undefined) {

    var _private = {
        speed: 5,
        set: function (val) {
            this.speed = val;
        },
        get: function () {
            console.log('Current speed is %s', this.speed);
        },
        run: function () {
            console.log('Running');
        }
    };

    return {
        // Used within a module.
        facade: function (opts) {
            _private.set(opts.val);
            _private.get();
            if (opts.run) {
                _private.run();
            }
        }
    };
})(this);

// This will trigger a set of private behaviors within the module but the user isn't concerned with this.
module.facade({val: 10, run: true});
