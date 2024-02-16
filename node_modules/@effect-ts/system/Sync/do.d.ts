import * as X from "./core.js";
declare function bind<R, E, A, K, N extends string>(tag: Exclude<N, keyof K>, f: (_: K) => X.Sync<R, E, A>): <R2, E2>(mk: X.Sync<R2, E2, K>) => X.Sync<R & R2, E | E2, K & { [k in N]: A; }>;
declare function let_<A, K, N extends string>(tag: Exclude<N, keyof K>, f: (_: K) => A): <R2, E2>(mk: X.Sync<R2, E2, K>) => X.Sync<R2, E2, K & { [k in N]: A; }>;
declare const do_: X.Sync<unknown, never, {}>;
export { let_ as let, bind, do_ as do };
//# sourceMappingURL=do.d.ts.map