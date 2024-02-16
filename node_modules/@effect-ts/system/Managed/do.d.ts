import type { Managed } from "./managed.js";
/**
 * Binds an effectful value in a `do` scope
 *
 * @ets_data_first bind_
 */
export declare function bind<R, E, A, K, N extends string>(tag: Exclude<N, keyof K>, f: (_: K) => Managed<R, E, A>, __trace?: string): <R2, E2>(mk: Managed<R2, E2, K>) => Managed<R & R2, E | E2, K & { [k in N]: A; }>;
/**
 * Binds an effectful value in a `do` scope
 */
export declare function bind_<R2, E2, R, E, A, K, N extends string>(mk: Managed<R2, E2, K>, tag: Exclude<N, keyof K>, f: (_: K) => Managed<R, E, A>, __trace?: string): Managed<R & R2, E | E2, K & {
    [k in N]: A;
}>;
/**
 * Binds a value in a `do` scope
 *
 * @ets_data_first let_
 */
declare function let__<A, K, N extends string>(tag: Exclude<N, keyof K>, f: (_: K) => A, __trace?: string): <R2, E2>(mk: Managed<R2, E2, K>) => Managed<R2, E2, K & { [k in N]: A; }>;
/**
 * Binds a value in a `do` scope
 */
export declare function let_<R2, E2, A, K, N extends string>(mk: Managed<R2, E2, K>, tag: Exclude<N, keyof K>, f: (_: K) => A): Managed<R2, E2, K & {
    [k in N]: A;
}>;
/**
 * Begin a `do` scope
 */
declare const do_: Managed<unknown, never, {}>;
export { let__ as let, do_ as do };
//# sourceMappingURL=do.d.ts.map