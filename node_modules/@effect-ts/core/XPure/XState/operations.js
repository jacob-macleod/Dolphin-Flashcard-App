"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zip = exports.tap = exports.succeed = exports.runState = exports.runResult = exports.run = exports.map = exports.chain = void 0;

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/XPure"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Combines this computation with the specified computation.
 */
const zip = F.zip;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */

exports.zip = zip;
const chain = F.chain;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>`
 *  whose argument and return types use the type constructor `F` to represent
 *  some computational context.
 */

exports.chain = chain;
const map = F.map;
/**
 * Succeed with a value A
 */

exports.map = map;
const succeed = F.succeed;
/**
 * Run the computation with input S returning updated state and output
 */

exports.succeed = succeed;

const run = s => self => F.runState_(self, s);
/**
 * Run the computation with input S returning the updated state and discarding the output
 */


exports.run = run;

const runState = s => self => F.runState_(self, s)[0];
/**
 * Run the computation with input S returning the state and discarding the updated state
 */


exports.runState = runState;

const runResult = r => self => F.runResult(r)(self);
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */


exports.runResult = runResult;
const tap = F.tap;
exports.tap = tap;
//# sourceMappingURL=operations.js.map