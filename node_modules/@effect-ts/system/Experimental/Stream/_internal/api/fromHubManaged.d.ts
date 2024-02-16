import * as H from "../../../../Hub/index.js";
import * as M from "../../../../Managed/index.js";
import * as C from "../core.js";
/**
 * Creates a stream from a subscription to a hub in the context of a managed
 * effect. The managed effect describes subscribing to receive messages from
 * the hub while the stream describes taking messages from the hub.
 */
export declare function fromHubManaged_<R, E, A>(hub: H.XHub<never, R, unknown, E, never, A>, maxChunkSize?: number): M.UIO<C.Stream<R, E, A>>;
/**
 * Creates a stream from a subscription to a hub in the context of a managed
 * effect. The managed effect describes subscribing to receive messages from
 * the hub while the stream describes taking messages from the hub.
 *
 * @ets_data_first fromHubManaged_
 */
export declare function fromHubManaged(maxChunkSize?: number): <R, E, A>(hub: H.XHub<never, R, unknown, E, never, A>) => M.UIO<C.Stream<R, E, A>>;
//# sourceMappingURL=fromHubManaged.d.ts.map