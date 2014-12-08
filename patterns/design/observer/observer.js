// # Observer
console.log('-----> Observer Patterns');

// Observer provides a subject object that maintains a list of subscribers (observers)
// and automatically notifies them when any changes occur by broadcasting notification.
//
// - [Addy Osmani "Javascript Design Patterns"](http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript)
// - [Rob Dodson "Javascript Observer Pattern"](http://robdodson.me/blog/2012/08/16/javascript-design-patterns-observer)
//
// Also there is a pattern's subset known as [**Publish-Subscribe**](observer.html#section-9).
//
// - ["Comparison between pattern implementations"](https://github.com/millermedeiros/js-signals/wiki/Comparison-between-different-Observer-Pattern-implementations)

// Observer Pattern
// ---

// **Subject** - maintains list of observers, adding and removing them.
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

// **Observer** - provides an update interface for objects that need to be notified of subject's changes.
function Observer () {
    this.update = function () {
        console.log('default');
    };
}

// **Concrete Subject** - broadcasts notifications to observers.
var newspaper = new Subject();
newspaper.newIssue = function () {
    var title = 'BREAKING! Martians do it better!';
    this.notify(title);
};

// **Concrete Observers** - implement the update interface to ensure consistent state with subject.
var jack = new Observer();
jack.update = function (what) {
    console.log('I just read "' + what + '".');
};
var jill = new Observer();
jill.update = function (what) {
    console.log('Do you heard that "' + what + '"?');
};

// ### Example
newspaper.addObserver(jack);
newspaper.addObserver(jill);

// Both observers will be notified on new issue:
//
// `I just read "BREAKING! Martians do it better!".`
//
// `Do you heard that "BREAKING! Martians do it better!"?`
newspaper.newIssue();

// Publish-Subscribe Pattern
// ---
//
// Differencies:
// - uses topic/event channel
// - decouples dependencies between subscriber and publisher
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

// ### Example
// Start and stops to listen on the topic.
var logger = {
    handler: function (data) {
        console.log('Received new message "%s" from %s', data.text, data.from);
    },
    init: function () {
        pubsub.subscribe('message', this.handler);
    },
    close: function () {
        pubsub.unsubscribe('message', this.handler);
    }
};

// All subscibers that listen to `message` topic will be notified with the data.
var gmail = {
    message: function () {
        pubsub.publish('message', {from: 'hello@gmail.com', text: 'How are you?'});
    }
};

logger.init();
gmail.message();
logger.close();
gmail.message();
