console.log('-----> Observer Patterns');

/**
 * Observer provides a subject object that maintains a list of subscribers (observers)
 * and automatically notifies them when any changes occur by broadcasting notification,
 * also includes subset pattern known as Publish-Subscribe.
 * http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript
 * http://robdodson.me/blog/2012/08/16/javascript-design-patterns-observer/
 * https://github.com/millermedeiros/js-signals/wiki/Comparison-between-different-Observer-Pattern-implementations
 */

var observer = {};

// Publish-Subscribe
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
