import type * as CK from "../../../Collections/Immutable/Chunk/index.js";
import type * as T from "../../../Effect/index.js";
import type { Predicate } from "../../../Function/index.js";
import * as C from "./core.js";
/**
 * A sink that effectfully folds its input chunks with the provided function, termination predicate and initial state.
 * `contFn` condition is checked only for the initial value and at the end of processing of each chunk.
 * `f` and `contFn` must preserve chunking-invariance.
 */
export declare function foldChunksEffect<Env, Err, In, S>(z: S, contFn: Predicate<S>, f: (s: S, chunk: CK.Chunk<In>) => T.Effect<Env, Err, S>): C.Sink<Env, Err, In, Err, unknown, S>;
//# sourceMappingURL=foldChunksEffect.d.ts.map