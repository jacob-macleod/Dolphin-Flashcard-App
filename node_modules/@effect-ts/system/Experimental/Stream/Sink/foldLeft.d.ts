import type * as C from "./core.js";
/**
 * A sink that folds its inputs with the provided function and initial state.
 */
export declare function foldLeft<Err, In, S>(z: S, f: (s: S, in_: In) => S): C.Sink<unknown, Err, In, Err, unknown, S>;
//# sourceMappingURL=foldLeft.d.ts.map