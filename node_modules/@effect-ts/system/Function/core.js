"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.absurd = absurd;
exports.constVoid = exports.constUndefined = exports.constTrue = exports.constNull = exports.constFalse = void 0;
exports.constant = constant;
exports.decrement = decrement;
exports.enforceContext = enforceContext;
exports.enforceError = enforceError;
exports.enforceOutput = enforceOutput;
exports.flip = flip;
Object.defineProperty(exports, "flow", {
  enumerable: true,
  get: function () {
    return _flow.flow;
  }
});
exports.hole = hole;
exports.identity = identity;
exports.increment = increment;
exports.literal = literal;
exports.not = not;
Object.defineProperty(exports, "pipe", {
  enumerable: true,
  get: function () {
    return _pipe.pipe;
  }
});
exports.tuple = tuple;
exports.tupled = tupled;
exports.unsafeCoerce = unsafeCoerce;
exports.untupled = untupled;

var _flow = /*#__PURE__*/require("./flow.js");

var _pipe = /*#__PURE__*/require("./pipe.js");

/**
 * Will raise if called
 */
function absurd(_) {
  throw new Error("Called `absurd` function which should be uncallable");
}
/**
 * A constant function that always return A
 */


function constant(a) {
  return () => a;
}
/**
 * A thunk that returns always `false`
 */


const constFalse = () => {
  return false;
};
/**
 * A thunk that returns always `null`
 */


exports.constFalse = constFalse;

const constNull = () => {
  return null;
};
/**
 * A thunk that returns always `true`
 */


exports.constNull = constNull;

const constTrue = () => {
  return true;
};
/**
 * A thunk that returns always `undefined`
 */


exports.constTrue = constTrue;

const constUndefined = () => {
  return;
};
/**
 * A thunk that returns always `void`
 */


exports.constUndefined = constUndefined;

const constVoid = () => {
  return;
};
/**
 * Flips the order of the arguments of a function of two arguments.
 */


exports.constVoid = constVoid;

function flip(f) {
  return (b, a) => f(a, b);
}
/**
 * Identity function
 *
 * @ets_optimize identity
 */


function identity(a) {
  return a;
}
/**
 * Force string to be literal
 *
 * @ets_optimize identity
 */


function literal(k) {
  return k;
}
/**
 * Inverts a boolean predicate
 */


function not(predicate) {
  return a => !predicate(a);
}
/**
 * Construct tuples
 */


function tuple(...t) {
  return t;
}
/**
 * Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.
 *
 * @example
 * const add = tupled((x: number, y: number): number => x + y)
 *
 * assert.strictEqual(add([1, 2]), 3)
 */


function tupled(f) {
  return a => f(...a);
}
/**
 * Inverse function of `tupled`
 */


function untupled(f) {
  return (...a) => f(a);
}
/**
 * Performs unsafe coercion of types
 *
 * @ets_optimize identity
 */


function unsafeCoerce(a) {
  return a;
}
/**
 * Type Hole, to be used while implementing functions where you need a placeholder
 */


function hole() {
  throw new Error("Hole should never be called");
}
/**
 * Requires _A to be the one specified
 */


function enforceOutput() {
  return (
    /**
     * @ets_optimize identity
     */
    _ => _
  );
}
/**
 * Requires _E to be the one specified
 */


function enforceError() {
  return (
    /**
     * @ets_optimize identity
     */
    _ => _
  );
}
/**
 * Requires _R to be the one specified
 */


function enforceContext() {
  return (
    /**
     * @ets_optimize identity
     */
    _ => _
  );
}
/**
 * Increments a number by one
 */


function increment(n) {
  return n + 1;
}
/**
 * Decrements a number by one
 */


function decrement(n) {
  return n - 1;
}
//# sourceMappingURL=core.js.map