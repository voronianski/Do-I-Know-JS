console.log('-----> Singleton Pattern');

/**
 * Singleton restricts initialiazation of a class and provides its' only one instance
 * http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript
 * http://www.ibm.com/developerworks/webservices/library/co-single/index.html
 */

// implemented as constructor function
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

var objA = new Singleton();
var objB = new Singleton();
console.log(objA.getRandomNumber() === objB.getRandomNumber()); // true

// implemented with self-invoked function
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

var objC = singleton.sharedInstance();
var objD = singleton.sharedInstance();
console.log(objC.getRandomNumber() === objD.getRandomNumber()); // true
