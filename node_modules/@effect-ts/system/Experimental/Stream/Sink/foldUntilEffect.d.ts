import * as T from "../../../Effect/index.js";
import type * as C from "./core.js";
/**
 * Creates a sink that effectfully folds elements of type `In` into a structure
 * of type `S` until `max` elements have been folded.
 *
 * Like `foldWeightedM`, but with a constant cost function of 1.
 */
export declare function foldUntilEffect<Env, In, Err, S>(z: S, max: number, f: (s: S, in_: In) => T.Effect<Env, Err, S>): C.Sink<Env, Err, In, Err, In, S>;
//# sourceMappingURL=foldUntilEffect.d.ts.map