import type { Option } from "../Option/index.js";
/**
 * Atomically modifies the `FiberRef` with the specified partial function.
 * If the function is undefined on the current value it doesn't change it.
 */
export declare function updateSome<A>(f: (a: A) => Option<A>): <EA, EB>(fiberRef: import("./fiberRef.js").XFiberRef<EA, EB, A, A>) => import("./excl-effect.js").IO<EA | EB, void>;
//# sourceMappingURL=updateSome.d.ts.map