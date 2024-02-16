import * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import type * as C from "../core.js";
/**
 * Concatenates all of the streams in the chunk to one stream.
 */
export declare function concatAll<R, E, O>(streams: CK.Chunk<C.Stream<R, E, O>>): C.Stream<R, E, O>;
//# sourceMappingURL=concatAll.d.ts.map