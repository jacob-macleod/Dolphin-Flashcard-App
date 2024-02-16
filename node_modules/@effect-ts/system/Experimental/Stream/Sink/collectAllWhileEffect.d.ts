import * as CK from "../../../Collections/Immutable/Chunk/index.js";
import * as T from "../../../Effect/index.js";
import type * as C from "./core.js";
/**
 * Accumulates incoming elements into a chunk as long as they verify effectful predicate `p`.
 */
export declare function collectAllWhileEffect<Env, Err, In>(p: (in_: In) => T.Effect<Env, Err, boolean>): C.Sink<Env, Err, In, Err, In, CK.Chunk<In>>;
//# sourceMappingURL=collectAllWhileEffect.d.ts.map