import type { Cause } from "./cause.js";
declare const bind: <A, K, N extends string>(tag: Exclude<N, keyof K>, f: (_: K) => Cause<A>) => (mk: Cause<K>) => Cause<K & { [k in N]: A; }>;
declare const let_: <A, K, N extends string>(tag: Exclude<N, keyof K>, f: (_: K) => A) => (mk: Cause<K>) => Cause<K & { [k in N]: A; }>;
declare const do_: Cause<{}>;
export { let_ as let, bind, do_ as do };
//# sourceMappingURL=do.d.ts.map