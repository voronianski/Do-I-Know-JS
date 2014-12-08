// # Singleton
console.log('-----> Singleton Pattern');

// Singleton restricts initialiazation of a class and provides its' only one instance.
// - [Addy Osmani "Javascript Design Patterns"](http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript)
// - ["Use Your Singletons Wisely"](http://www.ibm.com/developerworks/webservices/library/co-single/index.html)

// Implemented as constructor function.
function Singleton () {
    if (Singleton._instance) {
        return Singleton._instance;
    }

    var privateRandomNumber = Math.random();

    this.getRandomNumber = function () {
        return privateRandomNumber;
    };

    Singleton._instance = this;
}


// Implemented with self-invoked function.
var singleton = (function () {
    var _instance;

    function init () {
        var privateRandomNumber = Math.random();

        var publicMethods = {
            getRandomNumber: function () {
                return privateRandomNumber;
            }
        };

        return publicMethods;
    }

    return {
        sharedInstance: function () {
            if (!_instance) {
                _instance = init();
            }
            return _instance;
        }
    };
})();

// ### Examples
// Both method calls will return same random numbers as both example objects are initialized only once.
var objA = new Singleton();
var objB = new Singleton();
console.log(objA.getRandomNumber() === objB.getRandomNumber()); // true

var objC = singleton.sharedInstance();
var objD = singleton.sharedInstance();
console.log(objC.getRandomNumber() === objD.getRandomNumber()); // true
