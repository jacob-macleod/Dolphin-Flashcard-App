import * as T from "./_internal/effect.mjs";
import * as Exit from "./core.mjs";
/**
 * Folds over the value or cause.
 */

export function foldM(failed, succeed) {
  return exit => foldM_(exit, failed, succeed);
}
/**
 * Folds over the value or cause.
 */

export function foldM_(exit, failed, succeed) {
  switch (exit._tag) {
    case "Success":
      {
        return succeed(exit.value);
      }

    case "Failure":
      {
        return failed(exit.cause);
      }
  }
}
/**
 * Applies the function `f` to the successful result of the `Exit` and
 * returns the result in a new `Exit`.
 */

export function forEach(f) {
  return exit => forEach_(exit, f);
}
/**
 * Applies the function `f` to the successful result of the `Exit` and
 * returns the result in a new `Exit`.
 */

export function forEach_(exit, f) {
  switch (exit._tag) {
    case "Failure":
      {
        return T.succeed(Exit.halt(exit.cause));
      }

    case "Success":
      {
        return T.result(f(exit.value));
      }
  }
}
export { succeed, Success, Failure, halt, ap, as, chain, collectAll, flatten, fold, interrupt, interrupted, map, mapErrorCause, zipWith, bimap, chain_, collectAllPar, die, exists, fail, fold_, fromEither, fromOption, getOrElse, mapError, map_, orElseFail, succeeded, toEither, unit, zip, zipLeft, zipPar, zipParLeft, zipParRight, zipRight, zipRight_, zipWith_ } from "./core.mjs";
//# sourceMappingURL=api.mjs.map