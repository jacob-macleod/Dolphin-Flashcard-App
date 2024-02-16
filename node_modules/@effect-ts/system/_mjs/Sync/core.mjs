import { pipe } from "../Function/index.mjs";
import * as X from "../XPure/index.mjs";
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first chain_
 */

export const chain = X.chain;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */

export const chain_ = X.chain_;
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 *
 * @ets_data_first tap_
 */

export const tap = X.tap;
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */

export const tap_ = X.tap_;
/**
 * Constructs a computation that always succeeds with the specified value,
 * passing the state through unchanged.
 */

export const succeed = a => X.succeed(a);
/**
 * Constructs a computation that always succeeds with the specified value,
 * passing the state through unchanged.
 */

export const fail = X.fail;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */

export const map_ = X.map_;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first map_
 */

export const map = X.map;
/**
 * Recovers from errors by accepting one computation to execute for the case
 * of an error, and one computation to execute for the case of success.
 */

export const foldM_ = X.foldM_;
/**
 * Recovers from errors by accepting one computation to execute for the case
 * of an error, and one computation to execute for the case of success.
 *
 * @ets_data_first foldM_
 */

export const foldM = X.foldM;
/**
 * Folds over the failed or successful results of this computation to yield
 * a computation that does not fail, but succeeds with the value of the left
 * or righr function passed to `fold`.
 *
 * @ets_data_first fold_
 */

export const fold = X.fold;
/**
 * Folds over the failed or successful results of this computation to yield
 * a computation that does not fail, but succeeds with the value of the left
 * or righr function passed to `fold`.
 */

export const fold_ = X.fold_;
/**
 * Recovers from all errors.
 *
 * @ets_data_first catchAll_
 */

export const catchAll = X.catchAll;
/**
 * Recovers from all errors.
 */

export const catchAll_ = X.catchAll_;
/**
 * Returns a computation whose error and success channels have been mapped
 * by the specified functions, `f` and `g`.
 *
 * @ets_data_first bimap_
 */

export const bimap = X.bimap;
/**
 * Returns a computation whose error and success channels have been mapped
 * by the specified functions, `f` and `g`.
 */

export const bimap_ = X.bimap_;
/**
 * Transforms the error type of this computation with the specified
 * function.
 *
 * @ets_data_first mapError_
 */

export const mapError = X.mapError;
/**
 * Transforms the error type of this computation with the specified
 * function.
 */

export const mapError_ = X.mapError_;
/**
 * Constructs a computation that always returns the `Unit` value, passing the
 * state through unchanged.
 */

export const unit = /*#__PURE__*/succeed(undefined);
/**
 * Transforms the initial state of this computation` with the specified
 * function.
 */

export const provideSome = X.provideSome;
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 */

export const provide = X.provide;
/**
 * Provides this computation with its required environment.
 *
 * @ets_data_first provideAll_
 */

export const provideAll = X.provideAll;
/**
 * Provides this computation with its required environment.
 */

export const provideAll_ = X.provideAll_;
/**
 * Access the environment monadically
 */

export const accessM = X.accessM;
/**
 * Access the environment with the function f
 */

export const access = X.access;
/**
 * Access the environment
 */

export const environment = () => X.environment();
/**
 * Returns a computation whose failure and success have been lifted into an
 * `Either`. The resulting computation cannot fail, because the failure case
 * has been exposed as part of the `Either` success case.
 */

export const either = X.either;
/**
 * Executes this computation and returns its value, if it succeeds, but
 * otherwise executes the specified computation.
 *
 * @ets_data_first orElseEither_
 */

export const orElseEither = X.orElseEither;
/**
 * Executes this computation and returns its value, if it succeeds, but
 * otherwise executes the specified computation.
 */

export const orElseEither_ = X.orElseEither_;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both using the specified function.
 *
 * @ets_data_first zipWith_
 */

export const zipWith = X.zipWith;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both using the specified function.
 */

export const zipWith_ = X.zipWith_;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both into a tuple.
 *
 * @ets_data_first zip_
 */

export const zip = X.zip;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both into a tuple.
 */

export const zip_ = X.zip_;
/**
 * Suspend a computation, useful in recursion
 */

export const suspend = X.suspend;
/**
 * Lift a sync (non failable) computation
 */

export const succeedWith = X.succeedWith;
/**
 * Lift a sync (non failable) computation
 */

export const tryCatch = X.tryCatch;
/**
 * Runs this computation returning either an error of type E or a success of type A
 */

export const runEither = X.runEither;
/**
 * Runs this computation returning either an error of type E or a success of type A
 */

export const runEitherEnv = r => x => runEither(provideAll(r)(x));
/**
 * Runs this non failable computation returning a success of type A
 */

export const run = X.run;
/**
 * Compact the union produced by the result of f
 *
 * @ets_optimize identity
 */

export function unionFn(_) {
  return _;
}
/**
 * Compact the union
 *
 * @ets_optimize identity
 */

export function union(_) {
  return _;
}
//# sourceMappingURL=core.mjs.map