import * as Tp from "../Collections/Immutable/Tuple/index.js";
import * as E from "../Either/index.js";
import * as T from "./excl-effect.js";
export declare const TypeId: unique symbol;
export declare type TypeId = typeof TypeId;
export interface XFiberRef<EA, EB, A, B> {
    /**
     * Folds over the error and value types of the `FiberRef`. This is a highly
     * polymorphic method that is capable of arbitrarily transforming the error
     * and value types of the `FiberRef`. For most use cases one of the more
     * specific combinators implemented in terms of `fold` will be more ergonomic
     * but this method is extremely useful for implementing new combinators.
     */
    readonly fold: <EC, ED, C, D>(ea: (_: EA) => EC, eb: (_: EB) => ED, ca: (_: C) => E.Either<EC, A>, bd: (_: B) => E.Either<ED, D>) => XFiberRef<EC, ED, C, D>;
    /**
     * Folds over the error and value types of the `FiberRef`, allowing access
     * to the state in transforming the `set` value. This is a more powerful
     * version of `fold` but requires unifying the error types.
     */
    readonly foldAll: <EC, ED, C, D>(ea: (_: EA) => EC, eb: (_: EB) => ED, ec: (_: EB) => EC, ca: (_: C) => (_: B) => E.Either<EC, A>, bd: (_: B) => E.Either<ED, D>) => XFiberRef<EC, ED, C, D>;
    /**
     * Reads the value associated with the current fiber. Returns initial value if
     * no value was `set` or inherited from parent.
     */
    readonly get: T.IO<EB, B>;
    /**
     * Returns an `IO` that runs with `value` bound to the current fiber.
     *
     * Guarantees that fiber data is properly restored via `bracket`.
     */
    readonly locally: <R, EC, C>(value: A, use: T.Effect<R, EC, C>) => T.Effect<R, EA | EC, C>;
    /**
     * Sets the value associated with the current fiber.
     */
    readonly set: (value: A) => T.IO<EA, void>;
}
export declare class Runtime<A> implements XFiberRef<never, never, A, A> {
    readonly initial: A;
    readonly fork: (_: A) => A;
    readonly join: (a: A, a1: A) => A;
    readonly _tag = "Runtime";
    readonly _typeId: TypeId;
    readonly _EA: () => never;
    readonly _EB: () => never;
    readonly _A: (_: A) => void;
    readonly _B: () => A;
    constructor(initial: A, fork?: (_: A) => A, join?: (a: A, a1: A) => A);
    fold<EC, ED, C, D>(_ea: (_: never) => EC, _eb: (_: never) => ED, ca: (_: C) => E.Either<EC, A>, bd: (_: A) => E.Either<ED, D>): XFiberRef<EC, ED, C, D>;
    foldAll<EC, ED, C, D>(_ea: (_: never) => EC, _eb: (_: never) => ED, _ec: (_: never) => EC, ca: (_: C) => (_: A) => E.Either<EC, A>, bd: (_: A) => E.Either<ED, D>): XFiberRef<EC, ED, C, D>;
    modify<B>(f: (a: A) => Tp.Tuple<[B, A]>): T.UIO<B>;
    get get(): T.UIO<A>;
    locally<R, EC, C>(a: A, use: T.Effect<R, EC, C>): T.Effect<R, EC, C>;
    set(value: A): T.UIO<void>;
}
export declare class Derived<EA, EB, A, B> implements XFiberRef<EA, EB, A, B> {
    readonly use: <X>(f: <S>(value: Runtime<S>, getEither: (s: S) => E.Either<EB, B>, setEither: (a: A) => E.Either<EA, S>) => X) => X;
    readonly _tag = "Derived";
    readonly _typeId: TypeId;
    readonly _EA: () => EA;
    readonly _EB: () => EB;
    readonly _A: (_: A) => void;
    readonly _B: () => B;
    constructor(use: <X>(f: <S>(value: Runtime<S>, getEither: (s: S) => E.Either<EB, B>, setEither: (a: A) => E.Either<EA, S>) => X) => X);
    fold<EC, ED, C, D>(ea: (_: EA) => EC, eb: (_: EB) => ED, ca: (_: C) => E.Either<EC, A>, bd: (_: B) => E.Either<ED, D>): XFiberRef<EC, ED, C, D>;
    foldAll<EC, ED, C, D>(ea: (_: EA) => EC, eb: (_: EB) => ED, ec: (_: EB) => EC, ca: (_: C) => (_: B) => E.Either<EC, A>, _bd: (_: B) => E.Either<ED, D>): XFiberRef<EC, ED, C, D>;
    get get(): T.IO<EB, B>;
    locally<R, EC, C>(a: A, use: T.Effect<R, EC, C>): T.Effect<R, EA | EC, C>;
    set(a: A): T.IO<EA, void>;
}
export declare class DerivedAll<EA, EB, A, B> implements XFiberRef<EA, EB, A, B> {
    readonly use: <X>(f: <S>(value: Runtime<S>, getEither: (s: S) => E.Either<EB, B>, setEither: (a: A) => (s: S) => E.Either<EA, S>) => X) => X;
    readonly _tag = "DerivedAll";
    readonly _typeId: TypeId;
    readonly _EA: () => EA;
    readonly _EB: () => EB;
    readonly _A: (_: A) => void;
    readonly _B: () => B;
    constructor(use: <X>(f: <S>(value: Runtime<S>, getEither: (s: S) => E.Either<EB, B>, setEither: (a: A) => (s: S) => E.Either<EA, S>) => X) => X);
    fold<EC, ED, C, D>(ea: (_: EA) => EC, eb: (_: EB) => ED, ca: (_: C) => E.Either<EC, A>, bd: (_: B) => E.Either<ED, D>): XFiberRef<EC, ED, C, D>;
    foldAll<EC, ED, C, D>(ea: (_: EA) => EC, eb: (_: EB) => ED, ec: (_: EB) => EC, ca: (_: C) => (_: B) => E.Either<EC, A>, bd: (_: B) => E.Either<ED, D>): XFiberRef<EC, ED, C, D>;
    get get(): T.IO<EB, B>;
    locally<R, EC, C>(a: A, use: T.Effect<R, EC, C>): T.Effect<R, EA | EC, C>;
    set(a: A): T.IO<EA, void>;
}
export interface FiberRef<A> extends XFiberRef<never, never, A, A> {
}
/**
 * @ets_optimize identity
 */
export declare function concrete<EA, EB, A, B>(_: XFiberRef<EA, EB, A, B>): Runtime<A | B> | Derived<EA, EB, A, B> | DerivedAll<EA, EB, A, B>;
//# sourceMappingURL=fiberRef.d.ts.map