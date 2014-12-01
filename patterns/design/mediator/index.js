console.log('-----> Mediator Pattern');

/**
 * Mediator coordinates interaction between multiple objects (controlling the workflow).
 * Provides loose coupling between objects as they don't need to refer on each other explicitly.
 * http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#mediatorpatternjavascript
 */

function Plane (from, to) {
    this.from = from;
    this.to = to;
    this.airport = null;
}
Plane.prototype.arrive = function (runwayId) {
    console.log('Plane from %s arrived on %s runway', this.from, runwayId);
};
Plane.prototype.departure = function (runwayId) {
    console.log('Plane to %s departured from %s runway', this.to, runwayId);
};
Plane.prototype.wait = function () {
    var self = this;
    console.log('Plane from %s to %s waits for free runway..', self.from, self.to);

    var interval = setInterval(function () {
        var runway = self.airport.checkRunway(self);
        if (runway) {
            self.airport.land(self, runway);
            clearInterval(interval);
        }
    }, 300);
};

function Runway (id) {
    this.busy = false;
    this.id = 'R'+id;
}
Runway.prototype.block = function () {
    this.busy = true;
    console.log('Runway %s won\'t be available for planes', this.id);
};
Runway.prototype.unblock = function () {
    this.busy = false;
    console.log('Runway %s is ready to host planes', this.id);
};

// Mediator
var airport = {
    name: 'Paris',

    runways: [],

    maxRunways: 3,

    startWork: function () {
        for (var i = 0; i < this.maxRunways; i++) {
            var runway = new Runway(i+1);
            this.runways.push(runway);
        }
        console.log('%s airport starts its work!', this.name);
    },

    register: function (plane) {
        // handing mediator reference to child objects
        // could be implemented with pub/sub, etc.
        plane.airport = this;

        var runway = this.checkRunway();
        if (!runway) {
            plane.wait();
        } else {
            this.land(plane, runway);
        }
    },

    land: function (plane, runway) {
        runway.block();

        if (plane.from === this.name) {
            plane.departure(runway.id);
        } else if (plane.to === this.name) {
            plane.arrive(runway.id);
        }

        // we need some time to clean runway
        setTimeout(function () {
            runway.unblock();
        }, 500);
    },

    checkRunway: function () {
        var i = this.runways.length;
        while (i--) {
            var runway = this.runways[i];
            if (!runway.busy) {
                return runway;
            }
        }
        return false;
    }
};

airport.startWork();

airport.register(new Plane('Tokyo', 'Paris'));
airport.register(new Plane('London', 'Paris'));
airport.register(new Plane('New York', 'Paris'));
airport.register(new Plane('Amsterdam', 'Paris'));

setTimeout(function () {
    airport.register(new Plane('Paris', 'Kiev'));
}, 1000);
