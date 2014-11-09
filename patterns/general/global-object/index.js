console.info('-----> Access to Global Object');

/**
 * Access the global object
 * (a.k.a `window` in browsers, `global` in node.js)
 */

// latest benchmarks - http://jsperf.com/globalx/10
var G = (function () {
    var indirectEval = (1, eval); // fixes jshint warnings (https://github.com/jshint/jshint/issues/1522)
    return this || indirectEval('this');
})();

console.log(G);
