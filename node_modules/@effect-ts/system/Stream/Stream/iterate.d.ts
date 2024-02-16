import type { UIO } from "./definitions.js";
/**
 * The infinite stream of iterative function application: a, f(a), f(f(a)), f(f(f(a))), ...
 */
export declare function iterate<A>(a: A, f: (a: A) => A): UIO<A>;
//# sourceMappingURL=iterate.d.ts.map