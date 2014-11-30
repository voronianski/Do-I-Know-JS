console.log('-----> Observer Patterns');

/**
 * Observer provides a subject object that maintains a list of subscribers (observers)
 * and automatically notifies them when any changes occur by broadcasting notification,
 * also includes subset pattern known as Publish-Subscribe.
 * http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript
 * http://robdodson.me/blog/2012/08/16/javascript-design-patterns-observer/
 * https://github.com/millermedeiros/js-signals/wiki/Comparison-between-different-Observer-Pattern-implementations
 */

// Subject (maintains list of observers, adding and removing them)
function Subject () {
    this.observers = [];
}
Subject.prototype.addObserver = function (observer) {
    this.observers.push(observer);
};
Subject.prototype.removeObserver = function (observer) {
    for (var i = 0, l = this.observers.length; i < l; i++) {
        if (this.observers[i] === observer) {
            this.observers.splice(i, 1);
        }
    }
};
Subject.prototype.notify = function () {
    for (var i = 0, l = this.observers.length; i < l; i++) {
        this.observers[i].update.apply(this, arguments);
    }
};

// Observer (provides an update interface for objects that need to be notified of subject's changes)
function Observer () {
    this.update = function () {
        console.log('default');
    };
}

// Concrete Subject (broadcasts notifications to observers)
var newspaper = new Subject();
newspaper.newIssue = function () {
    var title = 'BREAKING! Martians do it better!';
    this.notify(title);
};

// Concrete Observer (implements the update interface to ensure consistent state with subject)
var jack = new Observer();
jack.update = function (what) {
    console.log('I just read "' + what + '".');
};
var jill = new Observer();
jill.update = function (what) {
    console.log('Do you heard that ' + what);
};

newspaper.addObserver(jack);
newspaper.addObserver(jill);
newspaper.newIssue();

// Publish-Subscribe Pattern
var pubsub = {
    topics: {},

    publish: function (topic, args) {
        var subscribers = this.topics[topic];
        if (!subscribers) {
            return false;
        }

        var len = subscribers.length || 0;
        while (len--) {
            subscribers[len](args);
        }
        return true;
    },

    subscribe: function (topic, fn) {
        var subscribers = this.topics[topic];
        if (!subscribers) {
            subscribers = this.topics[topic] = [];
        }
        subscribers.push(fn);

        return this;
    },

    unsubscribe: function (topic, fn) {
        for (var t in this.topics) {
            var subscribers = this.topics[t];
            if (subscribers) {
                for (var i = 0, l = subscribers.length; i < l; i++) {
                    if (subscribers[i] === fn) {
                        subscribers.splice(i, 1);
                        return true;
                    }
                }
            }
        }
        return false;
    }
};

var handler = function (data) {
    console.log('Received new message "%s" from %s', data.text, data.from);
};
pubsub.subscribe('message', handler);
pubsub.publish('message', {from: 'hello@gmail.com', text: 'How are you?'});
pubsub.unsubscribe('message', handler);
pubsub.publish('message');
