import type { XFiberRef } from "./fiberRef.js";
/**
 * Atomically modifies the `FiberRef` with the specified function.
 *
 * @ets_data_first update_
 */
export declare function update<A>(f: (a: A) => A): <EA, EB>(self: XFiberRef<EA, EB, A, A>) => import("./excl-effect.js").IO<EA | EB, void>;
/**
 * Atomically modifies the `FiberRef` with the specified function.
 */
export declare function update_<EA, EB, A>(self: XFiberRef<EA, EB, A, A>, f: (a: A) => A): import("./excl-effect.js").IO<EA | EB, void>;
//# sourceMappingURL=update.d.ts.map