import * as E from "../Either/index.js";
import type { AtomicReference } from "../Support/AtomicReference/index.js";
import * as T from "./effect.js";
export declare const TypeId: unique symbol;
export declare type TypeId = typeof TypeId;
/**
 * A `XRef<EA, EB, A, B>` is a polymorphic, purely functional
 * description of a mutable reference. The fundamental operations of a `XRef`
 * are `set` and `get`. `set` takes a value of type `A` and sets the reference
 * to a new value, potentially failing with an error of type `EA`.
 * `get` gets the current value of the reference and returns a value of type `B`,
 * potentially failing with an error of type `EB`.
 *
 * When the error and value types of the `XRef` are unified, that is, it is a
 * `XRef[E, E, A, A]`, the `XRef` also supports atomic `modify` and
 * `update` operations.
 *
 * By default, `XRef` is implemented in terms of compare and swap operations
 * for maximum performance and does not support performing effects within
 * update operations. If you need to perform effects within update operations
 * you can create a `XRefM`, a specialized type of `XRef` that supports
 * performing effects within update operations at some cost to performance. In
 * this case writes will semantically block other writers, while multiple
 * readers can read simultaneously.
 *
 * NOTE: While `XRef` provides the functional equivalent of a mutable
 * reference, the value inside the `XRef` should normally be immutable.
 */
export interface XRef<EA, EB, A, B> {
    readonly _typeId: TypeId;
    readonly _EA: () => EA;
    readonly _EB: () => EB;
    readonly _A: (_: A) => void;
    readonly _B: () => B;
    /**
     * Folds over the error and value types of the `XRef`. This is a highly
     * polymorphic method that is capable of arbitrarily transforming the error
     * and value types of the `XRef`. For most use cases one of the more specific
     * combinators implemented in terms of `fold` will be more ergonomic but this
     * method is extremely useful for implementing new combinators.
     */
    readonly fold: <EC, ED, C, D>(ea: (_: EA) => EC, eb: (_: EB) => ED, ca: (_: C) => E.Either<EC, A>, bd: (_: B) => E.Either<ED, D>) => XRef<EC, ED, C, D>;
    /**
     * Folds over the error and value types of the `XRef`, allowing access to
     * the state in transforming the `set` value. This is a more powerful version
     * of `fold` but requires unifying the error types.
     */
    readonly foldAll: <EC, ED, C, D>(ea: (_: EA) => EC, eb: (_: EB) => ED, ec: (_: EB) => EC, ca: (_: C) => (_: B) => E.Either<EC, A>, bd: (_: B) => E.Either<ED, D>) => XRef<EC, ED, C, D>;
    /**
     * Reads the value from the `XRef`.
     */
    readonly get: T.IO<EB, B>;
    /**
     * Writes a new value to the `XRef`, with a guarantee of immediate
     * consistency (at some cost to performance).
     */
    readonly set: (a: A) => T.IO<EA, void>;
}
export declare class Atomic<A> implements XRef<never, never, A, A> {
    readonly value: AtomicReference<A>;
    readonly _tag = "Atomic";
    readonly _typeId: TypeId;
    readonly _EA: () => never;
    readonly _EB: () => never;
    readonly _A: (_: A) => void;
    readonly _B: () => A;
    constructor(value: AtomicReference<A>);
    fold<EC, ED, C, D>(_ea: (_: never) => EC, _eb: (_: never) => ED, ca: (_: C) => E.Either<EC, A>, bd: (_: A) => E.Either<ED, D>): XRef<EC, ED, C, D>;
    foldAll<EC, ED, C, D>(_ea: (_: never) => EC, _eb: (_: never) => ED, _ec: (_: never) => EC, ca: (_: C) => (_: A) => E.Either<EC, A>, bd: (_: A) => E.Either<ED, D>): XRef<EC, ED, C, D>;
    get get(): T.UIO<A>;
    set(a: A): T.UIO<void>;
}
export declare class Derived<EA, EB, A, B> implements XRef<EA, EB, A, B> {
    readonly use: <X>(f: <S>(value: Atomic<S>, getEither: (s: S) => E.Either<EB, B>, setEither: (a: A) => E.Either<EA, S>) => X) => X;
    readonly _tag = "Derived";
    readonly _typeId: TypeId;
    readonly _EA: () => EA;
    readonly _EB: () => EB;
    readonly _A: (_: A) => void;
    readonly _B: () => B;
    constructor(use: <X>(f: <S>(value: Atomic<S>, getEither: (s: S) => E.Either<EB, B>, setEither: (a: A) => E.Either<EA, S>) => X) => X);
    fold<EC, ED, C, D>(ea: (_: EA) => EC, eb: (_: EB) => ED, ca: (_: C) => E.Either<EC, A>, bd: (_: B) => E.Either<ED, D>): XRef<EC, ED, C, D>;
    foldAll<EC, ED, C, D>(ea: (_: EA) => EC, eb: (_: EB) => ED, ec: (_: EB) => EC, ca: (_: C) => (_: B) => E.Either<EC, A>, _bd: (_: B) => E.Either<ED, D>): XRef<EC, ED, C, D>;
    get get(): T.IO<EB, B>;
    set(a: A): T.IO<EA, void>;
}
export declare class DerivedAll<EA, EB, A, B> implements XRef<EA, EB, A, B> {
    readonly use: <X>(f: <S>(value: Atomic<S>, getEither: (s: S) => E.Either<EB, B>, setEither: (a: A) => (s: S) => E.Either<EA, S>) => X) => X;
    readonly _tag = "DerivedAll";
    readonly _typeId: TypeId;
    readonly _EA: () => EA;
    readonly _EB: () => EB;
    readonly _A: (_: A) => void;
    readonly _B: () => B;
    constructor(use: <X>(f: <S>(value: Atomic<S>, getEither: (s: S) => E.Either<EB, B>, setEither: (a: A) => (s: S) => E.Either<EA, S>) => X) => X);
    fold<EC, ED, C, D>(ea: (_: EA) => EC, eb: (_: EB) => ED, ca: (_: C) => E.Either<EC, A>, bd: (_: B) => E.Either<ED, D>): XRef<EC, ED, C, D>;
    foldAll<EC, ED, C, D>(ea: (_: EA) => EC, eb: (_: EB) => ED, ec: (_: EB) => EC, ca: (_: C) => (_: B) => E.Either<EC, A>, bd: (_: B) => E.Either<ED, D>): XRef<EC, ED, C, D>;
    get get(): T.IO<EB, B>;
    set(a: A): T.IO<EA, void>;
}
/**
 * A Ref that cannot fail and requires no environment
 */
export interface Ref<A> extends XRef<never, never, A, A> {
}
/**
 * Cast to a sealed union in case of ERef (where it make sense)
 *
 * @ets_optimize identity
 */
export declare function concrete<EA, EB, A, B>(self: XRef<EA, EB, A, B>): Atomic<A | B> | DerivedAll<EA, EB, A, B> | Derived<EA, EB, A, A>;
//# sourceMappingURL=XRef.d.ts.map