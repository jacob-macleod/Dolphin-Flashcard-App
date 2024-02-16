"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tryCatch = exports.tap_ = exports.tap = exports.suspend = exports.succeedWith = exports.succeed = exports.runEitherEnv = exports.runEither = exports.run = exports.provideSome = exports.provideAll_ = exports.provideAll = exports.provide = exports.orElseEither_ = exports.orElseEither = exports.map_ = exports.mapError_ = exports.mapError = exports.map = exports.fold_ = exports.foldM_ = exports.foldM = exports.fold = exports.fail = exports.environment = exports.either = exports.chain_ = exports.chain = exports.catchAll_ = exports.catchAll = exports.bimap_ = exports.bimap = exports.accessM = exports.access = void 0;
exports.union = union;
exports.unionFn = unionFn;
exports.zip_ = exports.zipWith_ = exports.zipWith = exports.zip = exports.unit = void 0;

var _index = /*#__PURE__*/require("../Function/index.js");

var X = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../XPure/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first chain_
 */
const chain = X.chain;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */

exports.chain = chain;
const chain_ = X.chain_;
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 *
 * @ets_data_first tap_
 */

exports.chain_ = chain_;
const tap = X.tap;
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */

exports.tap = tap;
const tap_ = X.tap_;
/**
 * Constructs a computation that always succeeds with the specified value,
 * passing the state through unchanged.
 */

exports.tap_ = tap_;

const succeed = a => X.succeed(a);
/**
 * Constructs a computation that always succeeds with the specified value,
 * passing the state through unchanged.
 */


exports.succeed = succeed;
const fail = X.fail;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */

exports.fail = fail;
const map_ = X.map_;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first map_
 */

exports.map_ = map_;
const map = X.map;
/**
 * Recovers from errors by accepting one computation to execute for the case
 * of an error, and one computation to execute for the case of success.
 */

exports.map = map;
const foldM_ = X.foldM_;
/**
 * Recovers from errors by accepting one computation to execute for the case
 * of an error, and one computation to execute for the case of success.
 *
 * @ets_data_first foldM_
 */

exports.foldM_ = foldM_;
const foldM = X.foldM;
/**
 * Folds over the failed or successful results of this computation to yield
 * a computation that does not fail, but succeeds with the value of the left
 * or righr function passed to `fold`.
 *
 * @ets_data_first fold_
 */

exports.foldM = foldM;
const fold = X.fold;
/**
 * Folds over the failed or successful results of this computation to yield
 * a computation that does not fail, but succeeds with the value of the left
 * or righr function passed to `fold`.
 */

exports.fold = fold;
const fold_ = X.fold_;
/**
 * Recovers from all errors.
 *
 * @ets_data_first catchAll_
 */

exports.fold_ = fold_;
const catchAll = X.catchAll;
/**
 * Recovers from all errors.
 */

exports.catchAll = catchAll;
const catchAll_ = X.catchAll_;
/**
 * Returns a computation whose error and success channels have been mapped
 * by the specified functions, `f` and `g`.
 *
 * @ets_data_first bimap_
 */

exports.catchAll_ = catchAll_;
const bimap = X.bimap;
/**
 * Returns a computation whose error and success channels have been mapped
 * by the specified functions, `f` and `g`.
 */

exports.bimap = bimap;
const bimap_ = X.bimap_;
/**
 * Transforms the error type of this computation with the specified
 * function.
 *
 * @ets_data_first mapError_
 */

exports.bimap_ = bimap_;
const mapError = X.mapError;
/**
 * Transforms the error type of this computation with the specified
 * function.
 */

exports.mapError = mapError;
const mapError_ = X.mapError_;
/**
 * Constructs a computation that always returns the `Unit` value, passing the
 * state through unchanged.
 */

exports.mapError_ = mapError_;
const unit = /*#__PURE__*/succeed(undefined);
/**
 * Transforms the initial state of this computation` with the specified
 * function.
 */

exports.unit = unit;
const provideSome = X.provideSome;
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 */

exports.provideSome = provideSome;
const provide = X.provide;
/**
 * Provides this computation with its required environment.
 *
 * @ets_data_first provideAll_
 */

exports.provide = provide;
const provideAll = X.provideAll;
/**
 * Provides this computation with its required environment.
 */

exports.provideAll = provideAll;
const provideAll_ = X.provideAll_;
/**
 * Access the environment monadically
 */

exports.provideAll_ = provideAll_;
const accessM = X.accessM;
/**
 * Access the environment with the function f
 */

exports.accessM = accessM;
const access = X.access;
/**
 * Access the environment
 */

exports.access = access;

const environment = () => X.environment();
/**
 * Returns a computation whose failure and success have been lifted into an
 * `Either`. The resulting computation cannot fail, because the failure case
 * has been exposed as part of the `Either` success case.
 */


exports.environment = environment;
const either = X.either;
/**
 * Executes this computation and returns its value, if it succeeds, but
 * otherwise executes the specified computation.
 *
 * @ets_data_first orElseEither_
 */

exports.either = either;
const orElseEither = X.orElseEither;
/**
 * Executes this computation and returns its value, if it succeeds, but
 * otherwise executes the specified computation.
 */

exports.orElseEither = orElseEither;
const orElseEither_ = X.orElseEither_;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both using the specified function.
 *
 * @ets_data_first zipWith_
 */

exports.orElseEither_ = orElseEither_;
const zipWith = X.zipWith;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both using the specified function.
 */

exports.zipWith = zipWith;
const zipWith_ = X.zipWith_;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both into a tuple.
 *
 * @ets_data_first zip_
 */

exports.zipWith_ = zipWith_;
const zip = X.zip;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both into a tuple.
 */

exports.zip = zip;
const zip_ = X.zip_;
/**
 * Suspend a computation, useful in recursion
 */

exports.zip_ = zip_;
const suspend = X.suspend;
/**
 * Lift a sync (non failable) computation
 */

exports.suspend = suspend;
const succeedWith = X.succeedWith;
/**
 * Lift a sync (non failable) computation
 */

exports.succeedWith = succeedWith;
const tryCatch = X.tryCatch;
/**
 * Runs this computation returning either an error of type E or a success of type A
 */

exports.tryCatch = tryCatch;
const runEither = X.runEither;
/**
 * Runs this computation returning either an error of type E or a success of type A
 */

exports.runEither = runEither;

const runEitherEnv = r => x => runEither(provideAll(r)(x));
/**
 * Runs this non failable computation returning a success of type A
 */


exports.runEitherEnv = runEitherEnv;
const run = X.run;
/**
 * Compact the union produced by the result of f
 *
 * @ets_optimize identity
 */

exports.run = run;

function unionFn(_) {
  return _;
}
/**
 * Compact the union
 *
 * @ets_optimize identity
 */


function union(_) {
  return _;
}
//# sourceMappingURL=core.js.map