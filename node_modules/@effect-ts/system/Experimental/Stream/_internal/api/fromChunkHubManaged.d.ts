import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as H from "../../../../Hub/index.js";
import * as M from "../../../../Managed/index.js";
import type * as C from "../core.js";
/**
 * Creates a stream from a subscription to a hub in the context of a managed
 * effect. The managed effect describes subscribing to receive messages from
 * the hub while the stream describes taking messages from the hub.
 */
export declare function fromChunkHubManaged<R, E, O>(hub: H.XHub<never, R, unknown, E, never, CK.Chunk<O>>): M.UIO<C.Stream<R, E, O>>;
//# sourceMappingURL=fromChunkHubManaged.d.ts.map