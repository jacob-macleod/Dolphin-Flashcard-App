// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import * as E from "../Either/index.mjs";
import { identity, pipe } from "../Function/index.mjs";
import * as O from "../Option/index.mjs";
import * as Q from "../Queue/index.mjs";
import * as R from "../Ref/index.mjs";
import * as S from "../Semaphore/index.mjs";
import { matchTag } from "../Utils/index.mjs";
import * as T from "./effect.mjs";
import { AtomicM, concrete } from "./XRefM.mjs";
/**
 * Creates a new `XRefM` with the specified value.
 */

export function makeRefM(a) {
  return T.map_(T.bind_(T.bind_(T.do, "ref", () => R.makeRef(a)), "semaphore", () => S.makeSemaphore(1)), ({
    ref,
    semaphore
  }) => new AtomicM(ref, semaphore));
}
/**
 * Creates a new `XRefM` with the specified value.
 */

export function unsafeMakeRefM(a) {
  const ref = R.unsafeMakeRef(a);
  const semaphore = S.unsafeMakeSemaphore(1);
  return new AtomicM(ref, semaphore);
}
/**
 * Creates a new `RefM` with the specified value in the context of a
 * `Managed.`
 */

export function makeManagedRefM(a) {
  return T.toManaged(makeRefM(a));
}
/**
 * Creates a new `RefM` and a `Dequeue` that will emit every change to the
 * `RefM`.
 */

export function dequeueRef(a) {
  return T.map_(T.bind_(T.bind_(T.do, "ref", () => makeRefM(a)), "queue", () => Q.makeUnbounded()), ({
    queue,
    ref
  }) => [tapInput_(ref, a => Q.offer_(queue, a)), queue]);
}
/**
 * Atomically modifies the `RefM` with the specified function, which computes
 * a return value for the modification. This is a more powerful version of
 * `update`.
 */

export function modify_(self, f) {
  return matchTag({
    AtomicM: atomic => S.withPermit_(T.chain_(T.chain_(atomic.ref.get, f), ({
      tuple: [b, a]
    }) => T.as_(atomic.ref.set(a), b)), atomic.semaphore),
    DerivedM: derived => derived.use((value, getEither, setEither) => S.withPermit_(T.chain_(value.ref.get, a => T.chain_(T.chain_(getEither(a), f), ({
      tuple: [b, a]
    }) => T.as_(T.chain_(setEither(a), a => value.ref.set(a)), b))), value.semaphore)),
    DerivedAllM: derivedAll => derivedAll.use((value, getEither, setEither) => S.withPermit_(T.chain_(value.ref.get, s => T.chain_(T.chain_(getEither(s), f), ({
      tuple: [b, a]
    }) => T.as_(T.chain_(setEither(a)(s), a => value.ref.set(a)), b))), value.semaphore))
  })(concrete(self));
}
/**
 * Atomically modifies the `RefM` with the specified function, which computes
 * a return value for the modification. This is a more powerful version of
 * `update`.
 */

export function modify(f) {
  return self => modify_(self, f);
}
/**
 * Reads the value from the `XRefM`.
 */

export function get(self) {
  return self.get;
}
/**
 * Writes a new value to the `RefM`, returning the value immediately before
 * modification.
 */

export function getAndSet_(self, a) {
  return modify_(self, v => T.succeed(Tp.tuple(v, a)));
}
/**
 * Writes a new value to the `RefM`, returning the value immediately before
 * modification.
 */

export function getAndSet(a) {
  return self => getAndSet_(self, a);
}
/**
 * Atomically modifies the `RefM` with the specified function, returning the
 * value immediately before modification.
 */

export function getAndUpdate_(self, f) {
  return modify_(self, v => T.map_(f(v), r => Tp.tuple(v, r)));
}
/**
 * Atomically modifies the `RefM` with the specified function, returning the
 * value immediately before modification.
 */

export function getAndUpdate(f) {
  return self => getAndUpdate_(self, f);
}
/**
 * Atomically modifies the `RefM` with the specified function, returning the
 * value immediately before modification.
 */

export function getAndUpdateSome_(self, f) {
  return modify_(self, v => T.map_(O.getOrElse_(f(v), () => T.succeed(v)), r => Tp.tuple(v, r)));
}
/**
 * Atomically modifies the `RefM` with the specified function, returning the
 * value immediately before modification.
 */

export function getAndUpdateSome(f) {
  return self => getAndUpdateSome_(self, f);
}
/**
 * Atomically modifies the `RefM` with the specified function, which computes
 * a return value for the modification if the function is defined in the current value
 * otherwise it returns a default value.
 * This is a more powerful version of `updateSome`.
 */

export function modifySome_(self, def, f) {
  return modify_(self, v => O.getOrElse_(f(v), () => T.succeed(Tp.tuple(def, v))));
}
/**
 * Atomically modifies the `RefM` with the specified function, which computes
 * a return value for the modification if the function is defined in the current value
 * otherwise it returns a default value.
 * This is a more powerful version of `updateSome`.
 */

export function modifySome(def) {
  return f => self => modifySome_(self, def, f);
}
/**
 * Atomically modifies the `RefM` with the specified function.
 */

export function update_(self, f) {
  return modify_(self, v => T.map_(f(v), r => Tp.tuple(undefined, r)));
}
/**
 * Atomically modifies the `RefM` with the specified function.
 */

export function update(f) {
  return self => update_(self, f);
}
/**
 * Atomically modifies the `RefM` with the specified function.
 */

export function updateAndGet_(self, f) {
  return modify_(self, v => T.map_(f(v), r => Tp.tuple(r, r)));
}
/**
 * Atomically modifies the `RefM` with the specified function.
 */

export function updateAndGet(f) {
  return self => updateAndGet_(self, f);
}
/**
 * Atomically modifies the `RefM` with the specified function.
 */

export function updateSome_(self, f) {
  return modify_(self, v => T.map_(O.getOrElse_(f(v), () => T.succeed(v)), r => Tp.tuple(undefined, r)));
}
/**
 * Atomically modifies the `RefM` with the specified function.
 */

export function updateSome(f) {
  return self => updateSome_(self, f);
}
/**
 * Atomically modifies the `RefM` with the specified function.
 */

export function updateSomeAndGet_(self, f) {
  return modify_(self, v => T.map_(O.getOrElse_(f(v), () => T.succeed(v)), r => Tp.tuple(r, r)));
}
/**
 * Atomically modifies the `RefM` with the specified function.
 */

export function updateSomeAndGet(f) {
  return self => updateSomeAndGet_(self, f);
}
/**
 * Folds over the error and value types of the `XRefM`.
 */

export function fold_(self, ea, eb, ca, bd) {
  return self.foldM(ea, eb, c => T.fromEither(() => ca(c)), b => T.fromEither(() => bd(b)));
}
/**
 * Folds over the error and value types of the `XRefM`.
 */

export function fold(ea, eb, ca, bd) {
  return self => self.foldM(ea, eb, c => T.fromEither(() => ca(c)), b => T.fromEither(() => bd(b)));
}
/**
 * Folds over the error and value types of the `XRefM`. This is a highly
 * polymorphic method that is capable of arbitrarily transforming the error
 * and value types of the `XRefM`. For most use cases one of the more
 * specific combinators implemented in terms of `foldM` will be more
 * ergonomic but this method is extremely useful for implementing new
 * combinators.
 */

export function foldM_(self, ea, eb, ca, bd) {
  return self.foldM(ea, eb, ca, bd);
}
/**
 * Folds over the error and value types of the `XRefM`. This is a highly
 * polymorphic method that is capable of arbitrarily transforming the error
 * and value types of the `XRefM`. For most use cases one of the more
 * specific combinators implemented in terms of `foldM` will be more
 * ergonomic but this method is extremely useful for implementing new
 * combinators.
 */

export function foldM(ea, eb, ca, bd) {
  return self => self.foldM(ea, eb, ca, bd);
}
/**
 * Folds over the error and value types of the `XRefM`, allowing access to
 * the state in transforming the `set` value. This is a more powerful version
 * of `foldM` but requires unifying the environment and error types.
 */

export function foldAllM_(self, ea, eb, ec, ca, bd) {
  return self.foldAllM(ea, eb, ec, ca, bd);
}
/**
 * Folds over the error and value types of the `XRefM`, allowing access to
 * the state in transforming the `set` value. This is a more powerful version
 * of `foldM` but requires unifying the environment and error types.
 */

export function foldAllM(ea, eb, ec, ca, bd) {
  return self => self.foldAllM(ea, eb, ec, ca, bd);
}
/**
 * Maps and filters the `get` value of the `XRefM` with the specified
 * effectual partial function, returning a `XRefM` with a `get` value that
 * succeeds with the result of the partial function if it is defined or else
 * fails with `None`.
 */

export function collectM_(self, f) {
  return self.foldM(identity, _ => O.some(_), _ => T.succeed(_), b => O.getOrElse_(O.map_(f(b), a => T.asSomeError(a)), () => T.fail(O.none)));
}
/**
 * Maps and filters the `get` value of the `XRefM` with the specified
 * effectual partial function, returning a `XRefM` with a `get` value that
 * succeeds with the result of the partial function if it is defined or else
 * fails with `None`.
 */

export function collectM(f) {
  return self => collectM_(self, f);
}
/**
 * Maps and filters the `get` value of the `XRefM` with the specified partial
 * function, returning a `XRefM` with a `get` value that succeeds with the
 * result of the partial function if it is defined or else fails with `None`.
 */

export function collect_(self, f) {
  return collectM_(self, b => O.map_(f(b), T.succeed));
}
/**
 * Maps and filters the `get` value of the `XRefM` with the specified partial
 * function, returning a `XRefM` with a `get` value that succeeds with the
 * result of the partial function if it is defined or else fails with `None`.
 */

export function collect(f) {
  return self => collect_(self, f);
}
/**
 * Transforms both the `set` and `get` values of the `XRefM` with the
 * specified effectual functions.
 */

export function dimapM_(self, f, g) {
  return self.foldM(ea => ea, eb => eb, f, g);
}
/**
 * Transforms both the `set` and `get` values of the `XRefM` with the
 * specified effectual functions.
 */

export function dimapM(f, g) {
  return self => dimapM_(self, f, g);
}
/**
 * Transforms both the `set` and `get` errors of the `XRefM` with the
 * specified functions.
 */

export function dimapError_(self, f, g) {
  return fold_(self, ea => f(ea), eb => g(eb), a => E.right(a), b => E.right(b));
}
/**
 * Transforms both the `set` and `get` errors of the `XRefM` with the
 * specified functions.
 */

export function dimapError(f, g) {
  return self => dimapError_(self, f, g);
}
/**
 * Filters the `set` value of the `XRefM` with the specified effectual
 * predicate, returning a `XRefM` with a `set` value that succeeds if the
 * predicate is satisfied or else fails with `None`.
 */

export function filterInputM_(self, f) {
  return foldM_(self, ea => O.some(ea), identity, a => T.ifM_(T.asSomeError(f(a)), () => T.succeed(a), () => T.fail(O.none)), T.succeed);
}
/**
 * Filters the `set` value of the `XRefM` with the specified effectual
 * predicate, returning a `XRefM` with a `set` value that succeeds if the
 * predicate is satisfied or else fails with `None`.
 */

export function filterInputM(f) {
  return self => filterInputM_(self, f);
}
/**
 * Filters the `set` value of the `XRefM` with the specified effectual
 * predicate, returning a `XRefM` with a `set` value that succeeds if the
 * predicate is satisfied or else fails with `None`.
 */

export function filterInput_(self, f) {
  return filterInputM_(self, a => T.succeed(f(a)));
}
/**
 * Filters the `set` value of the `XRefM` with the specified effectual
 * predicate, returning a `XRefM` with a `set` value that succeeds if the
 * predicate is satisfied or else fails with `None`.
 */

export function filterInput(f) {
  return self => filterInput_(self, f);
}
/**
 * Filters the `get` value of the `XRefM` with the specified effectual predicate,
 * returning a `XRefM` with a `get` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 */

export function filterOutputM_(self, f) {
  return foldM_(self, ea => ea, eb => O.some(eb), a => T.succeed(a), b => T.ifM_(T.asSomeError(f(b)), () => T.succeed(b), () => T.fail(O.none)));
}
/**
 * Filters the `get` value of the `XRefM` with the specified effectual predicate,
 * returning a `XRefM` with a `get` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 */

export function filterOutputM(f) {
  return self => filterOutputM_(self, f);
}
/**
 * Filters the `get` value of the `XRefM` with the specified predicate,
 * returning a `XRefM` with a `get` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 */

export function filterOutput_(self, f) {
  return filterOutputM_(self, b => T.succeed(f(b)));
}
/**
 * Filters the `get` value of the `XRefM` with the specified predicate,
 * returning a `XRefM` with a `get` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 */

export function filterOutput(f) {
  return self => filterOutput_(self, f);
}
/**
 * Transforms the `get` value of the `XRefM` with the specified effectual
 * function.
 */

export function mapM_(self, f) {
  return dimapM_(self, T.succeed, f);
}
/**
 * Transforms the `get` value of the `XRefM` with the specified effectual
 * function.
 */

export function mapM(f) {
  return self => mapM_(self, f);
}
/**
 * Transforms the `set` value of the `XRefM` with the specified effectual
 * function.
 */

export function contramapM_(self, f) {
  return dimapM_(self, f, T.succeed);
}
/**
 * Transforms the `set` value of the `XRefM` with the specified effectual
 * function.
 */

export function contramapM(f) {
  return self => contramapM_(self, f);
}
/**
 * Transforms the `set` value of the `XRefM` with the specified function.
 */

export function contramap_(self, f) {
  return contramapM_(self, c => T.succeed(f(c)));
}
/**
 * Transforms the `set` value of the `XRefM` with the specified function.
 */

export function contramap(f) {
  return self => contramap_(self, f);
}
/**
 * Transforms the `get` value of the `XRefM` with the specified function.
 */

export function map_(self, f) {
  return mapM_(self, b => T.succeed(f(b)));
}
/**
 * Transforms the `get` value of the `XRefM` with the specified function.
 */

export function map(f) {
  return self => map_(self, f);
}
/**
 * Returns a read only view of the `XRefM`.
 */

export function readOnly(self) {
  return self;
}
/**
 * Returns a read only view of the `XRefM`.
 */

export function writeOnly(self) {
  return fold_(self, identity, () => undefined, E.right, () => E.left(undefined));
}
/**
 * Performs the specified effect every time a value is written to this
 * `XRefM`.
 */

export function tapInput_(self, f) {
  return contramapM_(self, c => T.as_(f(c), c));
}
/**
 * Performs the specified effect every time a value is written to this
 * `XRefM`.
 */

export function tapInput(f) {
  return self => tapInput_(self, f);
}
/**
 * Performs the specified effect every time a value is read to this
 * `XRefM`.
 */

export function tapOutput_(self, f) {
  return mapM_(self, b => T.as_(f(b), b));
}
/**
 * Performs the specified effect every time a value is read to this
 * `XRefM`.
 */

export function tapOutput(f) {
  return self => tapOutput_(self, f);
}
//# sourceMappingURL=api.mjs.map