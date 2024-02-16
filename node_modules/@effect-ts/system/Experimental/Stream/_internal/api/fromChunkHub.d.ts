import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as H from "../../../../Hub/index.js";
import type * as C from "../core.js";
/**
 * Creates a stream from a subscription to a hub.
 */
export declare function fromChunkHub<R, E, O>(hub: H.XHub<never, R, unknown, E, never, CK.Chunk<O>>): C.Stream<R, E, O>;
//# sourceMappingURL=fromChunkHub.d.ts.map