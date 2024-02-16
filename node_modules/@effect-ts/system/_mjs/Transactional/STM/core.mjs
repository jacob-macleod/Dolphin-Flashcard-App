// ets_tracing: off
import "../../Operator/index.mjs";
import { RuntimeError } from "../../Cause/index.mjs";
import * as T from "../../Effect/index.mjs";
import * as E from "../../Either/index.mjs";
import { constVoid, identity } from "../../Function/index.mjs";
import { NoSuchElementException } from "../../GlobalExceptions/index.mjs";
import * as O from "../../Option/index.mjs";
import { AtomicBoolean } from "../../Support/AtomicBoolean/index.mjs";
import * as P from "./_internal/primitives.mjs";
import { tryCommit, tryCommitAsync } from "./Journal/index.mjs";
import { DoneTypeId, SuspendTypeId } from "./TryCommit/index.mjs";
import { makeTxnId } from "./TxnId/index.mjs";
export { catchAll, catchAll_, chain, chain_, ensuring, ensuring_, fail, failWith, foldM, foldM_, map, map_, provideSome, provideSome_, retry, STM, STMEffect, STMFailException, STMRetryException, succeed, succeedWith, unit, die, dieWith } from "./_internal/primitives.mjs";
export { _catch as catch };
export const MaxFrames = 200;
/**
 * Accesses the environment of the transaction.
 */

export function access(f) {
  return P.map_(environment(), f);
}
/**
 * Accesses the environment of the transaction to perform a transaction.
 */

export function accessM(f) {
  return P.chain_(environment(), f);
}
/**
 * Submerges the error case of an `Either` into the `STM`. The inverse
 * operation of `STM.either`.
 */

export function absolve(z) {
  return P.chain_(z, fromEither);
}
/**
 * Propagates the given environment to self.
 */

export function andThen_(self, that) {
  return P.chain_(self, a => provideAll_(that, a));
}
/**
 * Propagates the given environment to self.
 *
 * @ets_data_first andThen_
 */

export function andThen(that) {
  return self => andThen_(self, that);
}
/**
 * Maps the success value of this effect to the specified constant value.
 */

export function as_(self, b) {
  return P.map_(self, () => b);
}
/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @ets_data_first as_
 */

export function as(b) {
  return self => as_(self, b);
}
/**
 * Maps the success value of this effect to an optional value.
 */

export function asSome(self) {
  return P.map_(self, O.some);
}
/**
 * Maps the error value of this effect to an optional value.
 */

export function asSomeError(self) {
  return mapError_(self, O.some);
}
/**
 * Returns an `STM` effect whose P.failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */

export function bimap_(self, g, f) {
  return P.foldM_(self, e => P.fail(g(e)), a => P.succeed(f(a)));
}
/**
 * Returns an `STM` effect whose P.failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @ets_data_first bimap_
 */

export function bimap(g, f) {
  return self => bimap_(self, g, f);
}
/**
 * Recovers from specified error.
 *
 * @ets_data_first catch_
 */

function _catch(tag, k, f, __trace) {
  return self => P.catchAll_(self, e => {
    if (typeof e === "object" && e !== null && tag in e && e[tag] === k) {
      return f(e);
    }

    return P.fail(e);
  });
}
/**
 * Recovers from specified error.
 */


export function catch_(self, tag, k, f) {
  return P.catchAll_(self, e => {
    if (typeof e === "object" && e !== null && tag in e && e[tag] === k) {
      return f(e);
    }

    return P.fail(e);
  });
}
/**
 * Recovers from specified error.
 *
 * @ets_data_first catchTag_
 */

export function catchTag(k, f, __trace) {
  return self => catchTag_(self, k, f);
}
/**
 * Recovers from specified error.
 */

export function catchTag_(self, k, f) {
  return P.catchAll_(self, e => {
    if ("_tag" in e && e["_tag"] === k) {
      return f(e);
    }

    return P.fail(e);
  });
}
/**
 * Recovers from some or all of the error cases.
 */

export function catchSome_(self, f) {
  return P.catchAll_(self, e => O.fold_(f(e), () => P.fail(e), identity));
}
/**
 * Recovers from some or all of the error cases.
 *
 * @ets_data_first catchSome_
 */

export function catchSome(f) {
  return self => catchSome_(self, f);
}
/**
 * Simultaneously filters and flatMaps the value produced by this effect.
 * Continues on the effect returned from pf.
 */

export function continueOrRetryM_(fa, pf) {
  return P.chain_(fa, a => O.getOrElse_(pf(a), () => P.retry));
}
/**
 * Simultaneously filters and flatMaps the value produced by this effect.
 * Continues on the effect returned from pf.
 *
 * @ets_data_first continueOrRetryM_
 */

export function continueOrRetryM(pf) {
  return fa => continueOrRetryM_(fa, pf);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 */

export function continueOrRetry_(fa, pf) {
  return continueOrRetryM_(fa, x => O.map_(pf(x), P.succeed));
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 *
 * @ets_data_first continueOrRetry_
 */

export function continueOrRetry(pf) {
  return fa => continueOrRetry_(fa, pf);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 */

export function continueOrFailM_(fa, e, pf) {
  return P.chain_(fa, a => O.getOrElse_(pf(a), () => P.fail(e)));
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 *
 * @ets_data_first continueOrFailM_
 */

export function continueOrFailM(e, pf) {
  return fa => continueOrFailM_(fa, e, pf);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 */

export function continueOrFail_(fa, e, pf) {
  return continueOrFailM_(fa, e, x => O.map_(pf(x), P.succeed));
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 *
 * @ets_data_first continueOrFail_
 */

export function continueOrFail(e, pf) {
  return fa => continueOrFail_(fa, e, pf);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 */

export function continueOrFailWithM_(fa, e, pf) {
  return P.chain_(fa, a => O.getOrElse_(pf(a), () => P.failWith(e)));
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 *
 * @ets_data_first continueOrFailWithM_
 */

export function continueOrFailWithM(e, pf) {
  return fa => continueOrFailWithM_(fa, e, pf);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 */

export function continueOrFailWith_(fa, e, pf) {
  return continueOrFailWithM_(fa, e, x => O.map_(pf(x), P.succeed));
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 *
 * @ets_data_first continueOrFailWith_
 */

export function continueOrFailWith(e, pf) {
  return fa => continueOrFailWith_(fa, e, pf);
}
/**
 * Creates a composite effect that represents this effect followed by another
 * one that may depend on the error produced by this one.
 *
 * @ets_data_first chainError_
 */

export function chainError(f) {
  return self => chainError_(self, f);
}
/**
 * Creates a composite effect that represents this effect followed by another
 * one that may depend on the error produced by this one.
 */

export function chainError_(self, f) {
  return flipWith_(self, x => P.chain_(x, f));
}
/**
 * Checks the condition, and if it's true, returns unit, otherwise, retries.
 */

export function checkWith(predicate) {
  return suspend(() => predicate() ? P.unit : P.retry);
}
/**
 * Checks the condition, and if it's true, returns unit, otherwise, retries.
 */

export function check(predicate) {
  return checkWith(() => predicate);
}
/**
 * Propagates self environment to that.
 */

export function compose_(self, that) {
  return andThen_(that, self);
}
/**
 * Propagates self environment to that.
 *
 * @ets_data_first compose_
 */

export function compose(that) {
  return self => andThen_(that, self);
}
/**
 * Commits this transaction atomically.
 */

export function commit(self) {
  return T.accessM(r => T.suspend((_, fiberId) => {
    const v = tryCommit(fiberId, self, r);

    switch (v._typeId) {
      case DoneTypeId:
        {
          return v.io;
        }

      case SuspendTypeId:
        {
          const txnId = makeTxnId();
          const done = new AtomicBoolean(false);
          const interrupt = T.succeedWith(() => done.set(true));
          const io = T.effectAsync(tryCommitAsync(v.journal, fiberId, self, txnId, done, r));
          return T.ensuring_(io, interrupt);
        }
    }
  }));
}
/**
 * Commits this transaction atomically, regardless of whether the transaction
 * is a success or a failure.
 */

export function commitEither(self) {
  return T.absolve(commit(either(self)));
}
/**
 * Kills the fiber running the effect with a `RuntimeError` that contains
 * the specified message.
 */

export function dieMessage(message) {
  return P.dieWith(() => new RuntimeError(message));
}
/**
 * Kills the fiber running the effect with a `RuntimeError` that contains
 * the specified message.
 */

export function dieMessageWith(message) {
  return P.succeedWith(() => {
    throw new RuntimeError(message());
  });
}
/**
 * Converts the failure channel into an `Either`.
 */

export function either(self) {
  return fold_(self, x => E.left(x), x => E.right(x));
}
/**
 * Retrieves the environment inside an stm.
 */

export function environment() {
  return new P.STMEffect((_, __, r) => r);
}
/**
 * Returns an effect that ignores errors and runs repeatedly until it eventually succeeds.
 */

export function eventually(self) {
  return P.foldM_(self, () => eventually(self), P.succeed);
}
export function filterOrDie(p, dieWith) {
  return fa => filterOrDie_(fa, p, dieWith);
}
export function filterOrDie_(fa, p, dieWith) {
  return filterOrElse_(fa, p, x => P.dieWith(() => dieWith(x)));
}
export function filterOrFail(p, failWith) {
  return fa => filterOrFail_(fa, p, failWith);
}
export function filterOrFail_(fa, p, failWith) {
  return filterOrElse_(fa, p, x => P.fail(failWith(x)));
}
export function filterOrElse(p, or) {
  return fa => filterOrElse_(fa, p, or);
}
export function filterOrElse_(fa, p, or) {
  return P.chain_(fa, a => p(a) ? P.succeed(a) : suspend(() => or(a)));
}
export function filterOrDieMessage(p, message) {
  return fa => filterOrDieMessage_(fa, p, message);
}
export function filterOrDieMessage_(fa, p, message) {
  return filterOrDie_(fa, p, a => new RuntimeError(message(a)));
}
/**
 * Returns an effect that swaps the error/success cases. This allows you to
 * use all methods on the error channel, possibly before flipping back.
 */

export function flip(self) {
  return P.foldM_(self, P.succeed, P.fail);
}
/**
 * Swaps the error/value parameters, applies the function `f` and flips the parameters back
 *
 * @ets_data_first flipWith_
 */

export function flipWith(f) {
  return self => flipWith_(self, f);
}
/**
 * Swaps the error/value parameters, applies the function `f` and flips the parameters back
 */

export function flipWith_(self, f) {
  return flip(f(flip(self)));
}
/**
 * Folds over the `STM` effect, handling both P.failure and success, but not
 * retry.
 */

export function fold_(self, g, f) {
  return P.foldM_(self, e => P.succeed(g(e)), a => P.succeed(f(a)));
}
/**
 * Folds over the `STM` effect, handling both P.failure and success, but not
 * retry.
 *
 * @ets_data_first fold_
 */

export function fold(g, f) {
  return self => fold_(self, g, f);
}
/**
 * Flattens out a nested `STM` effect.
 */

export function flatten(self) {
  return P.chain_(self, identity);
}
/**
 * Unwraps the optional error, defaulting to the provided value.
 *
 * @ets_data_first flattenErrorOptionWith_
 */

export function flattenErrorOptionWith(def) {
  return self => flattenErrorOptionWith_(self, def);
}
/**
 * Unwraps the optional error, defaulting to the provided value.
 */

export function flattenErrorOptionWith_(self, def) {
  return mapError_(self, O.fold(def, identity));
}
/**
 * Unwraps the optional error, defaulting to the provided value.
 *
 * @ets_data_first flattenErrorOption_
 */

export function flattenErrorOption(def) {
  return self => flattenErrorOption_(self, def);
}
/**
 * Unwraps the optional error, defaulting to the provided value.
 */

export function flattenErrorOption_(self, def) {
  return mapError_(self, O.fold(() => def, identity));
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns a transactional effect that produces a new `ReadonlyArray<B>`.
 */

export function forEach_(it, f) {
  return suspend(() => {
    let stm = P.succeed([]);

    for (const a of it) {
      stm = zipWith_(stm, f(a), (acc, b) => {
        acc.push(b);
        return acc;
      });
    }

    return stm;
  });
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns a transactional effect that produces a new `ReadonlyArray<B>`.
 *
 * @ets_data_first forEach_
 */

export function forEach(f) {
  return self => forEach_(self, f);
}
/**
 * Lifts an `Either` into a `STM`.
 */

export function fromEitherWith(e) {
  return suspend(() => {
    return E.fold_(e(), P.fail, P.succeed);
  });
}
/**
 * Lifts an `Either` into a `STM`.
 */

export function fromEither(e) {
  return E.fold_(e, P.fail, P.succeed);
}
/**
 * Unwraps the optional success of this effect, but can fail with an None value.
 */

export function get(self) {
  return P.foldM_(self, x => P.fail(O.some(x)), O.fold(() => P.fail(O.none), P.succeed));
}
/**
 * Returns a successful effect with the head of the list if the list is
 * non-empty or fails with the error `None` if the list is empty.
 */

export function head(self) {
  return P.foldM_(self, x => P.fail(O.some(x)), x => {
    const it = x[Symbol.iterator]();
    const next = it.next();
    return next.done ? P.fail(O.none) : P.succeed(next.value);
  });
}
/**
 * Returns a new effect that ignores the success or failure of this effect.
 */

export function ignore(self) {
  return fold_(self, constVoid, constVoid);
}
/**
 * Returns whether this effect is a failure.
 */

export function isFailure(self) {
  return fold_(self, () => true, () => false);
}
/**
 * Returns whether this effect is a success.
 */

export function isSuccess(self) {
  return fold_(self, () => false, () => true);
}
/**
 * Returns a successful effect if the value is `Left`, or fails with the error `None`.
 */

export function left(self) {
  return P.foldM_(self, e => P.fail(O.some(e)), E.fold(P.succeed, () => P.fail(O.none)));
}
/**
 * Returns a successful effect if the value is `Left`, or fails with the error e.
 */

export function leftOrFail_(self, orFail) {
  return P.chain_(self, E.fold(P.succeed, x => P.failWith(() => orFail(x))));
}
/**
 * Returns a successful effect if the value is `Left`, or fails with the error e.
 *
 * @ets_data_first leftOrFail_
 */

export function leftOrFail(orFail) {
  return self => leftOrFail_(self, orFail);
}
/**
 * Returns a successful effect if the value is `Left`, or fails with a `NoSuchElementException`.
 */

export function leftOrFailException(self) {
  return leftOrFail_(self, () => new NoSuchElementException());
}
/**
 * Depending on provided environment returns either this one or the other effect.
 *
 * @ets_data_first join_
 */

export function join(that) {
  return self => {
    return join_(self, that);
  };
}
/**
 * Depending on provided environment returns either this one or the other effect.
 */

export function join_(self, that) {
  return accessM(_ => E.fold_(_, r => provideAll_(self, r), r1 => provideAll_(that, r1)));
}
/**
 * Depending on provided environment returns either this one or the other effect.
 */

export function joinEither_(self, that) {
  return accessM(_ => E.fold_(_, r => P.map_(provideAll_(self, r), E.left), r1 => P.map_(provideAll_(that, r1), E.right)));
}
/**
 * Depending on provided environment returns either this one or the other effect.
 */

export function joinEither(that) {
  return self => joinEither_(self, that);
}
/**
 * Maps from one error type to another.
 */

export function mapError_(self, f) {
  return P.foldM_(self, e => P.fail(f(e)), P.succeed);
}
/**
 * Maps from one error type to another.
 *
 * @ets_data_first mapError_
 */

export function mapError(f) {
  return self => mapError_(self, f);
}
/**
 * Provides the transaction its required environment, which eliminates
 * its dependency on `R`.
 */

export function provideAll_(self, r) {
  return P.provideSome_(self, () => r);
}
/**
 * Provides the transaction its required environment, which eliminates
 * its dependency on `R`.
 *
 * @ets_data_first provideAll_
 */

export function provideAll(r) {
  return self => provideAll_(self, r);
}
/**
 * Repeats this `STM` effect until its result satisfies the specified predicate.
 *
 * WARNING:
 * `repeatUntil` uses a busy loop to repeat the effect and will consume a thread until
 * it completes (it cannot yield). This is because STM describes a single atomic
 * transaction which must either complete, retry or fail a transaction before
 * yielding back to the Effect Runtime.
 *
 * - Use `retryUntil` instead if you don't need to maintain transaction state for repeats.
 * - Ensure repeating the STM effect will eventually satisfy the predicate.
 */

export function repeatUntil_(self, f) {
  return P.chain_(self, a => f(a) ? P.succeed(a) : repeatUntil_(self, f));
}
/**
 * Repeats this `STM` effect until its result satisfies the specified predicate.
 *
 * WARNING:
 * `repeatUntil` uses a busy loop to repeat the effect and will consume a thread until
 * it completes (it cannot yield). This is because STM describes a single atomic
 * transaction which must either complete, retry or fail a transaction before
 * yielding back to the Effect Runtime.
 *
 * - Use `retryUntil` instead if you don't need to maintain transaction state for repeats.
 * - Ensure repeating the STM effect will eventually satisfy the predicate.
 *
 * @ets_data_first repeatUntil_
 */

export function repeatUntil(f) {
  return self => repeatUntil_(self, f);
}
/**
 * Repeats this `STM` effect while its result satisfies the specified predicate.
 *
 * WARNING:
 * `repeatWhile` uses a busy loop to repeat the effect and will consume a thread until
 * it completes (it cannot yield). This is because STM describes a single atomic
 * transaction which must either complete, retry or fail a transaction before
 * yielding back to the Effect Runtime.
 *
 * - Use `retryWhile` instead if you don't need to maintain transaction state for repeats.
 * - Ensure repeating the STM effect will eventually not satisfy the predicate.
 */

export function repeatWhile_(self, f) {
  return P.chain_(self, a => f(a) ? repeatWhile_(self, f) : P.succeed(a));
}
/**
 * Repeats this `STM` effect while its result satisfies the specified predicate.
 *
 * WARNING:
 * `repeatWhile` uses a busy loop to repeat the effect and will consume a thread until
 * it completes (it cannot yield). This is because STM describes a single atomic
 * transaction which must either complete, retry or fail a transaction before
 * yielding back to the Effect Runtime.
 *
 * - Use `retryWhile` instead if you don't need to maintain transaction state for repeats.
 * - Ensure repeating the STM effect will eventually not satisfy the predicate.
 *
 * @ets_data_first repeatWhile_
 */

export function repeatWhile(f) {
  return self => repeatWhile_(self, f);
}
/**
 * Suspends creation of the specified transaction lazily.
 */

export function suspend(f) {
  return flatten(P.succeedWith(f));
}
/**
 * "Peeks" at the success of transactional effect.
 */

export function tap_(self, f) {
  return P.chain_(self, a => as_(f(a), a));
}
/**
 * "Peeks" at the success of transactional effect.
 *
 * @ets_data_first tap_
 */

export function tap(f) {
  return self => tap_(self, f);
}
/**
 * Returns an effect with the value on the left part.
 */

export function toLeftWith(a) {
  return P.chain_(P.succeedWith(a), x => P.succeed(E.left(x)));
}
/**
 * Returns an effect with the value on the left part.
 */

export function toLeft(a) {
  return P.succeed(E.left(a));
}
/**
 * Sequentially zips this value with the specified one, combining the values
 * using the specified combiner function.
 */

export function zipWith_(self, that, f) {
  return P.chain_(self, a => P.map_(that, b => f(a, b)));
}
/**
 * Sequentially zips this value with the specified one, combining the values
 * using the specified combiner function.
 *
 * @ets_data_first zipWith_
 */

export function zipWith(that, f) {
  return self => P.chain_(self, a => P.map_(that, b => f(a, b)));
}
//# sourceMappingURL=core.mjs.map