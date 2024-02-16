"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zip = exports.tap = exports.sync = exports.succeed = exports.runEnv = exports.run = exports.provideSome = exports.map = exports.environment = exports.chain = exports.access = void 0;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Collections/Immutable/Tuple"));

var _index = /*#__PURE__*/require("../Function/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Lift a sync (non failable) computation
 */
const sync = _index.identity;
/**
 * Reads the current context
 */

exports.sync = sync;

const environment = () => _index.identity;
/**
 * Projects a value from the global context in a Reader
 */


exports.environment = environment;
const access = _index.identity;
/**
 * Changes the value of the local context during the execution of the action `ma`
 */

exports.access = access;

const provideSome = f => ma => r => ma(f(r));
/**
 * Combines this computation with the specified computation.
 */


exports.provideSome = provideSome;

const zip = fb => fa => r => Tp.tuple(fa(r), fb(r));
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */


exports.zip = zip;

const chain = f => fa => r => f(fa(r))(r);
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>`
 *  whose argument and return types use the type constructor `F` to represent
 *  some computational context.
 */


exports.chain = chain;

const map = f => fa => r => f(fa(r));
/**
 * Succeed with a value A
 */


exports.map = map;

const succeed = a => () => a;
/**
 * Run the computation
 */


exports.succeed = succeed;

const run = self => self({});
/**
 * Run the computation with environment R
 */


exports.run = run;

const runEnv = r => self => self(r);
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */


exports.runEnv = runEnv;

const tap = f => fa => r => {
  const x = fa(r);
  f(x)(r);
  return x;
};

exports.tap = tap;
//# sourceMappingURL=operations.js.map