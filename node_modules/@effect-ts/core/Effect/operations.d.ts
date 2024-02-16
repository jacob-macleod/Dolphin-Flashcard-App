import "../Operator/index.js";
import * as T from "@effect-ts/system/Effect";
import type * as P from "../Prelude/index.js";
/**
 * Like forEach but preserves the type of the collection used
 */
export declare function forEachOf<F extends P.URIS, C>(C: P.Collection<F, C>): {
    <K, Q, W, X, I, S, R, E, A, RE, EE, AA>(self: P.Kind<F, C, K, Q, W, X, I, S, R, E, A> & Iterable<A>, f: (a: A) => T.Effect<RE, EE, AA>, __trace?: string): T.Effect<RE, EE, P.Kind<F, C, K, Q, W, X, I, S, R, E, AA>>;
    /**
     * @ets_data_first self
     */
    <A, RE, EE, AA>(f: (a: A) => T.Effect<RE, EE, AA>, __trace?: string): <K, Q, W, X, I, S, R, E>(self: P.Kind<F, C, K, Q, W, X, I, S, R, E, A> & Iterable<A>) => T.Effect<RE, EE, P.Kind<F, C, K, Q, W, X, I, S, R, E, AA>>;
};
/**
 * Like forEachPar but preserves the type of the collection used
 */
export declare function forEachParOf<F extends P.URIS, C>(C: P.Collection<F, C>): {
    <K, Q, W, X, I, S, R, E, A, RE, EE, AA>(self: P.Kind<F, C, K, Q, W, X, I, S, R, E, A> & Iterable<A>, f: (a: A) => T.Effect<RE, EE, AA>, __trace?: string): T.Effect<RE, EE, P.Kind<F, C, K, Q, W, X, I, S, R, E, AA>>;
    /**
     * @ets_data_first self
     */
    <A, RE, EE, AA>(f: (a: A) => T.Effect<RE, EE, AA>, __trace?: string): <K, Q, W, X, I, S, R, E>(self: P.Kind<F, C, K, Q, W, X, I, S, R, E, A> & Iterable<A>) => T.Effect<RE, EE, P.Kind<F, C, K, Q, W, X, I, S, R, E, AA>>;
};
/**
 * Like forEachParN but preserves the type of the collection used
 */
export declare function forEachParNOf<F extends P.URIS, C>(C: P.Collection<F, C>): {
    <K, Q, W, X, I, S, R, E, A, RE, EE, AA>(self: P.Kind<F, C, K, Q, W, X, I, S, R, E, A> & Iterable<A>, n: number, f: (a: A) => T.Effect<RE, EE, AA>, __trace?: string): T.Effect<RE, EE, P.Kind<F, C, K, Q, W, X, I, S, R, E, AA>>;
    /**
     * @ets_data_first self
     */
    <A, RE, EE, AA>(n: number, f: (a: A) => T.Effect<RE, EE, AA>, __trace?: string): <K, Q, W, X, I, S, R, E>(self: P.Kind<F, C, K, Q, W, X, I, S, R, E, A> & Iterable<A>) => T.Effect<RE, EE, P.Kind<F, C, K, Q, W, X, I, S, R, E, AA>>;
};
//# sourceMappingURL=operations.d.ts.map