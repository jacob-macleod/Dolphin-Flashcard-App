import type * as C from "./core.js";
/**
 * Creates a sink that folds elements of type `In` into a structure
 * of type `S` until `max` elements have been folded.
 *
 * Like `foldWeighted`, but with a constant cost function of 1.
 */
export declare function foldUntil<Err, In, S>(z: S, max: number, f: (s: S, in_: In) => S): C.Sink<unknown, Err, In, Err, In, S>;
//# sourceMappingURL=foldUntil.d.ts.map