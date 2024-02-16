import * as Tp from '@effect-ts/core/Collections/Immutable/Tuple';
import { _A, _E } from '@effect-ts/core/Effect';
import { E, O, T } from './index.js';
export declare class These<E, A> {
    readonly either: E.Either<E, Tp.Tuple<[A, O.Option<E>]>>;
    readonly [_E]: () => E;
    readonly [_A]: () => A;
    constructor(either: E.Either<E, Tp.Tuple<[A, O.Option<E>]>>);
}
export declare function succeed<A>(a: A): These<never, A>;
export declare function warn<E, A>(a: A, e: E): These<E, A>;
export declare function warnOption<E, A>(a: A, e: O.Option<E>): These<E, A>;
export declare function fail<E>(e: E): These<E, never>;
export declare const isNonFailure: <E, A>(self: These<E, A>) => self is These<never, A>;
export declare function foldM_<E, A, E1, A1, E2, A2, E3, A3>(self: These<E, A>, onSuccess: (a: A) => These<E1, A1>, onBoth: (a: A, e: E) => These<E2, A2>, onFail: (e: E) => These<E3, A3>): These<E1 | E2 | E3, A1 | A2 | A3>;
export declare function foldM<E, A, E1, A1, E2, A2, E3, A3>(onSuccess: (a: A) => These<E1, A1>, onBoth: (a: A, e: E) => These<E2, A2>, onFail: (e: E) => These<E3, A3>): (self: These<E, A>) => These<E1 | E2 | E3, A1 | A2 | A3>;
export declare function map_<E, A0, A>(self: These<E, A0>, f: (a: A0) => A): These<E, A>;
export declare function map<A0, A>(f: (a: A0) => A): <E>(self: These<E, A0>) => These<E, A>;
export declare function mapError_<E0, E, A>(self: These<E0, A>, f: (a: E0) => E): These<E, A>;
export declare function mapError<E0, E>(f: (a: E0) => E): <A>(self: These<E0, A>) => These<E, A>;
export declare function chain_<E0, A0, E, A>(self: These<E0, A0>, f: (a: A0, w: O.Option<E0>) => These<E, A>): These<E0 | E, A>;
export declare function chain<E0, A0, E, A>(f: (a: A0, w: O.Option<E0>) => These<E, A>): (self: These<E0, A0>) => These<E0 | E, A>;
export declare function result<E, A>(self: These<E, A>): E.Either<E, Tp.Tuple<[A, O.Option<E>]>>;
export declare const errorOrWaning: <E, A>(self: These<E, A>) => O.Option<E>;
/** Unpacks the provided `These` into a new `Effect` with errors as `E` and values as value/warning tuple */
export declare const toEffect: <E, A>(self: These<E, A>) => T.Effect<unknown, E, Tp.Tuple<[A, O.Option<E>]>>;
export declare const effectUnwrapValue: <T, E1, E2, A>(effect: T.Effect<T, E1, These<E2, A>>) => T.Effect<T, E1 | E2, A>;
export declare const effectTapSuccess: <T1, T2, E1, E2, TE2, A>(tapFn: (a: A) => T.Effect<T1, E1, any>) => (effect: T.Effect<T2, E2, These<TE2, A>>) => T.Effect<T1 & T2, E1 | E2, These<TE2, A>>;
export declare const effectTapErrorOrWarning: <T1, T2, E1, E2, TE2, A>(tapFn: (te2: TE2) => T.Effect<T1, E1, any>) => (effect: T.Effect<T2, E2, These<TE2, A>>) => T.Effect<T1 & T2, E1 | E2, These<TE2, A>>;
/** Wraps the error channel of an Effect<_, _ These> into the These */
export declare const effectThese: <T, E1, E2, A>(effect: T.Effect<T, E1, These<E2, A>>) => T.Effect<T, never, These<E1 | E2, A>>;
/** Casts warnings to errors (and ignores the value in the warning case) */
export declare const effectToEither: <R, E1, E2, A>(effect: T.Effect<R, E1, These<E2, A>>) => T.Effect<R, E1, E.Either<E2, A>>;
//# sourceMappingURL=These.d.ts.map