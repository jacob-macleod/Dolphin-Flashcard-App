// ets_tracing: off

/* eslint-disable prefer-const */
import * as A from "../Collections/Immutable/Array/index.mjs";
import * as E from "../Either/index.mjs";
import { identity, pipe } from "../Function/index.mjs";
import * as S from "../IO/index.mjs";
import * as O from "../Option/index.mjs";
import { Stack } from "../Stack/index.mjs";
import { combinePar, combineSeq, die, empty, fail, interrupt, traced } from "./cause.mjs";
import { InterruptedException } from "./errors.mjs";
export { combinePar, die, empty, fail, interrupt, combineSeq, traced, isEmpty } from "./cause.mjs";
/**
 * Applicative's ap
 */

export function ap(fa) {
  return chain(f => map(f)(fa));
}
/**
 * Substitute the E in the cause
 */

export function as(e) {
  return map(() => e);
}
/**
 * Builds a Cause depending on the result of another
 */

export function chain_(cause, f) {
  return S.run(chainSafe_(cause, f));
}
/**
 * Builds a Cause depending on the result of another
 */

export function chain(f) {
  return cause => chain_(cause, f);
}
/**
 * Builds a Cause depending on the result of another
 */

export function chainSafe_(cause, f) {
  switch (cause._tag) {
    case "Empty":
      {
        return S.succeed(empty);
      }

    case "Fail":
      {
        return S.succeed(f(cause.value));
      }

    case "Die":
      {
        return S.succeed(cause);
      }

    case "Interrupt":
      {
        return S.succeed(cause);
      }

    case "Then":
      {
        return S.zipWith_(S.suspend(() => chainSafe_(cause.left, f)), S.suspend(() => chainSafe_(cause.right, f)), (l, r) => combineSeq(l, r));
      }

    case "Both":
      {
        return S.zipWith_(S.suspend(() => chainSafe_(cause.left, f)), S.suspend(() => chainSafe_(cause.right, f)), (l, r) => combinePar(l, r));
      }

    case "Traced":
      {
        return S.map_(chainSafe_(cause.cause, f), x => traced(x, cause.trace));
      }
  }
}
/**
 * Equivalent to chain((a) => Fail(f(a)))
 */

export function map_(cause, f) {
  return chain_(cause, e => fail(f(e)));
}
/**
 * Equivalent to chain((a) => Fail(f(a)))
 */

export function map(f) {
  return cause => map_(cause, f);
}
/**
 * Determines if this cause contains or is equal to the specified cause.
 */

export function contains(that) {
  return cause => S.run(containsSafe(that)(cause));
}
/**
 * Determines if this cause contains or is equal to the specified cause.
 */

export function containsSafe(that) {
  return cause => S.gen(function* (_) {
    if (yield* _(cause.equalsSafe(that))) {
      return true;
    }

    return yield* _(reduceLeft(S.succeed(false))((_, c) => O.some(S.chain_(_, b => b ? S.succeed(b) : c.equalsSafe(that))))(cause));
  });
}
/**
 * Extracts a list of non-recoverable errors from the `Cause`.
 */

export function defects(cause) {
  return reduceLeft([])((a, c) => c._tag === "Die" ? O.some([...a, c.value]) : O.none)(cause);
}
/**
 * Returns the `Error` associated with the first `Die` in this `Cause` if
 * one exists.
 */

export function dieOption(cause) {
  return find(c => c._tag === "Die" ? O.some(c.value) : O.none)(cause);
}
/**
 * Returns if a cause contains a defect
 */

export function died(cause) {
  return O.getOrElse_(O.map_(dieOption(cause), () => true), () => false);
}
/**
 * Returns the `E` associated with the first `Fail` in this `Cause` if one
 * exists.
 */

export function failureOption(cause) {
  return find(c => c._tag === "Fail" ? O.some(c.value) : O.none)(cause);
}
/**
 * Returns if the cause has a failure in it
 */

export function failed(cause) {
  return O.getOrElse_(O.map_(failureOption(cause), () => true), () => false);
}
/**
 * Retrieve the first checked error on the `Left` if available,
 * if there are no checked errors return the rest of the `Cause`
 * that is known to contain only `Die` or `Interrupt` causes.
 * */

export function failureOrCause(cause) {
  return O.getOrElse_(O.map_(failureOption(cause), E.left), () => E.right(cause));
}
/**
 * Produces a list of all recoverable errors `E` in the `Cause`.
 */

export function failures(cause) {
  return reduceLeft([])((a, c) => c._tag === "Fail" ? O.some([...a, c.value]) : O.none)(cause);
}
/**
 * Remove all `Die` causes that the specified partial function is defined at,
 * returning `Some` with the remaining causes or `None` if there are no
 * remaining causes.
 */

export function stripSomeDefects(f) {
  return cause => {
    return S.run(stripSomeDefectsSafe(cause, f));
  };
}
/**
 * Remove all `Die` causes that the specified partial function is defined at,
 * returning `Some` with the remaining causes or `None` if there are no
 * remaining causes.
 */

export function stripSomeDefects_(cause, f) {
  return S.run(stripSomeDefectsSafe(cause, f));
}
/**
 * Filter out all `Die` causes according to the specified function,
 * returning `Some` with the remaining causes or `None` if there are no
 * remaining causes.
 */

export function stripSomeDefectsSafe(cause, f) {
  switch (cause._tag) {
    case "Empty":
      {
        return S.succeed(O.none);
      }

    case "Interrupt":
      {
        return S.succeed(O.some(cause));
      }

    case "Fail":
      {
        return S.succeed(O.some(cause));
      }

    case "Die":
      {
        return S.succeed(O.map_(f(cause.value), die));
      }

    case "Both":
      {
        return S.zipWith_(S.suspend(() => stripSomeDefectsSafe(cause.left, f)), S.suspend(() => stripSomeDefectsSafe(cause.right, f)), (l, r) => {
          if (l._tag === "Some" && r._tag === "Some") {
            return O.some(combinePar(l.value, r.value));
          } else if (l._tag === "Some") {
            return l;
          } else if (r._tag === "Some") {
            return r;
          } else {
            return O.none;
          }
        });
      }

    case "Then":
      {
        return S.zipWith_(S.suspend(() => stripSomeDefectsSafe(cause.left, f)), S.suspend(() => stripSomeDefectsSafe(cause.right, f)), (l, r) => {
          if (l._tag === "Some" && r._tag === "Some") {
            return O.some(combineSeq(l.value, r.value));
          } else if (l._tag === "Some") {
            return l;
          } else if (r._tag === "Some") {
            return r;
          } else {
            return O.none;
          }
        });
      }

    case "Traced":
      {
        return S.suspend(() => stripSomeDefectsSafe(cause.cause, f));
      }
  }
}
/**
 * Finds the first result matching f
 */

export function find(f) {
  return cause => S.run(findSafe(f)(cause));
}
/**
 * Finds the first result matching f
 */

export function findSafe(f) {
  return cause => {
    const apply = f(cause);

    if (apply._tag === "Some") {
      return S.succeed(apply);
    }

    switch (cause._tag) {
      case "Then":
        {
          return S.chain_(S.suspend(() => findSafe(f)(cause.left)), isLeft => {
            if (isLeft._tag === "Some") {
              return S.succeed(isLeft);
            } else {
              return findSafe(f)(cause.right);
            }
          });
        }

      case "Traced":
        {
          return S.suspend(() => findSafe(f)(cause.cause));
        }

      case "Both":
        {
          return S.chain_(S.suspend(() => findSafe(f)(cause.left)), isLeft => {
            if (isLeft._tag === "Some") {
              return S.succeed(isLeft);
            } else {
              return findSafe(f)(cause.right);
            }
          });
        }

      default:
        {
          return S.succeed(apply);
        }
    }
  };
}
/**
 * Equivalent to chain(identity)
 */

export const flatten = /*#__PURE__*/chain(identity);
/**
 * Folds over a cause
 */

export function fold(empty, failCase, dieCase, interruptCase, thenCase, bothCase, tracedCase) {
  return cause => S.run(foldSafe(empty, failCase, dieCase, interruptCase, thenCase, bothCase, tracedCase)(cause));
}
/**
 * Folds over a cause
 */

export function foldSafe(empty, failCase, dieCase, interruptCase, thenCase, bothCase, tracedCase) {
  return cause => {
    switch (cause._tag) {
      case "Empty":
        {
          return S.succeedWith(empty);
        }

      case "Fail":
        {
          return S.succeed(failCase(cause.value));
        }

      case "Die":
        {
          return S.succeed(dieCase(cause.value));
        }

      case "Interrupt":
        {
          return S.succeed(interruptCase(cause.fiberId));
        }

      case "Traced":
        {
          return S.map_(S.suspend(() => foldSafe(empty, failCase, dieCase, interruptCase, thenCase, bothCase, tracedCase)(cause.cause)), x => tracedCase(x, cause.trace));
        }

      case "Both":
        {
          return S.zipWith_(S.suspend(() => foldSafe(empty, failCase, dieCase, interruptCase, thenCase, bothCase, tracedCase)(cause.left)), S.suspend(() => foldSafe(empty, failCase, dieCase, interruptCase, thenCase, bothCase, tracedCase)(cause.right)), (l, r) => bothCase(l, r));
        }

      case "Then":
        {
          return S.zipWith_(S.suspend(() => foldSafe(empty, failCase, dieCase, interruptCase, thenCase, bothCase, tracedCase)(cause.left)), S.suspend(() => foldSafe(empty, failCase, dieCase, interruptCase, thenCase, bothCase, tracedCase)(cause.right)), (l, r) => thenCase(l, r));
        }
    }
  };
}
/**
 * Accumulates a state over a Cause
 */

export function reduceLeft(z) {
  return f => {
    return cause => {
      let causes = undefined;
      let current = cause;
      let acc = z;

      while (current) {
        const x = f(acc, current);
        acc = x._tag === "Some" ? x.value : acc;

        switch (current._tag) {
          case "Then":
            {
              causes = new Stack(current.right, causes);
              current = current.left;
              break;
            }

          case "Both":
            {
              causes = new Stack(current.right, causes);
              current = current.left;
              break;
            }

          case "Traced":
            {
              current = current.cause;
              break;
            }

          default:
            {
              current = undefined;
              break;
            }
        }

        if (!current && causes) {
          current = causes.value;
          causes = causes.previous;
        }
      }

      return acc;
    };
  };
}
/**
 * Returns if the cause contains an interruption in it
 */

export function interrupted(cause) {
  return O.getOrElse_(O.map_(interruptOption(cause), () => true), () => false);
}
/**
 * Returns the `FiberID` associated with the first `Interrupt` in this `Cause` if one
 * exists.
 */

export function interruptOption(cause) {
  return find(c => c._tag === "Interrupt" ? O.some(c.fiberId) : O.none)(cause);
}
/**
 * Determines if the `Cause` contains only interruptions and not any `Die` or
 * `Fail` causes.
 */

export function interruptedOnly(cause) {
  return O.getOrElse_(find(c => c._tag === "Die" || c._tag === "Fail" ? O.some(false) : O.none)(cause), () => true);
}
/**
 * Returns a set of interruptors, fibers that interrupted the fiber described
 * by this `Cause`.
 */

export function interruptors(cause) {
  return Array.from(reduceLeft(new Set())((s, c) => c._tag === "Interrupt" ? O.some(s.add(c.fiberId)) : O.none)(cause));
}
/**
 * Remove all `Fail` and `Interrupt` nodes from this `Cause`,
 * return only `Die` cause/finalizer defects.
 */

export function keepDefectsSafe(cause) {
  switch (cause._tag) {
    case "Empty":
      {
        return S.succeed(O.none);
      }

    case "Fail":
      {
        return S.succeed(O.none);
      }

    case "Interrupt":
      {
        return S.succeed(O.none);
      }

    case "Die":
      {
        return S.succeed(O.some(cause));
      }

    case "Traced":
      {
        return S.map_(S.suspend(() => keepDefectsSafe(cause.cause)), x => O.map_(x, _ => traced(_, cause.trace)));
      }

    case "Then":
      {
        return S.zipWith_(S.suspend(() => keepDefectsSafe(cause.left)), S.suspend(() => keepDefectsSafe(cause.right)), (l, r) => {
          if (l._tag === "Some" && r._tag === "Some") {
            return O.some(combineSeq(l.value, r.value));
          } else if (l._tag === "Some") {
            return l;
          } else if (r._tag === "Some") {
            return r;
          } else {
            return O.none;
          }
        });
      }

    case "Both":
      {
        return S.zipWith_(S.suspend(() => keepDefectsSafe(cause.left)), S.suspend(() => keepDefectsSafe(cause.right)), (l, r) => {
          if (l._tag === "Some" && r._tag === "Some") {
            return O.some(combinePar(l.value, r.value));
          } else if (l._tag === "Some") {
            return l;
          } else if (r._tag === "Some") {
            return r;
          } else {
            return O.none;
          }
        });
      }
  }
}
/**
 * Remove all `Fail` and `Interrupt` nodes from this `Cause`,
 * return only `Die` cause/finalizer defects.
 */

export function keepDefects(cause) {
  return S.run(keepDefectsSafe(cause));
}
/**
 * Converts the specified `Cause<Either<E, A>>` to an `Either<Cause<E>, A>`.
 */

export function sequenceCauseEither(c) {
  return S.run(sequenceCauseEitherSafe(c));
}
/**
 * Converts the specified `Cause<Either<E, A>>` to an `Either<Cause<E>, A>`.
 */

export function sequenceCauseEitherSafe(c) {
  switch (c._tag) {
    case "Empty":
      {
        return S.succeed(E.left(empty));
      }

    case "Interrupt":
      {
        return S.succeed(E.left(c));
      }

    case "Fail":
      {
        return S.succeed(c.value._tag === "Left" ? E.left(fail(c.value.left)) : E.right(c.value.right));
      }

    case "Traced":
      {
        return S.map_(S.suspend(() => sequenceCauseEitherSafe(c.cause)), x => E.mapLeft_(x, _ => traced(_, c.trace)));
      }

    case "Die":
      {
        return S.succeed(E.left(c));
      }

    case "Then":
      {
        return S.zipWith_(S.suspend(() => sequenceCauseEitherSafe(c.left)), S.suspend(() => sequenceCauseEitherSafe(c.right)), (l, r) => {
          if (l._tag === "Left") {
            if (r._tag === "Right") {
              return E.right(r.right);
            } else {
              return E.left(combineSeq(l.left, r.left));
            }
          } else {
            return E.right(l.right);
          }
        });
      }

    case "Both":
      {
        return S.zipWith_(S.suspend(() => sequenceCauseEitherSafe(c.left)), S.suspend(() => sequenceCauseEitherSafe(c.right)), (l, r) => {
          if (l._tag === "Left") {
            if (r._tag === "Right") {
              return E.right(r.right);
            } else {
              return E.left(combinePar(l.left, r.left));
            }
          } else {
            return E.right(l.right);
          }
        });
      }
  }
}
/**
 * Converts the specified `Cause<Option<E>>` to an `Option<Cause<E>>` by
 * recursively stripping out any failures with the error `None`.
 */

export function sequenceCauseOptionSafe(c) {
  switch (c._tag) {
    case "Empty":
      {
        return S.succeed(O.some(empty));
      }

    case "Interrupt":
      {
        return S.succeed(O.some(c));
      }

    case "Traced":
      {
        return S.map_(S.suspend(() => sequenceCauseOptionSafe(c.cause)), x => O.map_(x, _ => traced(_, c.trace)));
      }

    case "Fail":
      {
        return S.succeed(O.map_(c.value, fail));
      }

    case "Die":
      {
        return S.succeed(O.some(c));
      }

    case "Then":
      {
        return S.zipWith_(S.suspend(() => sequenceCauseOptionSafe(c.left)), S.suspend(() => sequenceCauseOptionSafe(c.right)), (l, r) => {
          if (l._tag === "Some" && r._tag === "Some") {
            return O.some(combineSeq(l.value, r.value));
          } else if (l._tag === "Some") {
            return O.some(l.value);
          } else if (r._tag === "Some") {
            return O.some(r.value);
          } else {
            return O.none;
          }
        });
      }

    case "Both":
      {
        return S.zipWith_(S.suspend(() => sequenceCauseOptionSafe(c.left)), S.suspend(() => sequenceCauseOptionSafe(c.right)), (l, r) => {
          if (l._tag === "Some" && r._tag === "Some") {
            return O.some(combinePar(l.value, r.value));
          } else if (l._tag === "Some") {
            return O.some(l.value);
          } else if (r._tag === "Some") {
            return O.some(r.value);
          } else {
            return O.none;
          }
        });
      }
  }
}
/**
 * Converts the specified `Cause<Option<E>>` to an `Option<Cause<E>>` by
 * recursively stripping out any failures with the error `None`.
 */

export function sequenceCauseOption(c) {
  return S.run(sequenceCauseOptionSafe(c));
}
/**
 * Squashes a `Cause` down to a single `Throwable`, chosen to be the
 * "most important" `Throwable`.
 */

export function squash(f) {
  return cause => O.getOrElse_((o => o._tag === "Some" ? o : A.head(defects(cause)))((o => o._tag === "Some" ? o : interrupted(cause) ? O.some(new InterruptedException("Interrupted by fibers: " + Array.from(interruptors(cause)).map(_ => _.seqNumber.toString()).map(_ => "#" + _).join(", "))) : O.none)(O.map_(failureOption(cause), f))), () => new InterruptedException());
}
/**
 * Discards all typed failures kept on this `Cause`.
 */

export function stripFailures(cause) {
  switch (cause._tag) {
    case "Empty":
      {
        return empty;
      }

    case "Fail":
      {
        return empty;
      }

    case "Interrupt":
      {
        return cause;
      }

    case "Die":
      {
        return cause;
      }

    default:
      {
        return S.run(stripFailuresSafe(cause));
      }
  }
}
/**
 * Discards all typed failures kept on this `Cause`.
 */

export function stripFailuresSafe(cause) {
  switch (cause._tag) {
    case "Empty":
      {
        return S.succeed(empty);
      }

    case "Fail":
      {
        return S.succeed(empty);
      }

    case "Interrupt":
      {
        return S.succeed(cause);
      }

    case "Die":
      {
        return S.succeed(cause);
      }

    case "Traced":
      {
        return S.map_(S.suspend(() => stripFailuresSafe(cause.cause)), x => traced(x, cause.trace));
      }

    case "Both":
      {
        return S.zipWith_(S.suspend(() => stripFailuresSafe(cause.left)), S.suspend(() => stripFailuresSafe(cause.right)), (l, r) => combinePar(l, r));
      }

    case "Then":
      {
        return S.zipWith_(S.suspend(() => stripFailuresSafe(cause.left)), S.suspend(() => stripFailuresSafe(cause.right)), (l, r) => combineSeq(l, r));
      }
  }
}
/**
 * Discards all typed failures kept on this `Cause`.
 */

export function stripInterrupts(cause) {
  switch (cause._tag) {
    case "Empty":
      {
        return empty;
      }

    case "Fail":
      {
        return cause;
      }

    case "Interrupt":
      {
        return empty;
      }

    case "Die":
      {
        return cause;
      }

    default:
      {
        return S.run(stripInterruptsSafe(cause));
      }
  }
}
/**
 * Discards all typed failures kept on this `Cause`.
 */

export function stripInterruptsSafe(cause) {
  switch (cause._tag) {
    case "Empty":
      {
        return S.succeed(empty);
      }

    case "Fail":
      {
        return S.succeed(cause);
      }

    case "Interrupt":
      {
        return S.succeed(empty);
      }

    case "Die":
      {
        return S.succeed(cause);
      }

    case "Traced":
      {
        return S.map_(S.suspend(() => stripInterruptsSafe(cause.cause)), x => traced(x, cause.trace));
      }

    case "Both":
      {
        return S.zipWith_(S.suspend(() => stripInterruptsSafe(cause.left)), S.suspend(() => stripInterruptsSafe(cause.right)), (l, r) => combinePar(l, r));
      }

    case "Then":
      {
        return S.zipWith_(S.suspend(() => stripInterruptsSafe(cause.left)), S.suspend(() => stripInterruptsSafe(cause.right)), (l, r) => combineSeq(l, r));
      }
  }
}
/**
 * Returns a `Cause` that has been stripped of all tracing information.
 */

export function untraced(cause) {
  switch (cause._tag) {
    case "Die":
    case "Empty":
    case "Fail":
    case "Interrupt":
      return cause;

    default:
      return S.run(untracedSafe(cause));
  }
}
/**
 * Returns a `Cause` that has been stripped of all tracing information.
 */

export function untracedSafe(cause) {
  switch (cause._tag) {
    case "Traced":
      {
        return S.suspend(() => untracedSafe(cause.cause));
      }

    case "Both":
      {
        return S.zipWith_(S.suspend(() => untracedSafe(cause.left)), S.suspend(() => untracedSafe(cause.right)), (l, r) => combinePar(l, r));
      }

    case "Then":
      {
        return S.zipWith_(S.suspend(() => untracedSafe(cause.left)), S.suspend(() => untracedSafe(cause.right)), (l, r) => combineSeq(l, r));
      }

    default:
      {
        return S.succeed(cause);
      }
  }
}
const FCOStackFrameDoneTypeId = /*#__PURE__*/Symbol();

class FCOStackFrameDone {
  constructor() {
    this._typeId = FCOStackFrameDoneTypeId;
  }

}

const FCOStackFrameTracedTypeId = /*#__PURE__*/Symbol();

class FCOStackFrameTraced {
  constructor(cause) {
    this.cause = cause;
    this._typeId = FCOStackFrameTracedTypeId;
  }

}

const FCOStackFrameThenLeftTypeId = /*#__PURE__*/Symbol();

class FCOStackFrameThenLeft {
  constructor(cause) {
    this.cause = cause;
    this._typeId = FCOStackFrameThenLeftTypeId;
  }

}

const FCOStackFrameThenRightTypeId = /*#__PURE__*/Symbol();

class FCOStackFrameThenRight {
  constructor(cause, leftResult) {
    this.cause = cause;
    this.leftResult = leftResult;
    this._typeId = FCOStackFrameThenRightTypeId;
  }

}

const FCOStackFrameBothLeftTypeId = /*#__PURE__*/Symbol();

class FCOStackFrameBothLeft {
  constructor(cause) {
    this.cause = cause;
    this._typeId = FCOStackFrameBothLeftTypeId;
  }

}

const FCOStackFrameBothRightTypeId = /*#__PURE__*/Symbol();

class FCOStackFrameBothRight {
  constructor(cause, leftResult) {
    this.cause = cause;
    this.leftResult = leftResult;
    this._typeId = FCOStackFrameBothRightTypeId;
  }

}
/**
 * Converts the specified `Cause<Either<E, A>>` to an `Either<Cause<E>, A>` by
 * recursively stripping out any failures with the error `None`.
 */


export function flipCauseOption(c) {
  let stack = new Stack(new FCOStackFrameDone());
  let result;

  recursion: while (stack) {
    // eslint-disable-next-line no-constant-condition
    pushing: while (true) {
      switch (c._tag) {
        case "Empty":
          result = O.some(empty);
          break pushing;

        case "Traced":
          stack = new Stack(new FCOStackFrameTraced(c), stack);
          c = c.cause;
          continue pushing;

        case "Interrupt":
          result = O.some(interrupt(c.fiberId));
          break pushing;

        case "Die":
          result = O.some(c);
          break pushing;

        case "Fail":
          result = O.fold_(c.value, () => O.none, r => O.some(fail(r)));
          break pushing;

        case "Then":
          stack = new Stack(new FCOStackFrameThenLeft(c), stack);
          c = c.left;
          continue pushing;

        case "Both":
          stack = new Stack(new FCOStackFrameBothLeft(c), stack);
          c = c.left;
          continue pushing;
      }
    } // eslint-disable-next-line no-constant-condition


    popping: while (true) {
      const top = stack.value;
      stack = stack.previous;

      switch (top._typeId) {
        case FCOStackFrameDoneTypeId:
          return result;

        case FCOStackFrameTracedTypeId:
          result = O.map_(result, _ => traced(_, top.cause.trace));
          continue popping;

        case FCOStackFrameThenLeftTypeId:
          c = top.cause.right;
          stack = new Stack(new FCOStackFrameThenRight(top.cause, result), stack);
          continue recursion;

        case FCOStackFrameThenRightTypeId:
          {
            const l = top.leftResult;

            if (O.isSome(l) && O.isSome(result)) {
              result = O.some(combineSeq(l.value, result.value));
            }

            if (O.isNone(l) && O.isSome(result)) {
              result = O.some(result.value);
            }

            if (O.isSome(l) && O.isNone(result)) {
              result = O.some(l.value);
            }

            result = O.none;
            continue popping;
          }

        case FCOStackFrameBothLeftTypeId:
          c = top.cause.right;
          stack = new Stack(new FCOStackFrameBothRight(top.cause, result), stack);
          continue recursion;

        case FCOStackFrameBothRightTypeId:
          {
            const l = top.leftResult;

            if (O.isSome(l) && O.isSome(result)) {
              result = O.some(combinePar(l.value, result.value));
            }

            if (O.isNone(l) && O.isSome(result)) {
              result = O.some(result.value);
            }

            if (O.isSome(l) && O.isNone(result)) {
              result = O.some(l.value);
            }

            result = O.none;
            continue popping;
          }
      }
    }
  }

  throw new Error("Bug");
}
//# sourceMappingURL=core.mjs.map