import * as H from "../../../../Hub/index.js";
import * as C from "../core.js";
/**
 * Creates a stream from a subscription to a hub.
 *
 * The hub will be shut down once the stream is closed.
 */
export declare function fromHubWithShutdown_<R, E, A>(hub: H.XHub<never, R, unknown, E, never, A>, maxChunkSize?: number): C.Stream<R, E, A>;
/**
 * Creates a stream from a subscription to a hub.
 *
 * The hub will be shut down once the stream is closed.
 *
 * @ets_data_first fromHubWithShutdown_
 */
export declare function fromHubWithShutdown(maxChunkSize?: number): <R, E, A>(hub: H.XHub<never, R, unknown, E, never, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=fromHubWithShutdown.d.ts.map