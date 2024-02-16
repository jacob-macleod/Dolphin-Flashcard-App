/**
 * Atomically modifies the `FiberRef` with the specified function and returns
 * the result.
 */
export declare function updateAndGet<A>(f: (a: A) => A): <EA, EB>(fiberRef: import("./fiberRef.js").XFiberRef<EA, EB, A, A>) => import("./excl-effect.js").IO<EA | EB, A>;
//# sourceMappingURL=updateAndGet.d.ts.map