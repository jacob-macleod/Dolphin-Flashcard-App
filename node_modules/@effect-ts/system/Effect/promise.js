"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promise = promise;
exports.tryCatchPromise = tryCatchPromise;
exports.tryPromise = tryPromise;

var _index = /*#__PURE__*/require("../Function/index.js");

var _core = /*#__PURE__*/require("./core.js");

var _die = /*#__PURE__*/require("./die.js");

var _effectAsync = /*#__PURE__*/require("./effectAsync.js");

var _fail = /*#__PURE__*/require("./fail.js");

/**
 * Create an Effect that when executed will construct `promise` and wait for its result,
 * errors will be handled using `onReject`
 */
function tryCatchPromise(promise, onReject, __trace) {
  return (0, _effectAsync.effectAsync)(resolve => {
    promise().then(x => resolve((0, _core.succeed)(x))).catch(x => resolve((0, _fail.fail)(onReject(x))));
  }, __trace);
}
/**
 * Create an Effect that when executed will construct `promise` and wait for its result,
 * errors will produce failure as `unknown`
 */


function tryPromise(effect, __trace) {
  return (0, _effectAsync.effectAsync)(resolve => {
    effect().then(x => resolve((0, _core.succeed)(x))).catch(x => resolve((0, _fail.fail)(x)));
  }, __trace);
}
/**
 * Like tryPromise but produces a defect in case of errors
 */


function promise(effect, __trace) {
  return (0, _effectAsync.effectAsync)(resolve => {
    effect().then(x => resolve((0, _core.succeed)(x))).catch(x => resolve((0, _die.die)(x)));
  }, __trace);
}
//# sourceMappingURL=promise.js.map