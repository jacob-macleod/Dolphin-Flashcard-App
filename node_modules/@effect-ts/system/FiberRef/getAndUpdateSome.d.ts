import * as O from "../Option/index.js";
/**
 * Atomically modifies the `FiberRef` with the specified partial function and
 * returns the old value.
 * If the function is undefined on the current value it doesn't change it.
 */
export declare const getAndUpdateSome: <A>(f: (a: A) => O.Option<A>) => <EA, EB>(fiberRef: import("./fiberRef.js").XFiberRef<EA, EB, A, A>) => import("./excl-effect.js").IO<EA | EB, A>;
//# sourceMappingURL=getAndUpdateSome.d.ts.map