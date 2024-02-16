import type { Async } from "./core.js";
/**
 * Binds an effectful value in a `do` scope
 *
 * @ets_data_first bind_
 */
declare function bind<R, E, A, K, N extends string>(tag: Exclude<N, keyof K>, f: (_: K) => Async<R, E, A>): <R2, E2>(mk: Async<R2, E2, K>) => Async<R & R2, E | E2, K & { [k in N]: A; }>;
/**
 * Binds an effectful value in a `do` scope
 */
export declare function bind_<R2, E2, R, E, A, K, N extends string>(mk: Async<R2, E2, K>, tag: Exclude<N, keyof K>, f: (_: K) => Async<R, E, A>): Async<R & R2, E | E2, K & {
    [k in N]: A;
}>;
/**
 * Like bind for values
 *
 * @ets_data_first let_
 */
declare function let__<A, K, N extends string>(tag: Exclude<N, keyof K>, f: (_: K) => A): <R2, E2>(mk: Async<R2, E2, K>) => Async<R2, E2, K & { [k in N]: A; }>;
/**
 * Like bind for values
 */
export declare function let_<R2, E2, A, K, N extends string>(mk: Async<R2, E2, K>, tag: Exclude<N, keyof K>, f: (_: K) => A): Async<R2, E2, K & {
    [k in N]: A;
}>;
declare const do_: Async<unknown, never, {}>;
export { let__ as let, bind, do_ as do };
//# sourceMappingURL=do.d.ts.map