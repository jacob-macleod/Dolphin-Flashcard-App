import * as H from "../../../../Hub/index.js";
import * as M from "../../../../Managed/index.js";
import * as C from "../core.js";
/**
 * Creates a stream from a subscription to a hub in the context of a managed
 * effect. The managed effect describes subscribing to receive messages from
 * the hub while the stream describes taking messages from the hub.
 *
 * The hub will be shut down once the stream is closed.
 */
export declare function fromHubManagedWithShutdown_<R, E, A>(hub: H.XHub<never, R, unknown, E, never, A>, maxChunkSize?: number): M.UIO<C.Stream<R, E, A>>;
/**
 * Creates a stream from a subscription to a hub in the context of a managed
 * effect. The managed effect describes subscribing to receive messages from
 * the hub while the stream describes taking messages from the hub.
 *
 * The hub will be shut down once the stream is closed.
 *
 * @ets_data_first fromHubManagedWithShutdown_
 */
export declare function fromHubManagedWithShutdown(maxChunkSize?: number): <R, E, A>(hub: H.XHub<never, R, unknown, E, never, A>) => M.UIO<C.Stream<R, E, A>>;
//# sourceMappingURL=fromHubManagedWithShutdown.d.ts.map