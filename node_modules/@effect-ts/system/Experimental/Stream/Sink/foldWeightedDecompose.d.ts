import * as CK from "../../../Collections/Immutable/Chunk/index.js";
import * as C from "./core.js";
/**
 * Creates a sink that folds elements of type `In` into a structure
 * of type `S`, until `max` worth of elements (determined by the `costFn`)
 * have been folded.
 *
 * The `decompose` function will be used for decomposing elements that
 * cause an `S` aggregate to cross `max` into smaller elements.
 * Be vigilant with this function, it has to generate "simpler" values
 * or the fold may never end. A value is considered indivisible if
 * `decompose` yields the empty chunk or a single-valued chunk. In
 * these cases, there is no other choice than to yield a value that
 * will cross the threshold.
 *
 * The `foldWeightedDecomposeM` allows the decompose function
 * to return an `Effect` value, and consequently it allows the sink
 * to fail.
 */
export declare function foldWeightedDecompose<Err, In, S>(z: S, costFn: (s: S, in_: In) => number, max: number, decompose: (in_: In) => CK.Chunk<In>, f: (s: S, in_: In) => S): C.Sink<unknown, Err, In, Err, In, S>;
//# sourceMappingURL=foldWeightedDecompose.d.ts.map