/**
 * Atomically sets the value associated with the current fiber and returns
 * the old value.
 */
export declare const getAndSet: <A>(a: A) => <EA, EB>(fiberRef: import("./fiberRef.js").XFiberRef<EA, EB, A, A>) => import("./excl-effect.js").IO<EA | EB, A>;
//# sourceMappingURL=getAndSet.d.ts.map