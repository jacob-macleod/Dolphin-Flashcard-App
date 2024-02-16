import type { Exit } from "./core.js";
declare function bind<E, A, K, N extends string>(tag: Exclude<N, keyof K>, f: (_: K) => Exit<E, A>): <E2>(mk: Exit<E2, K>) => Exit<E | E2, K & { [k in N]: A; }>;
declare function let_<A, K, N extends string>(tag: Exclude<N, keyof K>, f: (_: K) => A): <E2>(mk: Exit<E2, K>) => Exit<E2, K & { [k in N]: A; }>;
declare const do_: Exit<never, {}>;
export { let_ as let, bind, do_ as do };
//# sourceMappingURL=do.d.ts.map