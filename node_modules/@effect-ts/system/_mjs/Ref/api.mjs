// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import * as absolve from "../Effect/absolve.mjs";
import * as E from "../Either/index.mjs";
import { identity, pipe } from "../Function/index.mjs";
import * as O from "../Option/index.mjs";
import { AtomicReference } from "../Support/AtomicReference/index.mjs";
import { matchTag } from "../Utils/index.mjs";
import * as A from "./atomic.mjs";
import * as T from "./effect.mjs";
import { Atomic, concrete } from "./XRef.mjs";
/**
 * Creates a new `XRef` with the specified value.
 */

export function makeRef(a) {
  return T.succeedWith(() => new Atomic(new AtomicReference(a)));
}
/**
 * Creates a new `XRef` with the specified value.
 */

export function unsafeMakeRef(a) {
  return new Atomic(new AtomicReference(a));
}
/**
 * Maps and filters the `get` value of the `XRef` with the specified partial
 * function, returning a `XRef` with a `get` value that succeeds with the
 * result of the partial function if it is defined or else fails with `None`.
 *
 * @ets_data_first collect_
 */

export function collect(pf) {
  return self => collect_(self, pf);
}
/**
 * Maps and filters the `get` value of the `XRef` with the specified partial
 * function, returning a `XRef` with a `get` value that succeeds with the
 * result of the partial function if it is defined or else fails with `None`.
 */

export function collect_(self, pf) {
  return self.fold(identity, O.some, E.right, b => E.fromOption_(pf(b), () => O.none));
}
/**
 * Transforms the `set` value of the `XRef` with the specified function.
 *
 * @ets_data_first contramap_
 */

export function contramap(f) {
  return self => contramap_(self, f);
}
/**
 * Transforms the `set` value of the `XRef` with the specified function.
 */

export function contramap_(self, f) {
  return contramapEither_(self, c => E.right(f(c)));
}
/**
 * Transforms the `set` value of the `XRef` with the specified fallible
 * function.
 *
 * @ets_data_first contramapEither_
 */

export function contramapEither(f) {
  return self => contramapEither_(self, f);
}
/**
 * Transforms the `set` value of the `XRef` with the specified fallible
 * function.
 */

export function contramapEither_(self, f) {
  return dimapEither_(self, f, x => E.right(x));
}
/**
 * Transforms both the `set` and `get` values of the `XRef` with the
 * specified functions.
 *
 * @ets_data_first dimap_
 */

export function dimap(f, g) {
  return self => dimap_(self, f, g);
}
/**
 * Transforms both the `set` and `get` values of the `XRef` with the
 * specified functions.
 */

export function dimap_(self, f, g) {
  return dimapEither_(self, c => E.right(f(c)), b => E.right(g(b)));
}
/**
 * Transforms both the `set` and `get` values of the `XRef` with the
 * specified fallible functions.
 *
 * @ets_data_first dimapEither_
 */

export function dimapEither(f, g) {
  return self => dimapEither_(self, f, g);
}
/**
 * Transforms both the `set` and `get` values of the `XRef` with the
 * specified fallible functions.
 */

export function dimapEither_(self, f, g) {
  return self.fold(ea => ea, eb => eb, f, g);
}
/**
 * Transforms both the `set` and `get` errors of the `XRef` with the
 * specified functions.
 *
 * @ets_data_first dimapError_
 */

export function dimapError(f, g) {
  return self => dimapError_(self, f, g);
}
/**
 * Transforms both the `set` and `get` errors of the `XRef` with the
 * specified functions.
 */

export function dimapError_(self, f, g) {
  return self.fold(f, g, E.right, E.right);
}
/**
 * Filters the `set` value of the `XRef` with the specified predicate,
 * returning a `XRef` with a `set` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 *
 * @ets_data_first filterInput_
 */

export function filterInput(f) {
  return self => filterInput_(self, f);
}
/**
 * Filters the `set` value of the `XRef` with the specified predicate,
 * returning a `XRef` with a `set` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 */

export function filterInput_(self, f) {
  return self.fold(O.some, identity, a => f(a) ? E.right(a) : E.left(O.none), E.right);
}
/**
 * Filters the `get` value of the `XRef` with the specified predicate,
 * returning a `XRef` with a `get` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 *
 * @ets_data_first filterOutput_
 */

export function filterOutput(f) {
  return _ => filterOutput_(_, f);
}
/**
 * Filters the `get` value of the `XRef` with the specified predicate,
 * returning a `XRef` with a `get` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 */

export function filterOutput_(_, f) {
  return _.fold(identity, O.some, E.right, b => f(b) ? E.right(b) : E.left(O.none));
}
/**
 * Transforms the `get` value of the `XRef` with the specified function.
 *
 * @ets_data_first map_
 */

export function map(f) {
  return _ => map_(_, f);
}
/**
 * Transforms the `get` value of the `XRef` with the specified function.
 */

export function map_(_, f) {
  return mapEither_(_, b => E.right(f(b)));
}
/**
 * Transforms the `get` value of the `XRef` with the specified fallible
 * function.
 *
 * @ets_data_first mapEither_
 */

export function mapEither(f) {
  return _ => mapEither_(_, f);
}
/**
 * Transforms the `get` value of the `XRef` with the specified fallible
 * function.
 */

export function mapEither_(_, f) {
  return dimapEither_(_, a => E.right(a), f);
}
/**
 * Returns a read only view of the `XRef`.
 *
 * @ets_optimize identity
 */

export function readOnly(_) {
  return _;
}
/**
 * Returns a write only view of the `XRef`.
 */

export function writeOnly(_) {
  return _.fold(identity, () => undefined, E.right, () => E.left(undefined));
}
/**
 * Atomically modifies the `XRef` with the specified function, which
 * computes a return value for the modification. This is a more powerful
 * version of `update`.
 *
 * @ets_data_first modify_
 */

export function modify(f) {
  return self => modify_(self, f);
}
/**
 * Atomically modifies the `XRef` with the specified function, which
 * computes a return value for the modification. This is a more powerful
 * version of `update`.
 */

export function modify_(self, f) {
  return matchTag({
    Atomic: _ => A.modify(_, f),
    Derived: self => self.use((value, getEither, setEither) => absolve.absolve(A.modify(value, s => E.fold_(getEither(s), e => Tp.tuple(E.left(e), s), a1 => (({
      tuple: [b, a2]
    }) => E.fold_(setEither(a2), e => Tp.tuple(E.left(e), s), s => Tp.tuple(E.right(b), s)))(f(a1)))))),
    DerivedAll: self => self.use((value, getEither, setEither) => absolve.absolve(A.modify(value, s => E.fold_(getEither(s), e => Tp.tuple(E.left(e), s), a1 => (({
      tuple: [b, a2]
    }) => E.fold_(setEither(a2)(s), e => Tp.tuple(E.left(e), s), s => Tp.tuple(E.right(b), s)))(f(a1))))))
  })(self);
}
/**
 * Atomically modifies the `XRef` with the specified partial function,
 * which computes a return value for the modification if the function is
 * defined on the current value otherwise it returns a default value. This
 * is a more powerful version of `updateSome`.
 *
 * @ets_data_first modifySome_
 */

export function modifySome(def, f) {
  return self => modifySome_(self, def, f);
}
/**
 * Atomically modifies the `XRef` with the specified partial function,
 * which computes a return value for the modification if the function is
 * defined on the current value otherwise it returns a default value. This
 * is a more powerful version of `updateSome`.
 */

export function modifySome_(self, def, f) {
  return matchTag({
    Atomic: _ => A.modifySome(_, def, f)
  }, _ => modify_(_, a => O.getOrElse_(f(a), () => Tp.tuple(def, a))))(self);
}
/**
 * Atomically writes the specified value to the `XRef`, returning the value
 * immediately before modification.
 *
 * @ets_data_first getAndSet_
 */

export function getAndSet(a) {
  return self => getAndSet_(self, a);
}
/**
 * Atomically writes the specified value to the `XRef`, returning the value
 * immediately before modification.
 */

export function getAndSet_(self, a) {
  return matchTag({
    Atomic: _ => A.getAndSet(_, a)
  }, _ => modify_(_, v => Tp.tuple(v, a)))(self);
}
/**
 * Atomically modifies the `XRef` with the specified function, returning
 * the value immediately before modification.
 *
 * @ets_data_first getAndUpdate_
 */

export function getAndUpdate(f) {
  return self => getAndUpdate_(self, f);
}
/**
 * Atomically modifies the `XRef` with the specified function, returning
 * the value immediately before modification.
 */

export function getAndUpdate_(self, f) {
  return matchTag({
    Atomic: _ => A.getAndUpdate(_, f)
  }, modify(v => Tp.tuple(v, f(v))))(self);
}
/**
 * Atomically modifies the `XRef` with the specified partial function,
 * returning the value immediately before modification. If the function is
 * undefined on the current value it doesn't change it.
 *
 * @ets_data_first getAndUpdateSome_
 */

export function getAndUpdateSome(f) {
  return self => getAndUpdateSome_(self, f);
}
/**
 * Atomically modifies the `XRef` with the specified partial function,
 * returning the value immediately before modification. If the function is
 * undefined on the current value it doesn't change it.
 */

export function getAndUpdateSome_(self, f) {
  return matchTag({
    Atomic: _ => A.getAndUpdateSome(_, f)
  }, _ => modify_(_, v => (a => Tp.tuple(v, a))(O.getOrElse_(f(v), () => v))))(self);
}
/**
 * Atomically modifies the `XRef` with the specified function.
 *
 * @ets_data_first update_
 */

export function update(f) {
  return self => update_(self, f);
}
/**
 * Atomically modifies the `XRef` with the specified function.
 */

export function update_(self, f) {
  return matchTag({
    Atomic: _ => A.update(_, f)
  }, _ => modify_(_, v => Tp.tuple(undefined, f(v))))(self);
}
/**
 * Atomically modifies the `XRef` with the specified function and returns
 * the updated value.
 *
 * @ets_data_first updateAndGet_
 */

export function updateAndGet(f) {
  return self => updateAndGet_(self, f);
}
/**
 * Atomically modifies the `XRef` with the specified function and returns
 * the updated value.
 */

export function updateAndGet_(self, f) {
  return matchTag({
    Atomic: _ => A.updateAndGet(_, f)
  }, self => T.chain_(modify_(self, v => (result => Tp.tuple(result, result))(f(v))), () => self.get))(self);
}
/**
 * Atomically modifies the `XRef` with the specified partial function. If
 * the function is undefined on the current value it doesn't change it.
 *
 * @ets_data_first updateSome_
 */

export function updateSome(f) {
  return self => updateSome_(self, f);
}
/**
 * Atomically modifies the `XRef` with the specified partial function. If
 * the function is undefined on the current value it doesn't change it.
 */

export function updateSome_(self, f) {
  return matchTag({
    Atomic: _ => A.updateSome(_, f)
  }, modify(v => (a => Tp.tuple(undefined, a))(O.getOrElse_(f(v), () => v))))(self);
}
/**
 * Atomically modifies the `XRef` with the specified partial function. If
 * the function is undefined on the current value it returns the old value
 * without changing it.
 *
 * @ets_data_first updateSomeAndGet_
 */

export function updateSomeAndGet(f) {
  return self => updateSomeAndGet_(self, f);
}
/**
 * Atomically modifies the `XRef` with the specified partial function. If
 * the function is undefined on the current value it returns the old value
 * without changing it.
 */

export function updateSomeAndGet_(self, f) {
  return matchTag({
    Atomic: _ => A.updateSomeAndGet(_, f)
  }, _ => modify_(_, v => (result => Tp.tuple(result, result))(O.getOrElse_(f(v), () => v))))(self);
}
/**
 * Folds over the error and value types of the `XRef`. This is a highly
 * polymorphic method that is capable of arbitrarily transforming the error
 * and value types of the `XRef`. For most use cases one of the more specific
 * combinators implemented in terms of `fold` will be more ergonomic but this
 * method is extremely useful for implementing new combinators.
 *
 * @ets_data_first fold_
 */

export function fold(ea, eb, ca, bd) {
  return self => self.fold(ea, eb, ca, bd);
}
/**
 * Folds over the error and value types of the `XRef`. This is a highly
 * polymorphic method that is capable of arbitrarily transforming the error
 * and value types of the `XRef`. For most use cases one of the more specific
 * combinators implemented in terms of `fold` will be more ergonomic but this
 * method is extremely useful for implementing new combinators.
 */

export function fold_(self, ea, eb, ca, bd) {
  return self.fold(ea, eb, ca, bd);
}
/**
 * Folds over the error and value types of the `XRef`, allowing access to
 * the state in transforming the `set` value. This is a more powerful version
 * of `fold` but requires unifying the error types.
 *
 * @ets_data_first foldAll_
 */

export function foldAll(ea, eb, ec, ca, bd) {
  return self => self.foldAll(ea, eb, ec, ca, bd);
}
/**
 * Folds over the error and value types of the `XRef`, allowing access to
 * the state in transforming the `set` value. This is a more powerful version
 * of `fold` but requires unifying the error types.
 */

export function foldAll_(self, ea, eb, ec, ca, bd) {
  return self.foldAll(ea, eb, ec, ca, bd);
}
/**
 * Reads the value from the `XRef`.
 */

export function get(self) {
  return self.get;
}
/**
 * Writes a new value to the `XRef`, with a guarantee of immediate
 * consistency (at some cost to performance).
 *
 * @ets_data_first set_
 */

export function set(a) {
  return self => self.set(a);
}
/**
 * Writes a new value to the `XRef`, with a guarantee of immediate
 * consistency (at some cost to performance).
 */

export function set_(self, a) {
  return self.set(a);
}
//# sourceMappingURL=api.mjs.map