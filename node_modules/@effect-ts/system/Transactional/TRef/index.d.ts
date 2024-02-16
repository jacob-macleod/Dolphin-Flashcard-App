import "../../Operator/index.js";
import type { HashMap } from "../../Collections/Immutable/HashMap/index.js";
import type * as T from "../../Effect/index.js";
import * as E from "../../Either/index.js";
import * as O from "../../Option/index.js";
import { AtomicReference } from "../../Support/AtomicReference/index.js";
import * as STM from "../STM/core.js";
import type { Journal, Todo } from "../STM/Journal/index.js";
import type { TxnId } from "../STM/TxnId/index.js";
import { Versioned } from "../STM/Versioned/index.js";
export declare const TRefTypeId: unique symbol;
export declare type TRefTypeId = typeof TRefTypeId;
/**
 * A `XTRef<EA, EB, A, B>` is a polymorphic, purely functional description of a
 * mutable reference that can be modified as part of a transactional effect. The
 * fundamental operations of a `XTRef` are `set` and `get`. `set` takes a value
 * of type `A` and transactionally sets the reference to a new value, potentially
 * failing with an error of type `EA`. `get` gets the current value of the reference
 * and returns a value of type `B`, potentially failing with an error of type `EB`.
 *
 * When the error and value types of the `XTRef` are unified, that is, it is a
 * `XTRef<E, E, A, A>`, the `ZTRef` also supports atomic `modify` and `update`
 * operations. All operations are guaranteed to be executed transactionally.
 *
 * NOTE: While `XTRef` provides the transactional equivalent of a mutable reference,
 * the value inside the `XTRef` should be immutable.
 */
export interface XTRef<EA, EB, A, B> {
    readonly _typeId: TRefTypeId;
    readonly _EA: () => EA;
    readonly _EB: () => EB;
    readonly _A: (_: A) => void;
    readonly _B: () => B;
    fold<EC, ED, C, D>(ea: (ea: EA) => EC, eb: (ea: EB) => ED, ca: (c: C) => E.Either<EC, A>, bd: (b: B) => E.Either<ED, D>): XTRef<EC, ED, C, D>;
    foldAll<EC, ED, C, D>(ea: (ea: EA) => EC, eb: (ea: EB) => ED, ec: (ea: EB) => EC, ca: (c: C) => (b: B) => E.Either<EC, A>, bd: (b: B) => E.Either<ED, D>): XTRef<EC, ED, C, D>;
    readonly atomic: Atomic<unknown>;
}
export interface TRef<A> extends XTRef<never, never, A, A> {
}
export interface ETRef<E, A> extends XTRef<E, E, A, A> {
}
export declare class Atomic<A> implements XTRef<never, never, A, A> {
    versioned: Versioned<A>;
    readonly todo: AtomicReference<HashMap<TxnId, Todo>>;
    readonly _typeId: TRefTypeId;
    readonly _tag = "Atomic";
    readonly _EA: () => never;
    readonly _EB: () => never;
    readonly _A: (_: A) => void;
    readonly _B: () => A;
    readonly atomic: Atomic<unknown>;
    constructor(versioned: Versioned<A>, todo: AtomicReference<HashMap<TxnId, Todo>>);
    fold<EC, ED, C, D>(_ea: (ea: never) => EC, _eb: (ea: never) => ED, ca: (c: C) => E.Either<EC, A>, bd: (b: A) => E.Either<ED, D>): XTRef<EC, ED, C, D>;
    foldAll<EC, ED, C, D>(_ea: (ea: never) => EC, _eb: (ea: never) => ED, _ec: (ea: never) => EC, ca: (c: C) => (b: A) => E.Either<EC, A>, bd: (b: A) => E.Either<ED, D>): XTRef<EC, ED, C, D>;
}
export declare class Derived<S, EA, EB, A, B> implements XTRef<EA, EB, A, B> {
    readonly getEither: (s: S) => E.Either<EB, B>;
    readonly setEither: (a: A) => E.Either<EA, S>;
    readonly value: Atomic<S>;
    readonly atomic: Atomic<unknown>;
    readonly _typeId: TRefTypeId;
    readonly _tag = "Derived";
    readonly _EA: () => EA;
    readonly _EB: () => EB;
    readonly _A: (_: A) => void;
    readonly _B: () => B;
    constructor(getEither: (s: S) => E.Either<EB, B>, setEither: (a: A) => E.Either<EA, S>, value: Atomic<S>, atomic: Atomic<unknown>);
    fold<EC, ED, C, D>(ea: (ea: EA) => EC, eb: (ea: EB) => ED, ca: (c: C) => E.Either<EC, A>, bd: (b: B) => E.Either<ED, D>): XTRef<EC, ED, C, D>;
    foldAll<EC, ED, C, D>(ea: (ea: EA) => EC, eb: (ea: EB) => ED, ec: (ea: EB) => EC, ca: (c: C) => (b: B) => E.Either<EC, A>, bd: (b: B) => E.Either<ED, D>): XTRef<EC, ED, C, D>;
}
export declare class DerivedAll<S, EA, EB, A, B> implements XTRef<EA, EB, A, B> {
    readonly getEither: (s: S) => E.Either<EB, B>;
    readonly setEither: (a: A) => (s: S) => E.Either<EA, S>;
    readonly value: Atomic<S>;
    readonly atomic: Atomic<unknown>;
    readonly _typeId: TRefTypeId;
    readonly _tag = "DerivedAll";
    readonly _EA: () => EA;
    readonly _EB: () => EB;
    readonly _A: (_: A) => void;
    readonly _B: () => B;
    constructor(getEither: (s: S) => E.Either<EB, B>, setEither: (a: A) => (s: S) => E.Either<EA, S>, value: Atomic<S>, atomic: Atomic<unknown>);
    fold<EC, ED, C, D>(ea: (ea: EA) => EC, eb: (ea: EB) => ED, ca: (c: C) => E.Either<EC, A>, bd: (b: B) => E.Either<ED, D>): XTRef<EC, ED, C, D>;
    foldAll<EC, ED, C, D>(ea: (ea: EA) => EC, eb: (ea: EB) => ED, ec: (ea: EB) => EC, ca: (c: C) => (b: B) => E.Either<EC, A>, bd: (b: B) => E.Either<ED, D>): XTRef<EC, ED, C, D>;
}
/**
 * Retrieves the value of the `XTRef`.
 */
export declare function get<EA, EB, A, B>(self: XTRef<EA, EB, A, B>): STM.STM<unknown, EB, B>;
/**
 * Unsafely retrieves the value of the `XTRef`.
 */
export declare function unsafeGet_<EA, EB, A, B>(self: XTRef<EA, EB, A, B>, journal: Journal): A;
/**
 * Sets the value of the `XTRef`.
 */
export declare function set_<EA, EB, A, B>(self: XTRef<EA, EB, A, B>, a: A): STM.STM<unknown, EA, void>;
/**
 * Updates the value of the variable, returning a function of the specified
 * value.
 */
export declare function modify_<E, A, B>(self: ETRef<E, A>, f: (a: A) => readonly [B, A]): STM.STM<unknown, E, B>;
/**
 * Updates the value of the variable, returning a function of the specified
 * value.
 *
 * @ets_data_first modify_
 */
export declare function modify<A, B>(f: (a: A) => readonly [B, A]): <E>(self: ETRef<E, A>) => STM.STM<unknown, E, B>;
/**
 * Updates the value of the variable, returning a function of the specified
 * value.
 */
export declare function modifySome_<E, A, B>(self: ETRef<E, A>, b: B, f: (a: A) => O.Option<readonly [B, A]>): STM.STM<unknown, E, B>;
/**
 * Updates the value of the variable, returning a function of the specified
 * value.
 *
 * @ets_data_first modifySome_
 */
export declare function modifySome<A, B>(b: B, f: (a: A) => O.Option<readonly [B, A]>): <E>(self: ETRef<E, A>) => STM.STM<unknown, E, B>;
/**
 * Sets the value of the `XTRef` and returns the old value.
 */
export declare function getAndSet_<EA, A>(self: ETRef<EA, A>, a: A): STM.STM<unknown, EA, A>;
/**
 * Sets the value of the `XTRef` and returns the old value.
 *
 * @ets_data_first getAndSet_
 */
export declare function getAndSet<A>(a: A): <EA>(self: ETRef<EA, A>) => STM.STM<unknown, EA, A>;
/**
 * Updates the value of the variable and returns the old value.
 */
export declare function getAndUpdate_<EA, A>(self: ETRef<EA, A>, f: (a: A) => A): STM.STM<unknown, EA, A>;
/**
 * Updates the value of the variable and returns the old value.
 *
 * @ets_data_first getAndUpdate_
 */
export declare function getAndUpdate<A>(f: (a: A) => A): <EA>(self: ETRef<EA, A>) => STM.STM<unknown, EA, A>;
/**
 * Updates some values of the variable but leaves others alone, returning the
 * old value.
 */
export declare function getAndUpdateSome_<EA, A>(self: ETRef<EA, A>, f: (a: A) => O.Option<A>): STM.STM<unknown, EA, A>;
/**
 * Updates some values of the variable but leaves others alone, returning the
 * old value.
 *
 * @ets_data_first getAndUpdateSome_
 */
export declare function getAndUpdateSome<A>(f: (a: A) => O.Option<A>): <EA>(self: ETRef<EA, A>) => STM.STM<unknown, EA, A>;
/**
 * Sets the value of the `XTRef`.
 *
 * @ets_data_first set_
 */
export declare function set<A>(a: A): <EA, EB, B>(self: XTRef<EA, EB, A, B>) => STM.STM<unknown, EA, void>;
/**
 * Updates the value of the variable.
 */
export declare function update_<E, A>(self: ETRef<E, A>, f: (a: A) => A): STM.STM<unknown, E, void>;
/**
 * Updates the value of the variable.
 *
 * @ets_data_first update_
 */
export declare function update<A>(f: (a: A) => A): <E>(self: ETRef<E, A>) => STM.STM<unknown, E, void>;
/**
 * Updates some values of the variable but leaves others alone.
 */
export declare function updateSome_<E, A>(self: ETRef<E, A>, f: (a: A) => O.Option<A>): STM.STM<unknown, E, void>;
/**
 * Updates some values of the variable but leaves others alone.
 *
 * @ets_data_first updateSome_
 */
export declare function updateSome<A>(f: (a: A) => O.Option<A>): <E>(self: ETRef<E, A>) => STM.STM<unknown, E, void>;
/**
 * Updates some values of the variable but leaves others alone.
 */
export declare function updateSomeAndGet_<E, A>(self: ETRef<E, A>, f: (a: A) => O.Option<A>): STM.STM<unknown, E, A>;
/**
 * Updates some values of the variable but leaves others alone.
 *
 * @ets_data_first updateSomeAndGet_
 */
export declare function updateSomeAndGet<A>(f: (a: A) => O.Option<A>): <E>(self: ETRef<E, A>) => STM.STM<unknown, E, A>;
/**
 * Updates the value of the variable and returns the new value.
 */
export declare function updateAndGet_<EA, A>(self: ETRef<EA, A>, f: (a: A) => A): STM.STM<unknown, EA, A>;
/**
 * Updates the value of the variable and returns the new value.
 *
 * @ets_data_first getAndUpdate_
 */
export declare function updateAndGet<A>(f: (a: A) => A): <EA>(self: ETRef<EA, A>) => STM.STM<unknown, EA, A>;
/**
 * @ets_optimize remove
 */
export declare function concrete<EA, EB, A, B>(_: XTRef<EA, EB, A, B>): asserts _ is Atomic<any> | Derived<any, any, any, any, any> | DerivedAll<any, any, any, any, any>;
/**
 * Makes a new `XTRef` that is initialized to the specified value.
 */
export declare function makeWith<A>(a: () => A): STM.STM<unknown, never, TRef<A>>;
/**
 * Makes a new `XTRef` that is initialized to the specified value.
 */
export declare function make<A>(a: A): STM.STM<unknown, never, TRef<A>>;
/**
 * Unsafely makes a new `XTRef` that is initialized to the specified value.
 */
export declare function unsafeMake<A>(a: A): TRef<A>;
/**
 * Makes a new `XTRef` that is initialized to the specified value.
 */
export declare function makeCommitWith<A>(a: () => A): T.UIO<TRef<A>>;
/**
 * Makes a new `XTRef` that is initialized to the specified value.
 */
export declare function makeCommit<A>(a: A): T.UIO<TRef<A>>;
/**
 * Folds over the error and value types of the `XTRef`. This is a highly
 * polymorphic method that is capable of arbitrarily transforming the error
 * and value types of the `XTRef`. For most use cases one of the more
 * specific combinators implemented in terms of `fold` will be more ergonomic
 * but this method is extremely useful for implementing new combinators.
 */
export declare function fold_<EA, EB, A, B, EC, ED, C, D>(self: XTRef<EA, EB, A, B>, ea: (ea: EA) => EC, eb: (ea: EB) => ED, ca: (c: C) => E.Either<EC, A>, bd: (b: B) => E.Either<ED, D>): XTRef<EC, ED, C, D>;
/**
 * Folds over the error and value types of the `XTRef`. This is a highly
 * polymorphic method that is capable of arbitrarily transforming the error
 * and value types of the `XTRef`. For most use cases one of the more
 * specific combinators implemented in terms of `fold` will be more ergonomic
 * but this method is extremely useful for implementing new combinators.
 *
 * @ets_data_first fold_
 */
export declare function fold<EA, EB, A, B, EC, ED, C, D>(ea: (ea: EA) => EC, eb: (ea: EB) => ED, ca: (c: C) => E.Either<EC, A>, bd: (b: B) => E.Either<ED, D>): (self: XTRef<EA, EB, A, B>) => XTRef<EC, ED, C, D>;
/**
 * Folds over the error and value types of the `XTRef`, allowing access to
 * the state in transforming the `set` value. This is a more powerful version
 * of `fold` but requires unifying the error types.
 */
export declare function foldAll_<EA, EB, A, B, EC, ED, C, D>(self: XTRef<EA, EB, A, B>, ea: (ea: EA) => EC, eb: (ea: EB) => ED, ec: (ea: EB) => EC, ca: (c: C) => (b: B) => E.Either<EC, A>, bd: (b: B) => E.Either<ED, D>): XTRef<EC, ED, C, D>;
/**
 * Folds over the error and value types of the `XTRef`, allowing access to
 * the state in transforming the `set` value. This is a more powerful version
 * of `fold` but requires unifying the error types.
 *
 * @ets_data_first foldAll_
 */
export declare function foldAll<EA, EB, A, B, EC, ED, C, D>(ea: (ea: EA) => EC, eb: (ea: EB) => ED, ec: (ea: EB) => EC, ca: (c: C) => (b: B) => E.Either<EC, A>, bd: (b: B) => E.Either<ED, D>): (self: XTRef<EA, EB, A, B>) => XTRef<EC, ED, C, D>;
//# sourceMappingURL=index.d.ts.map