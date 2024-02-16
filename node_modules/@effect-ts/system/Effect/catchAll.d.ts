import type { Effect } from "./effect.js";
/**
 * Recovers from all errors.
 */
export declare function catchAll_<R2, E2, A2, R, E, A>(effect: Effect<R2, E2, A2>, f: (e: E2) => Effect<R, E, A>, __trace?: string): Effect<R2 & R, E, A2 | A>;
/**
 * Recovers from all errors.
 *
 * @ets_data_first catchAll_
 */
export declare function catchAll<R, E, E2, A>(f: (e: E2) => Effect<R, E, A>, __trace?: string): <R2, A2>(effect: Effect<R2, E2, A2>) => Effect<R2 & R, E, A | A2>;
/**
 * Recovers from specified error.
 *
 * @ets_data_first catch_
 */
declare function _catch<N extends keyof E, K extends E[N] & string, E, R1, E1, A1>(tag: N, k: K, f: (e: Extract<E, {
    [n in N]: K;
}>) => Effect<R1, E1, A1>, __trace?: string): <R, A>(self: Effect<R, E, A>) => Effect<R & R1, E1 | Exclude<E, { [n in N]: K; }>, A1 | A>;
/**
 * Recovers from specified error.
 */
export declare function catch_<N extends keyof E, K extends E[N] & string, E, R, A, R1, E1, A1>(self: Effect<R, E, A>, tag: N, k: K, f: (e: Extract<E, {
    [n in N]: K;
}>) => Effect<R1, E1, A1>, __trace?: string): Effect<R & R1, Exclude<E, {
    [n in N]: K;
}> | E1, A | A1>;
/**
 * Recovers from specified error.
 *
 * @ets_data_first catchTag_
 */
export declare function catchTag<K extends E["_tag"] & string, E extends {
    _tag: string;
}, R1, E1, A1>(k: K, f: (e: Extract<E, {
    _tag: K;
}>) => Effect<R1, E1, A1>, __trace?: string): <R, A>(self: Effect<R, E, A>) => Effect<R & R1, E1 | Exclude<E, {
    _tag: K;
}>, A1 | A>;
/**
 * Recovers from specified error.
 */
export declare function catchTag_<K extends E["_tag"] & string, E extends {
    _tag: string;
}, R, A, R1, E1, A1>(self: Effect<R, E, A>, k: K, f: (e: Extract<E, {
    _tag: K;
}>) => Effect<R1, E1, A1>, __trace?: string): Effect<R & R1, Exclude<E, {
    _tag: K;
}> | E1, A | A1>;
export { _catch as catch };
//# sourceMappingURL=catchAll.d.ts.map