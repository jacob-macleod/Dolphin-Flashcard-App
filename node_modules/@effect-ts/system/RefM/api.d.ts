import * as Tp from "../Collections/Immutable/Tuple/index.js";
import * as E from "../Either/index.js";
import type * as M from "../Managed/managed.js";
import * as O from "../Option/index.js";
import * as Q from "../Queue/index.js";
import * as T from "./effect.js";
import type { RefM, XRefM } from "./XRefM.js";
/**
 * Creates a new `XRefM` with the specified value.
 */
export declare function makeRefM<A>(a: A): T.UIO<RefM<A>>;
/**
 * Creates a new `XRefM` with the specified value.
 */
export declare function unsafeMakeRefM<A>(a: A): RefM<A>;
/**
 * Creates a new `RefM` with the specified value in the context of a
 * `Managed.`
 */
export declare function makeManagedRefM<A>(a: A): M.UIO<RefM<A>>;
/**
 * Creates a new `RefM` and a `Dequeue` that will emit every change to the
 * `RefM`.
 */
export declare function dequeueRef<A>(a: A): T.UIO<[RefM<A>, Q.Dequeue<A>]>;
/**
 * Atomically modifies the `RefM` with the specified function, which computes
 * a return value for the modification. This is a more powerful version of
 * `update`.
 */
export declare function modify_<RA, RB, EA, EB, R1, E1, B, A>(self: XRefM<RA, RB, EA, EB, A, A>, f: (a: A) => T.Effect<R1, E1, Tp.Tuple<[B, A]>>): T.Effect<RA & RB & R1, EA | EB | E1, B>;
/**
 * Atomically modifies the `RefM` with the specified function, which computes
 * a return value for the modification. This is a more powerful version of
 * `update`.
 */
export declare function modify<R1, E1, B, A>(f: (a: A) => T.Effect<R1, E1, Tp.Tuple<[B, A]>>): <RA, RB, EA, EB>(self: XRefM<RA, RB, EA, EB, A, A>) => T.Effect<RA & RB & R1, E1 | EA | EB, B>;
/**
 * Reads the value from the `XRefM`.
 */
export declare function get<RA, RB, EA, EB, A, B>(self: XRefM<RA, RB, EA, EB, A, B>): T.Effect<RB, EB, B>;
/**
 * Writes a new value to the `RefM`, returning the value immediately before
 * modification.
 */
export declare function getAndSet_<RA, RB, EA, EB, A>(self: XRefM<RA, RB, EA, EB, A, A>, a: A): T.Effect<RA & RB, EA | EB, A>;
/**
 * Writes a new value to the `RefM`, returning the value immediately before
 * modification.
 */
export declare function getAndSet<A>(a: A): <RA, RB, EA, EB>(self: XRefM<RA, RB, EA, EB, A, A>) => T.Effect<RA & RB, EA | EB, A>;
/**
 * Atomically modifies the `RefM` with the specified function, returning the
 * value immediately before modification.
 */
export declare function getAndUpdate_<RA, RB, EA, EB, R1, E1, A>(self: XRefM<RA, RB, EA, EB, A, A>, f: (a: A) => T.Effect<R1, E1, A>): T.Effect<RA & RB & R1, EA | EB | E1, A>;
/**
 * Atomically modifies the `RefM` with the specified function, returning the
 * value immediately before modification.
 */
export declare function getAndUpdate<R1, E1, A>(f: (a: A) => T.Effect<R1, E1, A>): <RA, RB, EA, EB>(self: XRefM<RA, RB, EA, EB, A, A>) => T.Effect<RA & RB & R1, E1 | EA | EB, A>;
/**
 * Atomically modifies the `RefM` with the specified function, returning the
 * value immediately before modification.
 */
export declare function getAndUpdateSome_<RA, RB, EA, EB, R1, E1, A>(self: XRefM<RA, RB, EA, EB, A, A>, f: (a: A) => O.Option<T.Effect<R1, E1, A>>): T.Effect<RA & RB & R1, EA | EB | E1, A>;
/**
 * Atomically modifies the `RefM` with the specified function, returning the
 * value immediately before modification.
 */
export declare function getAndUpdateSome<R1, E1, A>(f: (a: A) => O.Option<T.Effect<R1, E1, A>>): <RA, RB, EA, EB>(self: XRefM<RA, RB, EA, EB, A, A>) => T.Effect<RA & RB & R1, E1 | EA | EB, A>;
/**
 * Atomically modifies the `RefM` with the specified function, which computes
 * a return value for the modification if the function is defined in the current value
 * otherwise it returns a default value.
 * This is a more powerful version of `updateSome`.
 */
export declare function modifySome_<RA, RB, EA, EB, R1, E1, A, B>(self: XRefM<RA, RB, EA, EB, A, A>, def: B, f: (a: A) => O.Option<T.Effect<R1, E1, Tp.Tuple<[B, A]>>>): T.Effect<RA & RB & R1, EA | EB | E1, B>;
/**
 * Atomically modifies the `RefM` with the specified function, which computes
 * a return value for the modification if the function is defined in the current value
 * otherwise it returns a default value.
 * This is a more powerful version of `updateSome`.
 */
export declare function modifySome<B>(def: B): <R1, E1, A>(f: (a: A) => O.Option<T.Effect<R1, E1, Tp.Tuple<[B, A]>>>) => <RA, RB, EA, EB>(self: XRefM<RA, RB, EA, EB, A, A>) => T.Effect<RA & RB & R1, E1 | EA | EB, B>;
/**
 * Atomically modifies the `RefM` with the specified function.
 */
export declare function update_<RA, RB, EA, EB, R1, E1, A>(self: XRefM<RA, RB, EA, EB, A, A>, f: (a: A) => T.Effect<R1, E1, A>): T.Effect<RA & RB & R1, E1 | EA | EB, void>;
/**
 * Atomically modifies the `RefM` with the specified function.
 */
export declare function update<R1, E1, A>(f: (a: A) => T.Effect<R1, E1, A>): <RA, RB, EA, EB>(self: XRefM<RA, RB, EA, EB, A, A>) => T.Effect<RA & RB & R1, E1 | EA | EB, void>;
/**
 * Atomically modifies the `RefM` with the specified function.
 */
export declare function updateAndGet_<RA, RB, EA, EB, R1, E1, A>(self: XRefM<RA, RB, EA, EB, A, A>, f: (a: A) => T.Effect<R1, E1, A>): T.Effect<RA & RB & R1, E1 | EA | EB, void>;
/**
 * Atomically modifies the `RefM` with the specified function.
 */
export declare function updateAndGet<R1, E1, A>(f: (a: A) => T.Effect<R1, E1, A>): <RA, RB, EA, EB>(self: XRefM<RA, RB, EA, EB, A, A>) => T.Effect<RA & RB & R1, E1 | EA | EB, void>;
/**
 * Atomically modifies the `RefM` with the specified function.
 */
export declare function updateSome_<RA, RB, EA, EB, R1, E1, A>(self: XRefM<RA, RB, EA, EB, A, A>, f: (a: A) => O.Option<T.Effect<R1, E1, A>>): T.Effect<RA & RB & R1, E1 | EA | EB, void>;
/**
 * Atomically modifies the `RefM` with the specified function.
 */
export declare function updateSome<R1, E1, A>(f: (a: A) => O.Option<T.Effect<R1, E1, A>>): <RA, RB, EA, EB>(self: XRefM<RA, RB, EA, EB, A, A>) => T.Effect<RA & RB & R1, E1 | EA | EB, void>;
/**
 * Atomically modifies the `RefM` with the specified function.
 */
export declare function updateSomeAndGet_<RA, RB, EA, EB, R1, E1, A>(self: XRefM<RA, RB, EA, EB, A, A>, f: (a: A) => O.Option<T.Effect<R1, E1, A>>): T.Effect<RA & RB & R1, E1 | EA | EB, A>;
/**
 * Atomically modifies the `RefM` with the specified function.
 */
export declare function updateSomeAndGet<R1, E1, A>(f: (a: A) => O.Option<T.Effect<R1, E1, A>>): <RA, RB, EA, EB>(self: XRefM<RA, RB, EA, EB, A, A>) => T.Effect<RA & RB & R1, E1 | EA | EB, A>;
/**
 * Folds over the error and value types of the `XRefM`.
 */
export declare function fold_<RA, RB, EA, EB, A, B, EC, ED, C = A, D = B>(self: XRefM<RA, RB, EA, EB, A, B>, ea: (_: EA) => EC, eb: (_: EB) => ED, ca: (_: C) => E.Either<EC, A>, bd: (_: B) => E.Either<ED, D>): XRefM<RA, RB, EC, ED, C, D>;
/**
 * Folds over the error and value types of the `XRefM`.
 */
export declare function fold<EA, EB, A, B, EC, ED, C = A, D = B>(ea: (_: EA) => EC, eb: (_: EB) => ED, ca: (_: C) => E.Either<EC, A>, bd: (_: B) => E.Either<ED, D>): <RA, RB>(self: XRefM<RA, RB, EA, EB, A, B>) => XRefM<RA, RB, EC, ED, C, D>;
/**
 * Folds over the error and value types of the `XRefM`. This is a highly
 * polymorphic method that is capable of arbitrarily transforming the error
 * and value types of the `XRefM`. For most use cases one of the more
 * specific combinators implemented in terms of `foldM` will be more
 * ergonomic but this method is extremely useful for implementing new
 * combinators.
 */
export declare function foldM_<RA, RB, EA, EB, A, B, RC, RD, EC, ED, C = A, D = B>(self: XRefM<RA, RB, EA, EB, A, B>, ea: (_: EA) => EC, eb: (_: EB) => ED, ca: (_: C) => T.Effect<RC, EC, A>, bd: (_: B) => T.Effect<RD, ED, D>): XRefM<RA & RC, RB & RD, EC, ED, C, D>;
/**
 * Folds over the error and value types of the `XRefM`. This is a highly
 * polymorphic method that is capable of arbitrarily transforming the error
 * and value types of the `XRefM`. For most use cases one of the more
 * specific combinators implemented in terms of `foldM` will be more
 * ergonomic but this method is extremely useful for implementing new
 * combinators.
 */
export declare function foldM<EA, EB, A, B, RC, RD, EC, ED, C = A, D = B>(ea: (_: EA) => EC, eb: (_: EB) => ED, ca: (_: C) => T.Effect<RC, EC, A>, bd: (_: B) => T.Effect<RD, ED, D>): <RA, RB>(self: XRefM<RA, RB, EA, EB, A, B>) => XRefM<RA & RC, RB & RD, EC, ED, C, D>;
/**
 * Folds over the error and value types of the `XRefM`, allowing access to
 * the state in transforming the `set` value. This is a more powerful version
 * of `foldM` but requires unifying the environment and error types.
 */
export declare function foldAllM_<RA, RB, EA, EB, A, B, RC, RD, EC, ED, C = A, D = B>(self: XRefM<RA, RB, EA, EB, A, B>, ea: (_: EA) => EC, eb: (_: EB) => ED, ec: (_: EB) => EC, ca: (_: C) => (_: B) => T.Effect<RC, EC, A>, bd: (_: B) => T.Effect<RD, ED, D>): XRefM<RB & RA & RC, RB & RD, EC, ED, C, D>;
/**
 * Folds over the error and value types of the `XRefM`, allowing access to
 * the state in transforming the `set` value. This is a more powerful version
 * of `foldM` but requires unifying the environment and error types.
 */
export declare function foldAllM<EA, EB, A, B, RC, RD, EC, ED, C = A, D = B>(ea: (_: EA) => EC, eb: (_: EB) => ED, ec: (_: EB) => EC, ca: (_: C) => (_: B) => T.Effect<RC, EC, A>, bd: (_: B) => T.Effect<RD, ED, D>): <RA, RB>(self: XRefM<RA, RB, EA, EB, A, B>) => XRefM<RB & RA & RC, RB & RD, EC, ED, C, D>;
/**
 * Maps and filters the `get` value of the `XRefM` with the specified
 * effectual partial function, returning a `XRefM` with a `get` value that
 * succeeds with the result of the partial function if it is defined or else
 * fails with `None`.
 */
export declare function collectM_<RA, RB, EA, EB, A, B, RC, EC, C>(self: XRefM<RA, RB, EA, EB, A, B>, f: (b: B) => O.Option<T.Effect<RC, EC, C>>): XRefM<RA, RB & RC, EA, O.Option<EB | EC>, A, C>;
/**
 * Maps and filters the `get` value of the `XRefM` with the specified
 * effectual partial function, returning a `XRefM` with a `get` value that
 * succeeds with the result of the partial function if it is defined or else
 * fails with `None`.
 */
export declare function collectM<B, RC, EC, C>(f: (b: B) => O.Option<T.Effect<RC, EC, C>>): <RA, RB, EA, EB, A>(self: XRefM<RA, RB, EA, EB, A, B>) => XRefM<RA, RB & RC, EA, O.Option<EC | EB>, A, C>;
/**
 * Maps and filters the `get` value of the `XRefM` with the specified partial
 * function, returning a `XRefM` with a `get` value that succeeds with the
 * result of the partial function if it is defined or else fails with `None`.
 */
export declare function collect_<RA, RB, EA, EB, A, B, C>(self: XRefM<RA, RB, EA, EB, A, B>, f: (b: B) => O.Option<C>): XRefM<RA, RB, EA, O.Option<EB>, A, C>;
/**
 * Maps and filters the `get` value of the `XRefM` with the specified partial
 * function, returning a `XRefM` with a `get` value that succeeds with the
 * result of the partial function if it is defined or else fails with `None`.
 */
export declare function collect<B, C>(f: (b: B) => O.Option<C>): <RA, RB, EA, EB, A>(self: XRefM<RA, RB, EA, EB, A, B>) => XRefM<RA, RB, EA, O.Option<EB>, A, C>;
/**
 * Transforms both the `set` and `get` values of the `XRefM` with the
 * specified effectual functions.
 */
export declare function dimapM_<RA, RB, EA, EB, B, RC, EC, A, RD, ED, C = A, D = B>(self: XRefM<RA, RB, EA, EB, A, B>, f: (c: C) => T.Effect<RC, EC, A>, g: (b: B) => T.Effect<RD, ED, D>): XRefM<RA & RC, RB & RD, EA | EC, EB | ED, C, D>;
/**
 * Transforms both the `set` and `get` values of the `XRefM` with the
 * specified effectual functions.
 */
export declare function dimapM<B, RC, EC, A, RD, ED, C = A, D = B>(f: (c: C) => T.Effect<RC, EC, A>, g: (b: B) => T.Effect<RD, ED, D>): <RA, RB, EA, EB>(self: XRefM<RA, RB, EA, EB, A, B>) => XRefM<RA & RC, RB & RD, EC | EA, ED | EB, C, D>;
/**
 * Transforms both the `set` and `get` errors of the `XRefM` with the
 * specified functions.
 */
export declare function dimapError_<RA, RB, A, B, EA, EB, EC, ED>(self: XRefM<RA, RB, EA, EB, A, B>, f: (ea: EA) => EC, g: (eb: EB) => ED): XRefM<RA, RB, EC, ED, A, B>;
/**
 * Transforms both the `set` and `get` errors of the `XRefM` with the
 * specified functions.
 */
export declare function dimapError<EA, EB, EC, ED>(f: (ea: EA) => EC, g: (eb: EB) => ED): <RA, RB, A, B>(self: XRefM<RA, RB, EA, EB, A, B>) => XRefM<RA, RB, EC, ED, A, B>;
/**
 * Filters the `set` value of the `XRefM` with the specified effectual
 * predicate, returning a `XRefM` with a `set` value that succeeds if the
 * predicate is satisfied or else fails with `None`.
 */
export declare function filterInputM_<RA, RB, EA, EB, B, A, RC, EC, A1 extends A = A>(self: XRefM<RA, RB, EA, EB, A, B>, f: (a: A1) => T.Effect<RC, EC, boolean>): XRefM<RA & RC, RB, O.Option<EC | EA>, EB, A1, B>;
/**
 * Filters the `set` value of the `XRefM` with the specified effectual
 * predicate, returning a `XRefM` with a `set` value that succeeds if the
 * predicate is satisfied or else fails with `None`.
 */
export declare function filterInputM<A, RC, EC, A1 extends A = A>(f: (a: A1) => T.Effect<RC, EC, boolean>): <RA, RB, EA, EB, B>(self: XRefM<RA, RB, EA, EB, A, B>) => XRefM<RA & RC, RB, O.Option<EC | EA>, EB, A1, B>;
/**
 * Filters the `set` value of the `XRefM` with the specified effectual
 * predicate, returning a `XRefM` with a `set` value that succeeds if the
 * predicate is satisfied or else fails with `None`.
 */
export declare function filterInput_<RA, RB, EA, EB, B, A, A1 extends A = A>(self: XRefM<RA, RB, EA, EB, A, B>, f: (a: A1) => boolean): XRefM<RA, RB, O.Option<EA>, EB, A1, B>;
/**
 * Filters the `set` value of the `XRefM` with the specified effectual
 * predicate, returning a `XRefM` with a `set` value that succeeds if the
 * predicate is satisfied or else fails with `None`.
 */
export declare function filterInput<A, A1 extends A = A>(f: (a: A1) => boolean): <RA, RB, EA, EB, B>(self: XRefM<RA, RB, EA, EB, A, B>) => XRefM<RA, RB, O.Option<EA>, EB, A1, B>;
/**
 * Filters the `get` value of the `XRefM` with the specified effectual predicate,
 * returning a `XRefM` with a `get` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 */
export declare function filterOutputM_<RA, RB, EA, EB, A, B, RC, EC>(self: XRefM<RA, RB, EA, EB, A, B>, f: (b: B) => T.Effect<RC, EC, boolean>): XRefM<RA, RB & RC, EA, O.Option<EC | EB>, A, B>;
/**
 * Filters the `get` value of the `XRefM` with the specified effectual predicate,
 * returning a `XRefM` with a `get` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 */
export declare function filterOutputM<B, RC, EC>(f: (b: B) => T.Effect<RC, EC, boolean>): <RA, RB, EA, EB, A>(self: XRefM<RA, RB, EA, EB, A, B>) => XRefM<RA, RB & RC, EA, O.Option<EC | EB>, A, B>;
/**
 * Filters the `get` value of the `XRefM` with the specified predicate,
 * returning a `XRefM` with a `get` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 */
export declare function filterOutput_<RA, RB, EA, EB, A, B>(self: XRefM<RA, RB, EA, EB, A, B>, f: (b: B) => boolean): XRefM<RA, RB, EA, O.Option<EB>, A, B>;
/**
 * Filters the `get` value of the `XRefM` with the specified predicate,
 * returning a `XRefM` with a `get` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 */
export declare function filterOutput<B>(f: (b: B) => boolean): <RA, RB, EA, EB, A>(self: XRefM<RA, RB, EA, EB, A, B>) => XRefM<RA, RB, EA, O.Option<EB>, A, B>;
/**
 * Transforms the `get` value of the `XRefM` with the specified effectual
 * function.
 */
export declare function mapM_<RA, RB, EA, EB, A, B, RC, EC, C>(self: XRefM<RA, RB, EA, EB, A, B>, f: (b: B) => T.Effect<RC, EC, C>): XRefM<RA, RB & RC, EA, EB | EC, A, C>;
/**
 * Transforms the `get` value of the `XRefM` with the specified effectual
 * function.
 */
export declare function mapM<B, RC, EC, C>(f: (b: B) => T.Effect<RC, EC, C>): <RA, RB, EA, EB, A>(self: XRefM<RA, RB, EA, EB, A, B>) => XRefM<RA, RB & RC, EA, EC | EB, A, C>;
/**
 * Transforms the `set` value of the `XRefM` with the specified effectual
 * function.
 */
export declare function contramapM_<RA, RB, EA, EB, B, A, RC, EC, C>(self: XRefM<RA, RB, EA, EB, A, B>, f: (c: C) => T.Effect<RC, EC, A>): XRefM<RA & RC, RB, EC | EA, EB, C, B>;
/**
 * Transforms the `set` value of the `XRefM` with the specified effectual
 * function.
 */
export declare function contramapM<A, RC, EC, C>(f: (c: C) => T.Effect<RC, EC, A>): <RA, RB, EA, EB, B>(self: XRefM<RA, RB, EA, EB, A, B>) => XRefM<RA & RC, RB, EC | EA, EB, C, B>;
/**
 * Transforms the `set` value of the `XRefM` with the specified function.
 */
export declare function contramap_<RA, RB, EA, EB, B, C, A>(self: XRefM<RA, RB, EA, EB, A, B>, f: (c: C) => A): XRefM<RA, RB, EA, EB, C, B>;
/**
 * Transforms the `set` value of the `XRefM` with the specified function.
 */
export declare function contramap<C, A>(f: (c: C) => A): <RA, RB, EA, EB, B>(self: XRefM<RA, RB, EA, EB, A, B>) => XRefM<RA, RB, EA, EB, C, B>;
/**
 * Transforms the `get` value of the `XRefM` with the specified function.
 */
export declare function map_<RA, RB, EA, EB, A, B, C>(self: XRefM<RA, RB, EA, EB, A, B>, f: (b: B) => C): XRefM<RA, RB, EA, EB, A, C>;
/**
 * Transforms the `get` value of the `XRefM` with the specified function.
 */
export declare function map<B, C>(f: (b: B) => C): <RA, RB, EA, EB, A>(self: XRefM<RA, RB, EA, EB, A, B>) => XRefM<RA, RB, EA, EB, A, C>;
/**
 * Returns a read only view of the `XRefM`.
 */
export declare function readOnly<RA, RB, EA, EB, A, B>(self: XRefM<RA, RB, EA, EB, A, B>): XRefM<RA, RB, EA, EB, never, B>;
/**
 * Returns a read only view of the `XRefM`.
 */
export declare function writeOnly<RA, RB, EA, EB, A, B>(self: XRefM<RA, RB, EA, EB, A, B>): XRefM<RA, RB, EA, void, A, never>;
/**
 * Performs the specified effect every time a value is written to this
 * `XRefM`.
 */
export declare function tapInput_<RA, RB, EA, EB, B, A, RC, EC, X, A1 extends A = A>(self: XRefM<RA, RB, EA, EB, A, B>, f: (a: A1) => T.Effect<RC, EC, X>): XRefM<RA & RC, RB, EA | EC, EB, A1, B>;
/**
 * Performs the specified effect every time a value is written to this
 * `XRefM`.
 */
export declare function tapInput<A, RC, EC, X, A1 extends A = A>(f: (a: A1) => T.Effect<RC, EC, X>): <RA, RB, EA, EB, B>(self: XRefM<RA, RB, EA, EB, A, B>) => XRefM<RA & RC, RB, EC | EA, EB, A1, B>;
/**
 * Performs the specified effect every time a value is read to this
 * `XRefM`.
 */
export declare function tapOutput_<RA, RB, EA, EB, A, B, RC, EC, X>(self: XRefM<RA, RB, EA, EB, A, B>, f: (b: B) => T.Effect<RC, EC, X>): XRefM<RA, RB & RC, EA, EB | EC, A, B>;
/**
 * Performs the specified effect every time a value is read to this
 * `XRefM`.
 */
export declare function tapOutput<B, RC, EC, X>(f: (b: B) => T.Effect<RC, EC, X>): <RA, RB, EA, EB, A>(self: XRefM<RA, RB, EA, EB, A, B>) => XRefM<RA, RB & RC, EA, EC | EB, A, B>;
//# sourceMappingURL=api.d.ts.map