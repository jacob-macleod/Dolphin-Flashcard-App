import * as Tp from "../Collections/Immutable/Tuple/index.js";
import * as E from "../Either/index.js";
import * as O from "../Option/index.js";
import * as T from "./effect.js";
import type { Ref, XRef } from "./XRef.js";
/**
 * Creates a new `XRef` with the specified value.
 */
export declare function makeRef<A>(a: A): T.UIO<Ref<A>>;
/**
 * Creates a new `XRef` with the specified value.
 */
export declare function unsafeMakeRef<A>(a: A): Ref<A>;
/**
 * Maps and filters the `get` value of the `XRef` with the specified partial
 * function, returning a `XRef` with a `get` value that succeeds with the
 * result of the partial function if it is defined or else fails with `None`.
 *
 * @ets_data_first collect_
 */
export declare function collect<B, C>(pf: (_: B) => O.Option<C>): <EA, EB, A>(self: XRef<EA, EB, A, B>) => XRef<EA, O.Option<EB>, A, C>;
/**
 * Maps and filters the `get` value of the `XRef` with the specified partial
 * function, returning a `XRef` with a `get` value that succeeds with the
 * result of the partial function if it is defined or else fails with `None`.
 */
export declare function collect_<EA, EB, A, B, C>(self: XRef<EA, EB, A, B>, pf: (_: B) => O.Option<C>): XRef<EA, O.Option<EB>, A, C>;
/**
 * Transforms the `set` value of the `XRef` with the specified function.
 *
 * @ets_data_first contramap_
 */
export declare function contramap<A, C>(f: (_: C) => A): <EA, EB, B>(self: XRef<EA, EB, A, B>) => XRef<EA, EB, C, B>;
/**
 * Transforms the `set` value of the `XRef` with the specified function.
 */
export declare function contramap_<EA, EB, B, A, C>(self: XRef<EA, EB, A, B>, f: (_: C) => A): XRef<EA, EB, C, B>;
/**
 * Transforms the `set` value of the `XRef` with the specified fallible
 * function.
 *
 * @ets_data_first contramapEither_
 */
export declare function contramapEither<A, EC, C>(f: (_: C) => E.Either<EC, A>): <EA, EB, B>(self: XRef<EA, EB, A, B>) => XRef<EC | EA, EB, C, B>;
/**
 * Transforms the `set` value of the `XRef` with the specified fallible
 * function.
 */
export declare function contramapEither_<A, EC, C, EA, EB, B>(self: XRef<EA, EB, A, B>, f: (_: C) => E.Either<EC, A>): XRef<EC | EA, EB, C, B>;
/**
 * Transforms both the `set` and `get` values of the `XRef` with the
 * specified functions.
 *
 * @ets_data_first dimap_
 */
export declare function dimap<A, B, C, D>(f: (_: C) => A, g: (_: B) => D): <EA, EB>(self: XRef<EA, EB, A, B>) => XRef<EA, EB, C, D>;
/**
 * Transforms both the `set` and `get` values of the `XRef` with the
 * specified functions.
 */
export declare function dimap_<EA, EB, A, B, C, D>(self: XRef<EA, EB, A, B>, f: (_: C) => A, g: (_: B) => D): XRef<EA, EB, C, D>;
/**
 * Transforms both the `set` and `get` values of the `XRef` with the
 * specified fallible functions.
 *
 * @ets_data_first dimapEither_
 */
export declare function dimapEither<A, B, C, EC, D, ED>(f: (_: C) => E.Either<EC, A>, g: (_: B) => E.Either<ED, D>): <EA, EB>(self: XRef<EA, EB, A, B>) => XRef<EC | EA, ED | EB, C, D>;
/**
 * Transforms both the `set` and `get` values of the `XRef` with the
 * specified fallible functions.
 */
export declare function dimapEither_<EA, EB, A, B, C, EC, D, ED>(self: XRef<EA, EB, A, B>, f: (_: C) => E.Either<EC, A>, g: (_: B) => E.Either<ED, D>): XRef<EC | EA, ED | EB, C, D>;
/**
 * Transforms both the `set` and `get` errors of the `XRef` with the
 * specified functions.
 *
 * @ets_data_first dimapError_
 */
export declare function dimapError<EA, EB, EC, ED>(f: (_: EA) => EC, g: (_: EB) => ED): <A, B>(self: XRef<EA, EB, A, B>) => XRef<EC, ED, A, B>;
/**
 * Transforms both the `set` and `get` errors of the `XRef` with the
 * specified functions.
 */
export declare function dimapError_<A, B, EA, EB, EC, ED>(self: XRef<EA, EB, A, B>, f: (_: EA) => EC, g: (_: EB) => ED): XRef<EC, ED, A, B>;
/**
 * Filters the `set` value of the `XRef` with the specified predicate,
 * returning a `XRef` with a `set` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 *
 * @ets_data_first filterInput_
 */
export declare function filterInput<A, A1 extends A>(f: (_: A1) => boolean): <EA, EB, B>(self: XRef<EA, EB, A, B>) => XRef<O.Option<EA>, EB, A1, B>;
/**
 * Filters the `set` value of the `XRef` with the specified predicate,
 * returning a `XRef` with a `set` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 */
export declare function filterInput_<EA, EB, B, A, A1 extends A>(self: XRef<EA, EB, A, B>, f: (_: A1) => boolean): XRef<O.Option<EA>, EB, A1, B>;
/**
 * Filters the `get` value of the `XRef` with the specified predicate,
 * returning a `XRef` with a `get` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 *
 * @ets_data_first filterOutput_
 */
export declare function filterOutput<B>(f: (_: B) => boolean): <EA, EB, A>(_: XRef<EA, EB, A, B>) => XRef<EA, O.Option<EB>, A, B>;
/**
 * Filters the `get` value of the `XRef` with the specified predicate,
 * returning a `XRef` with a `get` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 */
export declare function filterOutput_<EA, EB, A, B>(_: XRef<EA, EB, A, B>, f: (_: B) => boolean): XRef<EA, O.Option<EB>, A, B>;
/**
 * Transforms the `get` value of the `XRef` with the specified function.
 *
 * @ets_data_first map_
 */
export declare function map<B, C>(f: (_: B) => C): <EA, EB, A>(_: XRef<EA, EB, A, B>) => XRef<EA, EB, A, C>;
/**
 * Transforms the `get` value of the `XRef` with the specified function.
 */
export declare function map_<EA, EB, A, B, C>(_: XRef<EA, EB, A, B>, f: (_: B) => C): XRef<EA, EB, A, C>;
/**
 * Transforms the `get` value of the `XRef` with the specified fallible
 * function.
 *
 * @ets_data_first mapEither_
 */
export declare function mapEither<B, EC, C>(f: (_: B) => E.Either<EC, C>): <EA, EB, A>(_: XRef<EA, EB, A, B>) => XRef<EA, EC | EB, A, C>;
/**
 * Transforms the `get` value of the `XRef` with the specified fallible
 * function.
 */
export declare function mapEither_<EA, EB, A, B, EC, C>(_: XRef<EA, EB, A, B>, f: (_: B) => E.Either<EC, C>): XRef<EA, EC | EB, A, C>;
/**
 * Returns a read only view of the `XRef`.
 *
 * @ets_optimize identity
 */
export declare function readOnly<EA, EB, A, B>(_: XRef<EA, EB, A, B>): XRef<EA, EB, never, B>;
/**
 * Returns a write only view of the `XRef`.
 */
export declare function writeOnly<EA, EB, A, B>(_: XRef<EA, EB, A, B>): XRef<EA, void, A, never>;
/**
 * Atomically modifies the `XRef` with the specified function, which
 * computes a return value for the modification. This is a more powerful
 * version of `update`.
 *
 * @ets_data_first modify_
 */
export declare function modify<B, A>(f: (a: A) => Tp.Tuple<[B, A]>): <EA, EB>(self: XRef<EA, EB, A, A>) => T.IO<EA | EB, B>;
/**
 * Atomically modifies the `XRef` with the specified function, which
 * computes a return value for the modification. This is a more powerful
 * version of `update`.
 */
export declare function modify_<EA, EB, B, A>(self: XRef<EA, EB, A, A>, f: (a: A) => Tp.Tuple<[B, A]>): T.IO<EA | EB, B>;
/**
 * Atomically modifies the `XRef` with the specified partial function,
 * which computes a return value for the modification if the function is
 * defined on the current value otherwise it returns a default value. This
 * is a more powerful version of `updateSome`.
 *
 * @ets_data_first modifySome_
 */
export declare function modifySome<B, A>(def: B, f: (a: A) => O.Option<Tp.Tuple<[B, A]>>): <EA, EB>(self: XRef<EA, EB, A, A>) => T.IO<EA | EB, B>;
/**
 * Atomically modifies the `XRef` with the specified partial function,
 * which computes a return value for the modification if the function is
 * defined on the current value otherwise it returns a default value. This
 * is a more powerful version of `updateSome`.
 */
export declare function modifySome_<EA, EB, A, B>(self: XRef<EA, EB, A, A>, def: B, f: (a: A) => O.Option<Tp.Tuple<[B, A]>>): T.IO<EA | EB, B>;
/**
 * Atomically writes the specified value to the `XRef`, returning the value
 * immediately before modification.
 *
 * @ets_data_first getAndSet_
 */
export declare function getAndSet<A>(a: A): <EA, EB>(self: XRef<EA, EB, A, A>) => T.IO<EA | EB, A>;
/**
 * Atomically writes the specified value to the `XRef`, returning the value
 * immediately before modification.
 */
export declare function getAndSet_<EA, EB, A>(self: XRef<EA, EB, A, A>, a: A): T.IO<EA | EB, A>;
/**
 * Atomically modifies the `XRef` with the specified function, returning
 * the value immediately before modification.
 *
 * @ets_data_first getAndUpdate_
 */
export declare function getAndUpdate<A>(f: (a: A) => A): <EA, EB>(self: XRef<EA, EB, A, A>) => T.IO<EA | EB, A>;
/**
 * Atomically modifies the `XRef` with the specified function, returning
 * the value immediately before modification.
 */
export declare function getAndUpdate_<EA, EB, A>(self: XRef<EA, EB, A, A>, f: (a: A) => A): T.IO<EA | EB, A>;
/**
 * Atomically modifies the `XRef` with the specified partial function,
 * returning the value immediately before modification. If the function is
 * undefined on the current value it doesn't change it.
 *
 * @ets_data_first getAndUpdateSome_
 */
export declare function getAndUpdateSome<A>(f: (a: A) => O.Option<A>): <EA, EB>(self: XRef<EA, EB, A, A>) => T.IO<EA | EB, A>;
/**
 * Atomically modifies the `XRef` with the specified partial function,
 * returning the value immediately before modification. If the function is
 * undefined on the current value it doesn't change it.
 */
export declare function getAndUpdateSome_<EA, EB, A>(self: XRef<EA, EB, A, A>, f: (a: A) => O.Option<A>): T.IO<EA | EB, A>;
/**
 * Atomically modifies the `XRef` with the specified function.
 *
 * @ets_data_first update_
 */
export declare function update<A>(f: (a: A) => A): <EA, EB>(self: XRef<EA, EB, A, A>) => T.IO<EA | EB, void>;
/**
 * Atomically modifies the `XRef` with the specified function.
 */
export declare function update_<EA, EB, A>(self: XRef<EA, EB, A, A>, f: (a: A) => A): T.IO<EA | EB, void>;
/**
 * Atomically modifies the `XRef` with the specified function and returns
 * the updated value.
 *
 * @ets_data_first updateAndGet_
 */
export declare function updateAndGet<A>(f: (a: A) => A): <EA, EB>(self: XRef<EA, EB, A, A>) => T.IO<EA | EB, A>;
/**
 * Atomically modifies the `XRef` with the specified function and returns
 * the updated value.
 */
export declare function updateAndGet_<EA, EB, A>(self: XRef<EA, EB, A, A>, f: (a: A) => A): T.IO<EA | EB, A>;
/**
 * Atomically modifies the `XRef` with the specified partial function. If
 * the function is undefined on the current value it doesn't change it.
 *
 * @ets_data_first updateSome_
 */
export declare function updateSome<A>(f: (a: A) => O.Option<A>): <EA, EB>(self: XRef<EA, EB, A, A>) => T.IO<EA | EB, void>;
/**
 * Atomically modifies the `XRef` with the specified partial function. If
 * the function is undefined on the current value it doesn't change it.
 */
export declare function updateSome_<EA, EB, A>(self: XRef<EA, EB, A, A>, f: (a: A) => O.Option<A>): T.IO<EA | EB, void>;
/**
 * Atomically modifies the `XRef` with the specified partial function. If
 * the function is undefined on the current value it returns the old value
 * without changing it.
 *
 * @ets_data_first updateSomeAndGet_
 */
export declare function updateSomeAndGet<A>(f: (a: A) => O.Option<A>): <EA, EB>(self: XRef<EA, EB, A, A>) => T.IO<EA | EB, A>;
/**
 * Atomically modifies the `XRef` with the specified partial function. If
 * the function is undefined on the current value it returns the old value
 * without changing it.
 */
export declare function updateSomeAndGet_<EA, EB, A>(self: XRef<EA, EB, A, A>, f: (a: A) => O.Option<A>): T.IO<EA | EB, A>;
/**
 * Folds over the error and value types of the `XRef`. This is a highly
 * polymorphic method that is capable of arbitrarily transforming the error
 * and value types of the `XRef`. For most use cases one of the more specific
 * combinators implemented in terms of `fold` will be more ergonomic but this
 * method is extremely useful for implementing new combinators.
 *
 * @ets_data_first fold_
 */
export declare function fold<EA, EB, A, B, EC, ED, C = A, D = B>(ea: (_: EA) => EC, eb: (_: EB) => ED, ca: (_: C) => E.Either<EC, A>, bd: (_: B) => E.Either<ED, D>): (self: XRef<EA, EB, A, B>) => XRef<EC, ED, C, D>;
/**
 * Folds over the error and value types of the `XRef`. This is a highly
 * polymorphic method that is capable of arbitrarily transforming the error
 * and value types of the `XRef`. For most use cases one of the more specific
 * combinators implemented in terms of `fold` will be more ergonomic but this
 * method is extremely useful for implementing new combinators.
 */
export declare function fold_<EA, EB, A, B, EC, ED, C = A, D = B>(self: XRef<EA, EB, A, B>, ea: (_: EA) => EC, eb: (_: EB) => ED, ca: (_: C) => E.Either<EC, A>, bd: (_: B) => E.Either<ED, D>): XRef<EC, ED, C, D>;
/**
 * Folds over the error and value types of the `XRef`, allowing access to
 * the state in transforming the `set` value. This is a more powerful version
 * of `fold` but requires unifying the error types.
 *
 * @ets_data_first foldAll_
 */
export declare function foldAll<EA, EB, A, B, EC, ED, C = A, D = B>(ea: (_: EA) => EC, eb: (_: EB) => ED, ec: (_: EB) => EC, ca: (_: C) => (_: B) => E.Either<EC, A>, bd: (_: B) => E.Either<ED, D>): (self: XRef<EA, EB, A, B>) => XRef<EC, ED, C, D>;
/**
 * Folds over the error and value types of the `XRef`, allowing access to
 * the state in transforming the `set` value. This is a more powerful version
 * of `fold` but requires unifying the error types.
 */
export declare function foldAll_<EA, EB, A, B, EC, ED, C = A, D = B>(self: XRef<EA, EB, A, B>, ea: (_: EA) => EC, eb: (_: EB) => ED, ec: (_: EB) => EC, ca: (_: C) => (_: B) => E.Either<EC, A>, bd: (_: B) => E.Either<ED, D>): XRef<EC, ED, C, D>;
/**
 * Reads the value from the `XRef`.
 */
export declare function get<EA, EB, A, B>(self: XRef<EA, EB, A, B>): T.IO<EB, B>;
/**
 * Writes a new value to the `XRef`, with a guarantee of immediate
 * consistency (at some cost to performance).
 *
 * @ets_data_first set_
 */
export declare function set<A>(a: A): <EA, EB, B>(self: XRef<EA, EB, A, B>) => T.IO<EA, void>;
/**
 * Writes a new value to the `XRef`, with a guarantee of immediate
 * consistency (at some cost to performance).
 */
export declare function set_<EA, EB, B, A>(self: XRef<EA, EB, A, B>, a: A): T.IO<EA, void>;
//# sourceMappingURL=api.d.ts.map