import * as CK from "../../../Collections/Immutable/Chunk/index.js";
import * as T from "../../../Effect/index.js";
import * as C from "./core.js";
/**
 * Creates a sink that effectfully folds elements of type `In` into a structure
 * of type `S`, until `max` worth of elements (determined by the `costFn`) have
 * been folded.
 *
 * The `decompose` function will be used for decomposing elements that
 * cause an `S` aggregate to cross `max` into smaller elements. Be vigilant with
 * this function, it has to generate "simpler" values or the fold may never end.
 * A value is considered indivisible if `decompose` yields the empty chunk or a
 * single-valued chunk. In these cases, there is no other choice than to yield
 * a value that will cross the threshold.
 *
 * See `foldWeightedDecompose` for an example.
 */
export declare function foldWeightedDecomposeEffect<Env, Env1, Env2, Err, Err1, Err2, In, S>(z: S, costFn: (s: S, in_: In) => T.Effect<Env, Err, number>, max: number, decompose: (in_: In) => T.Effect<Env1, Err1, CK.Chunk<In>>, f: (s: S, in_: In) => T.Effect<Env2, Err2, S>): C.Sink<Env & Env1 & Env2, Err, In, Err | Err1 | Err2, In, S>;
//# sourceMappingURL=foldWeightedDecomposeEffect.d.ts.map