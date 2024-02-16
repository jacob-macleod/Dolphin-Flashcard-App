/**
 * Atomically modifies the `FiberRef` with the specified function and returns
 * the old value.
 */
export declare const getAndUpdate: <A>(f: (a: A) => A) => <EA, EB>(fiberRef: import("./fiberRef.js").XFiberRef<EA, EB, A, A>) => import("./excl-effect.js").IO<EA | EB, A>;
//# sourceMappingURL=getAndUpdate.d.ts.map