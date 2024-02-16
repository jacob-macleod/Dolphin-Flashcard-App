// ets_tracing: off
import * as C from "../Cause/core.mjs";
import { FiberFailure } from "../Cause/errors.mjs";
import * as A from "../Collections/Immutable/Array/index.mjs";
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import * as E from "../Either/index.mjs";
import { identity, pipe } from "../Function/index.mjs";
import * as O from "../Option/index.mjs";
import { Failure, Success } from "./exit.mjs";
export { Failure, Success } from "./exit.mjs";
/**
 * Applicative's ap
 */

export function ap_(fa, fab) {
  return chain_(fab, f => map_(fa, a => f(a)));
}
/**
 * Applicative's ap
 *
 * @ets_data_first ap_
 */

export function ap(fa) {
  return fab => ap_(fa, fab);
}
/**
 * Replaces the success value with the one provided.
 */

export function as_(exit, b) {
  return map_(exit, () => b);
}
/**
 * Replaces the success value with the one provided.
 *
 * @ets_data_first as_
 */

export function as(b) {
  return exit => as_(exit, b);
}
/**
 * Maps over both the error and value type.
 */

export function bimap_(exit, f, g) {
  return mapError(f)(map(g)(exit));
}
/**
 * Maps over both the error and value type.
 *
 * @ets_data_first bimap_
 */

export function bimap(f, g) {
  return exit => bimap_(exit, f, g);
}
/**
 * Flat maps over the value type.
 */

export function chain_(exit, f) {
  switch (exit._tag) {
    case "Failure":
      {
        return exit;
      }

    case "Success":
      {
        return f(exit.value);
      }
  }
}
/**
 * Flat maps over the value type.
 *
 * @ets_data_first chain_
 */

export function chain(f) {
  return exit => chain_(exit, f);
}
/**
 * Collects all the success states and merges sequentially the causes
 */

export function collectAll(...exits) {
  return O.map_(A.head(exits), head => map(A.reverse)(A.reduce_(A.drop_(exits, 1), map(x => [x])(head), (acc, el) => zipWith(el, (acc, el) => [el, ...acc], C.combineSeq)(acc))));
}
/**
 * Zips this together with the specified result using the combination functions.
 */

export function zipWith_(exit, that, f, g) {
  switch (exit._tag) {
    case "Failure":
      {
        switch (that._tag) {
          case "Success":
            {
              return exit;
            }

          case "Failure":
            {
              return halt(g(exit.cause, that.cause));
            }
        }
      }
    // eslint-disable-next-line no-fallthrough

    case "Success":
      {
        switch (that._tag) {
          case "Success":
            {
              return succeed(f(exit.value, that.value));
            }

          case "Failure":
            {
              return that;
            }
        }
      }
  }
}
/**
 * Zips this together with the specified result using the combination functions.
 *
 * @ets_data_first zipWith_
 */

export function zipWith(that, f, g) {
  return exit => zipWith_(exit, that, f, g);
}
/**
 * Collects all the success states and merges the causes in parallel
 */

export function collectAllPar(...exits) {
  return O.map_(A.head(exits), head => map(A.reverse)(A.reduce_(A.drop_(exits, 1), map(x => [x])(head), (acc, el) => zipWith(el, (acc, el) => [el, ...acc], C.combinePar)(acc))));
}
/**
 * Construct an Exit with an unchecked cause containing the specified error
 */

export function die(error) {
  return halt(C.die(error));
}
/**
 * Returns f(a) if the exit is successful
 */

export function exists_(exit, f) {
  return fold(() => false, f)(exit);
}
/**
 * Returns f(a) if the exit is successful
 *
 * @ets_data_first exists_
 */

export function exists(f) {
  return exit => exists_(exit, f);
}
/**
 * Constructs a failed exit with the specified checked error
 */

export function fail(e) {
  return halt(C.fail(e));
}
/**
 * Constructs a failed exit with the specified cause
 */

export function failCause(cause) {
  return new Failure(cause);
}
/**
 * Flatten nested Exits
 */

export function flatten(exit) {
  return chain(identity)(exit);
}
/**
 * Folds over the value or cause.
 */

export function fold_(exit, failed, succeed) {
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
 * Folds over the value or cause.
 *
 * @ets_data_first fold_
 */

export function fold(failed, succeed) {
  return exit => fold_(exit, failed, succeed);
}
/**
 * Embeds Either's Error & Success in an Exit
 */

export function fromEither(e) {
  return e._tag === "Left" ? fail(e.left) : succeed(e.right);
}
/**
 * Embeds an option result into an Exit with the specified error using onNone
 */

export function fromOption(onNone) {
  return a => a._tag === "None" ? fail(onNone()) : succeed(a.value);
}
/**
 * Get successful result falling back to orElse result in case of failure
 */

export function getOrElse_(exit, orElse) {
  switch (exit._tag) {
    case "Success":
      {
        return exit.value;
      }

    case "Failure":
      {
        return orElse(exit.cause);
      }
  }
}
/**
 * Get successful result falling back to orElse result in case of failure
 *
 * @ets_data_first getOrElse_
 */

export function getOrElse(orElse) {
  return exit => getOrElse_(exit, orElse);
}
/**
 * Constructs a failed exit with the specified cause
 */

export function halt(cause) {
  return new Failure(cause);
}
/**
 * Constructs an exit with the specified interruption state
 */

export function interrupt(id) {
  return halt(C.interrupt(id));
}
/**
 * Returns if Exit contains an interruption state
 */

export function interrupted(exit) {
  switch (exit._tag) {
    case "Success":
      {
        return false;
      }

    case "Failure":
      {
        return C.interrupted(exit.cause);
      }
  }
}
/**
 * Maps over the value type.
 */

export function map_(exit, f) {
  return chain(a => succeed(f(a)))(exit);
}
/**
 * Maps over the value type.
 *
 * @ets_data_first map_
 */

export function map(f) {
  return exit => map_(exit, f);
}
/**
 * Maps over the error type.
 */

export function mapError_(exit, f) {
  switch (exit._tag) {
    case "Failure":
      {
        return halt(C.map(f)(exit.cause));
      }

    case "Success":
      {
        return exit;
      }
  }
}
/**
 * Maps over the error type.
 *
 * @ets_data_first mapError_
 */

export function mapError(f) {
  return exit => mapError_(exit, f);
}
/**
 * Maps over the cause type.
 */

export function mapErrorCause_(exit, f) {
  switch (exit._tag) {
    case "Failure":
      {
        return halt(f(exit.cause));
      }

    case "Success":
      {
        return exit;
      }
  }
}
/**
 * Maps over the cause type.
 *
 * @ets_data_first mapErrorCause_
 */

export function mapErrorCause(f) {
  return exit => mapErrorCause_(exit, f);
}
/**
 * Replaces the error value with the one provided.
 */

export function orElseFail_(exit, e) {
  return mapError(() => e)(exit);
}
/**
 * Replaces the error value with the one provided.
 *
 * @ets_data_first orElseFail_
 */

export function orElseFail(e) {
  return exit => orElseFail_(exit, e);
}
/**
 * Construct a succeeded exit with the specified value
 */

export function succeed(a) {
  return new Success(a);
}
/**
 * Returns if an exit is succeeded
 */

export function succeeded(exit) {
  switch (exit._tag) {
    case "Failure":
      {
        return false;
      }

    case "Success":
      {
        return true;
      }
  }
}
/**
 * Converts the `Exit` to an `Either<FiberFailure, A>`, by wrapping the
 * cause in `FiberFailure` (if the result is failed).
 */

export function toEither(exit) {
  switch (exit._tag) {
    case "Success":
      {
        return E.right(exit.value);
      }

    case "Failure":
      {
        return E.left(new FiberFailure(exit.cause));
      }
  }
}
/**
 * Discards the value.
 */

export const unit = /*#__PURE__*/succeed(undefined);
/**
 * Sequentially zips the this result with the specified result or else returns the failed `Cause[E1]`
 */

export function zip_(exit, that) {
  return zipWith(that, (a, b) => Tp.tuple(a, b), C.combineSeq)(exit);
}
/**
 * Sequentially zips the this result with the specified result or else returns the failed `Cause[E1]`
 *
 * @ets_data_first zip_
 */

export function zip(that) {
  return exit => zip_(exit, that);
}
/**
 * Sequentially zips the this result with the specified result discarding the second element of the tuple or else returns the failed `Cause[E1]`
 */

export function zipLeft_(exit, that) {
  return zipWith(that, (a, _) => a, C.combineSeq)(exit);
}
/**
 * Sequentially zips the this result with the specified result discarding the second element of the tuple or else returns the failed `Cause[E1]`
 *
 * @ets_data_first zipLeft_
 */

export function zipLeft(that) {
  return exit => zipLeft_(exit, that);
}
/**
 * Parallelly zips the this result with the specified result or else returns the failed `Cause[E1]`
 */

export function zipPar_(exit, that) {
  return zipWith(that, (a, b) => Tp.tuple(a, b), C.combinePar)(exit);
}
/**
 * Parallelly zips the this result with the specified result or else returns the failed `Cause[E1]`
 *
 * @ets_data_first zipPar_
 */

export function zipPar(that) {
  return exit => zipPar_(exit, that);
}
/**
 * Parallelly zips the this result with the specified result discarding the second element of the tuple or else returns the failed `Cause[E1]`
 */

export function zipParLeft_(exit, that) {
  return zipWith(that, (a, _) => a, C.combinePar)(exit);
}
/**
 * Parallelly zips the this result with the specified result discarding the second element of the tuple or else returns the failed `Cause[E1]`
 *
 * @ets_data_first zipParLeft_
 */

export function zipParLeft(that) {
  return exit => zipParLeft_(exit, that);
}
/**
 * Parallelly zips the this result with the specified result discarding the first element of the tuple or else returns the failed `Cause[E1]`
 */

export function zipParRight_(exit, that) {
  return zipWith(that, (_, b) => b, C.combinePar)(exit);
}
/**
 * Parallelly zips the this result with the specified result discarding the first element of the tuple or else returns the failed `Cause[E1]`
 *
 * @ets_data_first zipParRight_
 */

export function zipParRight(that) {
  return exit => zipParRight_(exit, that);
}
/**
 * Sequentially zips the this result with the specified result discarding the first element of the tuple or else returns the failed `Cause[E1]`
 */

export function zipRight_(exit, that) {
  return zipWith(that, (_, b) => b, C.combineSeq)(exit);
}
/**
 * Sequentially zips the this result with the specified result discarding the first element of the tuple or else returns the failed `Cause[E1]`
 *
 * @ets_data_first zipRight_
 */

export function zipRight(that) {
  return exit => zipRight_(exit, that);
}
/**
 * Returns an untraced exit value.
 */

export function untraced(self) {
  return self._tag === "Success" ? self : halt(C.untraced(self.cause));
}
/**
 * Asserts an exit is a failure
 */

export function assertsFailure(exit) {
  if (exit._tag === "Success") {
    throw new Error("expected a failed exit and got success");
  }
}
/**
 * Maps over both the error and value type.
 */

export function mapBoth_(self, f, g) {
  return map_(mapError_(self, f), g);
}
/**
 * Maps over both the error and value type.
 *
 * @ets_data_first mapBoth_
 */

export function mapBoth(f, g) {
  return self => mapBoth_(self, f, g);
}
//# sourceMappingURL=core.mjs.map