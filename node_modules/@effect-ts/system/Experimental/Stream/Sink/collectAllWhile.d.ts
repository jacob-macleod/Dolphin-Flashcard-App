import * as CK from "../../../Collections/Immutable/Chunk/index.js";
import type { Predicate } from "../../../Function/index.js";
import type * as C from "./core.js";
/**
 * Accumulates incoming elements into a chunk as long as they verify predicate `p`.
 */
export declare function collectAllWhile<Err, In>(p: Predicate<In>): C.Sink<unknown, Err, In, Err, In, CK.Chunk<In>>;
//# sourceMappingURL=collectAllWhile.d.ts.map