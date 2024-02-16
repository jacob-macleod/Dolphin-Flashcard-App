import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as H from "../../../../Hub/index.js";
import type * as C from "../core.js";
/**
 * Creates a stream from a subscription to a hub.
 *
 * The hub will be shut down once the stream is closed.
 */
export declare function fromChunkHubWithShutdown<R, E, O>(hub: H.XHub<never, R, unknown, E, never, CK.Chunk<O>>): C.Stream<R, E, O>;
//# sourceMappingURL=fromChunkHubWithShutdown.d.ts.map